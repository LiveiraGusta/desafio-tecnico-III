export interface QueryExamsDto {
    page?: number;
    pageSize?: number;
    patientDocument?: string;
    dicomModality?: string;
    examDate?: string;
    
    search?: string;
}
