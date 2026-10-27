
import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, TextField, Button, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getAvatarUrl } from '../utils/avatarAi';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ptBR from 'date-fns/locale/pt-BR';

import { getRedacoes } from '../services/api';
import { exportRedacoesCsv } from '../utils/exportCsv';
import { exportRedacoesPdf } from '../utils/exportPdf';
import RedacaoDetalhe from './RedacaoDetalhe';

export default function RedacoesList() {
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [filtroIa, setFiltroIa] = useState('todos');
  const [filtroComp, setFiltroComp] = useState('');
  const [redacoes, setRedacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [selecionada, setSelecionada] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchRedacoes() {
      setLoading(true);
      const lista = await getRedacoes();
      setRedacoes(lista);
      setLoading(false);
    }
    fetchRedacoes();
  }, []);

  const filtradas = redacoes.filter(r => {
    const nomeMatch = r.nomeAluno.toLowerCase().includes(busca.toLowerCase());
    const dataMatch = (!dataInicio || new Date(r.dataEnvio) >= dataInicio) && (!dataFim || new Date(r.dataEnvio) <= dataFim);
    const iaMatch = filtroIa === 'todos' || (filtroIa === 'sim' && r.iaDetectado) || (filtroIa === 'nao' && !r.iaDetectado);
    const compMatch = !filtroComp || r.competencias.some(c => c.nome.toLowerCase().includes(filtroComp.toLowerCase()));
    return nomeMatch && dataMatch && iaMatch && compMatch;
  });
  function handleOpenDetalhe(redacao) {
    setSelecionada(redacao);
    setModalOpen(true);
  }
  function handleCloseDetalhe() {
    setModalOpen(false);
    setSelecionada(null);
  }



  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>Redações Arquivadas</Typography>
      <TextField
        label="Buscar por nome do aluno"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={busca}
        onChange={e => setBusca(e.target.value)}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <DatePicker
            label="Data início"
            value={dataInicio}
            onChange={setDataInicio}
            slotProps={{ textField: { size: 'small' } }}
          />
          <DatePicker
            label="Data fim"
            value={dataFim}
            onChange={setDataFim}
            slotProps={{ textField: { size: 'small' } }}
          />
          <TextField
            label="IA detectada"
            select
            size="small"
            value={filtroIa}
            onChange={e => setFiltroIa(e.target.value)}
            SelectProps={{ native: true }}
            sx={{ minWidth: 120 }}
          >
            <option value="todos">Todos</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </TextField>
          <TextField
            label="Competência"
            variant="outlined"
            size="small"
            value={filtroComp}
            onChange={e => setFiltroComp(e.target.value)}
            sx={{ minWidth: 120 }}
          />
        </Box>
      </LocalizationProvider>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => exportRedacoesCsv(filtradas)}
          disabled={filtradas.length === 0}
        >
          Exportar CSV
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => exportRedacoesPdf(filtradas)}
          disabled={filtradas.length === 0}
        >
          Exportar PDF
        </Button>
      </Box>
      {loading ? <Typography>Carregando...</Typography> : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {filtradas.map((r, idx) => (
            <Paper key={r._id} elevation={3} sx={{ width: 320, p: 2, mb: 2, borderRadius: 3, bgcolor: 'background.paper', boxShadow: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <img src={getAvatarUrl(r.nomeAluno)} alt={r.nomeAluno} style={{ width: 48, height: 48, borderRadius: '50%', background: '#eee' }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>{r.nomeAluno}</Typography>
                  <Typography variant="body2" color="text.secondary">{new Date(r.dataEnvio).toLocaleDateString()}</Typography>
                </Box>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Arquivo: {r.arquivoOriginal}</Typography>
                <Typography variant="body2" color={r.iaDetectado ? 'error' : 'success.main'}>
                  {r.iaDetectado ? 'IA detectada' : 'Sem IA'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>Trecho: {r.texto.slice(0, 120)}...</Typography>
              </Box>
              <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {r.competencias.map((c, i) => (
                  <Box key={i} sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', px: 1, py: 0.5, borderRadius: 1, fontSize: 12 }}>
                    {c.nome}: {c.nota}
                  </Box>
                ))}
              </Box>
              <Button variant="outlined" fullWidth sx={{ mt: 1 }} onClick={() => handleOpenDetalhe(r)}>
                Ver detalhes
              </Button>
            </Paper>
          ))}
        </Box>
      )}
      <RedacaoDetalhe open={modalOpen} onClose={handleCloseDetalhe} redacao={selecionada} />
    </Paper>
  );
}
