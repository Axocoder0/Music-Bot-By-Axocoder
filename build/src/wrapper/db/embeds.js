import OrasDatabase from "../../database/db.js";
const db = new OrasDatabase("embeds.sqlite");
function create() {
    db.prepare(`CREATE TABLE IF NOT EXISTS EMBEDS(
        GUILD TEXT,
        HEXCODE TEXT
    )`).run();
}
function addHex(guild, hex) {
    create();
    let get = getHex(guild);
    if (get.HEXCODE === null) {
        db.prepare(`INSERT INTO EMBEDS(GUILD,HEXCODE) VALUES(?,?)`).run(guild, hex);
        return;
    }
    else {
        db.prepare(`UPDATE EMBEDS SET HEXCODE = ? WHERE GUILD = ?`).run(hex, guild);
        return;
    }
}
function removeHex(guild) {
    create();
    db.prepare(`DELETE FROM EMBEDS WHERE GUILD = ?`).run(guild);
    return;
}
function getHex(guild) {
    create();
    let run = db.prepare(`SELECT HEXCODE FROM EMBEDS WHERE GUILD = ?`).get(guild);
    if (run)
        return run;
    else
        return { HEXCODE: null };
}
export { getHex, addHex, removeHex };
//# sourceMappingURL=embeds.js.map