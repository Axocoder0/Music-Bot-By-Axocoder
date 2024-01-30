export default class OrasEmoji extends Object {
    constructor(client) {
        super();
        this.tick = "✅";
        this.cross = "❌";
        this.playing = "🎶";
        this.exclamation = "❗";
        this.queue = "📋";
        this.info = "❗";
        this.defSearch = "🔍";
        this.premium = "🌟";
        this.invite = "💌";
        this.support = "🤝";
        this.spotiSearch = "🎵";
        this.deezSearch = "🎵";
        this.vote = "🗳️";
        this.soundSearch = "🎵";
        this.badges = {
            named: "👑",
            owner: "👑",
            dev: "👩‍💻",
            admin: "🔧",
            codev: "👩‍💻",
            author: "",
            friend: "👫",
            vip: "🌟",
            premiumUser: "🌟",
            mod: "🛡️",
            staff: "👥",
            supporter: "🌟",
            user: "👤",
        };
        this.helpMenu = {
            music: "🎶",
            home: "🏠",
            filters: "🎛️",
            info: "❗",
            utility: "⚙️",
            allCommands: "📋",
        };
        this.setup = {
            pause: "⏸️",
            resume: "▶️",
            skip: "⏭️",
            previous: "⏮️",
            shuffle: "🔀",
            author: "👤",
            nowPlaying: "🎶",
            requester: "👤",
            duration: "⌛",
            stop: "⏹️",
            loop: "🔁",
            volLow: "🔉",
            volHigh: "🔊",
            fav: "⭐",
            autoplay: "🔄",
            filters: "🎛️",
        };
        this.orasNew = {
            emote: "🎶",
            nowPlaying: "🎶",
            requester: "👤",
            duration: "⌛",
            author: "👤",
            pause: "⏸️",
            resume: "▶️",
            skip: "⏭️",
            fav: "🌟",
            previous: "⏮️",
            stop: "⏹️",
        };
        this.spotify = {
            emote: "🎶",
            filters: "",
            nowPlaying: "🎵",
            requester: "👤",
            duration: "⌛",
            pause: "⏸️",
            author: "👤",
            resume: "▶️",
            stop: "⏹️",
            loop: "🔁",
            shuffle: "🔀",
            forward: "⏭️",
            backward: "⏮️",
            volLow: "🔉",
            volHigh: "🔊",
            previous: "⏮️",
            skip: "⏭️",
        };
        this.special = {
            emote: "🎶",
            nowPlaying: "🎶",
            requester: "👤",
            duration: "⌛",
            pause: "⏸️",
            author: "👤",
            resume: "▶️",
            stop: "⏹️",
            loop: "🔁",
            shuffle: "🔀",
            forward: "⏭️",
            backward: "⏮️",
            volLow: "🔉",
            volHigh: "🔊",
            previous: "⏮️",
            skip: "⏭️",
        };
        this.noButtons = {
            emote: "🎶",
            nowPlaying: "👤",
            author: "👤",
            requester: "👤",
            duration: "⌛",
            filters: "",
        };
        this.simple = {
            emote: "🎶",
            nowPlaying: "👤",
            requester: "👤",
            author: "👤",
            duration: "⌛",
            filters: "",
            pause: "⏸️",
            resume: "▶️",
            stop: "⏹️",
            skip: "⏭️",
            loop: "🔁",
        };
        this.oldStyle = {
            emote: "🎶",
            nowPlaying: "👤",
            author: "👤",
            requester: "👤",
            duration: "⌛",
        };
    }
}
