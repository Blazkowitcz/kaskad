const slug = require('slug');
const querystring = require('querystring');

exports.slug = (string) => {
    const result = string.replace(/[\s._-]/g, '_');
    return result.toLowerCase();
}

exports.decodeHash = (hash) => {
    const hashBuffer = decodePercentEncodedString(hash);
    return hashBuffer.toString('hex');
}

function decodePercentEncodedString(encodedString) {
    const bytes = [];
    for (let i = 0; i < encodedString.length; i++) {
        if (encodedString[i] === '%') {
            bytes.push(parseInt(encodedString.slice(i + 1, i + 3), 16));
            i += 2;
        } else {
            bytes.push(encodedString.charCodeAt(i));
        }
    }
    return Buffer.from(bytes);
}