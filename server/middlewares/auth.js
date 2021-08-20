const { Car, User } = require("../models");
const { tokenVerifier } = require("../helpers/jwt");

function authentication(req, res, next) {
  let access_token = req.headers.access_token;

  if (access_token) {
    try {
      const decoded = tokenVerifier(access_token);
      req.UserData = decoded;
      next();
    } catch (err) {
      res.status(403).json({
        message: "User not Authenticated",
      });
    }
  } else {
    res.status(404).json({
      message: "Token Not Found",
    });
  }
}

function authorizeAdmin(req, res, next) {
  let access_token = req.headers.access_token;

  if (access_token) {
    try {
      const decoded = tokenVerifier(access_token);
      if (decoded.type === "admin") {
        req.UserData = decoded;
        next();
      } else {
        res.status(401).json({
          message: "User not Authorized",
        });
      }
    } catch (err) {
      res.status(403).json({
        message: "User not Authenticated",
      });
    }
  } else {
    res.status(404).json({
      message: "Token Not Found",
    });
  }
}

function authorization(req, res, next) {
  // let access_token = req.headers.access_token;
  // const decoded = tokenVerifier(access_token);
  // req.UserData = decoded;
  
  const id = +req.params.id;
  const UserId = +req.UserData.id;
  Car.findByPk(id)
    .then((car) => {
      if (!car) {
        res.status(404).json({
          message: "Car not found",
        });
      } else if (car.UserId !== UserId) {
        res.status(401).json({
          message: "User Not Authorized",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

module.exports = { authentication, authorization, authorizeAdmin };
