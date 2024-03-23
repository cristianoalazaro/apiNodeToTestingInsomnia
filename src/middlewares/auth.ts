import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

const PRIVATE_KEY = "!FdgH15/*@?}]]gggGGk";

export const createToken = (req: Request, res: Response) => {
  const token = jsonwebtoken.sign(
    {
      userId: req.body.id,
      userName: req.body.name,
    },
    PRIVATE_KEY,
    { expiresIn: "120s" }
  );

  return `Bearer ${token}`;
};

export const tokenValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).send({ error: "Access denied. Token is missing!" });

  jsonwebtoken.verify(token, PRIVATE_KEY, (err: any, decoded: any) => {
    if (err) return res.send({ error: "Token Invalid!" });
  });

  next();
};
