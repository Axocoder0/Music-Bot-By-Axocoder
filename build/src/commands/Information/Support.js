import OrasCommand from "../../abstract/OrasCommand.js";
export default class Support extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "support";
        this.aliases = ["supp"];
        this.desc = "Provides you with the server link for the bot's support";
        this.cat = "info";
        this.exec = async (message, args, prefix) => {
            return message.reply({
                content: `Here You Go!`,
                components: [
                    this.client.utils.actionRow([
                        this.client.utils.button(`link`, `Invite Me`, null, null, `${this.client.config.botinvite}`, this.client.emoji.invite),
                        this.client.utils.button(`link`, `Support Server`, null, null, `${this.client.config.server}`, this.client.emoji.support),
                    ]),
                ],
            });
        };
    }
}
//# sourceMappingURL=Support.js.map