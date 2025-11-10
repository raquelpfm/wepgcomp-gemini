export enum UserRole {
    STUDENT = 'STUDENT',
    PROFESSOR = 'PROFESSOR',
    LISTENER = 'LISTENER',
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
    COORDINATOR = 'COORDINATOR',
}

export interface User {
    id: string;
    name: string;
    email: string;
    ufba_id?: string; // Matrícula
    role: UserRole;
    is_approved: boolean;
}

export interface Presentation {
    id: string;
    title: string;
    student_name: string;
    student_id: string;
    description: string;
    scheduled_date: Date | null;
    room: string;
    pdf_url?: string;
    score?: number;
}

export interface Session {
    id: string;
    name: string;
    start_time: Date;
    end_time: Date;
}

export interface EventEdition {
    id: string;
    name: string;
    year: number;
    submission_deadline: Date;
    event_start_date: Date;
    event_end_date: Date;
    presentation_duration_minutes: number;
}
