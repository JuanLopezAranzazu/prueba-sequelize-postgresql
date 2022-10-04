const express = require("express");
const app = express();

const { config } = require("./config/config");
const port = config.port;

const handleErrors = require("./middleware/handleErrors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = require("./routes/index.js");
routes(app);

app.use(handleErrors);

app.listen(port, () => console.log(`Server running in port ${port}`));
