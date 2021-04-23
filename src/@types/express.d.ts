declare namespace Express {
  interface Request {
    user: {
      id: string;
      birth: Date;
      name: string;
    };
  }
}
