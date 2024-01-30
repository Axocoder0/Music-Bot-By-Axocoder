import OrasCommand from "../../abstract/OrasCommand.js";
export default class Shuffle extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "shuffle";
        this.aliases = [];
        this.cat = "music";
        this.vc = true;
        this.desc = "Shuffles the queue of the player";
        this.samevc = true;
        this.dispatcher = true;
        this.playing = true;
        this.exec = async (message, args, prefix, dispatcher) => {
            if (!dispatcher.queue.length)
                return message.reply({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guild.id)
                            .setDescription(`${this.client.emoji.cross} The Queue length is not sufficient to be shuffled`),
                    ],
                });
            dispatcher.queue = dispatcher.queue.sort(() => Math.random() - 0.5);
            return message.reply({
                embeds: [
                    this.client.utils
                        .premiumEmbed(message.guildId)
                        .setDescription(`${this.client.emoji.tick} Successfully **Suffled** The Queue!`)
                ],
            });
        };
    }
}
//# sourceMappingURL=Shuffle.js.map