import { NextFunction, Request, Response } from 'express';
type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
declare const catchAsync: (fn: AsyncRouteHandler) => (req: Request, res: Response, next: NextFunction) => void;
export default catchAsync;
