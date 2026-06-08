/**
* @project_name Thuhi md [MD]
* @Developer @MR Hex ULTRA Tech <https://github.com/ViSsapro/---.git>
* @description Power Full Whatsapp User Bot Thuhi md 
* @link <https://github.com/ViSsapro/---.git>
* @version V1

© 2023 MR Hex ULTRA Tech.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/

const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require('pg');
const { DATABASE_URL } = require('./anyaSettings')

let pool;
if (DATABASE_URL !== "local" && DATABASE_URL !== "vps") {
    const proConfig = {
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
    }

    pool = new Pool(proConfig);
}

module.exports = {
    query: (text, params) => pool.query(text, params)
}