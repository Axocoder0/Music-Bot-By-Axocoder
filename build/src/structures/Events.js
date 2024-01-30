import * as fs from "fs";
export default class OrasEvents {
    client;
    load;
    constructor(client) {
        this.client = client;
        this.load = false;
    }
    loadEvents() {
        if (this.load)
            return this;
        fs.readdirSync(`./build/src/events/`)
            .filter((x) => x.endsWith(".js"))
            .forEach(async (file) => {
            let vani = (await import(`../events/${file}`)).default;
            let sikku = new vani(this.client);
            let run = sikku?.run.bind(sikku);
            this.client.on(sikku?.name, run);
            this.client.logger.debug(`Kronix | [Event] Loaded Client Event: ${sikku?.name}`);
        });
        this.client.logger.log(`Kronix | Loaded Client Events Successfully!`);
        this.load = true;
        return this;
    }
}
//# sourceMappingURL=Events.js.map