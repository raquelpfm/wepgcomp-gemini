import React from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import { Presentation, Session } from '@/types/entities';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

// Mock Data
const mockPresentations: Presentation[] = [
  { id: '1', title: 'Inteligência Artificial na Análise de Imagens Médicas', student_name: 'João da Silva', student_id: '101', description: '...', scheduled_date: new Date('2025-11-20T09:00:00'), room: 'Sala 1', score: 8.5 },
  { id: '2', title: 'Computação Quântica e Criptografia Pós-Quântica', student_name: 'Maria Oliveira', student_id: '102', description: '...', scheduled_date: new Date('2025-11-20T10:00:00'), room: 'Sala 2', score: 9.2 },
  { id: '3', title: 'Otimização de Redes de Sensores Sem Fio para IoT', student_name: 'Carlos Pereira', student_id: '103', description: '...', scheduled_date: null, room: '', score: undefined },
];

const mockSessions: Session[] = [
    { id: 's1', name: 'Sessão de Abertura', start_time: new Date('2025-11-20T08:00:00'), end_time: new Date('2025-11-20T09:00:00')},
    { id: 's2', name: 'Sessão Técnica 1', start_time: new Date('2025-11-20T09:00:00'), end_time: new Date('2025-11-20T12:00:00')},
]

const AdminPresentations: React.FC = () => {
  const [presentations, _setPresentations] = React.useState(mockPresentations);
  const [sessions, setSessions] = React.useState(mockSessions);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = React.useState(false);
  const [selectedPresentation, setSelectedPresentation] = React.useState<Presentation | null>(null);

  // FUNC20, FUNC28: Edit presentation
  const handleEdit = (presentation: Presentation) => {
    setSelectedPresentation(presentation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPresentation(null);
  };

  const handleSaveChanges = () => {
    // Logic to save changes to the presentation
    handleCloseModal();
  };

  // FUNC25: Delete session
  const handleDeleteSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  }

  // FUNC40: Reorder presentations (demonstrated by editing date/time)
  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Título', flex: 2 },
    { field: 'student_name', headerName: 'Apresentador(a)', flex: 1 },
    {
      field: 'scheduled_date',
      headerName: 'Data/Hora',
      flex: 1,
      type: 'dateTime',
      valueGetter: (value: string | Date) => value ? new Date(value) : null,
    },
    { field: 'room', headerName: 'Sala', flex: 0.5 },
    // FUNC29, FUNC30: Display score
    { field: 'score', headerName: 'Nota Final', flex: 0.5, type: 'number' },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editar"
          onClick={() => handleEdit(params.row as Presentation)}
        />,
      ],
    },
  ];

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Gerenciamento de Sessões
        </Typography>
        {/* FUNC25: Create session */}
        <Button startIcon={<PlaylistAddIcon />} onClick={() => setIsSessionModalOpen(true)}>Criar Sessão</Button>
        {sessions.map(session => (
            <Box key={session.id} display="flex" justifyContent="space-between" alignItems="center" my={1}>
                <Typography>{session.name} ({session.start_time.toLocaleString('pt-BR')} - {session.end_time.toLocaleString('pt-BR')})</Typography>
                <Button size="small" color="error" onClick={() => handleDeleteSession(session.id)}>Excluir</Button>
            </Box>
        ))}
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Gerenciamento de Apresentações
        </Typography>
        <Box sx={{ height: 600, width: '100%' }}>
          {/* FUNC30: List students by score */}
          <DataGrid rows={presentations} columns={columns} pageSizeOptions={[10, 25]} initialState={{
              sorting: {
                  sortModel: [{ field: 'score', sort: 'desc' }],
              },
          }} />
        </Box>
      </Paper>

      {/* Modal for Editing Presentation (FUNC20, FUNC28, FUNC40) */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Editar Apresentação</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            fullWidth
            margin="dense"
            defaultValue={selectedPresentation?.title}
          />
          <TextField
            label="Data e Horário"
            type="datetime-local"
            fullWidth
            margin="dense"
            defaultValue={selectedPresentation?.scheduled_date ? new Date(selectedPresentation.scheduled_date).toISOString().slice(0, 16) : ''}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Sala"
            fullWidth
            margin="dense"
            defaultValue={selectedPresentation?.room}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleSaveChanges}>Salvar Alterações</Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Creating Session (FUNC25) */}
      <Dialog open={isSessionModalOpen} onClose={() => setIsSessionModalOpen(false)}>
        <DialogTitle>Criar Nova Sessão</DialogTitle>
        <DialogContent>
            <TextField label="Nome da Sessão" fullWidth margin="dense" />
            <TextField label="Início" type="datetime-local" fullWidth margin="dense" InputLabelProps={{ shrink: true }} />
            <TextField label="Fim" type="datetime-local" fullWidth margin="dense" InputLabelProps={{ shrink: true }} />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setIsSessionModalOpen(false)}>Cancelar</Button>
            <Button onClick={() => setIsSessionModalOpen(false)}>Criar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPresentations;
