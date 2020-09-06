// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const discord = require('discord.js')
const client = new discord.Client()
const roblox = require('noblox.js')
const dev = '294291918022508547'
require('dotenv').config()
let prefix = '.'
client.login(process.env.TOKEN)

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
  roblox.setCookie(process.env.COOKIE)
  client.user.setActivity('over South Sudan', { type: 'WATCHING' })
});

client.on('message', async message => {
  try {
    const role = await roblox.getRole({ group: 7464313, rank: 10});
    if (role.memberCount >= 1) {
      const channel = client.channels.cache.get("746039127606165654");
      const players = await roblox.getPlayers(7464313, 45629561);
      var blacklist = []
      var distinguishlist = []
      players.forEach(async (player) => {
        for (var i = 0; i < blacklist.length; i++) {
          if (blacklist[i] === player.userId) {
            await roblox.setRank(7233178, player.userId, 15);
            await channel.send(
              `Successfully detained ${player.username} to Enemy of the State. (ID: ${player.userId})`
            );
            return;
          } else if (distinguishlist[i] === player.userId) {
            await roblox.setRank(7233178, player.userId, 50);
            await channel.send(
               `Successfully immigrated ${player.username} to Distinguished Citizen. (ID: ${player.userId})`
             );
            return;
          } else {
            await roblox.setRank(7233178, player.userId, 20);
            await channel.send(
             `Successfully immigrated ${player.username} to South Sudanese Citizen. (ID: ${player.userId})`
            );
            return;
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  
  if (command === 'rank') {
    if (!message.member.roles.cache.some(r => ["All Access"].includes(r.name)) && !message.member.roles.cache.some(r => ["Ranking Permissions"].includes(r.name))) return message.reply('you cannot use this command. You need either the `All Access` or `Ranking Permissions` role.')
    let subgroup
    let groupid
    if (message.guild.id === '738086018741305495') {
      groupid = 7233178
      subgroup = 'the main group'
    } else if (message.guild.id === '742937046531702915') {
      groupid = 7325745
      subgroup = 'MoFA'
    } else if (message.guild.id === '738130961027301407') {
      groupid = 7234388
      subgroup = 'SSDF'
    } else if (message.guild.id === '738144085415821443') {
      groupid = 7234643
      subgroup = 'SPLA'
    } else {
      return message.reply('this is not an internally set guild.')
    }
    let username = args[0]
    if(!username) return message.reply('Please provide a username.')
    let id = await roblox.getIdFromUsername(username)
    let newrank = args[1]
    let oldrank = await roblox.getRankInGroup(groupid, id)
    let oldrankname = await roblox.getRole(groupid, oldrank).get('name')
    let newrankname = await roblox.getRole(groupid, Number(newrank)).get('name')
    await roblox.setRank({ group: groupid, target: id, rank: Number(newrank) })
    let dEmbed = new discord.MessageEmbed()
      .setTitle('Rank')
      .setDescription(`Done! ${username} has been ranked from ${oldrankname} to ${newrankname}.`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png", dynamic: true }))
      .setFooter(`Made by ${client.users.cache.get(dev).tag}`, client.users.cache.get(dev).displayAvatarURL({ format: "png", dynamic: true }))
    return message.channel.send(dEmbed)
  }
  if (command === 'rankids') {
    let subgroup
    let groupid
    if (message.guild.id === '738086018741305495') {
      groupid = 7233178
      subgroup = 'the main group'
    } else if (message.guild.id === '742937046531702915') {
      groupid = 7325745
      subgroup = 'MoFA'
    } else if (message.guild.id === '738130961027301407') {
      groupid = 7234388
      subgroup = 'SSDF'
    } else if (message.guild.id === '738144085415821443') {
      groupid = 7234643
      subgroup = 'SPLA'
    } else {
      return message.reply('this is not an internally set guild.')
    }
    const getRoles = await roblox.getRoles(Number(groupid))
    const formattedRoles = getRoles.map((r) => `\`${r.name}\` - ID: ${r.rank} **(${r.memberCount} people in this role)**`);

    const rankListEmbed = new discord.MessageEmbed() 
      .setTitle('Here are all your ranks:')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png", dynamic: true }))
      .setDescription(formattedRoles)
      .setFooter(`Made by ${client.users.cache.get(dev).tag}`, client.users.cache.get(dev).displayAvatarURL({ format: "png", dynamic: true }))
    message.channel.send(rankListEmbed)
  }
  if (command === 'accept') {
    if (!message.member.roles.cache.some(r => ["All Access"].includes(r.name)) && !message.member.roles.cache.some(r => ["Accept Permissions"].includes(r.name))) return message.reply('you cannot use this command. You need either the `All Access` or `Accept Permissions` role.')
    let subgroup
    let groupid
    if (message.guild.id === '738086018741305495') {
      groupid = 7233178
      subgroup = 'the main group'
    } else if (message.guild.id === '742937046531702915') {
      groupid = 7325745
      subgroup = 'MoFA'
    } else if (message.guild.id === '738130961027301407') {
      groupid = 7234388
      subgroup = 'SSDF'
    } else if (message.guild.id === '738144085415821443') {
      groupid = 7234643
      subgroup = 'SPLA'
    } else {
      return message.reply('this is not an internally set guild.')
    }
    let username = args[0]
    if(!username) return message.reply('Please provide a username.')
    let id = await roblox.getIdFromUsername(username)
    await roblox.handleJoinRequest(groupid, id, true)
    let dEmbed = new discord.MessageEmbed()
      .setTitle('Acceptance')
      .setDescription(`Done! ${username} has been accepted into ${subgroup}.`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png", dynamic: true }))
      .setFooter(`Made by ${client.users.cache.get(dev).tag}`, client.users.cache.get(dev).displayAvatarURL({ format: "png", dynamic: true }))
    return message.channel.send(dEmbed)
  }
  if (command === 'deny') {
    if (!message.member.roles.cache.some(r => ["All Access"].includes(r.name)) && !message.member.roles.cache.some(r => ["Accept Permissions"].includes(r.name))) return message.reply('you cannot use this command. You need either the `All Access` or `Accept Permissions` role.')
    let subgroup
    let groupid
    if (message.guild.id === '738086018741305495') {
      groupid = 7233178
      subgroup = 'the main group'
    } else if (message.guild.id === '742937046531702915') {
      groupid = 7325745
      subgroup = 'MoFA'
    } else if (message.guild.id === '738130961027301407') {
      groupid = 7234388
      subgroup = 'SSDF'
    } else if (message.guild.id === '738144085415821443') {
      groupid = 7234643
      subgroup = 'SPLA'
    } else {
      return message.reply('this is not an internally set guild.')
    }
    let username = args[0]
    if(!username) return message.reply('Please provide a username.')
    let id = await roblox.getIdFromUsername(username)
    await roblox.handleJoinRequest(groupid, id, false)
    let dEmbed = new discord.MessageEmbed()
      .setTitle('Denial')
      .setDescription(`Done! ${username} has been denied from entering ${subgroup}.`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png", dynamic: true }))
      .setFooter(`Made by ${client.users.cache.get(dev).tag}`, client.users.cache.get(dev).displayAvatarURL({ format: "png", dynamic: true }))
    return message.channel.send(dEmbed)
  }
   if (command === 'kick') {
    if (!message.member.roles.cache.some(r => ["All Access"].includes(r.name)) && !message.member.roles.cache.some(r => ["Kick Permissions"].includes(r.name))) return message.reply('you cannot use this command. You need either the `All Access` or `Kick Permissions` role.')
    let subgroup
    let groupid
    if (message.guild.id === '738086018741305495') {
      groupid = 7233178
      subgroup = 'the main group'
    } else if (message.guild.id === '742937046531702915') {
      groupid = 7325745
      subgroup = 'MoFA'
    } else if (message.guild.id === '738130961027301407') {
      groupid = 7234388
      subgroup = 'SSDF'
    } else if (message.guild.id === '738144085415821443') {
      groupid = 7234643
      subgroup = 'SPLA'
    } else {
      return message.reply('this is not an internally set guild.')
    }
    let username = args[0]
    if(!username) return message.reply('Please provide a username.')
    let id = await roblox.getIdFromUsername(username)
    await roblox.exile(groupid, id)
    let dEmbed = new discord.MessageEmbed()
      .setTitle('Kick')
      .setDescription(`Done! ${username} has been kicked from ${subgroup}.`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png", dynamic: true }))
      .setFooter(`Made by ${client.users.cache.get(dev).tag}`, client.users.cache.get(dev).displayAvatarURL({ format: "png", dynamic: true }))
    return message.channel.send(dEmbed)
  }
  if (command === 'shout') {
    if (!message.member.roles.cache.some(r => ["All Access"].includes(r.name)) && !message.member.roles.cache.some(r => ["Shout Permissions"].includes(r.name))) return message.reply('you cannot use this command. You need either the `All Access` or `Shout Permissions` role.')
    let subgroup;
    let groupid;
    if (message.guild.id === '738086018741305495') {
      groupid = 7233178
      subgroup = 'the main group'
    } else if (message.guild.id === '742937046531702915') {
      groupid = 7325745
      subgroup = 'MoFA'
    } else if (message.guild.id === '738130961027301407') {
      groupid = 7234388
      subgroup = 'SSDF'
    } else if (message.guild.id === '738144085415821443') {
      groupid = 7234643
      subgroup = 'SPLA'
    } else {
      return message.reply('this is not an internally set guild.')
    }
    let shout = args.slice(0).join(' ')
    roblox.shout(groupid, shout)
    let dEmbed = new discord.MessageEmbed()
      .setTitle('Shout')
      .setDescription(`Done! "${shout}" has been shouted!`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png", dynamic: true }))
      .setFooter(`Made by ${client.users.cache.get(dev).tag}`, client.users.cache.get(dev).displayAvatarURL({ format: "png", dynamic: true }))
    return message.channel.send(dEmbed)
  }
  if (command === 'help') {
    let hEmbed = new discord.MessageEmbed()
      .setTitle('Help')
      .setDescription('This embed will give you the bot essentials.')
      .addFields(
        {name: `${prefix}help`, value: 'Shows this embed.'},
        {name: `${prefix}kick <username>`, value: 'Kicks a member from the group.'},
        {name: `${prefix}rank <username> <rank id>`, value: "Allows you to set said person's rank in group."},
        {name: `${prefix}accept <username>`, value: 'Allows you to accept said user into the group.'},
        {name: `${prefix}deny <username>`, value: 'Allows you to deny said user from joining the group.'},
        {name: `${prefix}rankids`, value: 'Shows an embed listing all rank IDs.'},
        {name: `${prefix}shout <shout>`, value: 'Allows you to shout to your group.'},
      )
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setFooter(`Made by ${client.users.cache.get(dev).tag}`, client.users.cache.get(dev).displayAvatarURL({ format: "png", dynamic: true }))
    message.channel.send(hEmbed)
  }
})

let onShout = roblox.onShout(7233178);
    
onShout.on('data', function(post) {
  let sEmbed = new discord.MessageEmbed()
    .setTitle('Shout')
    .setAuthor(post.poster.username, `http://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${post.poster.username}`)
    .setDescription(post.body)
    client.channels.cache.get('746124248594251851').send(sEmbed);
});
    
onShout.on('error', function (err) {
     console.error(err.stack);
});