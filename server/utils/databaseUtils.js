const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'database.json');

const readDB = () => {
    try {
        return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    } catch (error) {
        console.error("Error reading from the database:", error);
        return {sessions: {} };
    }
};

const writeDB = (data) => {

    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error writing to database:", error);
    }
};

module.exports = {readDB, writeDB};