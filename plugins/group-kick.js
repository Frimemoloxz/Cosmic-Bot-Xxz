let handler = async (m, { conn, participants }) => {
	
let kickte = `Etiqueta al usuario que deseas eliminar`

if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte)}) 
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
let owr = m.chat.split`-`[0]
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
await conn.reply(m.chat, `✅ Usuario eliminado`, m, adReply)
}

handler.help = ['kick @user']
handler.tags = ['group']
handler.command = ['kick', 'expulsar', 'adios']
handler.admin = true
handler.group = true
handler.botAdmin = true
handler.register = true 
export default handler