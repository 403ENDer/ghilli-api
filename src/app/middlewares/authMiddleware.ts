// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

// Extend Express Request type to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

// Replace this with your actual JWT secret (store in .env in production)
const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  let userId: any = req?.headers?.userId;

  if (!userId) {
    console.log('From authMiddleware: userId is not present in headers');
    // return res.status(401).send({ message: 'No userId in header' });
    userId = '68176a2f095b2957bfcd6480'; //change the userId as const from let when removing this line
  }

  req.user = { id: userId };

  next();
  //Add this once you perform jwt authentication
  //   const authHeader = req.headers.authorization;

  //   if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //     return res.status(401).json({ message: 'Authorization header missing or malformed' });
  //   }

  //   const token = authHeader.split(' ')[1];

  //   try {
  //     const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

  //     if (!decoded || !decoded.id) {
  //       return res.status(401).json({ message: 'Invalid token: user ID missing' });
  //     }

  //     req.user = { id: decoded.id };
  //     next();
  //   } catch (error) {
  //     return res.status(401).json({ message: 'Invalid or expired token' });
  //   }
};
