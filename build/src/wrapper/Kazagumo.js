import { Kazagumo, Plugins } from "kazagumo";
import { Connectors } from "shoukaku";
import Deezer from "kazagumo-deezer";
import Spotify from "kazagumo-spotify";
export default class OrasKazagumo extends Kazagumo {
    constructor(client) {
        super({
            defaultSearchEngine: "youtube",
            send: (guildId, payload) => {
                let guild = client.guilds.cache.get(guildId);
                if (guild)
                    guild.shard.send(payload);
            },
            plugins: [
                new Spotify({
                    clientId: client.config.spotiId,
                    clientSecret: client.config.spotiSecret,
                    playlistPageLimit: 4,
                    searchLimit: 50,
                    albumPageLimit: 4,
                    searchMarket: "IN",
                }),
                new Deezer(),
                new Plugins.PlayerMoved(client),
            ],
        }, new Connectors.DiscordJS(client), client.config.nodes);
    }
}
//# sourceMappingURL=Kazagumo.js.map