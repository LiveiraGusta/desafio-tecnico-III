export interface QueryPatientsDto {
    page?: number;
    pageSize?: number;
    search?: string;
    name?: string;
    email?: string;
    phone?: string;
    document?: string;
}
