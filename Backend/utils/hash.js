// const crypto = require('crypto');


// /**
//  * @function hash
//  * @param {string} data 
//  * @param {string} salt
//  * @param {string} algorithm
//  * @returns {string} 
//  */
// function hash(data,salt, algorithm='sha256'){
//     console.log("In hash");

//     console.log(crypto.createHmac(algorithm,salt).update(data).digest('hex'));

//     return crypto.createHmac(algorithm,salt).update(data).digest('hex');
// }

// module.exports = hash;

const crypto = require('crypto');

/**
 * Hashes a string with a given salt and algorithm.
 * @function hash
 * @param {string} data - The data to be hashed.
 * @param {string} salt - The salt to be used in the hashing process.
 * @param {string} [algorithm='sha256'] - The hashing algorithm to use (default is 'sha256').
 * @returns {string} - The hashed output as a hexadecimal string.
 */
function hash(data, salt, algorithm = 'sha256') {
    console.log("In hash function");
    console.log(`Data: ${data}, Salt: ${salt}, Algorithm: ${algorithm}`);

    // Generate the hash
    const hashedData = crypto.createHmac(algorithm, salt).update(data).digest('hex');
    //console.log(`Hashed Data: ${hashedData}`);

    return hashedData;
}

module.exports = hash;
