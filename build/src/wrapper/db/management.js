import OrasDatabase from "../../database/db.js";
const db = new OrasDatabase("management.sqlite");
export { manageMent, addManagement, removeManagement, getManagement, listTrusted, addTrusted, removeTrusted, checkTrusted, };
function createDb() {
    db.prepare(`CREATE TABLE IF NOT EXISTS MANAGEMENT(
        USER TEXT PRIMARY KEY,
        MANAGER BOOLEAN
    )`).run();
}
function manageMent(user) {
    createDb();
    let run = db
        .prepare(`SELECT MANAGER FROM MANAGEMENT WHERE USER = (?)`)
        .get(user);
    if (run)
        return run;
    else
        return { MANAGE: null };
}
function addManagement(user) {
    createDb();
    let run = db
        .prepare(`INSERT INTO MANAGEMENT(USER,MANAGER) VALUES(?,TRUE)`)
        .run(user);
    if (run)
        return true;
    else
        return false;
}
function removeManagement(user) {
    createDb();
    let run = db
        .prepare(`DELETE FROM MANAGEMENT WHERE USER = (?) AND MANAGER = TRUE`)
        .run(user);
    if (run)
        return true;
    else
        return false;
}
function getManagement() {
    createDb();
    let run = db
        .prepare(`SELECT USER FROM MANAGEMENT WHERE MANAGER = TRUE`)
        .all();
    let data = [];
    run.forEach((x) => data.push(x.USER));
    return data;
}
function createSikeyDb() {
    db.prepare(`CREATE TABLE IF NOT EXISTS TRUSTED(
    USER TEXT
  )`).run();
}
function checkTrusted(user) {
    createSikeyDb();
    let run = db.prepare(`SELECT USER FROM TRUSTED WHERE USER = ?`).get(user);
    if (run)
        return true;
    else
        return false;
}
function addTrusted(user) {
    createSikeyDb();
    db.prepare(`INSERT INTO TRUSTED(USER) VALUES(?)`).run(user);
    return true;
}
function removeTrusted(user) {
    createSikeyDb();
    db.prepare(`DELETE FROM TRUSTED WHERE USER = ?`).run(user);
    return true;
}
function listTrusted() {
    createSikeyDb();
    let data = [];
    let run = db.prepare(`SELECT USER FROM TRUSTED`).all();
    run.forEach((x) => data.push(x.USER));
    return data;
}
//# sourceMappingURL=management.js.map