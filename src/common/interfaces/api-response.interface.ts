export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  timestamp: string;
  path: string;
  statusCode: number;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors?: any;
  timestamp: string;
  path: string;
  statusCode: number;
}
