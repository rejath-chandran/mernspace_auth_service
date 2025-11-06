// import { Request, Response, NextFunction } from "express";
// import { verifyAccessToken } from "../utils/jwt";

// export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) return res.status(401).json({ message: "No token provided" });

//   const token = authHeader.split(" ")[1];

//   try {
//     const user = verifyAccessToken(token);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     req.user = user as any; // attach decoded user to request object
//     next();
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// }

import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // ✅ attach user { id, email }
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}
