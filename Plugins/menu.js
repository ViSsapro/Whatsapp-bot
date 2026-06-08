/* Copyright (C) 2021 TENUX-Neotro.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
THUHI MD - Vimukthi Thuhina
*/

const Amazone = require('../events');
const {
    MessageType,
    GroupSettingChange,
    Mimetype,
    MessageOptions
} = require('@adiwajshing/baileys');
const fs = require('fs');
const Config = require('../config')
const axios = require('axios')
const request = require('request');
const os = require('os');
const Language = require('../language');
const Lang = Language.getString('amazone');
var clh = {
    cd: 'L3Jvb3QvV2hhdHNBc2VuYUR1cGxpY2F0ZWQv',
    pay: ''
}
var ggg = Buffer.from(clh.cd, 'base64')
var ddd = ggg.toString('utf-8')
let tk = Config.WORKTYPE == 'public' ? false: true

Amazone.addCommand({
    pattern: 'menu', fromMe: tk, desc: Lang.MENU, dontAddCommandList: true
}, (async (message, match) => {
        const rows = [{
            title: '🏵 HELP-LIST', description: "❓ THUHI MD Besic help.\n\n\n**◄━━━━━━━⦁⦁BESIC HELP⦁⦁━━━━━━━►*\n\n🎭 *.alive* \n🔮 Bot ක්‍රියාත්මක වේදැයි පරීක්ෂා කරයි.\n\n🎭 *.menu*\n🔮 සම්පූර්ණ විධාන ලැයිස්තුව පෙන්වයි.\n\n🎭 *.owner* \n🔮 බොට් අයිතිකරුවා (Vimukthi Thuhina) විස්තර පෙන්නයි\n\n🎭 *.setvar BOT_NAME: your text\n🔮ඔබෙ බොට්ගෙ නම වෙනස් කිරීමට.\n\n", rowId: "rowid1"
           },
           {
                title: '🏵 ADMIN-LIST', description: "❓ THUHI MD Admin command list.\n\n\n*◁===== THUHI MD Admin Panel ====▷*\n\n*🧞‍♀️විධානය* : .ban\n*🧞‍♀️විධානය* : .add\n*🧞‍♀️විධානය* : .mute\n*🧞‍♀️විධානය* : .unmute\n*🧞‍♀️විධානය* : .promote\n*🧞‍♀️විධානය* : .demote\n*🧞‍♀️විධානය* : .tagall", rowId: "rowid6"
            }]

        const sections = [{
            title: "THUHI MD Command Panel", rows: rows
        }]

        const button = {
            buttonText: '𝗠𝗘𝗡𝗨',
            description: "*╭────────═✪═────────╮*\n  *◄◯ THUHI MD MENU ◯►*\n*╰────────═✪═────────╯*\nDeveloped by: Vimukthi Thuhina",
            sections: sections,
            listType: 1
        }

        await message.client.sendMessage(message.jid, button, MessageType.listMessage)

    }));

if (Config.WORKTYPE == 'public') {
    Amazone.addCommand({
        pattern: 'menu', fromMe: true, dontAddCommandList: true
    }, (async (message, match) => {
            const rows = [{ title: 'HELP-LIST', description: "THUHI MD Besic Help.", rowId: ".menu" }]
            const sections = [{ title: "THUHI MD Command Panel", rows: rows }]
            const button = {
                buttonText: '𝗠𝗘𝗡𝗨',
                description: "*◄◯ THUHI MD PUBLIC MENU ◯►*\nOwner: Vimukthi Thuhina",
                sections: sections,
                listType: 1
            }
            await message.client.sendMessage(message.jid, button, MessageType.listMessage)
        }));
}
