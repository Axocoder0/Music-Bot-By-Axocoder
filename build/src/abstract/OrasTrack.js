export default class OrasTrack extends Object {
    encoded;
    track;
    info;
    constructor(track) {
        super();
        this.encoded = track.encoded ? track.encoded : track.track;
        this.track = track.track ? track.track : track.track;
        this.info = track.info
            ? track.info
            : {
                identifier: track.identifier,
                isSeekable: track.isSeekable,
                author: track.author,
                length: track.length,
                isStream: track.isStream,
                position: track.position,
                title: track.title,
                uri: track.uri,
                sourceName: track.sourceName,
                requester: track.requester,
            };
    }
}
//# sourceMappingURL=OrasTrack.js.map