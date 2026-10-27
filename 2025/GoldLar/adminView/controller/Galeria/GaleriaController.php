<?php
require_once(__DIR__ . '/../../models/Galeria/GaleriaModel.php');

class GaleriaController {
    private $model;

    public function __construct() {
        $this->model = new GaleriaModel();
    }

    // Método para exibir a galeria
    public function exibirGaleria() {
        return $this->model->getGaleria();
    }

    // Método para gerar o JSON da galeria
    public function gerarGaleriaJson() {
        $imagens = $this->model->getGaleria();

        if (!empty($imagens)) {
            $jsonData = json_encode($imagens, JSON_PRETTY_PRINT);

            // Caminho para salvar o arquivo JSON
            $jsonFilePath = '../../../galeria.json';

            // Salvar o JSON no arquivo
            if (file_put_contents($jsonFilePath, $jsonData)) {
                echo "Arquivo JSON gerado com sucesso!";
            } else {
                echo "Erro ao gerar o arquivo JSON.";
            }
        } else {
            echo "Nenhuma imagem encontrada.";
        }
    }
}
?>
