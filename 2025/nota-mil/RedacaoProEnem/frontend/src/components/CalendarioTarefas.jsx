import React, { useState, useEffect, useRef } from 'react';
// ReactDOM is no longer needed for custom header rendering with customButtons
// import ReactDOM from 'react-dom'; 
import { Paper, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box, IconButton, useTheme } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { LocalizationProvider, DateTimePicker, DatePicker } from '@mui/x-date-pickers'; // Import DatePicker
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { format } from 'date-fns'; // Import format from date-fns

export default function CalendarioTarefas() {
  const theme = useTheme();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: new Date(), description: '' });
  const calendarRef = useRef(null); // Ref for FullCalendar
  const [monthPickerOpen, setMonthPickerOpen] = useState(false); // State for month picker dialog

  // Função para solicitar permissão de notificação
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  // Função para enviar notificação
  const sendNotification = (event) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`Lembrete: ${event.title}`, {
        body: `Sua redação está agendada para ${new Date(event.start).toLocaleString()}`,
        icon: './favicon.ico',
      });
    }
  };

  // Verifica eventos futuros e agenda notificações
  useEffect(() => {
    const now = new Date();
    events.forEach(event => {
      const eventTime = new Date(event.start).getTime();
      const timeUntilEvent = eventTime - now.getTime();
      if (timeUntilEvent > 0 && timeUntilEvent < 24 * 60 * 60 * 1000) { // 24 horas
        setTimeout(() => sendNotification(event), timeUntilEvent - 5 * 60 * 1000); // 5 minutos antes
      }
    });
  }, [events]);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setNewEvent({ title: '', start: arg.date, end: arg.date, description: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddEvent = () => {
    setEvents([...events, { title: newEvent.title, start: newEvent.start, end: newEvent.end, extendedProps: { description: newEvent.description } }]);
    handleClose();
  };

  // Function to get the current calendar title
  const getCalendarTitle = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      return format(calendarApi.getDate(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    }
    return '';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 2, background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
        <FullCalendar
          ref={calendarRef} // Attach ref
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next',
            center: 'customTitle', // Use a custom button for the title
            right: 'monthPicker' // Use a custom button for the month picker
          }}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          height="auto"
          locale="pt-br"
          customButtons={{
            customTitle: {
              text: getCalendarTitle(), // This will be updated by datesSet
              click: () => {}, // No action on click
            },
            monthPicker: {
              text: 'Ir para Mês',
              click: () => setMonthPickerOpen(true),
            },
            prev: {
              text: 'Anterior',
              click: () => {
                if (calendarRef.current) calendarRef.current.getApi().prev();
              },
            },
            next: {
              text: 'Próximo',
              click: () => {
                if (calendarRef.current) calendarRef.current.getApi().next();
              },
            },
          }}
          datesSet={(dateInfo) => {
            // Update the custom title when the date range changes
            const titleButton = document.querySelector('.fc-customTitle-button');
            if (titleButton) {
              titleButton.textContent = format(dateInfo.view.currentStart, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
            }
          }}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Adicionar Novo Evento
          <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            label="Título do Evento"
            type="text"
            fullWidth
            variant="outlined"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <Box sx={{ mt: 2 }}>
            <DateTimePicker
              label="Início do Evento"
              value={newEvent.start}
              onChange={(date) => setNewEvent({ ...newEvent, start: date })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <DateTimePicker
              label="Fim do Evento"
              value={newEvent.end}
              onChange={(date) => setNewEvent({ ...newEvent, end: date })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
          <TextField
            margin="dense"
            label="Descrição"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddEvent} variant="contained" startIcon={<NotificationsActiveIcon />}>
            Salvar e Notificar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Month Picker Dialog */}
      <Dialog open={monthPickerOpen} onClose={() => setMonthPickerOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Selecionar Mês</DialogTitle>
        <DialogContent>
          <DatePicker
            views={['month', 'year']}
            label="Ano e Mês"
            value={selectedDate}
            onChange={(newDate) => {
              if (calendarRef.current && newDate) {
                calendarRef.current.getApi().gotoDate(newDate);
                setSelectedDate(newDate);
              }
              setMonthPickerOpen(false);
            }}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
}
