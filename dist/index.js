"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGlobalKeyListener = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const node_global_key_listener_1 = require("node-global-key-listener");
function getAppFolder() {
    const excutionFolder = process.execPath.slice(process.execPath.lastIndexOf("/"));
    const tempPath = path_1.default.join(process.env['appdata'] || excutionFolder, "temp");
    const dir = path_1.default.join(tempPath, 'node_global_key_listener');
    try {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    catch (err) { }
    return dir;
}
const binDir = path_1.default.join(__dirname, "../", "../", "node-global-key-listener", "bin");
const binDir2 = path_1.default.join(__dirname, "../", "node_modules", "node-global-key-listener", "bin");
try {
    const dirContent = fs_1.default.readdirSync(binDir);
    dirContent.map(file => {
        const fileContent = fs_1.default.readFileSync(path_1.default.join(binDir, file));
        fs_1.default.writeFileSync(path_1.default.join(getAppFolder(), file), fileContent);
    });
}
catch (err) {
    try {
        const dirContent = fs_1.default.readdirSync(binDir2);
        dirContent.map(file => {
            const fileContent = fs_1.default.readFileSync(path_1.default.join(binDir2, file));
            fs_1.default.writeFileSync(path_1.default.join(getAppFolder(), file), fileContent);
        });
    }
    catch (err) {
        throw new Error("cannot find node-global-key-listener servers !");
    }
}
function createGlobalKeyListener(config = {}) {
    return new node_global_key_listener_1.GlobalKeyboardListener(Object.assign(Object.assign({}, config), { "windows": {
            serverPath: path_1.default.join(getAppFolder(), "WinKeyServer.exe"),
        }, "mac": {
            serverPath: path_1.default.join(getAppFolder(), "MacKeyServer"),
        }, "x11": {
            serverPath: path_1.default.join(getAppFolder(), "X11KeyServer"),
        } }));
}
exports.createGlobalKeyListener = createGlobalKeyListener;
