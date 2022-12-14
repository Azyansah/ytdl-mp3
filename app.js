const iky = require("ikyy")
const ikyy = new iky()
const express = require('express'),
  cors = require("cors"),
  logger = require("morgan"),
  cookieParser = require("cookie-parser"),
bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 80;

app.set("json spaces", 2);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.post("/result", async (req, res) => {
    const ress = await ikyy.yt.ytmp3(req.body.url)
    res.redirect(ress.result)
})
app.use("/", (req,res) => {
    res.render(__dirname + "/public/index.ejs")
})

app.listen(PORT, () => { console.log('App listening run to server http://localhost:' + PORT)})
