import React from 'react';
import { Container, Typography, Box, Paper, Grid, Link } from '@mui/material';
import { Presentation } from '@/types/entities';
import { Link as RouterLink } from 'react-router-dom';

// Mock data - In a real app, this would come from an API
const mockPresentations: Presentation[] = [
  { id: '1', title: 'Inteligência Artificial na Análise de Imagens Médicas', student_name: 'João da Silva', description: 'Uma abordagem sobre o uso de CNNs para detecção de anomalias.', scheduled_date: new Date('2025-11-20T09:00:00'), room: 'Sala 1', student_id: '101' },
  { id: '2', title: 'Computação Quântica e Criptografia Pós-Quântica', student_name: 'Maria Oliveira', description: 'Análise de algoritmos resistentes a computadores quânticos.', scheduled_date: new Date('2025-11-20T10:00:00'), room: 'Sala 2', student_id: '102' },
  { id: '3', title: 'Otimização de Redes de Sensores Sem Fio para IoT', student_name: 'Carlos Pereira', description: 'Um novo protocolo para economia de energia em redes de larga escala.', scheduled_date: new Date('2025-11-21T14:00:00'), room: 'Sala 1', student_id: '103' },
];


const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          WEPGCOMP 2025
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Workshop de Apresentações de Doutorado do PGCOMP
        </Typography>
      </Box>

      {/* Main Panel */}
      <Paper sx={{ p: 3, my: 4 }}>
        <Typography variant="h4" gutterBottom>Painel Principal</Typography>
        <Typography variant="body1">
          Bem-vindo ao WEPGCOMP 2025! Este evento é uma oportunidade para os doutorandos do PGCOMP apresentarem o andamento de suas pesquisas, receberem feedback qualificado e interagirem com colegas e professores. Explore a programação abaixo e participe das sessões.
        </Typography>
      </Paper>

      {/* Event Schedule */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>Programação do Evento</Typography>
        <Grid container spacing={3}>
          {mockPresentations.map((presentation) => (
            <Grid item xs={12} md={6} key={presentation.id}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6">{presentation.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {presentation.student_name}
                </Typography>
                <Typography variant="body2" sx={{ my: 1 }}>
                  {new Date(presentation.scheduled_date!).toLocaleString('pt-BR')} - {presentation.room}
                </Typography>
                {/* FUNC34: Link to see details */}
                <Link component={RouterLink} to={`/presentations/${presentation.id}`}>
                  Ver Detalhes
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Other Sections */}
      <Grid container spacing={4} sx={{ my: 4 }}>
        <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>Orientações</Typography>
                <Typography variant="body1">
                    As apresentações devem ter duração de 20 minutos, seguidos por 10 minutos de arguição. Os apresentadores devem fazer o upload do PDF da apresentação com pelo menos 24 horas de antecedência.
                </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>Contato e Local</Typography>
                <Typography variant="body1">
                    O evento ocorrerá no Instituto de Computação da UFBA.<br/>
                    Endereço: Av. Adhemar de Barros, S/N, Ondina, Salvador - BA.<br/>
                    Contato da organização: <Link href="mailto:pgcomp@ufba.br">pgcomp@ufba.br</Link>
                </Typography>
            </Paper>
        </Grid>
      </Grid>
      
      {/* FUNC33: Realização e Apoio */}
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>Realização e Apoio</Typography>
        <Typography variant="body1" color="text.secondary">
            PGCOMP/UFBA - Programa de Pós-Graduação em Ciência da Computação da Universidade Federal da Bahia.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
