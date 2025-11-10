import React from 'react';
import { Box, Typography, Paper, Button, Rating } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Presentation } from '@/types/entities';

// Mock data
const mockPresentation: Presentation = {
  id: '1',
  title: 'Inteligência Artificial na Análise de Imagens Médicas',
  student_name: 'João da Silva',
  description: 'Uma abordagem aprofundada sobre o uso de Redes Neurais Convolucionais (CNNs) para a detecção precoce de anomalias em exames de imagem, como radiografias e ressonâncias magnéticas. O trabalho explora arquiteturas como ResNet e VGG, e discute os desafios de trabalhar com datasets médicos.',
  scheduled_date: new Date('2025-11-20T09:00:00'),
  room: 'Sala 1',
  student_id: '101',
  pdf_url: '/mock-presentation.pdf' // FUNC22: Link to content
};

const PresentationDetail: React.FC = () => {
  const { id: _id } = useParams();
  // In a real app, you would fetch the presentation data based on the id
  const presentation = mockPresentation;

  const [rating, setRating] = React.useState<number | null>(2.5);

  return (
    <Paper sx={{ p: 4, my: 4 }}>
      <Typography variant="h3" gutterBottom>
        {presentation.title}
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Apresentador(a): {presentation.student_name}
      </Typography>
      <Typography variant="body1" sx={{ my: 2 }}>
        <strong>Data e Hora:</strong> {new Date(presentation.scheduled_date!).toLocaleString('pt-BR')}
      </Typography>
      <Typography variant="body1" sx={{ my: 2 }}>
        <strong>Local:</strong> {presentation.room}
      </Typography>
      <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
        Resumo
      </Typography>
      <Typography variant="body1" paragraph>
        {presentation.description}
      </Typography>

      {/* FUNC22: Display content */}
      {presentation.pdf_url && (
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Conteúdo da Apresentação
          </Typography>
          <Button
            variant="contained"
            href={presentation.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Baixar PDF da Apresentação
          </Button>
        </Box>
      )}

      {/* FUNC23: Voting interface */}
      <Box sx={{ my: 4, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
        <Typography variant="h5">Avaliar Apresentação</Typography>
        <Typography component="legend">Sua nota:</Typography>
        <Rating
          name="presentation-rating"
          value={rating}
          precision={0.5}
          onChange={(_event, newValue) => {
            setRating(newValue);
          }}
        />
        <Button sx={{mt: 1}} variant="outlined" onClick={() => alert(`Nota ${rating} registrada!`)}>
            Enviar Avaliação
        </Button>
        <Typography variant="caption" display="block" mt={1}>
            * Apenas professores avaliadores e ouvintes podem votar. Esta é uma demonstração.
        </Typography>
      </Box>

      <Button component={RouterLink} to="/" variant="outlined" sx={{ mt: 4 }}>
        Voltar para a Programação
      </Button>
    </Paper>
  );
};

export default PresentationDetail;
