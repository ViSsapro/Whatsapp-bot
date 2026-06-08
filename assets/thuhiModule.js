const express = require('express');
const app = express();
const { useMultiFileAuthState, makeWASocket } = require('@adiwajshing/baileys');

app.get('/code', async (req, res) => {
    const number = req.query.number;
    if (!number) return res.send({ code: "Number required" });

    // මෙතැනදී Baileys socket එක සාදා Pairing code එක ලබා ගන්න
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
    const sock = makeWASocket({ auth: state });
    
    const code = await sock.requestPairingCode(number);
    res.send({ code: code });
});

app.listen(process.env.PORT || 5000, () => console.log("Pairing server running"));

/**
* @project_name thuhi md [MD]
* @Developer vimukthi thuhina <https://github.com/ViSsapro/---.git>
* @description Power Full Whatsapp User Bot thuhi md
* @link <https://github.com/ViSsapro/---.git>
* @version V1
*/

const anyaWA = require('queen_anya_core/dist/anyaCore');

anyaWA.start()

const events = async () => {
    const WASocket = await anyaWA.ev.on("open.connection");
    
    anyaWA.ev.on("connection.update", WASocket);
    anyaWA.ev.on("auth.update", WASocket);
    anyaWA.ev.on("messages.upsert", WASocket);
    
    anyaWA.ev.on("group.updates", WASocket);
    anyaWA.ev.on("call.manage", WASocket);
}
events();

app.get('/code', async (req, res) => {
    const number = req.query.number;
    if (!number) return res.send({ code: "Number required" });
    
    // මෙතැනදී anyaWA හරහා Pairing Code එක ලබා ගැනීම
    try {
        const code = await anyaWA.requestPairingCode(number);
        res.send({ code: code });
    } catch (e) {
        res.send({ code: "Error" });
    }
});

app.listen(port, () => console.log(`Pairing server running on port ${port}`));


const console_info = console.info
console.info = function() {
    if(!require("util").format(...arguments).includes("SessionEntry")){
        return console_info(...arguments)
    }
}
