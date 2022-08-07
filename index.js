require("./conn/mongo");

const express = require("express");
const app = express();
const port = 3000;
const { Request } = require("./models/myModel");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/requests", async (req, res) => {
  try {
    const requestData = await Request.find();
    res.send(requestData);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.post("/requests", async (req, res) => {
  // console.log(req.body);
  const reqId = req.body.reqId;
  const funds = req.body.funds;
  const idea = req.body.idea;
  // console.log(reqId);
  // console.log(funds);
  // console.log(idea);
  const newReq = new Request({ idea, funds, reqId });
  newReq
    .save()
    .then(() => {
      res.status(201).send(newReq);
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

app.listen(port, () => {
  console.log(`App started on http://localhost:${port}`);
});
