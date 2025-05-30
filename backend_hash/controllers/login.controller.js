import Login from "../db/login.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await Login.findOne({ username });
  const result = { login: false, user: null, msg: null, jwt : null };  

  if (!user) {
    result.login = false;
    result.msg = "invalid user or password";
  } else {
    const salt = user.password.substring(0, 20);
    const hash = salt + hashPassword(password, salt);
    if (hash === user.password) {
      result.login = true;
      result.user = user;
      //creating JSON WEB TOken
      result.jwtoken = jwt.sign({
        id : user._id,}
        ,String(process.env.SECRET)
        ,{ expiresIn: "86400000" })
    }
  }
  res.json(result);
};

export const postUser = async (req, res) => {
  const salt = crypto.randomBytes(30).toString("base64url").substring(0, 20);
  const hash = hashPassword(req.body.password, salt);
  req.body.password = salt + hash;
  const user = await Login(req.body);
  await user.save();
  res.json(user);
};

const hashPassword = (password, salt) => {
  const hashing = crypto.createHash("sha256");
  return hashing.update(salt + password).digest("base64url");
};
