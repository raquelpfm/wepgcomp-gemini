import React from 'react';
import { Box, Typography, Paper, Select, MenuItem, FormControl } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams, GridRenderCellParams } from '@mui/x-data-grid';
import { User, UserRole } from '@/types/entities';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

// Mock Data
const mockUsers: User[] = [
  { id: '1', name: 'Carlos Professor', email: 'carlos@ufba.br', role: UserRole.PROFESSOR, is_approved: false },
  { id: '2', name: 'Ana Doutoranda', email: 'ana@ufba.br', role: UserRole.STUDENT, is_approved: true },
  { id: '3', name: 'Pedro Ouvinte', email: 'pedro@email.com', role: UserRole.LISTENER, is_approved: true },
  { id: '4', name: 'Maria Admin', email: 'maria@ufba.br', role: UserRole.ADMIN, is_approved: true },
  { id: '5', name: 'José Professor', email: 'jose@ufba.br', role: UserRole.PROFESSOR, is_approved: true },
];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = React.useState(mockUsers);

  // FUNC16: Approve/Reject registration
  const handleApprove = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, is_approved: true } : u));
    // In real app: call service to approve user
  };

  const handleReject = (id: string) => {
    // This is equivalent to removing the user
    handleDelete(id);
  };

  // FUNC35: Remove user
  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    // In real app: call service to delete user
  };

  // FUNC08, FUNC10, FUNC11, FUNC13: Change user role
  const handleRoleChange = (id: string, newRole: UserRole) => {
    // Here would be a check if current user is SUPER_ADMIN for certain actions
    alert(`Alterando perfil do usuário ${id} para ${newRole}. (Ação simulada)`);
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'role',
      headerName: 'Perfil',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        // UI for FUNC08, FUNC10, FUNC11, FUNC13
        <FormControl size="small" fullWidth>
          <Select
            value={params.value}
            onChange={(e) => handleRoleChange(params.row.id, e.target.value as UserRole)}
            // Assuming Super Admin has id '4' for demo
            disabled={params.row.role === UserRole.SUPER_ADMIN}
          >
            <MenuItem value={UserRole.STUDENT}>Doutorando</MenuItem>
            <MenuItem value={UserRole.PROFESSOR}>Professor</MenuItem>
            <MenuItem value={UserRole.LISTENER}>Ouvinte</MenuItem>
            <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
            <MenuItem value={UserRole.SUPER_ADMIN}>Super Admin</MenuItem>
            <MenuItem value={UserRole.COORDINATOR}>Coordenador</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      field: 'is_approved',
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams) => (params.value ? 'Aprovado' : 'Pendente'),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 150,
      getActions: (params: GridRowParams) => [
        // UI for FUNC16
        ...(!params.row.is_approved && params.row.role === UserRole.PROFESSOR
          ? [
              <GridActionsCellItem
                icon={<CheckCircleIcon />}
                label="Aprovar"
                onClick={() => handleApprove(params.row.id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Rejeitar"
                onClick={() => handleReject(params.row.id)}
              />,
            ]
          : []),
        // UI for FUNC35
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Remover"
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Gerenciamento de Usuários
      </Typography>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid rows={users} columns={columns} pageSizeOptions={[10, 25]} />
      </Box>
    </Paper>
  );
};

export default AdminUsers;
