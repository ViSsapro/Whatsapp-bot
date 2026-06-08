/**
* @project_name THUHI MD [WA Multi-device]
* @author Vimukthi Thuhina <https://github.com/VimukthiThuhina>
* @description A WhatsApp based 3ʳᵈ party application that provide many services with a real-time automated conversational experience
* @link <https://github.com/VimukthiThuhina/THUHI-MD>
* @version 4.0.2
* @file  downloadSocialMedia.js - THUHI MD Social Media downloaders

© 2026 Vimukthi Thuhina, THUHI-TECH. All rights reserved.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/

const { AMDI, amdiDB, downloaders, igDownloader, Language, tiktok } = require('queen_amdi_core/dist/scripts')
const { Facebook } = downloaders
const { getSettings } = amdiDB.settingsDB
const axios = require('axios');
const Lang = Language.getString('downloadSocialMedia');

AMDI({ cmd: ["fb", "facebook"], desc: Lang.fbDesc, example: Lang.fbEXA, type: "download", react: "🎥" }, (async (amdiWA) => {
    let { footerTXT, input, isLINK, react, reply, sendVideo } = amdiWA.msgLayout;

    if (!isLINK(input)) return reply(Lang.needlink, '❓');

    let fbURL;
    await axios(input).then((response) => { fbURL = response.request._redirectable._currentUrl })
    .then(async () => {
        const res = await Facebook.getVideo(`${fbURL}`);
        if (res.data.hasError == false) {
            const captionDB = await getSettings('CAPTION')
            let caption = captionDB.input == undefined ? footerTXT : captionDB.input
            await react("⬇️");
            if (res.data.body.videoHD) {
                await react("⬆️");
                await sendVideo({ url: res.data.body.videoHD }, {caption: `Quality: *HD*\n${caption}\n\n*THUHI MD by Vimukthi Thuhina*`, quoted: true});
                return await react("✔️");
            } else {
                await react("⬆️");
                await sendVideo({ url: res.data.body.video }, {caption: `Quality: *SD*\n${caption}\n\n*THUHI MD by Vimukthi Thuhina*`, quoted: true});
                return await react("✔️");
            }
        } else if (res.data.hasError == true) {
            return reply(res.data.errorMessage, "❌")
        }
    })
    .catch((error) => { return reply("Error".fetchError(error), "❌", 1); });
}));


AMDI({ cmd: ["ig", "insta", "instagram"], desc: Lang.igDesc, example: Lang.igEXA, type: "download", react: "🌀" }, (async (amdiWA) => {
    let { footerTXT, input, isLINK, react, reply, sendImage, sendVideo } = amdiWA.msgLayout;

    if (!isLINK(input)) return reply(Lang.needlink, '❓');
    if (!/^((https|http)?:\/\/(?:www\.)?instagram\.com\/(p|tv|reel|stories)\/([^/?#&]+)).*/i.test(input)) return reply(Lang.needvalidIG);
    
    await react("⬇️");
    try {
        var igPost = await igDownloader(input);
        if (!igPost.length) return await reply(Lang.notfound, "❌");

        await react("⬆️");
        igPost.forEach(async (data) => {
            if (data.type === 'image') {await sendImage({url: data.url}, {caption: `${footerTXT}\n\n*THUHI MD by Vimukthi Thuhina*`, quoted: true});}
            else if (data.type === 'video') {await sendVideo({url: data.url}, {caption: `${footerTXT}\n\n*THUHI MD by Vimukthi Thuhina*`, quoted: true});}
        });
        return await react("✔️");
    } catch (e) {
        console.log(e);
        return await reply("Error".fetchError(e), "❌", 1);
    }
}));


AMDI({ cmd: ["tk", "tiktok"], desc: Lang.TKDESC, example: Lang.tkEXA, type: "download", react: "🏳️‍🌈" }, (async (amdiWA) => {
    let { input, prefix, reply, sendButtonsMsg } = amdiWA.msgLayout;

    if (!input) return await reply(Lang.needlink, '❓');
    if (!input.includes('tiktok.com/')) return await reply(Lang.needlink, '❓');

    const tkData = await tiktok({url: input});
    
    const TKText = `*${tkData.video.signature}*\n\n🎵 Music: ${tkData.audio.name} • ${tkData.audio.author}\n\n👨🏻‍🎤 Author: ${tkData.owner.name}\n\n👤 Username: ${tkData.owner.uniqueID}\n\n*THUHI MD by Vimukthi Thuhina*`

    const tiktokHead = [
        {type: "click", displayText: "ℹ️ Tiktok Information", buttonCMD: `${prefix}tkinfo ${input}`},
        {type: "url", displayText: 'Watch on Tiktok', url: input}
    ]
    await sendButtonsMsg(tiktokHead, {text: TKText, image: {url: tkData.video.thumb }, tagMsg: true, noTemplate: 1});

    const vidButtons = [
        {type: "click", displayText: '🔖 With Watermark', buttonCMD: `${prefix}tkdl mark ${input}`},
        {type: "click", displayText: '📼 No-Watermark', buttonCMD: `${prefix}tkdl nomark ${input}`}
    ]
    await sendButtonsMsg(vidButtons, {text: '🎞️ THUHI MD - Tiktok Video', noFooter: true, noTemplate: 1})

    const audButtons = [
        {type: "click", displayText: "🎶 Audio File", buttonCMD: `${prefix}tkdl audio ${input}`},
        {type: "click", displayText: "📁 Document File", buttonCMD: `${prefix}tkdl doc ${input}`}
    ]
    return await sendButtonsMsg(audButtons, {text: '🎶 THUHI MD - Tiktok Audio', noFooter: true, noTemplate: 1});
}));
