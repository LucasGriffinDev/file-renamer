const fs = require('fs');
const path = require('path');
const profilePathTest = path.join(__dirname, '../../profiles/chromagenProfile.json');
function readJson(profilePath) {
    let x = profilePathTest
    return JSON.parse(fs.readFileSync(x));
}

module.exports = { readJson };