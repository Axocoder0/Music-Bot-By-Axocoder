import OrasCommand from "../../abstract/OrasCommand.js";
export default class OrasLatency extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "ping";
        this.cat = "info";
        this.desc = "Informs you about the bot's latency";
        this.aliases = ["ping", "pong"];
        this.exec = async (message, prefix, args) => {
            return message?.reply({
                embeds: [
                    this.client.utils
                        .premiumEmbed(message.guildId)
                        .setTitle(`Bot Latency`)
                        .setDescription(`\`\`\`Bot Latency is ${Math.round(this.client.ws.ping)} ms\`\`\``),
                ],
            });
        };
    }
}
//# sourceMappingURL=Latency.js.map