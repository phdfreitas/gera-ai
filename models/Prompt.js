const Sequelize = require('sequelize');
const db = require('../db/connection');

const Prompt = db.define('tb_prompts', {
    prompt: {
        type: Sequelize.STRING
    }
});

module.exports = Prompt;