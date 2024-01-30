import OrasCommand from "../../abstract/OrasCommand.js";
export default class Disconnect extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "disconnect";
        this.desc = "Disconnects the bot from a voice channel";
        this.aliases = ["leave"];
        this.cat = "music";
        this.manage = false;
        this.dev = false;
        this.vc = true;
        this.samevc = true;
        this.dispatcher = true;
        this.exec = async (message, args, prefix, dispatcher) => {
            dispatcher.destroy();
            return message.reply({
                embeds: [
                    this.client.utils
                        .premiumEmbed(message.guildId)
                        .setDescription(`${this.client.emoji.tick} Successfully **Destroyed** the Player`)
                ],
            });
        };
    }
}
//# sourceMappingURL=Disconnect.js.map