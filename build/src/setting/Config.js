export default class OrasConfig extends Object {
    token;
    prefix;
    nodes;
    spotiId;
    owners;
    spotiSecret;
    spotiNodes;
    webhooks;
    supportId;
    color;
    server;
    botinvite;
    voteUrl;
    voteApi;
    setupBgLink;
    constructor() {
        super();
        this.token =
            "MTIxMTkzNTI1MTc3Mzc4NDA3NQ.GO9tY3.s3OtZ6tkeT-XVzzjajxl7Uf4C_8vN53VqeDpMg";
        this.botid = "1211935251773784075"
        this.prefix = "+";
        this.nodes = [
            {
                name: `Kronix`,
                url: `lava.link:80`,
                auth: `kronix`,
                secure: false,
            },
          {
              name: `Oras`,
              url: `lava.link:80`,
              auth: `kronix`,
              secure: false,
          }, // Dont Change The Name Of Nodes
        ];
        this.voteApi =
            "";
        this.webhooks = {
            guildCreate: "https://discord.com/api/webhooks/1213565890818342942/d72UqsnWZ1p2zpSFu3mnes4VH6Ty7GxUXpKXpDILAw3SEGb40fXECW_X15LmeWYe1ltl",//put webhook
            guildDelete: "https://discord.com/api/webhooks/1213566009110298674/bZKSpfLLyI53KM4K_pCnRMwRaE0uar68ps5_WXAZA6trEE3yC1wfGfm9Gug8HfvoyBcU",//put webhook
            Cmds: "https://discord.com/api/webhooks/1213566168196055060/_c46l_AaivesilWTRAThzEjcJMzwWZMvzQuNxwXgzt3kYk8H5s1H2bKCMrRC5BADShPN",//put webhook
        };
        this.server = "https://discord.gg/codersplanet";
        this.botinvite = ``;//put you bot invite link
        this.spotiId = "a4171cdcbe7d4dc89282879ecdd2bf5f";
        this.spotiSecret = "182c6f593d62415397075bad9c5232ae";
        this.owners = ["1208965142621069432"];//put you discord id
        this.color = "#2b2d31";
        this.supportId = ""; //Server Id
        this.spotiNodes = [
            {
                id: `Kronix`,
                host: `lava.link`,
                port: 80,
                password: `kronix`,
                secure: false,
            },
          {
              id: `Oras`,
              host: `lava.link`,
              port: 80,
              password: `kronix`,
              secure: false,
          }, // Dont Change The Name Of Nodes
        ];
        this.voteUrl = "https://top.gg/bot/1027828697828433980/vote";
        this.setupBgLink =
            "https://media.discordapp.net/attachments/1190943041922535517/1190943144158691369/live_now.png?ex=65a3a33c&is=65912e3c&hm=3f442c1bd2f8b61e3be1f1c625d891df2b90334098765ca174750746912df20d&=&format=webp&quality=lossless&width=1000&height=562";
    }
}
//# sourceMappingURL=Config.js.map
