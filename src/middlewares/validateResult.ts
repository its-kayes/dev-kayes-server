import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

// Define a middleware function to validate request parameters
export const validate = (req: Request, res: Response, next: NextFunction): Response | void => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors: { [key: string]: string }[] = [];
    errors.array().map((err: any) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(400).json({
        status: 'fail',
        message: extractedErrors,
    });
};

// <-------------- Alternative Code with more type gard ------------>

// import { NextFunction, Request, Response } from 'express';
// import { validationResult, ValidationError } from 'express-validator';

// // Define a middleware function to validate request parameters
// export const validate = (req: Request, res: Response, next: NextFunction): Response | void => {
//   const errors = validationResult(req);

//   if (errors.isEmpty()) {
//     return next();
//   }

//   const extractedErrors: { [key: string]: string }[] = [];
//   errors.array().map((err: ValidationError) => extractedErrors.push({ [err.location]: err.msg }));

//   return res.status(400).json({
//     status: 'fail',
//     message: extractedErrors,
//   });
// };
