import OrasDatabase from "../../database/db.js";
const db = new OrasDatabase("settings.sqlite");
function createAutoplay() {
    db.prepare(`CREATE TABLE IF NOT EXISTS AUTOPLAY(
        GUILD TEXT,
        SETTING BOOLEAN
    )`).run();
}
function enableAutoplay(guild) {
    createAutoplay();
    let get = getAutoplay(guild);
    if (get.SETTING === null) {
        db.prepare(`INSERT INTO AUTOPLAY(GUILD,SETTING) VALUES(?,TRUE)`).run(guild);
        return true;
    }
    else {
        db.prepare(`UPDATE AUTOPLAY SET SETTING = TRUE WHERE GUILD = ?`).run(guild);
        return true;
    }
}
function getAutoplay(guild) {
    createAutoplay();
    let run = db
        .prepare(`SELECT SETTING FROM AUTOPLAY WHERE GUILD = ?`)
        .get(guild);
    if (run)
        return run;
    else
        return { SETTING: null };
}
function disableAutoplay(guild) {
    createAutoplay();
    db.prepare(`UPDATE AUTOPLAY SET SETTING = FALSE WHERE GUILD = ?`).run(guild);
    return true;
}
export { getAutoplay, disableAutoplay, enableAutoplay, get247, enable247, disable247, get247Set, checkIgnore, addIgnore, removeIgnore, addBypassAdmins, addBypassMods, checkBypassAdmins, checkBypassMods, listIgnores, removeAdminBypass, removeBypassMods, resetIgnore, };
function create247() {
    db.exec(`CREATE TABLE IF NOT EXISTS RECONNECT(
    GUILD TEXT,
    SETTING BOOLEAN,
    CHANNELID TEXT,
    TEXTID TEXT
  )`);
}
function get247(guild) {
    create247();
    let run = db
        .prepare(`SELECT SETTING FROM RECONNECT WHERE GUILD = ?`)
        .get(guild);
    if (run)
        return run;
    else
        return { SETTING: null };
}
function enable247(guild, vc, txt) {
    create247();
    let get = get247(guild);
    if (get.SETTING === null) {
        db.prepare(`INSERT INTO RECONNECT(GUILD,SETTING,CHANNELID,TEXTID) VALUES(?,TRUE,?,?)`).run(guild, vc, txt);
        return;
    }
    else {
        db.prepare(`UPDATE RECONNECT SET SETTING = TRUE,CHANNELID = ?,TEXTID = ? WHERE GUILD = ?`).run(vc, txt, guild);
    }
}
function disable247(guild) {
    create247();
    let get = get247(guild);
    if (get.SETTING === null) {
        db.prepare(`INSERT INTO RECONNECT(GUILD,SETTING) VALUES(?,FALSE)`).run(guild);
        return;
    }
    else {
        db.prepare(`UPDATE RECONNECT SET SETTING = FALSE WHERE GUILD = ?`).run(guild);
        return;
    }
}
function get247Set(guild) {
    create247();
    let run = db
        .prepare(`SELECT CHANNELID,TEXTID FROM RECONNECT WHERE GUILD = ?`)
        .get(guild);
    if (run)
        return run;
    else
        return { CHANNELID: null, TEXTID: null };
}
function createIgnore() {
    db.prepare(`CREATE TABLE IF NOT EXISTS IGNORE(
    GUILD TEXT,
    CHANNEL TEXT,
    BYPASS_ADMINS BOOLEAN,
    BYPASS_MODS BOOLEAN
  )`).run();
}
function checkIgnore(channel, guild) {
    createIgnore();
    let run = db
        .prepare(`SELECT CHANNEL FROM IGNORE WHERE GUILD = ? AND CHANNEL = ?`)
        .get(guild, channel);
    if (run)
        return true;
    else
        return false;
}
function addIgnore(channel, guild) {
    createIgnore();
    db.prepare(`INSERT INTO IGNORE(GUILD,CHANNEL) VALUES(?,?)`).run(guild, channel);
    return;
}
function removeIgnore(channel, guild) {
    createIgnore();
    db.prepare(`DELETE FROM IGNORE WHERE GUILD = ? AND CHANNEL = ?`).run(guild, channel);
    return;
}
function checktable(guild) {
    let run = db.prepare(`SELECT GUILD FROM IGNORE WHERE GUILD = ?`).get(guild);
    if (run)
        return run;
    else
        return null;
}
function checkBypassAdmins(guild) {
    createIgnore();
    let run = db
        .prepare(`SELECT BYPASS_ADMINS FROM IGNORE WHERE GUILD = ?`)
        .get(guild);
    if (run)
        return run;
    else
        return { BYPASS_ADMINS: null };
}
function checkBypassMods(guild) {
    createIgnore();
    let run = db
        .prepare(`SELECT BYPASS_MODS FROM IGNORE WHERE GUILD = ?`)
        .get(guild);
    if (run)
        return run;
    else
        return { BYPASS_MODS: null };
}
function addBypassAdmins(guild) {
    createIgnore();
    let check = checktable(guild);
    if (check !== null) {
        db.prepare(`UPDATE IGNORE SET BYPASS_ADMINS = TRUE WHERE GUILD = ?`).run(guild);
        return;
    }
    else {
        db.prepare(`INSERT INTO IGNORE(GUILD,BYPASS_ADMINS) VALUES(?,TRUE)`).run(guild);
        return;
    }
}
function addBypassMods(guild) {
    createIgnore();
    let check = checktable(guild);
    if (check !== null) {
        db.prepare(`UPDATE IGNORE SET BYPASS_MODS = TRUE WHERE GUILD = ?`).run(guild);
        return;
    }
    else {
        db.prepare(`INSERT INTO IGNORE(GUILD,BYPASS_MODS) VALUES(?,TRUE)`).run(guild);
        return;
    }
}
function removeAdminBypass(guild) {
    createIgnore();
    db.prepare(`UPDATE IGNORE SET BYPASS_ADMINS = FALSE WHERE GUILD = ?`).run(guild);
    return;
}
function removeBypassMods(guild) {
    createIgnore();
    db.prepare(`UPDATE IGNORE SET BYPASS_MODS = FALSE WHERE GUILD = ?`).run(guild);
    return;
}
function listIgnores(guild) {
    createIgnore();
    let data = [];
    let run = db.prepare(`SELECT CHANNEL FROM IGNORE WHERE GUILD = ?`).all(guild);
    run.forEach((x) => {
        data.push(x.CHANNEL);
    });
    return data;
}
function resetIgnore(guild) {
    createIgnore();
    db.prepare(`DELETE FROM IGNORE WHERE GUILD = ?`).run(guild);
    return;
}
//# sourceMappingURL=settings.js.map