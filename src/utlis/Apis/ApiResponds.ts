class ApiRespond<T> {
  statusCode: number;
  data: T | null;
  message: string;
  success: boolean;

  constructor(statusCode: number, message: string, data: T | null = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }

  toResponse(): Response {
    return new Response(JSON.stringify(this), {
      status: this.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Generic factory function
const ApiResponds = <T>(status: number, message: string, data?: T) =>
  new ApiRespond<T>(status, message, data ?? null).toResponse();

export { ApiResponds };
