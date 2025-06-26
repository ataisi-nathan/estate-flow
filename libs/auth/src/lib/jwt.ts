/// libs/auth/src/lib/jwt.ts

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

export const signToken = (payload: object) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);
