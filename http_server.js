const http = require("http");
const {
  dictionaryDataReader,
  getYML,
  getCategories,
} = require("./services/reader");
// const https = require('https');

// console.log('Env variables', process.env.IS_DEBUG, process.env.IS_QA);
// console.log('Args', process.argv);

const getOKStatus = () => JSON.stringify({ status: "OK" });

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
const wordsController = (req, res) => {
  if (req.method.toLocaleLowerCase() === "post") {
    req.on("data", dictionaryDataReader);
    return req.on("end", () => {
      console.log("Finish...", getCategories(), getYML());
      res.write(JSON.stringify({ status: "OK" }));
      return res.end();
    });
  }

  
  res.write(JSON.stringify({ status: "OK" }));
  return res.end();
};

const server = new http.Server((req, res) => {
  // console.log("New reauest", req.method, );
  res.setHeader("Content-Type", "application/json");

  switch (req.url) {
    case "/words":
      wordsController(req, res);
      break;
    case "/":
    default:
      res.write(getOKStatus()).end();
  }
});

server.listen(8080, "localhost", () => {
  console.log("OK", "http://localhost:8080");
});
