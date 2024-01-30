import OrasCommand from "../../abstract/OrasCommand.js";
export default class Tremolo extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "tremolo";
        this.aliases = [];
        this.cat = "filters";
        this.manage = false;
        this.vc = false;
        this.desc = "Togglss tremolo filter to the player";
        this.usage = "tremolo";
        this.samevc = false;
        this.vote = false;
        this.dispatcher = true;
        this.playing = true;
        this.exec = async (message, args, prefix, dispatcher) => {
            await dispatcher.player.setFilters({
                tremolo: { frequency: 2.0, depth: 0.5 },
            });
            return message.reply({
                embeds: [
                    this.client.utils
                        .premiumEmbed(message.guildId)
                        .setDescription(`${this.client.emoji.tick} Successfully **Applied Tremolo** filter to the Player`),
                ],
            });
        };
    }
}
//# sourceMappingURL=Tremolo.js.map