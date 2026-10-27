import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function ResultadoArea({ resultado }) {
  if (!resultado) return null;
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6" gutterBottom>Resultado da Avaliação</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Texto extraído:</strong> {resultado.texto}
      </Typography>
      <Typography variant="body2" color={resultado.iaDetectado ? 'error' : 'success.main'}>
        {resultado.iaDetectado ? 'Possível uso de IA detectado!' : 'Nenhum uso de IA detectado.'}
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Competências ENEM:</Typography>
      <List>
        {resultado.competencias.map((c, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={c.nome} secondary={c.nota ? `Nota: ${c.nota}` : c.comentario} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
