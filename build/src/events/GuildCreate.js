import { ChannelType, PermissionFlagsBits, WebhookClient } from "discord.js";
import OrasEvent from "../abstract/OrasEvent.js";
export default class GuildCreate extends OrasEvent {
    constructor(client) {
        super(client);
        this.name = "guildCreate";
        this.run = async (guild) => {
            let web = new WebhookClient({
                url: this.client.config.webhooks.guildCreate,
            });
            let mainChannel;
            guild.channels.cache.forEach((x) => {
                if (guild.members.me
                    .permissionsIn(x)
                    .has([
                    PermissionFlagsBits.SendMessages,
                    PermissionFlagsBits.ViewChannel,
                ]) &&
                    x.type === ChannelType.GuildText &&
                    !mainChannel)
                    mainChannel = x;
            });
            let mb = this.client.utils
                .embed()
                .setTitle(`Hey I am ${this.client.user.username}`)
                .setAuthor({
                name: `Thanks for Inviting Me`,
                iconURL: this.client.user.displayAvatarURL(),
            })
                .setDescription(`I come up with default prefix as : \`${this.client.config.prefix}\`
           ${this.client.emoji.info} I am a versatile music bot with lots of unique features
           ${this.client.emoji.info} I come up with different search engines, You may try out me with \`play\`
                            
           If you find any bug or want any kind of help regarding our services of Oras Development
           Please consider Joining [Support server](${this.client.config.server}) by clicking [here](${this.client.config.server})`)
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setTimestamp();
            let b1 = this.client.utils.button(`link`, `Support Server`, null, null, `${this.client.config.server}`, null);
            let b2 = this.client.utils.button(`link`, `Get Premium`, null, null, `${this.client.config.server}`, null);
            let b3 = this.client.utils.button(`link`, `Vote Me`, null, null, `${this.client.config.voteUrl}`);
            let row = this.client.utils.actionRow([b1, b2, b3]);
            if (mainChannel)
                mainChannel.send({
                    embeds: [mb],
                    components: [row],
                });
            let invite;
            if (mainChannel)
                invite = await mainChannel?.createInvite({ maxAge: 0 }).catch(() => { });
            else
                invite = "Unable to fetch Invite";
            if (!invite)
                invite = "Unable to fetch invite";
            let em = this.client.utils
                .embed()
                .setTitle(`Guild Joined`)
                .setAuthor({
                name: `${this.client.user.username}`,
                iconURL: this.client.user.displayAvatarURL(),
            })
                .addFields([
                {
                    name: `Guild Info`,
                    value: `Guild Name:${guild.name}Guild Id: ${guild.id}\nGuild Created: <t:${Math.round(guild.createdTimestamp / 1000)}:R>\nGuild Joined: <t:${Math.round(guild.joinedTimestamp / 1000)}:R>\nGuild Invite: ${invite}\nGuild Owner: ${(await guild.members.fetch(guild.ownerId))
                        ? guild.members.cache.get(guild.ownerId).user.tag
                        : "Unknown User"}\nMemberCount: ${guild.memberCount} Members\nShardId: ${guild.shardId}`,
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
            ])
                .setThumbnail(guild.iconURL({ dynamic: true }));
            web.send({ embeds: [em] });
        };
    }
}
//# sourceMappingURL=GuildCreate.js.map