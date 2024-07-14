export type ApiResponse<T> = {
  data?: T;
  message?: string;
  errors?: ErrorResponse[];
};

export type ErrorResponse = {
  path?: (string | number)[];
  message?: string;
};
