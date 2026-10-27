

import React, { useState } from 'react';
import { Box, Button, Typography, Paper, CircularProgress, TextField } from '@mui/material';
import { uploadRedacao } from '../services/api';
import ResultadoArea from './ResultadoArea';

export default function UploadArea() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [nomeAluno, setNomeAluno] = useState('');

  function handleFileChange(e) {
    const f = e.target.files[0];
    setFile(f);
    setResultado(null);
    if (f && f.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  }

  async function handleUpload() {
    setLoading(true);
    try {
      const res = await uploadRedacao(file, nomeAluno);
      setResultado(res);
    } catch (err) {
      setResultado({ texto: '', iaDetectado: false, competencias: [], error: 'Erro ao enviar.' });
    }
    setLoading(false);
  }

  return (
    <>
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Envie sua redação (PDF, DOC, imagem)
        </Typography>
        <TextField
          label="Nome do aluno"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          value={nomeAluno}
          onChange={e => setNomeAluno(e.target.value)}
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx,image/*"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />
        {preview && (
          <Box sx={{ mb: 2 }}>
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200 }} />
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file || loading || !nomeAluno}>
          {loading ? <CircularProgress size={24} /> : 'Enviar'}
        </Button>
      </Paper>
      <ResultadoArea resultado={resultado} />
    </>
  );
}
