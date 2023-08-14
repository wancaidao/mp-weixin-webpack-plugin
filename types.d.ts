import type { Compiler, WebpackPluginInstance } from "webpack";

interface Options {
    weixinDevToolsPath?: string;
}

declare class MpWeixinPlugin implements WebpackPluginInstance {
    constructor(options?: Options);
    apply(compiler: Compiler): void;
}

export default MpWeixinPlugin;
