const mongoose = require('mongoose');

const RedacaoSchema = new mongoose.Schema({
  nomeAluno: { type: String, required: true },
  texto: { type: String, required: true },
  iaDetectado: { type: Boolean, default: false },
  competencias: { type: Array, default: [] },
  dataEnvio: { type: Date, default: Date.now },
  arquivoOriginal: { type: String }, // nome do arquivo
});

module.exports = mongoose.model('Redacao', RedacaoSchema);
