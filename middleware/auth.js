const Device = require("../model/device");
const jwt = require("jsonwebtoken");
const found = false;
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // const decode = jwt.verify(token,"globalweatherapp")
    const device = await Device.findOne({
      _id: decode.id,
      "Tokens.token": token
    });

    if (!device) {
      throw new Error();
    }
    req.device = device;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send("Please authenticate");
  }
};

module.exports = auth;
