import OrasCommand from "../../abstract/OrasCommand.js";
import { cpu } from "systeminformation";
import { cpus, totalmem } from "node:os";
export default class Stats extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "stats";
        this.aliases = ["st", "stat", "botinfo", "bi"];
        this.desc = "Informs you about the current statitics of the bot";
        this.usage = "stats";
        this.cat = "info";
        this.exec = async (message, args, prefix) => {
            let em = this.client.utils
                .premiumEmbed(message.guildId)
                .setTitle(`${this.client.user.username} Stats`)
                .addFields([
                {
                    name: `__${this.client.user} Information__`,
                    value: `Bot's Mention: ${this.client.user}\nBot's Tag: ${this.client.user.tag}\nBot's Version: 2.1.0\nTotal Servers: ${await this.client.cluster
                        .broadcastEval((x) => x.guilds.cache.size)
                        .then((result) => result.reduce((a, b) => a + b, 0))}\nTotal Users: ${await this.client.cluster
                        .broadcastEval((c) => c.guilds.cache
                        .filter((x) => x.available)
                        .reduce((a, g) => a + g.memberCount, 0))
                        .then((r) => r.reduce((acc, memberCount) => acc + memberCount, 0))}\nTotal Channels: ${await this.client.cluster
                        .broadcastEval((x) => x.channels.cache.size)
                        .then((r) => r.reduce((a, b) => a + b, 0))}\nLast Rebooted: <t:${Math.round(this.client.readyTimestamp / 1000)}:R>`,
                },
            ])
                .setThumbnail(this.client.user.displayAvatarURL());
            let cpuUsage;
            let cpuFree;
            const lol = Object.values(cpus()[0].times).reduce((a, b) => a + b, 0) *
                100;
            const lol2 = (process.cpuUsage().user + process.cpuUsage().system) * 1000;
            cpuUsage = (lol2 / lol).toFixed(2);
            cpuFree = (100 - cpuUsage).toFixed(2);
            let b1 = this.client.utils.button(`custom_id`, `Team Info`, 2, `team`);
            let b2 = this.client.utils.button(`custom_id`, `General Info`, 2, `gen`);
            let b3 = this.client.utils.button(`custom_id`, `System Info`, 2, `sys`);
            let row = this.client.utils.actionRow([b1, b2.setDisabled(true), b3]);
            let msg = await message.reply({
                embeds: [em],
                components: [row],
            });
            let guild = await this.client.guilds
                .fetch(this.client.config.supportId)
                .catch(() => { });
            let collector = await msg.createMessageComponentCollector({
                filter: (b) => {
                    if (b.user.id === message.author.id)
                        return true;
                    else
                        return b.reply({
                            content: `${this.client.emoji.cross} You are not the command requester`,
                            ephemeral: true,
                        });
                },
                time: 100000 * 7,
            });
            collector.on("collect", async (interaction) => {
                if (interaction.isButton()) {
                    if (interaction.customId === `team`) {
                        return interaction
                            .update({
                            embeds: [
                                this.client.utils
                                    .premiumEmbed(message.guildId)
                                    .setAuthor({
                                    name: `${this.client.user.username}`,
                                    iconURL: this.client.user.displayAvatarURL(),
                                })
                                    .setTitle(`${this.client.user.username} Stats`)
                                    .addFields([
                                    {
                                        name: `__Developers__`,
                                        value: `**1.** [Axocoder](https://discord.gg/codersplanet)`,
                                    },
                                    {
                                        name: `__Owners__`,
                                        value: `**1.** [Axocoder](https://discord.gg/codersplanet)`,
                                    },
                                ])
                                    .setThumbnail(this.client.user.displayAvatarURL()),
                            ],
                            components: [
                                this.client.utils.actionRow([
                                    this.client.utils
                                        .button(`custom_id`, `Team Info`, 2, `team`)
                                        .setDisabled(true),
                                    this.client.utils.button(`custom_id`, `General Info`, 2, `gen`),
                                    this.client.utils.button(`custom_id`, `System Info`, 2, `sys`),
                                ]),
                            ],
                        })
                            .catch(() => { });
                    }
                    else if (interaction.customId === `gen`) {
                        await interaction.deferUpdate();
                        return await msg
                            .edit({
                            embeds: [em],
                            components: [
                                this.client.utils.actionRow([
                                    this.client.utils.button(`custom_id`, `Team Info`, 2, `team`),
                                    this.client.utils
                                        .button(`custom_id`, `General Info`, 2, `gen`)
                                        .setDisabled(true),
                                    this.client.utils.button(`custom_id`, `System Info`, 2, `sys`),
                                ]),
                            ],
                        })
                            .catch(() => { });
                    }
                    else if (interaction.customId === `sys`) {
                        await interaction.deferUpdate();
                        return await msg
                            .edit({
                            embeds: [
                                this.client.utils
                                    .premiumEmbed(message.guildId)
                                    .setAuthor({
                                    name: `${this.client.user.username}`,
                                    iconURL: this.client.user.displayAvatarURL(),
                                })
                                    .setTitle(`${this.client.user.username} Stats`)
                                    .addFields([
                                    {
                                        name: `Cpu Info`,
                                        value: `Cores: ${(await cpu()).cores}\nModel: ${cpus()[0].model}\nSpeed: ${cpus()[0].speed}\nUsage: ${cpuUsage}%\nFree: ${cpuFree}%`,
                                    },
                                    {
                                        name: `Memory Info`,
                                        value: `Total: ${(totalmem() / 1024 / 1024).toFixed(2)}\nUsed: ${(process.memoryUsage().heapUsed /
                                            1024 /
                                            1024).toFixed(2)}\nFree: ${(totalmem() / 1024 / 1024 -
                                            process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`,
                                    },
                                ])
                                    .setThumbnail(this.client.user.displayAvatarURL()),
                            ],
                            components: [
                                this.client.utils.actionRow([
                                    this.client.utils.button(`custom_id`, `Team Info`, 2, `team`),
                                    this.client.utils.button(`custom_id`, `General Info`, 2, `gen`),
                                    this.client.utils
                                        .button(`custom_id`, `System Info`, 2, `sys`)
                                        .setDisabled(true),
                                ]),
                            ],
                        })
                            .catch(() => { });
                    }
                }
            });
            collector.on("end", async () => {
                if (!msg)
                    return;
                else
                    return await msg.edit({
                        components: [
                            this.client.utils.actionRow([
                                b1.setDisabled(true),
                                b2.setDisabled(true),
                                b3.setDisabled(true),
                            ]),
                        ],
                    });
            });
        };
    }
}
function checkMemPresence(member) {
    try {
        if (member.presence?.status === 'online')
            return '🟢'; // Green circle for online
        else if (member.presence?.status === 'idle')
            return '🟡'; // Yellow circle for idle
        else if (member.presence?.status === 'offline')
            return '⚪'; // White circle for offline
        else if (member.presence?.status === 'dnd')
            return '🔴'; // Red circle for do not disturb
        else
            return '⚪'; // Default to white circle for unknown status
    }
    catch (e) {
        console.log(e);
        return '⚪'; // Default to white circle in case of any error
    }
}
