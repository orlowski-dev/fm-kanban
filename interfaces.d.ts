interface I_ServerActionResponse {
  status: number;
  details?: string;
  data?: Object | Object[] | null;
  errorMessage?: string;
}
