import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.all('/auth', (req, res) => {
  res.send('auth service');
})

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
