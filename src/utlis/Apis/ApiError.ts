export class ApiErrors extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  toResponse(): Response {
    return new Response(JSON.stringify({
      success: false,
      message: this.message,
    }), {
      status: this.statusCode,
      headers: { "Content-Type": "application/json" }
    });
  }
}
const ApiError = (status: number, message: string) =>
  new ApiErrors(status, message).toResponse();

 export { ApiError };