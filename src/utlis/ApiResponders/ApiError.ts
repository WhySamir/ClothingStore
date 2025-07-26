export class ApiErrors extends Error {
  statusCode: number;

  constructor(statusCode: number, message?: string) {
    super(message || "An unexpected error occurred");
    this.statusCode = statusCode;
  }

  toResponse(): Response {
    return new Response(
      JSON.stringify({
        success: false,
        message: this.message,
      }),
      {
        status: this.statusCode,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// ✅ Helper that coerces ANY value into a message string
const ApiError = (status: number, message?: unknown) => {
  return new ApiErrors(
    status,
    message instanceof Error ? message.message : String(message)
  ).toResponse();
};

export { ApiError };
