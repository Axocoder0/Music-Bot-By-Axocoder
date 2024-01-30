import Oras from "./structures/Client.js";
import OrasConfig from "./setting/Config.js";
const Config = new OrasConfig();
const client = new Oras();
client.start();
// import { AutoPoster } from "topgg-autoposter";
// const autoposter = AutoPoster(Config.voteApi, client);
// autoposter.on("posted", (stats) => {
//   client.logger.log(`Kronix | Posted Stats to TopGG`);
// })
export default client;
["unhandledRejection", "uncaughtException"].forEach((x) => {
    process.on(x, (e) => console.error("Kronix | ", e));
});
//# sourceMappingURL=oras.js.map