const crypto = require('crypto');

/*************
 * Crypto
 *************/
exports.do_cipher = (inputpass) => {
  const salt = "dkskxkshgkxhsl!!@#$slzhslzhsl!@#$";
  const iterations = 100;
  const keylen = 24;

  const derivedKey = crypto.pbkdf2Sync(inputpass, salt, iterations, keylen, 'sha512');
  const pw = Buffer(derivedKey, 'binary').toString('hex');

  return pw;
};

/*************
 * jwt
 *************/
exports.jwt =  {
  cert: "wjdduq&aksgur"
};