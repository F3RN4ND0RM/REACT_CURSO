import app from "./app.js";
import { connectDB } from "./db/db.js";

connectDB();

app.listen(5000, console.log("http://localhost:5000"));

// import crypto from "crypto";
// const password = "123456";
// const salt = crypto.randomBytes(100).toString("base64url").substring(0, 20);
// console.log(salt.length, salt);
// const hashing = crypto.createHash("sha256");
// const hash = hashing.update(salt + password).digest("base64url");
// console.log(salt + hash);

//////////////

// import crypto from "crypto";
// const texto = "hola mundo";
// const encryption_key = "byz9VFNtbRQM0yBODcCb1lrUtVVH3D3x"; // 32 chars
// const initialization_vector = "X05IGQ5qdBnIqAWD"; // 16 chars
// const cipher = crypto.createCipheriv(
//   "aes-256-cbc",
//   Buffer.from(encryption_key),
//   Buffer.from(initialization_vector)
// );
// let crypted = cipher.update(texto, "utf8", "hex");
// crypted += cipher.final("hex");
// console.log(crypted);
// const decipher = crypto.createDecipheriv(
//   "aes-256-cbc",
//   Buffer.from(encryption_key),
//   Buffer.from(initialization_vector)
// );
// let dec = decipher.update(crypted, "hex", "utf8");
// dec += decipher.final("utf8");
// console.log(dec);
