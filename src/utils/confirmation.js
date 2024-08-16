// backend/utils/confirmation.js

import crypto from "crypto";

const algorithm = process.env.CRYPTO_ALGORITHM;
const secretKey = process.env.CONFIRMATION_SECRET_KEY;
const iv = process.env.INITIALIZATION_VECTOR;

function encrypt (token) {
  const cipher = crypto.createCipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );

  const encrypted = Buffer.concat([cipher.update(token), cipher.final()]);

  return encrypted.toString("hex");
};

function decrypt (hash) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString();
};

export default ( encrypt , decrypt );