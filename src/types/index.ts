export interface JwtPayload {
    id: number;
    username: string;
    role: 'admin' | 'user';
  }
  
  // Extend Express Request object
  declare global {
    namespace Express {
      interface Request {
        user?: JwtPayload;
      }
    }
  }
  