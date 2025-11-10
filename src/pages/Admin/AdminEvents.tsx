import React from 'react';
import { Box, Typography, Paper, Button, TextField, Grid, Alert } from '@mui/material';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { EventEdition } from '@/types/entities';

// Mock data for the active event edition
const activeEdition: EventEdition = {
    id: 'evt-2025',
    name: 'WEPGCOMP 2025',
    year: 2025,
    submission_deadline: new Date('2025-10-31T23:59:59'),
    event_start_date: new Date('2025-11-20T09:00:00'),
    event_end_date: new Date('2025-11-22T18:00:00'),
    presentation_duration_minutes: 20,
};

// Helper to format date for datetime-local input
const formatDateForInput = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const hours = (`0${d.getHours()}`).slice(-2);
    const minutes = (`0${d.getMinutes()}`).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};


type EventFormData = {
    submission_deadline: string;
    event_start_date: string;
    event_end_date: string;
    presentation_duration_minutes: number;
};

const AdminEvents: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<EventFormData>({
        defaultValues: {
            submission_deadline: formatDateForInput(activeEdition.submission_deadline),
            event_start_date: formatDateForInput(activeEdition.event_start_date),
            event_end_date: formatDateForInput(activeEdition.event_end_date),
            presentation_duration_minutes: activeEdition.presentation_duration_minutes,
        }
    });
    const [showAlert, setShowAlert] = React.useState(false);

    const eventStartDate = watch('event_start_date');

    const onSubmit: SubmitHandler<EventFormData> = (data: FieldValues) => {
        // FUNC37: Edit active event parameters
        console.log("Saving new event data:", data);
        // FUNC38: Warning about schedule changes
        setShowAlert(true);
        // In a real app, call a service to save the data
    };

    return (
        <Box>
            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Gerenciar Edições do Evento
                </Typography>
                {/* FUNC36: Create new edition */}
                <Button variant="contained">Criar Nova Edição do Evento</Button>
                <Typography variant="body2" sx={{mt: 1}}>
                    * A criação de uma nova edição reutilizará os cadastros de usuários existentes.
                </Typography>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Editar Parâmetros da Edição Ativa ({activeEdition.name})
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {showAlert && (
                        <Alert severity="warning" onClose={() => setShowAlert(false)}>
                            Atenção: Alterar a duração ou quantidade de apresentações pode fazer com que as apresentações existentes fiquem sem horário atribuído.
                        </Alert>
                    )}
                    <Grid container spacing={2} sx={{mt: 1}}>
                        <Grid item xs={12} sm={6}>
                            {/* FUNC39: Validate submission deadline */}
                            <TextField
                                label="Data Limite para Submissão"
                                type="datetime-local"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                {...register('submission_deadline', {
                                    validate: (value: string) => new Date(value) < new Date(eventStartDate) || 'A data limite de submissão não pode ser posterior ao início do evento.'
                                })}
                                error={!!errors.submission_deadline}
                                helperText={errors.submission_deadline?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Início do Evento"
                                type="datetime-local"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                {...register('event_start_date', { required: true })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Fim do Evento"
                                type="datetime-local"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                {...register('event_end_date', { required: true })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Duração da Apresentação (minutos)"
                                type="number"
                                fullWidth
                                {...register('presentation_duration_minutes', { required: true, valueAsNumber: true })}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                        Salvar Alterações
                    </Button>
                </form>
            </Paper>

            {/* FUNC31 & FUNC32 */}
            <Paper sx={{ p: 2, mt: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Pós-Evento
                </Typography>
                <Box>
                    {/* FUNC31: Award evaluators */}
                    <Button variant="outlined" sx={{mr: 2}}>Premiar Avaliadores</Button>
                    {/* FUNC32: Send certificates */}
                    <Button variant="outlined">Enviar Certificados de Participação</Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default AdminEvents;
