import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, text }) => {
   if (!text) return conn.reply(m.chat, '*🚩 Escribe un Texto.*', m)
   if (text.length > 30) return conn.reply(m.chat, 'Solo se permiten 30 caracteres como Máximo.', m)
//   await conn.reply(m.chat, `*↻ Espera @${m.sender.split`@`[0]}, soy lenta. . .*`, estilo, adSticker)
   let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => global.imgbot.noprofileurl)
   const obj = {
      "type": "quote",
      "format": "png",
      "backgroundColor": "#FFFFFF",
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [{
         "entities": [],
         "avatar": true,
         "from": {
            "id": 1,
            "name": m.name,
            "photo": {
               "url": pp
            }
         },
         "text": text,
         "replyMessage": {}
      }]
   }
   const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
      headers: {
         'Content-Type': 'application/json'
      }
   })
   const buffer = Buffer.from(json.data.result.image, 'base64')
   let stick = await sticker(buffer, false, packname, author)
   await await conn.sendFile(m.chat, stick, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: true, title: gcname, body: `h`, mediaType: 2, sourceUrl: group, thumbnail: miniurl}}}, { quoted: m })
}

handler.help = ['quotly <texto>']
handler.tags = ['sticker']
handler.command = ['quotly', 'qc']
handler.register = true 
export default handler