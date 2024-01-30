import { WebhookClient } from "discord.js";
import OrasEvent from "../abstract/OrasEvent.js";
export default class GuildDelete extends OrasEvent {
    constructor(client) {
        super(client);
        this.name = "guildDelete";
        this.run = async (guild) => {
            let em = this.client.utils
                .embed()
                .setTitle(`Guild Left`)
                .setAuthor({
                name: `${this.client.user.username}`,
                iconURL: this.client.user.displayAvatarURL(),
            })
                .addFields([
                {
                    name: `Guild Info`,
                    value: `Guild Name: ${guild.name}\nGuild Id: ${guild.id}\nGuild Created: <t:${Math.round(guild.createdTimestamp / 1000)}:R>\nMemberCount: ${guild.memberCount} Members`,
                },
                {
                    name: `Bot Info`,
                    value: `Server Count: ${await this.client.cluster
                        .broadcastEval((c) => c.guilds.cache.size)
                        .then((r) => r.reduce((a, b) => a + b, 0))} Servers\nUsers Count: ${await this.client.cluster
                        .broadcastEval((c) => c.guilds.cache
                        .filter((x) => x.available)
                        .reduce((a, g) => a + g.memberCount, 0))
                        .then((r) => r.reduce((acc, memberCount) => acc + memberCount, 0))} Users`,
                },
            ]);
            const web = new WebhookClient({
                url: this.client.config.webhooks.guildDelete,
            });
            web.send({ embeds: [em] });
        };
    }
}
//# sourceMappingURL=GuildDelete.js.map