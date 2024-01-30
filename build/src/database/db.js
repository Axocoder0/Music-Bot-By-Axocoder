import Database from "better-sqlite3";
export default class OrasDatabase extends Database {
    constructor(path) {
        super(`./build/src/database/${path}`, {
            fileMustExist: false,
            readonly: false,
        });
        this.pragma("jorunal_mode=WAL");
    }
}
//# sourceMappingURL=db.js.map