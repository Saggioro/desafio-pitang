declare namespace Express {
  export interface Request {
    user: {
      id: string;
      cpf: string;
    };
  }
}
