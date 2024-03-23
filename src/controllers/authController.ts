import { Request, Response } from "express";
import { createToken } from "../middlewares/auth";
import { users } from "../databaseMock/user";

export const getToken = (req: Request, res: Response) => {
  const { id, name } = req.body;

  if (!id || !name) res.status(401).json({ error: "Access denied!" });

  const user = users.find((u) => u.id === id);

  if (!user) res.status(401).json({ error: "Access denied" });

  const token = createToken(req, res);

  res.status(200).json(token);
};
