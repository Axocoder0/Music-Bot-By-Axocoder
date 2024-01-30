import OrasCommand from "../../abstract/OrasCommand.js";
export default class Earrape extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "earrape";
        this.aliases = [];
        this.cat = "filters";
        this.manage = false;
        this.vote = false;
        this.desc = "Toggles earrape filter to the player";
        this.usage = "earrape";
        this.vc = true;
        this.samevc = true;
        this.dispatcher = true;
        this.playing = true;
        this.exec = async (message, args, prefix, dispatcher) => {
            await dispatcher.player.setFilters({
                equalizer: [
                    ...Array(6)
                        .fill(0)
                        .map((n, i) => ({ band: i, gain: 0.5 })),
                ],
                volume: 5.0,
            });
            return message.reply({
                embeds: [
                    this.client.utils
                        .premiumEmbed(message.guildId)
                        .setDescription(`${this.client.emoji.tick} Successfully **Applied Earrape** filter to the player`),
                ],
            });
        };
    }
}
//# sourceMappingURL=Earrrape.js.map