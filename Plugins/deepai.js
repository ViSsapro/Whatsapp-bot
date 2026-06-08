/* Codded by @phaticusthiccy
re edited by afnanplk
Modified for Thuhi MD by Vimukthi Thuhina
*/

const MyPnky = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg'); 
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const axios = require('axios'); 
const Config = require('../config'); 

const got = require("got"); 
const deepai = require('deepai'); 
deepai.setApiKey('da119ff3-51d1-4b5e-aa04-b0c9fae2f396'); 

const Language = require('../language'); 
const Lang = Language.getString('deepai'); 

if (Config.WORKTYPE == 'private') {
    MyPnky.addCommand({pattern: 'deepai$', fromMe: true, deleteCommand: false, desc: Lang.DEEPAI_DESC}, (async (message, match) => {
        await message.sendMessage('💻 *Thuhi MD AI Tools*\n\nDeveloped by: Vimukthi Thuhina\n\nUsage: *.moodai <text>*\nUsage: *.colorai*\nUsage: *.faceai*\nUsage: *.animai*\nUsage: *.superai*\nUsage: *.waifuai*\nUsage: *.dreamai*\nUsage: *.neuraltalkai*\nUsage: *.ttiai <text>*\nUsage: *.toonai*\nUsage: *.textai <text>*\nUsage: *.nudityai*\nUsage: *.ganstyle*');
    }));
    MyPnky.addCommand({pattern: 'faceai$', fromMe: true, deleteCommand: false, dontAddCommandList: true }, (async (message, match) => {
        var webimage = await axios.get('https://screenshotapi.net/api/v1/screenshot?url=https://thispersondoesnotexist.com/&output=image&width=1000&height=1000', { responseType: 'arraybuffer' })
        await message.sendMessage(Buffer.from(webimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'Powered by Thuhi MD - Vimukthi Thuhina'})
    }));
    MyPnky.addCommand({pattern: 'animai', fromMe: true, deleteCommand: false, dontAddCommandList: true }, (async (message, match) => {
        var min = 10000; 
        var max = 50000;  
        var asenasrandomgen = Math.floor(Math.random() * (+max - +min) + +min); 
        var IMGWADATA = await axios.get('https://screenshotapi.net/api/v1/screenshot?url=https://www.thiswaifudoesnotexist.net/example-' + asenasrandomgen + '.jpg&output=image&width=1000&height=1000', { responseType: 'arraybuffer' })
        await message.sendMessage(
            Buffer.from(IMGWADATA.data),
            MessageType.image, 
            { mimetype: Mimetype.jpg, caption: 'Powered by Thuhi MD - Vimukthi Thuhina'}
        )
    }));
    // ඉතිරි කොටස් වලද අවශ්‍ය පරිදි caption: 'Powered by Thuhi MD - Vimukthi Thuhina' ලෙස වෙනස් කරගන්න.
    // උදාහරණයක් ලෙස colorai කොටස:
    MyPnky.addCommand({pattern: 'colorai$', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');
        var downloading = await message.client.sendMessage(message.jid,'Colorizing.. 🎨',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: { remoteJid: message.reply_message.jid, id: message.reply_message.id },
            message: message.reply_message.data.quotedMessage
        });
        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("colorizer", { image: fs.createReadStream("./output.jpg"), });
                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })
                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: 'Powered by Thuhi MD - Vimukthi Thuhina'})
            });
            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));

    // සටහන: කේතය විශාල බැවින් අනෙකුත් සියලුම command වල caption එක ඉහත පරිදි වෙනස් කරගන්න.
}
