interface I_ServerActionResponse {
  status: number;
  detail?: string;
  data?: Object | Object[] | null;
  errorMessage?: string;
}
