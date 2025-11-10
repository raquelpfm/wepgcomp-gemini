import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Alert } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Presentation } from '@/types/entities';

interface PresentationFormData {
    title: string;
    description: string;
    suggested_date: string;
    pdfFile: FileList;
}

// Mock data for existing submission
const existingSubmission: Presentation | null = {
    id: 'pres-123',
    student_id: 'stud-abc',
    student_name: 'Ana C. Doutoranda',
    title: 'Sistema de Recomendação Baseado em Grafos de Conhecimento',
    description: 'Uma análise de como grafos de conhecimento podem melhorar a precisão e a explicabilidade de sistemas de recomendação em domínios específicos.',
    scheduled_date: null, // Not yet scheduled by admin
    room: '',
    pdf_url: '/mock-existing.pdf'
};

const StudentDashboard: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<PresentationFormData>({
        defaultValues: {
            title: existingSubmission?.title || '',
            description: existingSubmission?.description || '',
        }
    });
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [pdfFileName, setPdfFileName] = useState<string | null>(existingSubmission?.pdf_url ? 'mock-existing.pdf' : null);

    const onSubmit: SubmitHandler<PresentationFormData> = (data: PresentationFormData) => {
        // FUNC18 & FUNC21: In a real app, this would call a service to upload the data and file.
        console.log('Submitting data:', data);
        console.log('PDF File:', data.pdfFile[0]);

        // Simulate API call
        if (data.pdfFile[0] && data.pdfFile[0].size > 10 * 1024 * 1024) {
            setSubmissionStatus('error');
            return;
        }

        setSubmissionStatus('success');
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPdfFileName(file.name);
        }
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard do Doutorando(a)
            </Typography>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    {existingSubmission ? 'Editar sua Apresentação' : 'Cadastrar sua Apresentação'}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* FUNC19: Student info is associated via authentication */}
                    <TextField
                        label="Título da Apresentação"
                        fullWidth
                        margin="normal"
                        {...register('title', { required: 'O título é obrigatório' })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        label="Resumo da Apresentação"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        {...register('description', { required: 'O resumo é obrigatório' })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                    {/* FUNC18: Suggest date/time */}
                    <TextField
                        label="Sugestão de Data e Horário"
                        type="datetime-local"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        {...register('suggested_date')}
                    />
                    
                    {/* FUNC21: Upload PDF */}
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        Conteúdo da Apresentação (PDF, máx. 10MB)
                    </Typography>
                    <Button variant="contained" component="label" sx={{ mt: 1, mb: 1 }}>
                        Fazer Upload do PDF
                        <input
                            type="file"
                            hidden
                            accept="application/pdf"
                            {...register('pdfFile', {
                                validate: {
                                    size: (files: FileList) => !files[0] || files[0].size <= 10 * 1024 * 1024 || 'O arquivo excede o limite de 10MB'
                                }
                            })}
                            onChange={handleFileChange}
                        />
                    </Button>
                    {pdfFileName && <Typography variant="body2" sx={{display: 'inline', ml: 2}}>{pdfFileName}</Typography>}
                    {errors.pdfFile && <Alert severity="error" sx={{mt: 1}}>{errors.pdfFile.message}</Alert>}

                    {submissionStatus === 'success' && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                            Apresentação enviada com sucesso! Os administradores poderão ajustar a data e horário.
                        </Alert>
                    )}
                     {submissionStatus === 'error' && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            Erro no envio. Verifique se o arquivo PDF não excede 10MB.
                        </Alert>
                    )}

                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                        {existingSubmission ? 'Atualizar Apresentação' : 'Enviar Apresentação'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default StudentDashboard;
