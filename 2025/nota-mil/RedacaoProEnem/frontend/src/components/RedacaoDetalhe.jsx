import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function RedacaoDetalhe({ open, onClose, redacao }) {
  if (!redacao) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Detalhes da Redação</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1"><strong>Aluno:</strong> {redacao.nomeAluno}</Typography>
        <Typography variant="body2"><strong>Arquivo:</strong> {redacao.arquivoOriginal}</Typography>
        <Typography variant="body2"><strong>Enviado:</strong> {new Date(redacao.dataEnvio).toLocaleString()}</Typography>
        <Typography variant="body2" color={redacao.iaDetectado ? 'error' : 'success.main'} sx={{ mb: 2 }}>
          {redacao.iaDetectado ? 'IA detectada' : 'Sem IA'}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}><strong>Texto completo:</strong></Typography>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mb: 2 }}>{redacao.texto}</Typography>
        <Typography variant="subtitle1">Competências ENEM:</Typography>
        <List>
          {redacao.competencias.map((c, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={c.nome} secondary={`Nota: ${c.nota} - ${c.comentario}`} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
