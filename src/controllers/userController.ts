import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

import { User, users } from "../databaseMock/user";

export const hello = (req: Request, res: Response) => {
  res.send({
    status: "ok",
  });
};

//CRUD
export const getAll = (req: Request, res: Response) => {
  if (users.length === 0) {
    res.status(404).send({ message: "Users Not Found!" });
  }
  res.send(users);
};

export const getById = (req: Request, res: Response) => {
  const { id } = req.params;

  const user = users.find((u) => u.id === id);

  if (!user) {
    res.status(404).send({ message: `User ${id} Not Found!` });
  }

  res.send(user);
};

export const post = (req: Request, res: Response) => {
  const { name, age } = req.body as User;

  if (!name) res.status(400).send({ error: "Name is missing" });
  if (!age) res.status(400).send({ error: "age is ageg" });

  const newUser: User = {
    id: uuid(),
    name,
    age,
  };

  users.push(newUser);

  res.send(newUser);
};

export const put = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) res.status(400).send({ error: "ID is missing" });

  const { name, age } = req.body as User;

  if (!name && !age) res.status(400).send({ error: "Data is missing" });

  const user = users.find((u) => u.id === id);

  if (!user) res.status(404).send({ message: `User ${id} not found!` });

  const index = users.findIndex((u) => u.id === id);
  if (name) {
    users[index].name = name;
  }

  if (age) {
    users[index].age = age;
  }

  res.send(users[index]);
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) res.status(400).send({ error: "ID is missing" });

  const user = users.find((u) => u.id === id);

  if (!user) res.status(404).send({ message: `User ${id} not found!` });

  const index = users.findIndex((u) => u.id === id);
  console.log("indice ", index);

  users.splice(index, 1);

  res.send({ message: `User ${id} deleted!` });
};
