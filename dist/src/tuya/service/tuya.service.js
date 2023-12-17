"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchStatus = void 0;
const tuya_connector_nodejs_1 = require("@tuya/tuya-connector-nodejs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tuya = new tuya_connector_nodejs_1.TuyaContext({
    baseUrl: 'https://openapi.tuyaeu.com',
    accessKey: process.env.CLIENT_ID,
    secretKey: process.env.CLIENT_SECRET,
    version: 'v2'
});
/**
 * Service Methods
 */
const switchStatus = (devices) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield tuya.request({
            method: 'GET',
            path: '/v1.0/devices/' + devices[0]
        });
        const lamp = response.result;
        const currentStatus = getSwitchStatus(lamp);
        const switchPromises = devices.map((device) => __awaiter(void 0, void 0, void 0, function* () {
            yield tuya.request({
                method: 'POST',
                path: '/v1.0/devices/' + device + '/commands',
                body: {
                    commands: [
                        {
                            code: process.env.SWITCH_COMMAND,
                            value: !currentStatus
                        }
                    ]
                }
            });
            console.log(`${device} changed from ${currentStatus} to ${!currentStatus}`);
        }));
        yield Promise.all(switchPromises);
        return !currentStatus;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.switchStatus = switchStatus;
function getSwitchStatus(lamp) {
    for (const element of lamp.status) {
        if (process.env.SWITCH_COMMAND === element.code) {
            return element.value;
        }
    }
    return false;
}
