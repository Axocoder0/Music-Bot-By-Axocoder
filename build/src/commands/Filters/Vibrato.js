import OrasCommand from "../../abstract/OrasCommand.js";
export default class Vibrato extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "vibrato";
        this.aliases = [];
        this.cat = "filters";
        this.vc = true;
        this.samevc = true;
        this.vote = false;
        this.desc = "Toggles Vibrato filter to the player";
        this.usage = "vibrato";
        this.dispatcher = true;
        this.playing = true;
        this.exec = async (message, args, prefix, dispatcher) => {
            await dispatcher.player.setFilters({
                vibrato: { depth: 1, frequency: 14 },
            });
            return message.reply({
                embeds: [
                    this.client.utils
                        .premiumEmbed(message.guildId)
                        .setDescription(`${this.client.emoji.tick} Successfully **Applied Vibrato** filter to the Player`),
                ],
            });
        };
    }
}
//# sourceMappingURL=Vibrato.js.map