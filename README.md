# Chrome extention Counter

[![Join the chat at https://gitter.im/yajamon/chrome-ext-counter](https://badges.gitter.im/yajamon/chrome-ext-counter.svg)](https://gitter.im/yajamon/chrome-ext-counter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Setup

```bash
npm install
npm run build
```

The build writes the unpacked Manifest V3 extension to `dest/`. To try it in
Chrome, open `chrome://extensions`, enable Developer mode, choose **Load
unpacked**, and select `dest/`. Run `npm run watch` while developing to rebuild
when source files change.
