import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { HttpStatus } from "../../constant";
import { ResponseClass } from "../../domain/response";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(HttpStatus.BAD_REQUEST.code)
          .json(
            new ResponseClass(
              errorMessages.map((item) => item.message).join(" & "),
              HttpStatus.BAD_REQUEST.code
            )
          );
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .json(
            new ResponseClass(
              HttpStatus.INTERNAL_SERVER_ERROR.status,
              HttpStatus.INTERNAL_SERVER_ERROR.code
            )
          );
      }
    }
  };
}
