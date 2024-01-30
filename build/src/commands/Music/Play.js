import OrasDispatcher from "../../wrapper/Dispatcher.js";
import OrasCommand from "../../abstract/OrasCommand.js";
export default class OrasPlay extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "play";
        this.aliases = ["p"];
        this.cat = "music";
        this.desc = "Plays the music by adding some songs to the queue";
        this.usage = "play <query/url>";
        this.dev = false;
        this.manage = false;
        this.premium = {
            guild: false,
            user: false,
        };
        this.vc = true;
        this.samevc = true;
        this.exec = async (message, args, prefix) => {
            if (!args[0])
                return message.reply({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guildId)
                            .setDescription(`\`${prefix}play <search query or url\``)
                            .setTitle(`Play Syntax`),
                    ],
                });
            let query = args.join(" ");
            if (this.client.utils.checkUrl(query) === true) {
                if (query.match(this.client.spotify.spotifyPattern)) {
                    await this.client.spotify.requestToken();
                    let node = await this.client.spotify.nodes.get("Oras");
                    let result = await node.load(query);
                    if (result.loadType === `PLAYLIST_LOADED`) {
                        let dispatcher = this.client.api.get(message.guildId);
                        if (!dispatcher) {
                            if (!message.guild.members.me
                                .permissionsIn(message.member.voice.channel)
                                .has(["Connect", "Speak"]))
                                return message.reply({
                                    embeds: [
                                        this.client.utils
                                            .premiumEmbed(message.guildId)
                                            .setDescription(`${this.client.emoji.cross} I don't have **Connect** or **Speak** permissions in your voice channel`)
                                            .setTitle(`Missing Permissions`),
                                    ],
                                });
                            let node = this.client.shoukaku.getNode();
                            let player = await node.joinChannel({
                                guildId: message.guildId,
                                channelId: message.member.voice.channel.id,
                                shardId: message.guild.shardId,
                                deaf: true,
                            });
                            dispatcher = new OrasDispatcher(this.client, message.guild, message.channel, player);
                            this.client.api.set(message.guild.id, dispatcher);
                        }
                        let spotifyTracks = [];
                        for (let i = 0; i < result.tracks.length; i++) {
                            let track = result.tracks[i];
                            track.info.requester = message.author;
                            track = this.client.utils.track(track);
                            spotifyTracks.push(track);
                        }
                        spotifyTracks.forEach((x) => dispatcher.queue.push(x));
                        if (!dispatcher.current)
                            dispatcher?.play();
                        return message.reply({
                            embeds: [
                                this.client.utils
                                    .premiumEmbed(message.guildId)
                                    .setDescription(`${this.client.emoji.queue} Added **[${result.tracks.length}](${this.client.config.voteUrl})** Tracks from [${result.playlistInfo.name}](${this.client.config.voteUrl})`),
                            ],
                        });
                    }
                    else if (result.loadType === `LOAD_FAILED` ||
                        result.loadType === `NO_MATCHES`) {
                        return message.reply({
                            embeds: [
                                this.client.utils
                                    .premiumEmbed(message.guild.id)
                                    .setDescription(`${this.client.emoji.cross} [No results](${this.client.config.voteUrl}) found for the query provided`),
                            ],
                        });
                    }
                    else {
                        let node = this.client.shoukaku.getNode();
                        let track = result.tracks[0];
                        track.info.requester = message.author;
                        track = this.client.utils.track(track);
                        const dispatcher = await this.client.api.handle(message.guild, message.member, message.channel, node, track);
                        dispatcher?.play();
                        return message.reply({
                            embeds: [
                                this.client.utils
                                    .premiumEmbed(message.guildId)
                                    .setDescription(`${this.client.emoji.queue} Added [${track.info.title.substring(0, 35)}](${this.client.config.voteUrl}) to Queue`),
                            ],
                        });
                    }
                }
                let node = this.client.shoukaku.getNode();
                let result = await node.rest.resolve(query);
                if (!result.tracks.length)
                    return message.reply({
                        embeds: [
                            this.client.utils
                                .premiumEmbed(message.guildId)
                                .setDescription(`${this.client.emoji.cross} [No Results](${this.client.config.voteUrl}) found for the query`)
                                .setTitle(`No Results`),
                        ],
                    });
                if (result.loadType === `PLAYLIST_LOADED`) {
                    let dispatcher = this.client.api.get(message.guild.id);
                    if (!dispatcher) {
                        let node = this.client.shoukaku.getNode();
                        const player = this.client.utils.player(node, {
                            guildId: message.guildId,
                            shardId: message.guild.shardId,
                            channelId: message.member.voice.channel.id,
                            deaf: true,
                        });
                        dispatcher = new OrasDispatcher(this.client, message.guild, message.channel, player);
                        this.client.api.set(message.guildId, dispatcher);
                    }
                    let tracks = [];
                    for (let i = 0; i < result.tracks.length; i++) {
                        result.tracks[i].info.requester = message.author;
                        let tr = this.client.utils.track(result.tracks[i]);
                        tracks.push(tr);
                    }
                    tracks.forEach((x) => dispatcher.queue.push(x));
                    return message.reply({
                        embeds: [
                            this.client.utils
                                .premiumEmbed(message.guildId)
                                .setDescription(`${this.client.emoji.queue} Added **[${result.tracks.length}](${this.client.config.voteUrl})** from [${result.playlistName}](${this.client.config.voteUrl})`),
                        ],
                    });
                }
            }
            let type = this.client.utils.getPlay(message.guild.id);
            if (type === "direct") {
                let node = this.client.shoukaku.getNode();
                let result = await node.rest.resolve(`ytsearch:${query}`);
                if (!result.tracks?.length)
                    return message.reply({
                        embeds: [
                            this.client.utils
                                .premiumEmbed(message.guildId)
                                .setDescription(`${this.client.emoji.cross} [No Results](${this.client.config.voteUrl}) found for the given query`)
                                .setTitle(`No Results`),
                        ],
                    });
                const track = result?.tracks?.shift();
                track.info.requester = message.author;
                let tr = this.client.utils.track(track);
                const dispatcher = await this.client.api.handle(message.guild, message.member, message.channel, node, tr);
                dispatcher?.play();
                return message.reply({
                    embeds: [
                        this.client.utils
                            .premiumEmbed(message.guildId)
                            .setDescription(`${this.client.emoji.queue} Added [${track.info.title.substring(0, 35)}](${this.client.config.voteUrl}) to Queue`),
                    ],
                });
            }
            else {
                let node = this.client.shoukaku.getNode();
                let b1 = this.client.utils.button(`custom_id`, null, 2, `oras_default_search`, null, this.client.emoji.defSearch);
                let b2 = this.client.utils.button(`custom_id`, null, 3, `oras_spoti_search`, null, this.client.emoji.spotiSearch);
                let buttons = [b1, b2];
                let row = this.client.utils.actionRow(buttons);
                let em = this.client.utils
                    .premiumEmbed(message.guildId)
                    .setAuthor({
                        name: `${message.author.username}`,
                        iconURL: message.author.displayAvatarURL(),
                    })
                    .setFooter({
                    text: `Thanks For Selecting ${this.client.user.username}`,
                    iconURL: this.client.user.displayAvatarURL({ dynamic: true }),
                    })
                    .setDescription(`> ${this.client.emoji.defSearch} ** :  You Tube Search**\n> ${this.client.emoji.spotiSearch} ** :  Spotify Search**\n\n- Choose One of the buttons below to play music`)
                    .setTitle(`Select Search Engines`);
                let msg = await message.channel.send({
                    embeds: [em],
                    components: [row],
                });
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
                    if (interaction.customId === `oras_default_search`) {
                        let result = await node.rest.resolve(`ytsearch:${query}`);
                        if (!result.tracks.length)
                            return interaction.update({
                                embeds: [
                                    this.client.utils
                                        .premiumEmbed(message.guildId)
                                        .setDescription(`${this.client.emoji.cross} [No Results](${this.client.config.voteUrl}) found for the given query`),
                                ],
                                components: [],
                            });
                        else {
                            let track = result.tracks[0];
                            track.info.requester = message.author;
                            track = this.client.utils.track(track);
                            const dispatcher = await this.client.api.handle(message.guild, message.member, message.channel, node, track);
                            dispatcher?.play();
                            return interaction.update({
                                embeds: [
                                    this.client.utils
                                        .premiumEmbed(message.guildId)
                                        .setDescription(`${this.client.emoji.queue} Added [${result.tracks[0].info.title.substring(0, 35)}](${this.client.config.voteUrl}) to Queue`),
                                ],
                                components: [],
                            });
                        }
                    }
                    else if (interaction.customId === `oras_spoti_search`) {
                        let result;
                        this.client.kazagumo
                            .search(query, {
                            engine: `spotify`,
                            requester: message.author,
                        })
                            .then(async (result) => {
                            if (!result?.tracks?.length)
                                return interaction.update({
                                    embeds: [
                                        this.client.utils
                                            .premiumEmbed(message.guild.id)
                                            .setDescription(`${this.client.emoji.cross} [No Result](${this.client.config.voteUrl}) found for the query`),
                                    ],
                                    components: [],
                                });
                            let track = result.tracks[0];
                            await this.client.spotify.requestToken();
                            let spoti = this.client.spotify.nodes.get("Oras");
                            let res = await spoti.load(track.uri);
                            if (res.loadType === `LOAD_FAILED` ||
                                res.loadType === `NO_RESULTS`)
                                return interaction.update({
                                    embeds: [
                                        this.client.utils
                                            .premiumEmbed(message.guild.id)
                                            .setDescription(`${this.client.emoji.cross} [No Result](${this.client.config.voteUrl}) found for the query`),
                                    ],
                                    components: [],
                                });
                            else {
                                node = this.client.shoukaku.getNode();
                                res.tracks[0].info.requester = message.author;
                                let tr = this.client.utils.track(res.tracks[0]);
                                const dispatcher = await this.client.api.handle(message.guild, message.member, message.channel, node, tr);
                                dispatcher?.play();
                                return interaction.update({
                                    embeds: [
                                        this.client.utils
                                            .premiumEmbed(message.guild.id)
                                            .setDescription(`${this.client.emoji.queue} Added [${tr.info.title.substring(0, 35)}](${this.client.config.voteUrl}) to Queue`),
                                    ],
                                    components: [],
                                });
                            }
                        });
                    }
                    else if (interaction.customId === `oras_deez_search`) {
                        // let result = await this.client.kazagumo.search(query, {
                        //   engine: `deezer`,
                        //   requester: message.author,
                        // });
                        // if (!result.tracks.length)
                        return interaction.update({
                            embeds: [
                                this.client.utils
                                    .premiumEmbed(message.guildId)
                                    .setDescription(`${this.client.emoji.cross} [No Result](${this.client.config.voteUrl}) found for the query`),
                            ],
                            components: [],
                        });
                        // let track = result.tracks[0];
                        // let node = this.client.shoukaku.getNode();
                        // track = this.client.utils.track(track);
                        // const dispatcher = await this.client.api.handle(
                        //   message.guild,
                        //   message.member,
                        //   message.channel,
                        //   track,
                        //   node
                        // );
                        // dispatcher?.play();
                        // return interaction.update({
                        //   embeds: [
                        //     this.client.utils
                        //       .premiumEmbed(message.guild.id)
                        //       .setDescription(
                        //         `${
                        //           this.client.emoji.queue
                        //         } Added [${track.info.title.substring(0, 35)}](${
                        //           this.client.config.voteUrl
                        //         }) to Queue`
                        //       ),
                        //   ],
                        //   components: [],
                        // });
                    }
                    else if (interaction.customId === `oras_sound_search`) {
                        let node = this.client.shoukaku.getNode();
                        let res = await node.rest.resolve(`scsearch:${query}`);
                        if (!res.tracks.length)
                            return interaction.update({
                                embeds: [
                                    this.client.utils
                                        .premiumEmbed(message.guildId)
                                        .setDescription(`${this.client.emoji.cross} [No Results](${this.client.config.voteUrl}) found for the query`),
                                ],
                                components: [],
                            });
                        let track = res.tracks[0];
                        track.info.requester = message.author;
                        let tr = this.client.utils.track(track);
                        const dispatcher = await this.client.api.handle(message.guild, message.member, message.channel, node, tr);
                        dispatcher?.play();
                        return interaction.update({
                            embeds: [
                                this.client.utils
                                    .premiumEmbed(message.guildId)
                                    .setDescription(`${this.client.emoji.queue} Added [${track.info.title.substring(0, 35)}](${this.client.config.voteUrl}) to Queue`),
                            ],
                            components: [],
                        });
                    }
                });
            }
        };
    }
}
//# sourceMappingURL=Play.js.map