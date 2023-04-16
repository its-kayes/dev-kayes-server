import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/api", (req, res) => {
  res.send("Hello, API!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
