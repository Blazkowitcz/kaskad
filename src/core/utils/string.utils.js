const slug = require('slug');

exports.slug = (string) => {
    const result = string.replace(/[\s._-]/g, '_');
    return result.toLowerCase();
}