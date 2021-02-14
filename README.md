# 💘 Kokoro Player

[![Version](https://flat.badgen.net/npm/v/kokoro-player)](https://npmjs.com/package/kokoro-player)
[![Gzipped Bundle Size](https://flat.badgen.net/badgesize/gzip/cool2645/kokoro-player/master/dist/kokoro-player.min.js)](https://bundlephobia.com/result?p=kokoro-player)
[![JavaScript Style Guide](https://flat.badgen.net/badge/code%20style/standard/green)](https://standardjs.com)
[![Gitmoji](https://flat.badgen.net/badge/gitmoji/%F0%9F%98%9C%20%F0%9F%98%8D/FFDD67)](https://gitmoji.carloscuesta.me)

[中文文档](./README.zh_Hans.md)

Kokoro is a Japanese word which means heart. Kokoro player symbolizes the voices coming from the heart.

## Install

```html
<script src="//unpkg.com/kokoro-player/dist/kokoro-player.min.js"></script>
```

## Demo and Usage

[Kokoro Player Demo](https://kokoro-player.js.org)

[Kokoro API Documentation](https://kokoro.js.org)

## Features

**Powerful.** Kokoro Player has complete, powerful functions no less than native platform music software. Playlist, play orders, scrolling lyrics and desktop lyrics are all available.

**Kokoro is designed for PJAX (pushState + AJAX) and SPA (Single Page Application).** Now, imagine that a reader plays a piece of music on the website at a certain moment. When the reader finishes reading this article and navigates to another page, if your website uses "hard" routing, the music playback will definitely stop because the web page refreshes. But if you have used a theme with PJAX or SPA architecture, congratulations, readers won't be entangled with whether to finish listening the song on this page or say goodbye to the song and go to next page, because with Kokoro, the song is ready to go.

**UI and instances are decoupled, specially designed for blog scenarios.** Kokoro implements the decoupling of UI components and player instances through dependency injection, and uses redux to manage the state uniformly, which facilitates the subscription and operation of UI components. Thanks to this, writing UI based on Kokoro API is a very simple matter, and UI and UI can easily coexist and link. The Kokoro Player component library provides three kind of components: single card, playlist card and player. The first two are used to embed in the document flow. The latter provides users with an interface to operate music playback during the entire navigation. Website developers can freely define the player instance the UI components control (usually all UI components should be connected to one instance), and can disconnect or connect to other instances at any time.

**Lightweight.** In terms of rendering engine selection, in order to have a good experience in websites using various frameworks, Kokoro Player uses the lightweight template engine lit-html. All three components, with icon fonts and Kokoro player kernel, totally take about 40K gzipped. Besides, the Web Component encapsulation provided by LitElement enables users to easily introduce Kokoro Player cards in Markdown documents, without any additional development.

**Modern design and mobile friendly.** In terms of design, different from the small and exquisite design of some Web music players (such as [aplayer](https://github.com/DIYgod/APlayer), [cplayer](https://github.com/MoePlayer/cPlayer)), Kokoro Player adopts a highly modern, mobile-first design: the buttons are relatively large, and the panel switch is used instead of floating controls, etc. These are optimized for touch scenes: after all, the most popular interaction is touch nowadays, even on a large screen, it might be a tablet or touch screen computer. Kokoro Player is extremely touch-friendly, not only that, it also comes with a responsive UI for small screens. Kokoro Player cards can automatically adapt to various documents of different widths. They can be embedded in articles or placed in some corner of your website.

**Limitation.** In order to achieve the above responsive features and ease of use, Kokoro Player extensively uses ResizeObserver and Web Component APIs. Therefore, it can only work in modern browsers.

## Thanks

Projects that help Kokoro's idea

+ [Redux](https://redux.js.org/)
+ [Polymer](https://www.polymer-project.org/)
+ [wc-context](https://github.com/blikblum/wc-context)

Projects that inspire Kokoro Player's UI design

- [MUSE](https://github.com/moefront/muse)

- Netease Cloud Music Desktop Edition

- Netease Cloud Music for Android

- QQ Music for Android
- Android Oreo media style notification
