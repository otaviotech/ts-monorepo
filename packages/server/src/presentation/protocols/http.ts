export interface HttpRequest {
  body?: any;
}

export interface HttpResponse {
  statusCode: number;
  data?: any;
  error?: Error;
}
