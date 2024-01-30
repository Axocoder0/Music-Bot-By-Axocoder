import OrasCommand from "../abstract/OrasCommand.js";
export default class VoiceState extends OrasCommand {
    constructor(client) {
        super(client);
        this.name = "voiceStateUpdate";
        this.run = async (oldState, newState) => {
            const dispatcher = this.client.api.get(newState.guild.id);
            if (!dispatcher || !dispatcher?.player)
                return;
            if (oldState.id === this.client.user.id ||
                !oldState.guild.members.me.voice.channel)
                return;
            if (oldState.guild.members.me.voice.serverMute ||
                newState.guild.members.me.voice.serverMute)
                newState.guild.members.me.voice.setMute(false).catch(() => { });
            let data = this.client.utils.get247(newState.guild.id);
            if (data === false) {
                if (oldState.guild.members.me.voice.channel?.id === oldState.channel?.id) {
                    if (oldState.guild.members.me.voice?.channel &&
                        oldState.guild.members.me.voice?.channel?.members.filter((m) => !m.user.bot).size === 0) {
                        setTimeout(() => {
                            if (oldState.guild.members.me.voice?.channel?.members.size === 1) {
                                let em = this.client.utils
                                    .premiumEmbed(newState.guild.id)
                                    .setTitle(`Left Voice Channel`)
                                    .setDescription(`${this.client.emoji.cross} I have left the voice channel as No one was listening to me and \`24/7\` Mode is also disabled.`);
                                dispatcher.channel
                                    ?.send({
                                    embeds: [em],
                                })
                                    .then((x) => {
                                    setTimeout(() => {
                                        x.delete().catch(() => { });
                                    }, 5000);
                                });
                                return;
                            }
                        }, 180000);
                    }
                }
            }
        };
    }
}
//# sourceMappingURL=VoiceState.js.map