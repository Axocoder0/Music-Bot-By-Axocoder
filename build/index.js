import { ClusterManager, HeartbeatManager, ReClusterManager, messageType, } from "discord-hybrid-sharding";
import OrasConfig from "./src/setting/Config.js";
const Config = new OrasConfig();
const manager = new ClusterManager("./build/src/oras.js", {
    totalClusters: "auto",
    totalShards: "auto",
    respawn: true,
    token: Config.token,
    shardsPerClusters: 7,
    mode: "process",
    restarts: { max: 5, interval: 60000 * 60 },
    spawnOptions: {
        amount: "auto",
        delay: 10000,
        timeout: -1,
    },
});
manager.extend(new HeartbeatManager({
    interval: 2000,
    maxMissedHeartbeats: 5,
}));
manager.extend(new ReClusterManager());
manager.on("clusterReady", (cluster) => console.log(`Kronix | Cluster ready :${cluster.id}`));
manager.on("clusterCreate", (cluster) => {
    cluster.on("message", (message) => {
        console.log(message);
        if (message?._type !== messageType.CUSTOM_REQUEST)
            return;
        message.reply({
            content: `Kronix | Hello Boii`,
        });
        setInterval(() => {
            cluster.send({ content: `Kronix | I am Alive!` });
            cluster
                .request({ content: `Kronix | Are you alive?`, alive: true })
                .then((e) => console.log(e));
        }, 5000);
    });
    console.log(`Kronix | Cluster is Created: ${cluster.id}`);
});
manager.on("debug", (info) => console.info(`Kronix | `,info));
manager.spawn();
process.on("unhandledRejection", async (e) => {
    console.log("Kronix | ", e);
});
//# sourceMappingURL=index.js.map