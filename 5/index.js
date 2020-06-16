const app = require("./app"); // varsinainen Express-sovellus
const http = require("http");
const config = require("./utils/config.js");
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log("index.js test env");
  logger.info(`Server running on port ${config.PORT}`);
});
