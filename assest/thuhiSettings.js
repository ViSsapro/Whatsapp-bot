/**
* @project_name thuhi md [MD]
* @Developer vimukthi thuhina<https://github.com/ViSsapro/---.git>
* @description Power Full Whatsapp User Bot thuhi md
* @link <https://github.com/ViSsapro/---.git>
* @version V1
*/

const fs = require('fs');
// Render සඳහා අවශ්‍ය පාරිසරික විචල්‍යයන් Load කිරීම
if (fs.existsSync('anyaSettings.env')) require('dotenv').config({ path: './assets/anyaSettings.env' });

module.exports = {
    VERSION: 'thuhi md V1',
    // Render හිදී DATABASE_URL නොමැති නම් 'local' ලෙස භාවිතා වේ
    DATABASE_URL: process.env.DATABASE_URL === undefined ? 'local' : process.env.DATABASE_URL,
    LANGUAGE: process.env.LANGUAGE === undefined ? 'EN' : process.env.LANGUAGE,
    
    // Render සඳහා විශේෂ සැකසුම:
    // බොට් එක Render එකේ ක්‍රියාත්මක වන විට HEROKU යන්න false ලෙස පැවතීම වඩාත් සුදුසුය.
    isHEROKU: false, 
    HEROKU_APP: ''
}
