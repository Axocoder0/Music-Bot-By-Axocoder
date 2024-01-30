import chalk from "chalk";
import moment from "moment";
const time = `[${moment().utcOffset("+5:30").format(`DD-MM-YYYY | hh:mm:ss`)}]`;
export default class OrasLogger {
    client;
    constructor(client) {
        this.client = client;
    }
    log(x) {
        return console.log(chalk.bgHex("#1c1a1b").hex("#455FCA").bold(time) +
            " | " +
            chalk.bold("[") +
            chalk.bgHex("#455FCA").hex("#1c1a1b").bold("LOG") +
            chalk.bold("]") +
            " | " +
            x);
    }
    debug(x) {
        return console.debug(chalk.bgHex("#1c1a1b").hex("#455FCA").bold(time) +
            " | " +
            chalk.bold("[") +
            chalk.bgHex("#455FCA").hex("#1c1a1b").bold("DEBUG") +
            chalk.bold("]") +
            " | " +
            x);
    }
    ready(x) {
        return console.log(chalk.bgHex("#1c1a1b").hex("#455FCA").bold(time) +
            " | " +
            chalk.bold("[") +
            chalk.bgHex("#455FCA").hex("#1c1a1b").bold("READY") +
            chalk.bold("]") +
            " | " +
            x);
    }
    warn(x) {
        return console.warn(chalk.bgHex("#1c1a1b").hex("#455FCA").bold(time) +
            " | " +
            chalk.bold("[") +
            chalk.bgHex("#455FCA").hex("#1c1a1b").bold("WARN") +
            chalk.bold("]") +
            " | " +
            x);
    }
    error(x) {
        return console.warn(chalk.bgHex("#1c1a1b").hex("#455FCA").bold(time) +
            " | " +
            chalk.bold("[") +
            chalk.bgHex("#455FCA").hex("#1c1a1b").bold("ERROR") +
            chalk.bold("]") +
            " | " +
            x);
    }
}
//# sourceMappingURL=Logger.js.map