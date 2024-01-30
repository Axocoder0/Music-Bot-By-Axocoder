import { Collection } from "discord.js";
import * as fs from "fs";
export default class OrasCommands {
    client;
    loaded;
    messages;
    constructor(client) {
        this.client = client;
        this.loaded = false;
        this.messages = new Collection();
    }
    loadCommands() {
        if (this.loaded)
            return this;
        fs.readdirSync(`./build/src/commands/`).forEach((dir) => {
            fs.readdirSync(`./build/src/commands/${dir}`)
                .filter((x) => x.endsWith(".js"))
                .forEach(async (file) => {
                let command = (await import(`../commands/${dir}/${file}`)).default;
                let OrasCommand = new command(this.client);
                this.messages.set(OrasCommand.name, OrasCommand);
                this.client.logger.debug(`Kronix | Command Loaded: ${OrasCommand.name} loaded!`);
            });
        });
        this.client.logger.log(`Kronix | Loaded Client Commands Successfully!`);
        this.loaded = true;
        return this;
    }
}
//# sourceMappingURL=Commands.js.map