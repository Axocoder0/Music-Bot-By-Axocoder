import EventEmitter from "events";
export default class OrasEvent extends EventEmitter {
    client;
    name;
    constructor(client) {
        super();
        this.client = client;
    }
}
//# sourceMappingURL=OrasEvent.js.map