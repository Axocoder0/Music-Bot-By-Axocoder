import OrasCommand from "../../abstract/OrasCommand.js";
export default class Pause extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "resume";
        this.aliases = [];
        this.desc = "Resumes the track if paused";
        this.cat = "music";
        this.vc = true;
        this.samevc = true;
        this.dev = false;
        this.manage = false;
        this.dispatcher = true;
        this.playing = true;
        this.exec = async (message, args, prefix, dispatcher) => {
            if (!dispatcher.player.paused)
                return message.reply({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guildId)
                            .setDescription(`${this.client.emoji.cross} Player is Already **Resumed** right now!`),
                    ],
                });
            await dispatcher.player.setPaused(false);
            return message.reply({
                embeds: [
                    this.client.utils
                        .premiumEmbed(message.guildId)
                        .setDescription(`${this.client.emoji.tick} Successfully **Resumed** the Player!`)
                ],
            });
        };
    }
}
//# sourceMappingURL=Resume.js.map