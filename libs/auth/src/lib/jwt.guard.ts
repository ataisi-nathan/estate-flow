import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { verifyToken } from './jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }
    try {
      const token = authHeader.split(' ')[1];
      const payload = verifyToken(token);
      req['user'] = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}