import { Paciente } from "../../pacientes/types/paciente.model"

export interface Exame {
    id?: string,
    patientDocument?: string,
    patientId?: string,
    patient?: Paciente,
    idempotencyKey?: string
    examDate?: string,
    dicomModality?: string,
    createdAt?: string
}
    