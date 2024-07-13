export type ApiResponse<T> = {
  data?: T;
  message?: string;
  error?: ErrorResponse[];
};

export type ErrorResponse = {
  path?: (string | number)[];
  message?: string;
};
