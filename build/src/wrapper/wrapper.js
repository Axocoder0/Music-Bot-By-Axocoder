import OrasDispatcher from "./Dispatcher.js";
export default class OrasApi extends Map {
    client;
    constructor(client) {
        super();
        this.client = client;
    }
    async handle(guild, member, channel, node, track) {
        const present = this.get(guild?.id);
        if (!present) {
            const player = await node.joinChannel({
                guildId: guild.id,
                channelId: member.voice.channel.id,
                shardId: guild.shardId,
                deaf: true,
            });
            const dispatcher = new OrasDispatcher(this.client, guild, channel, player);
            dispatcher.queue.push(track);
            dispatcher.updateQueue(guild, dispatcher.queue);
            this.set(guild.id, dispatcher);
            return dispatcher;
        }
        present.channel = channel;
        present.queue.push(track);
        present.updateQueue(guild, present.queue);
        if (!present.current)
            present.play();
        return null;
    }
    async reconnect(guild, vc, txt, node) {
        const present = this.get(guild.id);
        if (present)
            return;
        const player = await node.joinChannel({
            guildId: guild.id,
            channelId: vc.id,
            shardId: guild.shardId,
            deaf: true,
        });
        const dispatcher = new OrasDispatcher(this.client, guild, txt, player);
        this.set(guild.id, dispatcher);
        return dispatcher;
    }
}
//# sourceMappingURL=wrapper.js.map