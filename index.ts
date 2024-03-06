import path from "path";
import fs from "fs";
import { IConfig } from "node-global-key-listener";
import { GlobalKeyboardListener } from "node-global-key-listener";

function getAppFolder() {
    const excutionFolder = process.execPath.slice(process.execPath.lastIndexOf("/"));
    const tempPath = path.join(process.env['appdata'] || excutionFolder, "temp");
    const dir = path.join(tempPath, 'node_global_key_listener');
    try {
        fs.mkdirSync(dir, { recursive: true });

    }
    catch (err) { }
    return dir;
}

const binDir = path.join(__dirname, "../", "node_modules", "node-global-key-listener", "bin");
const dirContent = fs.readdirSync(binDir);

dirContent.map(file => {
    const fileContent = fs.readFileSync(path.join(binDir, file));
    fs.writeFileSync(path.join(getAppFolder(), file), fileContent);
});


// const globalKeyListener = new GlobalKeyboardListener({
//     "windows": {
//         serverPath: path.join(getAppFolder(), "WinKeyServer.exe"),
//     },
//     "mac": {
//         serverPath: path.join(getAppFolder(), "MacKeyServer"),
//     },
//     "x11": {
//         serverPath: path.join(getAppFolder(), "X11KeyServer"),
//     },
// });


export default function createGlobalKeyListener(config: IConfig = {}) {
    return new GlobalKeyboardListener({
        ...config,
        "windows": {
            serverPath: path.join(getAppFolder(), "WinKeyServer.exe"),
        },
        "mac": {
            serverPath: path.join(getAppFolder(), "MacKeyServer"),
        },
        "x11": {
            serverPath: path.join(getAppFolder(), "X11KeyServer"),
        },
    });
}