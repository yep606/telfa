require('dotenv').config();
const ig = require('./instagram');
const { Telegraf } = require('telegraf')


const bot = new Telegraf(process.env.TOKEN);
let user = {
    login: "",
    password: "",
};
let ready = false;

bot.start((ctx) => {
    ready = !ready;
    return ctx.reply("Hey, I'm Telfa! Send me your Instagram login and password, " +
        "After all write /done")
});
bot.command("done", async ctx => {

    await ig.initialize();

    await ig.login(user.login, user.password);

    return ctx.reply("Testing connection")

});

bot.command("drop", ctx => {
    user.login = "";
    user.password = "";

    return ctx.reply("Dropped login and password")
});

// bot.help((ctx) => ctx.reply('Send me a sticker'))

bot.on('text', (ctx) => {

    if(ready && user.login === "")
        user.login = ctx.message.text;
    else if(ready && user.password === "")
        user.password = ctx.message.text;

    return ctx.reply('👍')
});


bot.hears('hi', async (ctx) => {
    await ctx.reply('Hey there');

});
bot.launch();