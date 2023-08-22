const { exec, which } = require("shelljs");
const path = require("path");
const fs = require("fs");

const PLUGIN_NAME = "MpWeixinPlugin";

const defaultOptions = {
    weixinDevToolsPath: "C:/Program Files (x86)/Tencent/微信web开发者工具",
};

let isOpen = false;

class MpWeixinPlugin {
    constructor(options = {}) {
        this.options = { ...defaultOptions, ...options };
    }
    apply(compiler) {
        const onEnd = async () => {
            if (isOpen) {
                return;
            }
            const projectPath = compiler.options.output.path;
            const weAppDevToolsPath = this.options.weixinDevToolsPath;
            console.log("");
            console.log("");
            this.modifyProjectName(projectPath);
            console.log("^O^ Try opening the Weixin Mini Program Devtools");
            console.log("");
            if (weAppDevToolsPath) {
                const cliPath = path.join(weAppDevToolsPath, "cli");
                const wxCmd = `"${cliPath}" open --project ${projectPath}`;
                exec(wxCmd);
                isOpen = true;
            } else if (which("xpack-cli")) {
                exec(`xpack-cli open weapp ${projectPath}`);
                isOpen = true;
            }
        };
        compiler.hooks.afterEmit.tapPromise(PLUGIN_NAME, onEnd);
    }
    modifyProjectName(projectPath) {
        let configFilePath = path.join(projectPath, "project.private.config.json");
        if (!fs.existsSync(configFilePath)) {
            configFilePath = path.join(projectPath, "project.config.json");
            if (!fs.existsSync(configFilePath)) {
                return;
            }
        }
        const suffix = projectPath.includes("build") ? "build" : "dev";
        const configJsonString = fs.readFileSync(configFilePath);
        const configJson = JSON.parse(configJsonString);
        configJson.projectname = `${configJson.projectname}-${suffix}`;
        fs.writeFileSync(configFilePath, JSON.stringify(configJson));
        console.log(`^O^ Change the project name to ${configJson.projectname}`);
    }
}

export default MpWeixinPlugin;
