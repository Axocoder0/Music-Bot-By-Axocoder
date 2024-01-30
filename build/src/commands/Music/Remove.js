import OrasCommand from "../../abstract/OrasCommand.js";
export default class Remove extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "remove";
        this.aliases = ["rem"];
        this.cat = "music";
        this.vc = true;
        this.samevc = true;
        this.desc = "Removes a track from the queue using position";
        this.dispatcher = true;
        this.playing = true;
        this.exec = async (message, args, prefix, dispatcher) => {
            if (!args[0] || isNaN(args[0]))
                return message.reply({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guildId)
                            .setDescription(`${this.client.emoji.cross} Please provide me a valid number! from the queue`),
                    ],
                });
            if (!dispatcher.queue.length)
                return message.reply({
                    embeds: [
                        this.client.utils
                            .errorEmbed()
                            .setDescription(`${this.client.emoji.cross} There is no Queue for the guild!`),
                    ],
                });
            let num = Number(args[0]) - 1;
            dispatcher.queue = dispatcher.queue.filter((x) => x !== dispatcher.queue[num]);
            return message.reply({
                embeds: [
                    this.client.utils
                        .premiumEmbed(message.guildId)
                        .setDescription(`${this.client.emoji.tick} Successfully **Removed** the Track from the queue.`),
                ],
            });
        };
    }
}
//# sourceMappingURL=Remove.js.map