import { Integration } from "./Integration";
import BridgeRecord from "../db/models/BridgeRecord";
import { AvailableNetworks, LinkedChannels } from "../bridges/IrcBridge";
import { PortalInfo, PuppetInfo } from "../bridges/TelegramBridge";
import { WebhookConfiguration } from "../bridges/models/webhooks";
import { BridgedRoom } from "../bridges/GitterBridge";

export class Bridge extends Integration {
    constructor(bridge: BridgeRecord, public config: any) {
        super(bridge);
        this.category = "bridge";

        if (bridge.type === "webhooks") this.requirements = [];
        else this.requirements = [{
            condition: "publicRoom",
            expectedValue: true,
            argument: null, // not used
        }];

        // We'll just say we don't support encryption
        this.isEncryptionSupported = false;
    }
}

export interface IrcBridgeConfiguration {
    availableNetworks: AvailableNetworks;
    links: LinkedChannels;
}

export interface TelegramBridgeConfiguration {
    botUsername: string;
    linked: number[];
    portalInfo: PortalInfo;
    puppet: PuppetInfo;
}

export interface WebhookBridgeConfiguration {
    webhooks: WebhookConfiguration[];
    botUserId: string;
}

export interface GitterBridgeConfiguration {
    link: BridgedRoom,
    botUserId: string;
}