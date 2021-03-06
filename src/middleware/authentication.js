/**
 * @purpose      To authorise user
 * @module       middleware
 * @file         authorization.js
 * @author       deepak
 * @since        27/12/2022
 */

const jwt = require("jsonwebtoken");
const logger = require("../middleware/logger");

var auth = (req, res, next) => {
  try {
    let token = req.headers["token"];
    if (!token) {
      return res.status(401).send({ message: "authentication failed,Token required" });
    } else {
      jwt.verify(token, "secret", function (err, decoded) {
        if (err) {
          return res.status(401).send({ message: "authentication failed " });
        } else {
          req.body["data"] = decoded;
          req.token = decoded;
          logger.info(
            " req.body.data ",
            req.body.data,
            "decoded value",
            decoded,
            "request.token=",
            req.token
          );
          //id=req.body.data.id
          next();
        }
      });
    }
  } catch {
    return res.status(401).send({ message: "authentication failed,Token required" });
  }
};

module.exports = auth;
