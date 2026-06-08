const fs = require('fs-extra')
if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname+'/config.env' })

//═══════[Required Variables]════════\\
global.owner = process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.split(",") : ['94711449492']
global.port = process.env.PORT || 5000
global.email = 'thuhi-md@gmail.com'
global.github = 'https://github.com/ViSsapro/---.git'
global.location = 'Sri Lanka'
global.sudo = process.env.SUDO || '94711449492'
global.devs = '94711449492';
global.website = 'https://github.com/ViSsapro/---.git'

module.exports = {
  botname: process.env.BOT_NAME || 'ᴛʜᴜʜɪ ᴍᴅ',
  ownername: process.env.OWNER_NAME || 'ᴠɪᴍᴜᴋᴛʜɪ ᴛʜᴜʜɪɴᴀ',
  author: process.env.PACK_INFO ? process.env.PACK_INFO.split(";")[0] : 'vimukthi thuhina', 
  packname: process.env.PACK_INFO ? process.env.PACK_INFO.split(";")[1] : 'Thuhi MD',
  autoreaction: process.env.AUTO_REACTION || 'off',
  antibadword : process.env.ANTI_BAD_WORD || 'nobadwordokey',
  alwaysonline: process.env.ALWAYS_ONLINE || 'false',
  antifake : process.env.FAKE_COUNTRY_CODE || '',
  readmessage: process.env.READ_MESSAGE || false,
  HANDLERS: process.env.PREFIX || ['.'],
  nsfw_detect_ai : process.env.NSFW_DETECTION_AI || 'false',
  pmpermit: process.env.PMPERMIT || "false",
  warncount : process.env.WARN_COUNT || 3,
  disablepm: process.env.DISABLE_PM || "false",
  levelupmessage: process.env.LEVEL_UP_MESSAGE || 'false',
  antilink: process.env.ANTILINK_VALUES || 'chat.whatsapp.com',
  antilinkaction: process.env.ANTILINK_ACTION || 'remove',
  BRANCH: 'main',
  VERSION: process.env.VERSION || 'v.1.0.0',
  WORKTYPE: process.env.WORKTYPE || 'public'
};

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(`Update '${__filename}'`)
    delete require.cache[file]
    require(file)
})
