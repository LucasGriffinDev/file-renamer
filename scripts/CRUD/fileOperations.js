const fs = require('fs');
const path = require('path');
const mappingsPath = path.join(__dirname, '../profiles/chromagenProfile.json');

const writeMappings = async (updatedJsonData) => {
    let data = JSON.stringify(updatedJsonData, null, 2);
    await fs.promises.writeFile(mappingsPath, data);
}

const readJson = async () => {
    let data = await fs.promises.readFile(mappingsPath, 'utf8'); // Make sure to specify the encoding to get a string
    return JSON.parse(data);
}

module.exports = {
    writeMappings,
    readJson
}