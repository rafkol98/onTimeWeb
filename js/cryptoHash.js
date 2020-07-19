const crypto = require('crypto');

const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256');

    //joins everything from the input and updates the has.
    hash.update(inputs.sort().join(''));

    //return the result of the hash in a hex form.
    return hash.digest('hex');
};

module.exports = cryptoHash;