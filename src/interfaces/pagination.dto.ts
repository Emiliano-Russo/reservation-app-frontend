export interface PaginatedResponse {
  items: any;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class PaginationDto {
  limit: number = 10;

  page: number = 1;
}
