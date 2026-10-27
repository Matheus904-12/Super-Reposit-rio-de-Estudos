<?php

/**
 * ========================================
 * PROCESSAR UPLOAD DE FOTO DE PERFIL
 * ========================================
 */

require_once __DIR__ . '/config/session.php';
header('Content-Type: application/json');

// Verifica se está logado
if (!estaLogado()) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Sessão expirada. Faça login novamente.']);
    exit;
}

// Valida método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método inválido']);
    exit;
}

require_once __DIR__ . '/config/database.php';

try {
    // Verifica se arquivo foi enviado
    if (!isset($_FILES['foto']) || $_FILES['foto']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Nenhuma imagem foi enviada');
    }

    $arquivo = $_FILES['foto'];
    $usuario_id = $_SESSION['usuario_id'];

    // Validações
    $extensoesPermitidas = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    $tamanhoMaximo = 5 * 1024 * 1024; // 5MB

    // Valida tipo MIME
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $arquivo['tmp_name']);
    finfo_close($finfo);

    $tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!in_array($mimeType, $tiposPermitidos)) {
        throw new Exception('Tipo de arquivo não permitido. Use JPG, PNG, GIF ou WEBP');
    }

    // Valida tamanho
    if ($arquivo['size'] > $tamanhoMaximo) {
        throw new Exception('A imagem deve ter no máximo 5MB');
    }

    // Cria diretório se não existir
    $diretorioUpload = __DIR__ . '/uploads/avatars/';
    if (!is_dir($diretorioUpload)) {
        mkdir($diretorioUpload, 0755, true);
    }

    // Gera nome único para o arquivo
    $extensao = strtolower(pathinfo($arquivo['name'], PATHINFO_EXTENSION));
    $nomeArquivo = 'avatar_' . $usuario_id . '_' . time() . '.' . $extensao;
    $caminhoCompleto = $diretorioUpload . $nomeArquivo;

    // Move arquivo para o servidor
    if (!move_uploaded_file($arquivo['tmp_name'], $caminhoCompleto)) {
        throw new Exception('Erro ao salvar imagem no servidor');
    }

    // Redimensiona imagem (opcional - requer GD)
    if (function_exists('imagecreatefromstring')) {
        redimensionarImagem($caminhoCompleto, 400, 400);
    }

    $pdo = getDB();

    // Busca foto antiga para deletar
    $stmt = $pdo->prepare("SELECT foto_perfil FROM usuarios WHERE id = ?");
    $stmt->execute([$usuario_id]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    // Deleta foto antiga se existir e não for default
    if ($usuario['foto_perfil'] && $usuario['foto_perfil'] !== 'img/default-avatar.png') {
        $fotoAntiga = __DIR__ . '/' . $usuario['foto_perfil'];
        if (file_exists($fotoAntiga)) {
            unlink($fotoAntiga);
        }
    }

    // Atualiza no banco
    $caminhoRelativo = 'uploads/avatars/' . $nomeArquivo;
    $stmt = $pdo->prepare("UPDATE usuarios SET foto_perfil = ? WHERE id = ?");
    $stmt->execute([$caminhoRelativo, $usuario_id]);

    // Atualiza sessão
    $_SESSION['usuario_foto'] = $caminhoRelativo;

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Foto atualizada com sucesso!',
        'foto_url' => $caminhoRelativo
    ]);
} catch (Exception $e) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => $e->getMessage()
    ]);
}

/**
 * Redimensiona imagem mantendo proporção
 */
function redimensionarImagem($caminho, $larguraMax, $alturaMax)
{
    try {
        // Detecta tipo de imagem
        $info = getimagesize($caminho);
        $mime = $info['mime'];

        // Cria imagem a partir do arquivo
        switch ($mime) {
            case 'image/jpeg':
                $imagemOriginal = imagecreatefromjpeg($caminho);
                break;
            case 'image/png':
                $imagemOriginal = imagecreatefrompng($caminho);
                break;
            case 'image/gif':
                $imagemOriginal = imagecreatefromgif($caminho);
                break;
            case 'image/webp':
                $imagemOriginal = imagecreatefromwebp($caminho);
                break;
            default:
                return false;
        }

        if (!$imagemOriginal) return false;

        // Dimensões originais
        $larguraOriginal = imagesx($imagemOriginal);
        $alturaOriginal = imagesy($imagemOriginal);

        // Calcula novas dimensões mantendo proporção
        $ratio = min($larguraMax / $larguraOriginal, $alturaMax / $alturaOriginal);
        $novaLargura = round($larguraOriginal * $ratio);
        $novaAltura = round($alturaOriginal * $ratio);

        // Cria nova imagem
        $imagemNova = imagecreatetruecolor($novaLargura, $novaAltura);

        // Preserva transparência para PNG e GIF
        if ($mime === 'image/png' || $mime === 'image/gif') {
            imagecolortransparent($imagemNova, imagecolorallocatealpha($imagemNova, 0, 0, 0, 127));
            imagealphablending($imagemNova, false);
            imagesavealpha($imagemNova, true);
        }

        // Redimensiona
        imagecopyresampled(
            $imagemNova,
            $imagemOriginal,
            0,
            0,
            0,
            0,
            $novaLargura,
            $novaAltura,
            $larguraOriginal,
            $alturaOriginal
        );

        // Salva imagem redimensionada
        switch ($mime) {
            case 'image/jpeg':
                imagejpeg($imagemNova, $caminho, 90);
                break;
            case 'image/png':
                imagepng($imagemNova, $caminho, 9);
                break;
            case 'image/gif':
                imagegif($imagemNova, $caminho);
                break;
            case 'image/webp':
                imagewebp($imagemNova, $caminho, 90);
                break;
        }

        // Libera memória
        imagedestroy($imagemOriginal);
        imagedestroy($imagemNova);

        return true;
    } catch (Exception $e) {
        return false;
    }
}
