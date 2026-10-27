<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galeria de Avatares - PositiveSense</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #d4e0f0 0%, #e8f4f8 100%);
            min-height: 100vh;
            padding: 2rem;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #5b8fc4;
            text-align: center;
            margin-bottom: 1rem;
        }

        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 3rem;
        }

        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .avatar-card {
            text-align: center;
        }

        .avatar-img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 3px solid #5b8fc4;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .avatar-img:hover {
            transform: scale(1.1);
            box-shadow: 0 10px 30px rgba(91, 143, 196, 0.3);
        }

        .avatar-name {
            margin-top: 1rem;
            font-weight: 600;
            color: #333;
        }

        .info-box {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 10px;
            border-left: 4px solid #5b8fc4;
        }

        .info-box h3 {
            color: #5b8fc4;
            margin-bottom: 0.5rem;
        }

        .info-box ul {
            list-style: none;
            padding-left: 0;
        }

        .info-box li {
            padding: 0.5rem 0;
            color: #666;
        }

        .info-box li::before {
            content: "✅ ";
            margin-right: 0.5rem;
        }

        .btn {
            display: inline-block;
            margin-top: 2rem;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #5b8fc4, #4a7ba7);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(91, 143, 196, 0.4);
        }

        .center {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 Galeria de Avatares PositiveSense</h1>
        <p class="subtitle">Escolha seu avatar favorito!</p>

        <div class="gallery">
            <div class="avatar-card">
                <img src="img/avatars/avatar-vazio.svg" alt="Avatar Padrão" class="avatar-img">
                <div class="avatar-name">Avatar Padrão</div>
                <small style="color: #999;">Azul Claro</small>
            </div>

            <div class="avatar-card">
                <img src="img/avatars/avatar-1.svg" alt="Avatar Rosa" class="avatar-img">
                <div class="avatar-name">Avatar Rosa</div>
                <small style="color: #999;">Pink Suave</small>
            </div>

            <div class="avatar-card">
                <img src="img/avatars/avatar-2.svg" alt="Avatar Azul" class="avatar-img">
                <div class="avatar-name">Avatar Azul</div>
                <small style="color: #999;">Azul Oceano</small>
            </div>

            <div class="avatar-card">
                <img src="img/avatars/avatar-3.svg" alt="Avatar Laranja" class="avatar-img">
                <div class="avatar-name">Avatar Laranja</div>
                <small style="color: #999;">Laranja Vibrante</small>
            </div>

            <div class="avatar-card">
                <img src="img/avatars/avatar-4.svg" alt="Avatar Verde" class="avatar-img">
                <div class="avatar-name">Avatar Verde</div>
                <small style="color: #999;">Verde Natureza</small>
            </div>

            <div class="avatar-card">
                <img src="img/avatars/avatar-5.svg" alt="Avatar Roxo" class="avatar-img">
                <div class="avatar-name">Avatar Roxo</div>
                <small style="color: #999;">Roxo Místico</small>
            </div>

            <div class="avatar-card">
                <img src="img/avatars/avatar-6.svg" alt="Avatar Amarelo" class="avatar-img">
                <div class="avatar-name">Avatar Amarelo</div>
                <small style="color: #999;">Dourado Solar</small>
            </div>
        </div>

        <div class="info-box">
            <h3>📋 Informações</h3>
            <ul>
                <li>Todos os avatares são em formato SVG (leves e escaláveis)</li>
                <li>Design minimalista e acessível</li>
                <li>Cores suaves adequadas para crianças com TEA</li>
                <li>Tamanho: 400x400px (otimizado)</li>
                <li>Selecionável na página de perfil</li>
                <li>Upload de foto customizada também disponível</li>
            </ul>
        </div>

        <div class="center">
            <a href="perfil.php" class="btn">Ir para Meu Perfil</a>
            <a href="login.php" class="btn" style="background: linear-gradient(135deg, #66BB6A, #4CAF50);">Fazer Login</a>
        </div>

        <div style="margin-top: 3rem; text-align: center; color: #999; font-size: 0.9rem;">
            <p>PositiveSense © 2025 - Tornando a educação mais inclusiva 💙</p>
        </div>
    </div>
</body>
</html>
