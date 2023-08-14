# mp-weixin-webpack-plugin

## Install

```bash
npm install add @yilabao/mp-weixin-webpack-plugin --save-dev
# or
yarn add add @yilabao/mp-weixin-webpack-plugin --dev
```

## Usage

```js
// webpack.config.js:

const MpWeixinWebpackPlugin = require("@yilabao/mp-weixin-webpack-plugin");

export default {
    plugins: [new MpWeixinWebpackPlugin({ weixinDevToolsPath: "" })],
};
```
