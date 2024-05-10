const express = require("express");
const { v4: uuidv4 } = require("uuid");
const httpContext = require("express-http-context");
const bodyParser = require("body-parser");
const cors = require("cors");

const Route = require("./Routes/routes")

const corsOptions = { origin: true }

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(httpContext.middleware)
app.use(function (req, res, next) {
    res.append("Cache-Control", "no-store")
    res.append("X-Content-Type-Options", "nosniff")
    res.append("Strict-Transport-Security", "max-age=31536000")
    res.append("Content-Security-Policy", "frame-ancestors 'none'")
    res.append("X-XSS-Protection", "1; mode=block")
    httpContext.set("reqId", uuidv4())
    const _parsedUrl = JSON.parse(JSON.stringify(req._parsedUrl));
    httpContext.set("pathname", _parsedUrl.pathname);
    httpContext.set("method", req.method);
    next();
});

app.options("*", cors(corsOptions))
app.use("/", Route)

module.exports = app