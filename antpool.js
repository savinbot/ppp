const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
var randomItem = require('random-item');
const Markup = require('telegraf/markup');
const bot = new Telegraf("769118259:AAHF97a0Ck1r7iPVa6qCda6hyyA4TqaMy64");
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
var randomDecimal = require('random-decimal');
const { enter,leave } = Stage
var btc='d63b2e5d-4e54-5990-943f-ef5788433df1'
var rates = require("bitcoin-exchange-rates");
var cron = require('node-cron');
var mysql = require('mysql');
var WAValidator = require('wallet-address-validator');
var coinbase = require('coinbase');
var Coinbase = require('coinbase');
var Client = require('coinbase').Client;
var mysecret = '8eDpUW9PJ7E16xlns9msu5vUNxth9G0A'
var mykey = 'JaH2VY37PArRPeod'

var client = new Client({'apiKey': mykey, 'apiSecret': mysecret});
var con = mysql.createConnection({
    host: "bjy7dmuln-mysql.services.clever-cloud.com",
    user: "utyc70jnaxrlnjyw",
    password: "hB9MNmpZFAfzgfaIdFh",
    database:"bjy7dmuln"
});
var rn = require('random-number');
var options = {
    min:  0.000001
    , max:  0.0001
}
//server

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//catch error
bot.catch((err) => {
    console.log('Ooops', err)
})



//menu refferal start

bot.use(Telegraf.log());





//start
bot.command('start',ctx => {
    var message = ctx.message;
    var id = ctx.from.id;
    var start = '/start';
    con.query("SELECT id FROM account WHERE id=" + id, function (err, result, fields) {
        console.log(result.length)
        if (message.text == start&&result.length===0) {
            var chatid = ctx.from.id;
            var firstname = ctx.from.first_name;
            var bal = 0;
            var tim = new Date();
            var address = 'none';
            var refa = 411002680;
            var user = {id: chatid, balance: bal, firstname: firstname, time: tim, withdrawadd: address, ref: refa};
            con.query("insert into `account` SET ?", user, function (error, results) {
                ctx.replyWithHTML('welcome ' + ctx.from.first_name + ' to <b>Grand Mining BTC</b>.\n\n<b>✳ Hire miners</b>\n<b>✅ Gain income</b>\n<b>💵 Withdraw BTC</b>️', Markup
                    .keyboard([
                        ['🏠Menu'] // Row1 with 2 buttons
                    ])

                    .resize()
                    .extra())
            })

        } else if (message.text.split(start)[1] == id) {
            ctx.reply('🚫You cannot refer yourself', Markup
                .keyboard([
                    ['🏠Menu'] // Row1 with 2 buttons
                ])

                .resize()
                .extra())
        } else if (message.text.split(start)[1] !== id) {

            var chatd = ctx.from.id
            con.query("SELECT id FROM account WHERE id=" + chatd, function (err, result, fields) {
                console.log(result.length)
                if (result.length === 0) {

                    var chatidi = ctx.from.id;
                    var firstnamee = ctx.from.first_name;
                    var bala = 0;
                    var time = new Date();
                    var addresse = 'none';
                    var refidi = message.text.split(start)[1]
                    var useri = {
                        id: chatidi,
                        balance: bala,
                        firstname: firstnamee,
                        time: time,
                        withdrawadd: addresse,
                        ref: refidi,
                    };
                    con.query("insert into `account` SET ?", useri)

                    var chatd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + chatd, function (err, result, fields) {

                        if (result[0].ref !== refidi) {
                            var refbonus =0.000005;
                            var ref = 1;
                            var refid = message.text.split(start)[1];
                            var sql = "update `account` set `balance` =`balance`+ '" + refbonus + "', friends =`friends`+ " + ref + ", friendsbonus = `friendsbonus`+" + refbonus + " where `id` = '" + refid + "'";



                            con.query(sql)

                            ctx.replyWithHTML('welcome ' + ctx.from.first_name + ' to <b>Grand Mining BTC</b>.\n\n<b>✳ Hire miners</b>\n<b>✅ Gain income</b>\n<b>💵 Withdraw BTC</b>️', Markup
                                .keyboard([
                                    ['🏠Menu'], // Row1 with 2 buttons
                                ])


                                .resize()
                                .extra())
                            con.query("SELECT id FROM account WHERE id=" + refid, function (err, result, fields) {
                                ctx.telegram.sendMessage(result[0].id, 'you have a new refferal,you receive:<b>+0.000005 BTC 💵️</b>',Extra
                                    .HTML()
                                    .markup((m) => m.inlineKeyboard([
                                        m.callbackButton('🔮Account', '🔮Account')

                                    ], {columns: 1})))


                            })
                        }
                    })

                } else if (result.length > 0) {
                    var rd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + rd, function (err, result, fields) {
                        if (result[0].ref == ctx.message.text.split(start)[1]) {
                            ctx.reply('🚫you have already used this link', Markup
                                .keyboard([
                                    ['🏠Menu'] // Row1 with 2 buttons
                                ])

                                .resize()
                                .extra())
                        } else if (result[0].ref !== ctx.message.text.split(start)[1]) {
                            ctx.reply('???', Markup
                                .keyboard([
                                    ['🏠Menu'] // Row1 with 2 buttons
                                ])

                                .resize()
                                .extra())
                        }
                    })
                }
            })
        }
    })
})
//////////menu
bot.hears('🏠Menu',ctx => {
    ctx.replyWithHTML('<b>🏠Menu</b>',Markup
        .keyboard([
            ['🔮Account'],
          ['➕Deposit','🎉Shop','🏦Withdraw'],
            ['👤Refferal','🎁Bonus','☎️Support']
        ])

        .resize()
        .extra())

        .then(()=> {
            ctx.replyWithHTML('🎉BIG BONUS🎉\n\n📌 Available to <b>2018/12/30</b>\n' + '📌 1 year contract on <b>all machines</b>\n' + '📌 Automatic payout in <b>BTC</b>\n\n🏵0.001 - 0.01 ฿ ⏩ ➕ <b>%10 Bonus</b>\n\n🏵0.01 - 0.1 ฿ ⏩ ➕  <b>%15 Bonus</b>\n\n🏵0.1 - 0.2 ฿ ⏩ ➕  <b>%20 Bonus</b>\n\n🏵0.2 - 0.5 ฿ ⏩ ➕  <b>%30 Bonus</b>\n\n🏵0.5 - 1 ฿ ⏩ ➕  <b>%50 Bonus</b>\n\n🏵1 ฿ > ⏩ ➕  <b>%70 Bonus</b>')
                .then(() => {
                    ctx.replyWithHTML('<b>🔻Recent transactions 👇🏻</b>', Extra
                        .HTML()
                        .markup((m) => m.inlineKeyboard([
                            m.urlButton('🔻Recent transactions', 'https://t.me/GrandMiningBtcTransactions')

                        ], {columns: 1})))
                })
        })
})
//////account
bot.hears('🔮Account',ctx => {
    var id=ctx.from.id
    var sql = "SELECT balance,withdrawadd from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        var btcAmount, currency, rates;

        rates = require('bitcoin-exchange-rates');

        btcAmount = results[0].balance;

        currency = 'USD';

        rates.fromBTC(btcAmount, currency, function (err, rate) {
            client.getSpotPrice({'currencyPair': 'BTC-USD'}, function (err, price) {
                ctx.replyWithHTML('<b>🔮Account</b>\n\n🔹 Total BTC:️<b>' + results[0].balance + '</b>\n\n🔹 Total usd:<b>' + rate + '</b>' + '\n\n🔹 <b>1 BTC</b>=<i>' + price.data.amount + '</i>')
                    .then(() => {
                        ctx.replyWithHTML('<i>➕  Add Btc to earn faster or \n      👬 invite your friends</i>', Markup
                            .keyboard([
                                ['🖥My Machines', '🎊stats'],
                                ['➕Deposit'],
                                ['🏠Menu']
                            ])

                            .resize()
                            .extra())
                            .then(() => {
                                ctx.replyWithHTML('<b>your withdraw wallet:</b> <i>' + results[0].withdrawadd+'</i>', Extra
                                    .HTML()
                                    .markup((m) => m.inlineKeyboard([
                                        m.callbackButton('🖋Set withdraw wallet', '🖋Set withdraw wallet')

                                    ], {columns: 1})))


                            })
                    })
            })
        })
    })
    ////////////transactions
    var user = ctx.from.id
    var sqli = "SELECT depoaddre,txid,ref,id from `account` where `id` = '" + user + "'";
    con.query(sqli, function (error, res, fields) {
        if (res[0].depoaddre.length > 1) {
            client.getAccount(btc, function (err, account) {
                account.getAddress(res[0].depoaddre, function (err, address) {
                    address.getTransactions({}, function (err, txs) {
                        if (txs.length === 0) {
                            console.log('no transactions today')
                        } else if (txs[0].id == res[0].txid) {
                            console.log('transaction already confirmed')
                        } else if (txs[0].id !== res[0].txid) {
                            var txid = txs[0].id
                            var balance = txs[0].amount.amount
                            var transactions = txs[0].amount.amount
                            var chatid = ctx.from.id
                            var sqli = "update `account` set `txid` = '" + txid + "', balance = `balance`+" + balance + ", transactions = `transactions`+" + transactions + " where `id` = '" + chatid + "'";
                            con.query(sqli, function (err, response) {
                                console.log(err)
                                var trans='https://live.blockcypher.com/btc/address/'+res[0].depoaddre
                                var ref = res[0].ref
                                var refbonus = balance * 0.30
                                var sqla = "update `account` set `balance` = `balance`+" + refbonus + " where `id` = '" + ref + "'";
                                con.query(sqla)
                                ctx.telegram.sendMessage(res[0].id, 'we have received your deposit of ' + balance + '  BTC️ ')
                                ctx.telegram.sendMessage(ref, 'you refferal just deposited. ' + refbonus.toFixed(8) + 'BTC has been added to your  balance ')
                                ctx.telegram.sendMessage('@GrandMiningBtcTransactions', '<b>💰 Deposit</b>  \n<b>🔹 Investor:</b> ' + ctx.from.first_name + '\n<b>💵Amount:</b>'+balance+'\n<a href="'+trans+'">view transaction</a>',Extra
                                    .HTML())
                            })
                        }
                    })
                })
            })
        }
    })



})
////action account
bot.action('🔮Account',ctx => {
    var id = ctx.from.id
    var sql = "SELECT balance,withdrawadd from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        var btcAmount, currency, rates;

        rates = require('bitcoin-exchange-rates');

        btcAmount = results[0].balance;

        currency = 'USD';

        rates.fromBTC(btcAmount, currency, function (err, rate) {
            client.getSpotPrice({'currencyPair': 'BTC-USD'}, function (err, price) {
                ctx.replyWithHTML('<b>🔮Account</b>\n\n🔹 Total BTC:️<b>' + results[0].balance + '</b>\n\n🔹 Total usd:<b>' + rate + '</b>' + '\n\n🔹 <b>1 BTC</b>=<i>' + price.data.amount + '</i>')
                    .then(() => {
                        ctx.replyWithHTML('<i>➕  Add Btc to earn faster or \n      👬 invite your friends</i>', Markup
                            .keyboard([
                                ['🖥My Machines', '🎊stats'],
                                ['➕Deposit'],
                                ['🏠Menu']
                            ])

                            .resize()
                            .extra())
                            .then(() => {
                                ctx.replyWithHTML('<b>your withdraw wallet:</b> ' + results[0].withdrawadd, Extra
                                    .HTML()
                                    .markup((m) => m.inlineKeyboard([
                                        m.callbackButton('🖋Set withdraw wallet', '🖋Set withdraw wallet')

                                    ], {columns: 1})))


                            })
                    })
            })
        })
    })


})




//////deposit
bot.hears('➕Deposit',ctx => {
    ctx.replyWithHTML('<b>💰Add funds to buy miners</b>\n\n<i>🔵your billing address will be generated,which you can use to deposit funds to your account to buy miners</i>\n\n<i>🔵After you make a deposit, the BTC will be automatically deposited to your account after a few minutes.</i>\n\n🔵Minimum deposit:<b>0.001 BTC</b>',Extra
        .HTML()
        .markup((m) => m.inlineKeyboard([
            m.callbackButton('👇🏻Get deposit address', '👇🏻Get deposit address')

        ], {columns: 1})))



})
////wallet adress
bot.action('👇🏻Get deposit address',ctx=>{
    var user=ctx.from.id
    var sql = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].depoaddre.length <= 0) {
            client.getAccount(btc, function (err, account) {
                account.createAddress(null, function (err, address) {
                    var adress = address.address
                    var ide =ctx.from.id
                    ctx.replyWithHTML('<code>' + adress + '</code>',Markup
                        .keyboard([
                            ['🎉Shop'],
                            ['🏠Menu']
                        ])

                        .resize()
                        .extra())
                    var sqli = "update `account` set `depoaddre` = '" + adress + "' where `id` = '" + ide + "'";
                    con.query(sqli, function (err, results) {
                        console.log(err)
                        ctx.replyWithHTML('<code>⏳ Awaiting Payment...</code>')
                    })
                });
            });

        } else {
            var user = ctx.from.id
            var sqla = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
            con.query(sqla, function (error, results, fields) {
                ctx.replyWithHTML('<code>' + results[0].depoaddre + '</code>',Markup
                    .keyboard([
                        ['🎉Shop'],
                        ['🏠Menu']
                    ])

                    .resize()
                    .extra())

                    .then(() => {
                        ctx.replyWithHTML('<code>⏳ Awaiting Payment...</code>')

                    })
            })
        }
    })





})
/////////refferal
bot.hears('👤Refferal',ctx => {
    var id=ctx.from.id
    var sql = "SELECT friends,friendsbonus from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
    ctx.replyWithHTML('<b>👤Refferal</b>',Markup
        .keyboard([
            ['🏠Menu']
        ])
        .resize()
        .extra())
        .then(()=> {
            ctx.replyWithHTML('invite your friends and receive  BTC as a bonus and 30% from every deposit of your friend. You income is unlimited\n\n♦you get <b>0.000005 BTC</b> per refferal️\n♦ <b>Fake, empty or spam  </b>️users are deleted after checking.\n\n👥 Refferals: <b>' + results[0].friends + '</b>\n💵Your income: <b>' + results[0].friendsbonus + '</b>', Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                    m.callbackButton('⚡️Refferal link', '⚡️Refferal link')

                ], {columns: 1})))

        })

        })



})

//REFLINK
bot.action('⚡️Refferal link',ctx => {
    ctx.reply('http://t.me/GrandMiningBtc_bot?start='+ctx.from.id)


})

///////////miners
bot.hears('🎉Shop',ctx => {
    ctx.replyWithHTML('<b>🖥Buy miners to mine BTC for you</b>', Markup
        .keyboard([
            ['➕Deposit'],
            ['🏠Menu']
        ])

        .resize()
        .extra())
        .then(() => {
            ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fpasted%20image%200%20(2).png?1545075779875'})
                .then(() => {
                    ctx.replyWithHTML('<b>Antiminer s7</b>\n\n<i>price:0.0001 ฿</i>\n<i>income: 0.00000008 ฿ per hour</i>', Extra
                        .HTML()
                        .markup((m) => m.inlineKeyboard([
                            m.callbackButton('➕Buy Antiminer s7', '➕Buy Antiminer s7')

                        ], {columns: 2})))
                }).then(() => {
                //bookshop
                ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fpasted%20image%200%20(5).png?1545076953746'})
                    .then(() => {
                        ctx.replyWithHTML('<b>Avalon6</b>\n\n<i>price:  0.001 ฿ </i>\n<i>income:   0.00000093 ฿per hour</i>', Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.callbackButton('➕Buy Avalon6', '➕Buy Avalon6')

                            ], {columns: 2})))


                    }).then(() => {
                    //bakery
                    ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fpasted%20image%200%20(4).png?1545075851633'})
                        .then(() => {
                            ctx.replyWithHTML('<b>Antminer R4</b>\n\n<i>price: 0.005 ฿ </i>\n<i>income:  0.00000521 ฿ per hour</i>', Extra
                                .HTML()
                                .markup((m) => m.inlineKeyboard([
                                    m.callbackButton('➕Buy Antminer R4', '➕Buy Antminer R4')

                                ], {columns: 2})))


                        }).then(() => {
                        //butcher
                        ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fpasted%20image%200%20(3).png?1545075764270'})
                            .then(() => {
                                ctx.replyWithHTML('<b>Whatsminer M3X</b>\n\n<i>price: 0.01 ฿  </i>\n<i>income:  0.00001125 ฿ per hour</i>', Extra
                                    .HTML()
                                    .markup((m) => m.inlineKeyboard([
                                        m.callbackButton('➕Buy Whatsminer M3X', '➕Buy Whatsminer M3X')

                                    ], {columns: 2})))


                            }).then(() => {
                            //supermarket
                            ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fpasted%20image%200%20(2).png?1545075779875'})
                                .then(() => {
                                    ctx.replyWithHTML('<b>Antiminer T9</b>\n\n<i>price: 0.05 ฿ </i>\n<i>income:  0.000067 ฿ per hour</i>', Extra
                                        .HTML()
                                        .markup((m) => m.inlineKeyboard([
                                            m.callbackButton('➕Buy Antiminer T9', '➕Buy Antiminer T9')

                                        ], {columns: 2})))


                                }).then(() => {
                                //jewellary
                                ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fpasted%20image%200%20(1).png?1545077135576'})
                                    .then(() => {
                                        ctx.replyWithHTML('<b>DragonMint T1</b>\n\n<i>price: 0.1 ฿ </i>\n<i>income:  0.000158 ฿ per hour</i>', Extra
                                            .HTML()
                                            .markup((m) => m.inlineKeyboard([
                                                m.callbackButton('➕Buy DragonMint T1', '➕Buy DragonMint T1')

                                            ], {columns: 2})))


                                    }).then(() => {
                                    //jewellar
                                    ctx.replyWithPhoto({url: 'https://cdn.glitch.com/a8ee10b2-ecac-4079-8fec-9df07981d2b2%2Fdownload%20(2).jpg?1545118600637'})
                                        .then(()=>{
                                            ctx.replyWithHTML('<b>Antminer S9i</b>\n\n<i>price: 0.25 ฿ </i>\n<i>income:  0.0005 ฿ per hour</i>', Extra
                                                .HTML()
                                                .markup((m) => m.inlineKeyboard([
                                                    m.callbackButton('➕Buy Antminer S9i', '➕Buy Antminer S9i')

                                                ], {columns: 2})))
                                        })
                                })
                            })
                        })
                    })
                })
            })
        })
})

/////////////////miners
//ant1
bot.action('➕Buy Antiminer s7',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.0001){
            var amount=0.0001 ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant1` = `ant1`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>Antiminer s7</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
///ant2
bot.action('➕Buy Avalon6',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.001){
            var amount=0.001 ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant2` = `ant2`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>Avalon6</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
///////ant3
bot.action('➕Buy Antminer R4',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.005 ){
            var amount=0.005  ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant3` = `ant3`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>Antminer R4</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})

////ant4
bot.action('➕Buy Whatsminer M3X',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.01 ){
            var amount=0.01  ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant4` = `ant4`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>Whatsminer M3X</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
////ant5
bot.action('➕Buy Antiminer T9',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.05 ){
            var amount=0.05  ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant5` = `ant5`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>Antiminer T9</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
/////ant6
bot.action('➕Buy DragonMint T1',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.1 ){
            var amount=0.1  ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant6` = `ant6`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>DragonMint T1</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})
///////////////////ant7
bot.action('➕Buy Antminer S9i',ctx =>{
    var user=ctx.from.id
    var sql = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].balance>=0.25 ){
            var amount=0.25  ;
            var chick=1;
            var sqli = "update `account` set `balance` = `balance`-" + amount + ", `ant7` = `ant7`+'" + chick + "' where `id` = '" + user + "'";
            con.query(sqli,function (err,result) {
                ctx.replyWithHTML('<b>💫Success</b>\n\n<b>Antminer S9i</b> has been purchased,the miner will produce income after an hour .You can buy as many different or identical miners as you like!')

            })


        }else {
            ctx.answerCbQuery(`you dont have enough funds to ${ctx.match}`)
        }
    })



})


////bonus
bot.hears('🎁Bonus',ctx => {
    var id=ctx.from.id
    var bonus= randomDecimal({min: 0.000001, max: 0.00005, fixed: 8});
    var dat=new Date().getDate()
    var sql = "SELECT bonus from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].bonus==dat) {
            ctx.reply('⛔️ You already collected your daily bonus.\nNext bonus will be available in 24hours',Markup
                .keyboard([
                    ['➕Deposit'],
                    ['🏠Menu']
                ])

                .resize()
                .extra())
        }else {
            var sqli = "update `account` set `balance` = `balance`+'" + bonus + "', bonus = " + dat + " where `id` = '" + id + "'";
            con.query(sqli)
            ctx.replyWithHTML('Your account has been credited with:\n\n<b>Daily bonus: +</b>'+bonus+'BTC\n<i>next bonus will be available after 24hrs</i>')
        }
    })


})

////
bot.hears('🎊stats',ctx => {
    con.query('SELECT `id` FROM `account`', function (error, result) {
        con.query('SELECT SUM(transactions)FROM account;', function (err, response) {
            const re = JSON.parse(JSON.stringify(response[0]).replace('SUM(transactions)', 'suma'))
            con.query('SELECT `started` FROM `account` WHERE `id`=411002680', function (err, respa) {
                ctx.replyWithHTML('<b>📈Stastistics</b>\n\n📈Days online: ' + respa[0].started + '\n👨🏻‍️Members: ' + result.length + '\n💰Total transacted: ' + re.suma + ' BTC',Markup
                    .keyboard([
                        ['🏠Menu'] // Row1 with 2 buttons
                    ])

                    .resize()
                    .extra())
                    .then(()=>{
                        ctx.replyWithHTML('<b>🔻Recent transactions 👇🏻</b>',Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.urlButton('🔻Recent transactions', 'https://t.me/GrandMiningBtcTransactions')

                            ], { columns: 1 })))
                    })
            })
        })
    })
})
//////////////////////////my machines
bot.hears('🖥My Machines',ctx => {
    var user=ctx.from.id
    var sql = "SELECT ant1,ant2,ant3,ant4,ant5,ant6,ant7 from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        ctx.replyWithHTML('<b>🖥My Machines</b>\n\n<b>🖥Antiminer s7:</b>' + results[0].ant1 + '\n\n<b>🖥Avalon6:</b>' + results[0].ant2 + '\n\n<b>🖥Antminer R4:</b>' + results[0].ant3 + '\n\n<b>🖥Whatsminer M3X:</b>' + results[0].ant4 + '\n\n<b>🖥Antiminer T9:</b>' + results[0].ant5 + '\n\n<b>🖥DragonMint T1:</b>' + results[0].ant6 + '\n\n<b>🖥Antminer S9i:</b>' + results[0].ant7, Markup
            .keyboard([
                ['🎉Shop'],
                ['🏠Menu']
            ])

            .resize()
            .extra())


    })

})
///withdraw
bot.hears('🏦Withdraw',ctx => {
    ctx.replyWithHTML('<b>🏦Withdraw</b>',Markup
        .keyboard([
            ['💵Order payment','📃Payment history'],
            ['🏠Menu']
        ])

        .resize()
        .extra())






})
///payment history
bot.hears('📃Payment history',ctx => {
    var user=ctx.from.id
    var sql = "SELECT amount,time from `payouts` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results.length === 0) {
            ctx.replyWithHTML('😔<i>no payment history found under your account</i>')


        } else {
            results.forEach(function (res) {
                ctx.replyWithHTML('<b>💵amount withdrawn:</b>'+res.amount+' BTC\n<b>date withdrawn:</b>'+res.time)

            })


        }


    })
})



////set address
const greeterScene = new Scene('greeter')
greeterScene.enter((ctx) => ctx.reply('send your BTC wallet address to be used for withdrwals below to update it',Markup
    .keyboard([
        ['🛑cancel'] // Row1 with 2 buttons
    ])

    .resize()
    .extra())



)
greeterScene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🔮Account'],
            ['➕Deposit','🎉Shop','🏦Withdraw'],
            ['👤Refferal','🎁Bonus','☎️Support']
        ])

        .resize()
        .extra())
    ctx.scene.leave()



})
greeterScene.on('message', (ctx) => {
    var valid = WAValidator.validate(ctx.message.text, 'BTC');
    if (valid) {
        var ide = ctx.from.id
        var sqli = "update `account` set `withdrawadd` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli)
        ctx.replyWithHTML('<b>withdraw address updated</b>', Markup
            .keyboard([
                ['🔮Account'],
                ['➕Deposit','🎉Shop','🏦Withdraw'],
                ['👤Refferal','🎁Bonus','☎️Support']
            ])

            .resize()
            .extra())
        ctx.scene.leave()

    } else {
        ctx.reply('invalid BTC address', Markup
            .keyboard([
                ['🛑cancel']
            ])

            .resize()
            .extra())

    }
})
///withdraw scene
const withdrawscene = new Scene('withdraw')
withdrawscene.enter((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT withdrawadd,balance from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        if (results[0].withdrawadd == "none") {
            ctx.replyWithHTML('<b>withdraw address not set</b>')
            ctx.scene.leave()
        } else {

            rates = require('bitcoin-exchange-rates');

            btcAmount = results[0].balance;

            currency = 'USD';
            rates.fromBTC(btcAmount, currency, function (err, rate) {
                ctx.replyWithHTML('<b>🏵Withdraw funds</b>\n\n ▪️Min withdraw:<b>0.0005 BTC</b>\n▪️Your BTC:<b>'+results[0].balance+ '</b> <i>('+rate+' usd)</i>'+'\nWithdraw wallet:<b>'+results[0].withdrawadd+'</b>')
                    .then(() => {
                        ctx.replyWithHTML('<i>Enter the number of BTC you would like to withdraw to your BitCoin Wallet (a minimum of 0.0005 BTC)</i>', Markup
                            .keyboard([
                                ['🛑cancel'], // Row1 with 2 buttons
                            ])

                            .resize()
                            .extra())

                    })
            })
        }
    })
})
withdrawscene.leave((ctx) =>  ctx.reply('Main menu', Markup
    .keyboard([
        ['🔮Account'],
        ['➕Deposit','🎉Shop','🏦Withdraw'],
        ['👤Refferal','🎁Bonus','☎️Support']
    ])

    .resize()
    .extra())
)
withdrawscene.hears('🛑cancel',(ctx => ctx.scene.leave()))
withdrawscene.on('message',ctx => {
    var id = ctx.from.id
    var sql = "SELECT balance from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        if (isNaN(ctx.message.text)) {
            ctx.reply('please enter a valid amount')

        } else if (ctx.message.text < 0.0005) {
            ctx.replyWithHTML('The minimum required for withdraw is <b>0.0005 BTC</b>')
            ctx.scene.leave()
        } else if (ctx.message.text > results[0].balance) {
            ctx.reply('your balance is not enough for the requsted withdrawal')
            ctx.scene.leave()
        } else {
            var id = ctx.from.id
            var sql = "SELECT balance,withdrawadd from `account` where `id` = '" + id + "'";
            con.query(sql, function (error, results, fields) {
                var payout =ctx.message.text
                var addre = results[0].withdrawadd
                client.getAccount(btc, function (err, account) {
                    account.sendMoney({
                        'to': addre,
                        'amount': payout,
                        'currency': 'BTC'
                    }, function (err, tx) {
                        var trans='https://live.blockcypher.com/btc/address/'+results[0].withdrawadd
                        ctx.telegram.sendMessage('@GrandMiningBtcTransactions', '<b>💰 Withdraw</b>  \n<b>🔹 Investor:</b> ' + ctx.from.first_name + '<b>💵Amount:</b>'+payout+'\n<a href="'+trans+'">view transaction</a>',Extra
                            .HTML())
                        var user = ctx.from.id
                        var amount = ctx.message.text
                        var sqla = "update `account` set `balance` =`balance`- '" + amount  + "', transactions =`transactions`+ " + payout + " where `id` = '" + user + "'";
                        con.query(sqla)
                        ctx.replyWithHTML('Your withdrawal of ' + payout + ' BTC is being processed', Markup
                            .keyboard([
                                ['🔮Account'],
                                ['➕Deposit','🎉Shop','🏦Withdraw'],
                                ['👤Refferal','🎁Bonus','☎️Support']
                            ])

                            .resize()
                            .extra())

                        /////payouts
                        var useri = {
                            id:ctx.from.id,
                           amount:payout,
                            time:new Date()
                        };
                        con.query("insert into `payouts` SET ?", useri)




                        ctx.scene.leave()
                    });
                });


            })
        }
    })
})
////ticket
bot.hears('☎️Support',ctx => {
    ctx.replyWithHTML('<b>☎️Suppoort</b>\n' + 'If you have a question or a problem with deposit or withdraw system, you can create a ticket\n' + '\n' + 'If your problem is about withdrawal and the bot has given you a transaction hash ID, your payment is already on its way and out of our control\n' + '\n' + ' If it is about deposit, please wait at least 24 hours to recieve confirmations on the blockchain before writing a ticket',Markup
        .keyboard([
            ['✏️Ticket'],
            ['🏠Menu']
        ])

        .resize()
        .extra())






})
//////////ticket scene
const ticketScene = new Scene('ticket')
ticketScene.enter((ctx) => ctx.replyWithHTML('<b>Ticket System</b>',Markup
    .keyboard([
        ['🛑cancel'] // Row1 with 2 buttons
    ])

    .resize()
    .extra())
    .then(()=>{
        ctx.replyWithHTML('When you have any problems, send us a question. Our staff will check and answer all the questions you have.\n\n🔻 Enter your question:')



    })


)
ticketScene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🔮Account'],
            ['➕Deposit','🎉Shop','🏦Withdraw'],
            ['👤Refferal','🎁Bonus','☎️Support']
        ])

        .resize()
        .extra())
    ctx.scene.leave()



})
ticketScene.on('message',ctx => {
    ctx.telegram.sendMessage(411002680,'<b>🔉new ticket </b>from '+ctx.from.first_name+'\n<b>id:</b><code>'+ctx.from.id+'</code>\n\n\n'+ctx.message.text,Extra
        .HTML()
        .markup((m) => m.inlineKeyboard([
            m.callbackButton('🔔Reply', '🔔Reply')

        ], {columns: 3})))
        .then(()=> {
            ctx.replyWithHTML('✅ Your question has been moved to the support center and will be answered before 24 hours.', Markup
                .keyboard([
                    ['🔮Account'],
                    ['➕Deposit', '🎉Shop', '🏦Withdraw'],
                    ['👤Refferal', '🎁Bonus', '☎️Support']
                ])

                .resize()
                .extra())
            ctx.scene.leave()
        })
})

///reply scene
const ticketreplyScene = new Scene('ticketreply')
ticketreplyScene.enter((ctx) => ctx.replyWithHTML('<b>Ticket Reply</b>',Markup
    .keyboard([
        ['🛑cancel'] // Row1 with 2 buttons
    ])

    .resize()
    .extra())
    .then(()=>{
        ctx.replyWithHTML('enter the id provided by the ticket below to reply to the ticket')

    })


)
ticketreplyScene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🔮Account'],
            ['➕Deposit','🎉Shop','🏦Withdraw'],
            ['👤Refferal','🎁Bonus','☎️Support']
        ])

        .resize()
        .extra())
    ctx.scene.leave()



})
ticketreplyScene.on('message',ctx=>{
    var ide = 411002680;
    var sqli = "update `account` set `ticket` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
    con.query(sqli)
        ctx.replyWithHTML('done')
        .then(()=> {
            ctx.scene.enter('reply')
        })





})


///reply
const replyScene = new Scene('reply')
replyScene.enter((ctx) => ctx.replyWithHTML('<b>Ticket Reply</b>',Markup
    .keyboard([
        ['🛑cancel'] // Row1 with 2 buttons
    ])

    .resize()
    .extra())
    .then(()=>{
        ctx.replyWithHTML('enter the reply message below')

        })


)
replyScene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🔮Account'],
            ['➕Deposit','🎉Shop','🏦Withdraw'],
            ['👤Refferal','🎁Bonus','☎️Support']
        ])

        .resize()
        .extra())
    ctx.scene.leave()



})

replyScene.on('message',ctx => {
    var ide=411002680;
    var sqla = "SELECT `ticket` from `account` where `id` = '" + ide + "'";
    con.query(sqla,function (err,res) {
        ctx.reply('✅Ticket sent', Markup
            .keyboard([
                ['🔮Account'],
                ['➕Deposit', '🎉Shop', '🏦Withdraw'],
                ['👤Refferal', '🎁Bonus', '☎️Support']
            ])

            .resize()
            .extra())
        ctx.telegram.sendMessage(res[0].ticket, '✅ You have new message from Support Team\n\n' + ctx.message.text)
        ctx.scene.leave()

    })

})








//scenes
const stage = new Stage([greeterScene,withdrawscene,ticketScene,ticketreplyScene,replyScene], { ttl: 18000000 })
bot.use(session())
bot.use(stage.middleware())
bot.action('🖋Set withdraw wallet', enter('greeter'))
bot.hears('💵Order payment',enter('withdraw'))
bot.hears('✏️Ticket',enter('ticket'))
bot.action('🔔Reply', enter('ticketreply'))






///CRON
cron.schedule('*/1 * * * * *', () => {
    var id=411002680;
    var idle=1;
    con.query("update `account` set `idle` = '" + idle + "' where `id` = '" + id + "'")

})
//days on
cron.schedule('0 0 0 * * *', () => {
    con.query('update account set `started`=`started`+1 WHERE `id`=411002680')

})


////production
//ant 1
cron.schedule('*/59 * * * *', () => {
    var production=0.00000008;
    var bal=1;
    con.query("update `account` set `balance` =`balance`+`ant1`* '" + production + "' where `ant1` >= '" + bal + "'")

})
    //ant2
cron.schedule('*/59 * * * *', () => {
    var production=0.00000093;
    var bal=1;
    con.query("update `account` set `balance` =`balance`+`ant2`* '" + production + "' where `ant2` >= '" + bal + "'")

})
//ant 3
cron.schedule('*/59 * * * *', () => {
    var production=0.00000521;
    var bal=1;
    con.query("update `account` set `balance` =`balance`+`ant3`* '" + production + "' where `ant3` >= '" + bal + "'")

})

///ant4
cron.schedule('*/59 * * * *', () => {
    var production=0.00001125;
    var bal=1;
    con.query("update `account` set `balance` =`balance`+`ant4`* '" + production + "' where `ant4` >= '" + bal + "'")

})
//ant5
cron.schedule('*/59 * * * *', () => {
    var production=0.000067;
    var bal=1;
    con.query("update `account` set `balance` =`balance`+`ant5`* '" + production + "' where `ant5` >= '" + bal + "'")

})
//////ant6
cron.schedule('*/59 * * * *', () => {
    var production=0.000158;
    var bal=1;
    con.query("update `account` set `balance` =`balance`+`ant6`* '" + production + "' where `ant6` >= '" + bal + "'")

})
////ant7
cron.schedule('*/59 * * * *', () => {
    var production=0.0005;
    var bal=1;
    con.query("update `account` set `balance` =`balance`+`ant7`* '" + production + "' where `ant7` >= '" + bal + "'")

})













bot.startPolling()