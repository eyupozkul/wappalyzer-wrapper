import express, { Application, Request, Response } from "express";

const app: Application = express();

// Body parsing Middleware
app.use(express.json());

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

const PORT = 4174;

app.listen(PORT, (): void => {
  console.log(`Connected successfully on port ${PORT}`);
});
