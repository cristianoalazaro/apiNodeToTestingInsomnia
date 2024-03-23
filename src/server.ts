import express from "express";
import userRoutes from "./routes/userRoute";
import authRoutes from "./routes/authRoute";

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(userRoutes);
server.use(authRoutes);

server.listen(3000, () => {
  console.log("Api rodando");
});
