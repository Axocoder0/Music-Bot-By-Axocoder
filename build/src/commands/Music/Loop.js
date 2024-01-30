import OrasCommand from "../../abstract/OrasCommand.js";
export default class Loop extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "loop";
        this.aliases = [];
        this.desc = "Sets the loop mode of the player";
        this.usage = "loop <off/track/queue>";
        this.cat = "music";
        this.dev = false;
        this.vc = true;
        this.samevc = true;
        this.dispatcher = true;
        this.playing = true;
        this.vote = false;
        this.exec = async (message, args, prefix, dispatcher) => {
            if (!args[0])
                return message.reply({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guild.id)
                            .setTitle(`Loop Subcommands`)
                            .setDescription(`\`${prefix}loop off\`\nDisabled the loop mode for the player\n\n\`${prefix}loop track\`\nSets Loop mode for the player to Track\n\n\`${prefix}loop queue\`\nSets Loop mode for the player to Queue`)
                            .setTimestamp(),
                    ],
                });
            if (args[0].toLowerCase() === `off` ||
                args[0].toLowerCase() === `disable`) {
                dispatcher.repeat = "off";
                return message.reply({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guildId)
                            .setDescription(`${this.client.emoji.tick} Successfully **Updated** Loop mode of the player to **Off**`)
                    ],
                });
            }
            if (args[0].toLowerCase() === `track` ||
                args[0].toLowerCase() === `song` ||
                args[0].toLowerCase() === `current`) {
                dispatcher.repeat = "one";
                return message.reply({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guildId)
                            .setDescription(`${this.client.emoji.tick} Successfully **Updated** Loop mode of the player to **Track**`)
                    ],
                });
            }
            if (args[0].toLowerCase() === `all` ||
                args[0].toLowerCase() === `queue`) {
                dispatcher.repeat = "all";
                return message.reply({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guildId)
                            .setDescription(`${this.client.emoji.tick} Successfully **Updated** Loop mode of the player to **Queue**`)
                    ],
                });
            }
            else {
                return message.reply({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guild.id)
                            .setTitle(`Loop Subcommands`)
                            .setDescription(`\`${prefix}loop off\`\nDisabled the loop mode for the player\n\n\`${prefix}loop track\`\nSets Loop mode for the player to Track\n\n\`${prefix}loop queue\`\nSets Loop mode for the player to Queue`)
                            .setTimestamp(),
                    ],
                });
            }
        };
    }
}
//# sourceMappingURL=Loop.js.map