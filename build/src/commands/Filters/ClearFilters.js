import OrasCommand from "../../abstract/OrasCommand.js";
export default class ClearFilters extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "clearfilters";
        this.aliases = [
            "clearfilter",
            "clear-filter",
            "resetfilters",
            "resetfilter",
            "reset-filter",
            "cf",
        ];
        this.cat = "filters";
        this.manage = false;
        this.desc = "Clears all of the filters from the player";
        this.usage = "clearfilter";
        this.vote = false;
        this.vc = true;
        this.samevc = true;
        this.dispatcher = true;
        this.playing = true;
        this.exec = async (message, args, prefix, dispatcher) => {
            await dispatcher.player.clearFilters();
            return message.reply({
                embeds: [
                    this.client.utils
                        .premiumEmbed(message.guildId)
                        .setDescription(`${this.client.emoji.tick} Successfully **Cleared** filters from the player`),
                ],
            });
        };
    }
}
//# sourceMappingURL=ClearFilters.js.map