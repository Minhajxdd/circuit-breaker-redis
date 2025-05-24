import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.all('/posts', (req, res) => {
  res.send('post created');
})

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
