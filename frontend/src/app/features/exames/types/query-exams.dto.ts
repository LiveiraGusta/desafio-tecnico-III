export interface QueryExamsDto {
    page?: number;
    pageSize?: number;
    name?: string,
    patientDocument?: string,
    responsibleDoctor?: string,
    dicomModality?: string;
    examDate?: string;
    
    search?: string;   
}
