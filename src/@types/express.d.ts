declare namespace Express {
  interface Request {
    user: {
      id: string;
      birth: Date;
    };
    nurse: {
      id: string;
    };
  }
}
