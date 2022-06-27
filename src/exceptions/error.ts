class RegisterError extends Error {
  public statusCode: number;

  public code: string;

  constructor(message?: string, statusCode?: number, code?: string) {
    super(message);
    this.statusCode = statusCode ?? 500;
    this.name = this.constructor.name;
    this.code = code ?? 'error';
    this.message = message ?? 'Error occurred';
  }
}

export default RegisterError;
