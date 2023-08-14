const { exec, which } = require("shelljs");
const path = require("path");

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
            console.log("^O^ Try opening the Weixin Mini Program Devtools");
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
}

export default MpWeixinPlugin;
