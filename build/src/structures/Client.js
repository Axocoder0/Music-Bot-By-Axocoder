import { Client, Partials } from "discord.js";
import OrasConfig from "../setting/Config.js";
import OrasEmoji from "../setting/Emoji.js";
import OrasShoukaku from "../wrapper/Shoukaku.js";
import OrasApi from "../wrapper/wrapper.js";
import OrasEvents from "./Events.js";
import OrasCommands from "./Commands.js";
import { ClusterClient, getInfo } from "discord-hybrid-sharding";
import OrasUtils from "./Utils.js";
import OrasLogger from "./Logger.js";
import OrasSpotify from "../wrapper/Spotify.js";
import OrasKazagumo from "../wrapper/Kazagumo.js";
export default class Oras extends Client {
    constructor() {
        super({
            intents: [
                "Guilds",
                "GuildMembers",
                "GuildMessages",
                "GuildInvites",
                "GuildVoiceStates",
                "MessageContent",
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.User,
                Partials.Reaction,
            ],
            allowedMentions: {
                repliedUser: false,
                parse: ["everyone", "roles", "users"],
            },
            failIfNotExists: true,
            shards: getInfo().SHARD_LIST,
            shardCount: getInfo().TOTAL_SHARDS,
        });
        this.config = new OrasConfig();
        this.emoji = new OrasEmoji(this);
        this.shoukaku = new OrasShoukaku(this);
        this.kazagumo = new OrasKazagumo(this);
        this.spotify = new OrasSpotify(this);
        this.cluster = new ClusterClient(this);
        this.logger = new OrasLogger(this);
        this.utils = new OrasUtils(this);
        this.api = new OrasApi(this);
        this.events = new OrasEvents(this).loadEvents();
        this.commands = new OrasCommands(this).loadCommands();
    }
    start() {
        return super.login(this.config.token);
    }
}
//# sourceMappingURL=Client.js.map