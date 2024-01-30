import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder, resolvePartialEmoji, } from "discord.js";
import createId from "create-id";
import { getServerPremiumStatus, getUserPremStatus, getPremTime, getServerPremTime, getServerPrem, getActivator, deleteServerPrem, listfavs, } from "../wrapper/db/premium.js";
import { getHex, removeHex } from "../wrapper/db/embeds.js";
import { addDjRole, checkDj, createDjChannel, deleteDjChannel, getDjChannel, getDjRole, getDjSetup, getPlayerMode, playType, removeDjRole, updatePlayType, updatePlayerMode, } from "../wrapper/db/dj.js";
import { AddGlobalNp, RemoveGlobalNp, addServerNp, globalNpSelection, removeServerNp, resetNp, serverNpSelection, updatePrefix, } from "../wrapper/db/prefix.js";
import OrasTrack from "../abstract/OrasTrack.js";
import { addBypassAdmins, addBypassMods, addIgnore, checkBypassAdmins, checkBypassMods, checkIgnore, disable247, disableAutoplay, enable247, enableAutoplay, get247, getAutoplay, listIgnores, removeAdminBypass, removeBypassMods, removeIgnore, resetIgnore, } from "../wrapper/db/settings.js";
import prettyMilliseconds from "pretty-ms";
export default class OrasUtils {
    client;
    constructor(client) {
        this.client = client;
    }
    embed() {
        return new EmbedBuilder().setColor(this.client.config.color);
    }
    successEmbed() {
        return new EmbedBuilder().setColor("#33ff00");
    }
    errorEmbed() {
        return new EmbedBuilder().setColor("#ff0e00");
    }
    premiumEmbed(guildID) {
        if (this.checkServerPrem(guildID) === false &&
            this.checkServerPremStatus(guildID) === false) {
            removeHex(guildID);
            return new EmbedBuilder().setColor(this.client.config.color);
        }
        else {
            try {
                let hex = getHex(guildID);
                if (hex.HEXCODE === null)
                    return new EmbedBuilder().setColor(this.client.config.color);
                else
                    return new EmbedBuilder().setColor(hex.HEXCODE ? hex.HEXCODE : this.client.config.color);
            }
            catch (e) {
                removeHex(guildID);
                return new EmbedBuilder().setColor(this.client.config.color);
            }
        }
    }
    genPremId() {
        let prefix = "Ajju_";
        let suffix = "_Akshu";
        let length = 10;
        return createId(prefix, suffix, length);
    }
    checkUserPrem(id) {
        let stat = getUserPremStatus(id);
        if (stat.USER === null)
            return false;
        else
            return true;
    }
    checkServerPremStatus(id) {
        let stat = getServerPremiumStatus(id);
        if (stat.STATUS === 1)
            return true;
        else
            return false;
    }
    checkPremTime(id) {
        let stat = getPremTime(id);
        if (stat.TIME === 0)
            return 0;
        else
            return stat.TIME;
    }
    checkServerPremTime(id) {
        let stat = getServerPremTime(id);
        if (stat.TIME === null)
            return 0;
        else
            return stat.TIME;
    }
    checkServerPrem(id) {
        let check = getServerPrem(id);
        if (check.SERVER !== null)
            return true;
        else
            return false;
    }
    checkActivator(id) {
        let check = getActivator(id);
        if (check.USER !== null)
            return check.USER;
        else
            return null;
    }
    deleteServerPrem(id) {
        deleteServerPrem(id);
        return true;
    }
    actionRow(components) {
        return new ActionRowBuilder().addComponents(components);
    }
    button(base, label, style, customId, url, emoji) {
        if (base === "custom_id") {
            let button = new ButtonBuilder().setCustomId(customId).setStyle(style);
            if (emoji !== undefined && emoji !== null && resolvePartialEmoji(emoji))
                button.setEmoji(emoji);
            if (label !== null && label !== undefined)
                button.setLabel(label);
            return button;
        }
        else if (base === "link") {
            let button = new ButtonBuilder().setLabel(label).setURL(url).setStyle(5);
            if (emoji !== undefined && emoji !== null && resolvePartialEmoji(emoji))
                button.setEmoji(emoji);
            return button;
        }
    }
    menuOption(label, emoji, description, value) {
        const ob = {
            label: label,
            description: description,
            value: value,
        };
        if (emoji !== null && emoji !== undefined && resolvePartialEmoji(emoji))
            ob.emoji = emoji;
        return ob;
    }
    menu(placeholder, customId, options) {
        return new StringSelectMenuBuilder()
            .setCustomId(customId)
            .setPlaceholder(placeholder)
            .setOptions(options);
    }
    getPlayerMode(id) {
        let get = getPlayerMode(id);
        return get.MODE;
    }
    updatePlayerMode(id, mode) {
        updatePlayerMode(id, mode);
        return true;
    }
    checkDjSetup(id) {
        let get = checkDj(id);
        if (get === true)
            return true;
        else
            return false;
    }
    djSetupChannel(id) {
        let get = getDjChannel(id);
        return get.CHANNEL;
    }
    addGlobalNp(id, res) {
        AddGlobalNp(id, res);
        return true;
    }
    removeGlobalNp(id) {
        RemoveGlobalNp(id);
        return true;
    }
    checkGlobalNp(id) {
        if (globalNpSelection(id) === true)
            return true;
        else
            return false;
    }
    checkGuildNp(guildId, user) {
        let check = serverNpSelection(user, guildId);
        if (check === true)
            return true;
        else
            return false;
    }
    addGuildNp(guild, user, reason) {
        addServerNp(user, guild, reason);
        return true;
    }
    removeGuildNp(user, guild) {
        removeServerNp(user, guild);
        return true;
    }
    createDj(guildId, channelId, messageId) {
        createDjChannel(guildId, channelId, messageId);
        return true;
    }
    deleteDj(guildId) {
        deleteDjChannel(guildId);
        return true;
    }
    getDj(guildId) {
        let get = getDjSetup(guildId);
        if (get.CHANNEL !== null && get.MESSAGE !== null)
            return get;
        else
            return null;
    }
    getdjrole(guildId) {
        let get = getDjRole(guildId);
        if (get.ROLE !== null)
            return get.ROLE;
        else
            return null;
    }
    addDjRole(guild, role) {
        addDjRole(guild, role);
        return true;
    }
    deleteDjRole(guild) {
        removeDjRole(guild);
        return true;
    }
    getPlay(guild) {
        let get = playType(guild);
        if (get.TYPE === null) {
            this.updatePlay(guild, "buttons");
            return null;
        }
        else
            return get.TYPE;
    }
    updatePlay(guild, type) {
        updatePlayType(guild, type);
        return;
    }
    checkUrl(x) {
        try {
            new URL(x);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    track(tr) {
        return new OrasTrack(tr);
    }
    resetNoPrefix() {
        return resetNp();
    }
    findFavs(user, track) {
        let list = listfavs(user);
        if (list.includes(track.info.title))
            return true;
        else
            return false;
    }
    getAutoPlay(guild) {
        if (getAutoplay(guild).SETTING === 1)
            return true;
        else
            return false;
    }
    updateAutoPlay(guild) {
        if (getAutoplay(guild).SETTING === 1) {
            disableAutoplay(guild);
            return false;
        }
        else {
            enableAutoplay(guild);
            return true;
        }
    }
    get247(guild) {
        let get = get247(guild);
        if (get.SETTING === 1)
            return true;
        else
            return false;
    }
    disable247(guild) {
        disable247(guild);
        return true;
    }
    updatePrefix(guild, prefix) {
        updatePrefix(guild, prefix);
        return true;
    }
    enable247(guild, voiceId, textId) {
        enable247(guild, voiceId, textId);
        return true;
    }
    humanize(duration) {
        return prettyMilliseconds(duration, { colonNotation: true });
    }
    removeServerNp(user, guild) {
        removeServerNp(user, guild);
        return true;
    }
    attachment(attach) {
        return new AttachmentBuilder(attach)
            .setDescription(`Arjun Is God`)
            .setName(`Kronix.png`);
    }
    checkIgnore(guild, channel) {
        let check = checkIgnore(channel, guild);
        if (check === true)
            return true;
        else
            return false;
    }
    addIgnore(guild, channel) {
        addIgnore(channel, guild);
        return;
    }
    removeIgnore(guild, channel) {
        removeIgnore(channel, guild);
        return;
    }
    getIgnoreList(guild) {
        return listIgnores(guild);
    }
    checkBypassAdmins(guild) {
        let check = checkBypassAdmins(guild);
        if (check.BYPASS_ADMINS === 1)
            return true;
        return false;
    }
    checkBypassMods(guild) {
        let check = checkBypassMods(guild);
        if (check.BYPASS_MODS === 1)
            return true;
        return false;
    }
    addBypassAdmins(guild) {
        addBypassAdmins(guild);
        return;
    }
    removeBypassAdmins(guild) {
        removeAdminBypass(guild);
        return;
    }
    addBypassMods(guild) {
        addBypassMods(guild);
        return;
    }
    removeBypassMods(guild) {
        removeBypassMods(guild);
        return;
    }
    resetIgnore(guild) {
        resetIgnore(guild);
        return;
    }
}
//# sourceMappingURL=Utils.js.map