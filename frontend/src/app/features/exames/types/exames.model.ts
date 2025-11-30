export interface Exame {
    id?: number,
    patientDocument?: string,
    patientId?: string,
    idempotencyKey?: string
    examDate?: string,
    dicomModality?: string,
    createdAt?: string
}
    