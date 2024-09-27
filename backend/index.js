const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cron = require("node-cron");
var ping = require("ping");
// const clientDistPath = path.join(__dirname, "../client/dist");
// app.use(express.static(clientDistPath));

const userRoutes = require("./routes/user");

app.use(userRoutes);

app.get("/api/data", (req, res) => {
  console.log("Routed");
  res.json({ message: "Hello from Express!!!!!!eeeeee" });
});

// app.get("*", (req, res) => {
//   // Correct the path to point to 'client/dist/index.html'
//   res.sendFile(path.join(clientDistPath, "index.html"));
// });

if (process.env.NODE_ENV === "production") {
  // app.use(express.static("client/build"));
  const clientDistPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientDistPath));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

let host = "dfair.onrender.com";
let cfg = { timeout: 10 };
ping.sys.probe(
  host,
  function (isAlive) {
    var msg = isAlive
      ? "host " + host + " is alive"
      : "host " + host + " is dead";
    console.log("Message" + msg);
  },
  cfg
);

cron.schedule("* * * * *", () => {
  console.log("task");
  let host = "dfair.onrender.com";
  ping.sys.probe(host, function (isAlive) {
    var msg = isAlive
      ? "host " + host + " is alive"
      : "host " + host + " is dead";
    console.log("Message" + msg);
  });
});

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("server has started"));
  })
  .catch((err) => console.log("error" + err));
