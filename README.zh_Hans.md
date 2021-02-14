# 💘 Kokoro Player

[![Version](https://flat.badgen.net/npm/v/kokoro-player)](https://npmjs.com/package/kokoro-player)
[![Gzipped Bundle Size](https://flat.badgen.net/bundlephobia/minzip/kokoro-player)](https://bundlephobia.com/result?p=kokoro-player)
[![JavaScript Style Guide](https://flat.badgen.net/badge/code%20style/standard/green)](https://standardjs.com)
[![Gitmoji](https://flat.badgen.net/badge/gitmoji/%F0%9F%98%9C%20%F0%9F%98%8D/FFDD67)](https://gitmoji.carloscuesta.me)

Kokoro 是日语，写作汉字“心”，读作 /ko̞ko̞ɺo̞/ 时是心灵的意思。因此中文名取作“心铃”，希望能藉此向网站的读者传达出心声。

## 演示与使用

[Kokoro Player 演示](https://kokoro-player.js.org)

[Kokoro API 文档](https://kokoro.js.org)

所有可用的属性在展示界面的示例里都有提到，我相信这两个足够使用了。

如果是不熟悉 JavaScript 生态的开发者，不知道该如何安装的，可以使用 script 标签引入：

```html
<script src="//unpkg.com/kokoro-player/dist/kokoro-player.min.js"></script>
```

## 背景与使用场景

**Kokoro 播放器是我构思了两年多，专门为博客的应用场景打造的作品。** 这期间除了工作学习忙碌耽搁以外，我一直在思考，真正适合 Web 浏览的音乐播放器，体验是怎样的。很高兴现在它终于做出了一点眉目，能够与大家分享和展示我的思考。

**Kokoro 是专为 PJAX（pushState + AJAX） 和 SPA（Single Page Application） 而生的。** 在现代 Web 前端设计里，一般认为通过 AJAX 从后台异步拉取数据，结合 JavaScript 对页面文档进行更改，以及通过浏览器的 History API 来修改路由状态，比传统网站直接跳转到新的 URI 有更快的响应速度，用户心理等待时间也更短，作为一个应用在体验上也更为优雅。在我们当前讨论的上下文里，更重要和令人惊喜的是，它不会完全破坏 Web 应用的状态，比如，让已经播放了的音乐可以继续放。

现在，设想在某时某刻读者在网站上播放了一首音乐。当读者读完这篇文章以后，或许他还想再去读下一篇，或者回到文章列表去看看。如果你的网站使用“硬”的路由跳转，你可能没法享受 Kokoro 带来的绝大多数好处，音乐播放一定会中止，因为网页刷新了。但如果你已经使用了带有 PJAX 或 SPA 架构的主题，那么恭喜你，读者不必纠结是该在这页面上等着把歌继续听完，还是不听了，因为他可以把歌曲带到下一篇文章去。

然而，在我已经发现了的范围里，流行的音乐播放器（如 [aplayer](https://github.com/DIYgod/APlayer)），大多是把实例直接绑定到 DOM 上的，即初始化构造时就需要选择 DOM。这给实现音乐播放器状态的跨页面保持带来了一些麻烦：有些框架，如 [VuePress](https://vuepress.vuejs.org) 或 [Gatsby](https://gatsbyjs.com/)，为了方便实现预渲染，并没有暴露出路由以外的文档给用户定义。用户定义的内容在路由切换时会被全部卸载。为了让播放器的状态保持，就需要自己通过 DOM API 绕过框架的限制，把播放器的 DOM 注入到路由节点之外，这种做法是怪异而有潜在危险的。

此外，我发现博客中嵌入音乐的形式通常有两种。一种是在全局嵌入，播放器位于页面的一角，如我所说，站长期望读者在整个浏览的期间都有音乐相伴。另一种则是，在文章中嵌入，一篇文章写着写着出现一个音乐播放器，作者认为此时此刻这首歌和文章的主题十分切合，期待读者在这时听这首歌。在传统的实例和 DOM 绑定的实现中，这两种形式是不相容的，因为不同的播放器实例有独立的 UI 和 audio 标签，它们的状态互不干扰，如果同时播放音乐会导致混乱。我见过的博客里，站长要么选择整个网站页面的一角有一个播放器，要么选择内嵌播放器到文章的文档流里。但我认为两方面的需求应该是都存在，并且不互斥的。

## 特性与优势

**功能完整，不亚于原生音乐软件。** Kokoro Player 拥有完整的，不亚于原生平台音乐软件的强大功能。播放列表、顺序播放、循环播放、随机播放、插队播放、滚动歌词和桌面歌词等功能一应俱全。

**UI 和实例解耦，适合博客场景。** Kokoro 通过依赖注入的方式来实现 UI 组件和播放器实例的解耦，并且使用 redux 来对状态进行统一的管理，方便 UI 组件的订阅和操作。得益于此，基于 Kokoro API 编写 UI 是一件十分简单的事，并且 UI 和 UI 之间可以方便地共存和联动。Kokoro Player 组件库中提供了三个组件：单曲卡片、歌单卡片和播放器。前两者用于嵌入文档流中，展示可播放的歌曲使用。后者则为用户在整个使用过程中提供操作音乐播放的接口。网站开发者可以自由定义它们操控的播放器实例（通常需要所有 UI 组件都连接到一个实例），并且可以随时解除连接或连接到其他实例。

**轻量，可用于所有框架。** 在渲染引擎选型上，因为播放器基本不需要考虑 SSR （Server Side Render），也不考虑跨平台重用的情况下，为了能在使用各种渲染引擎的网站中都有良好的体验（即最终 bundle 大小比较小），Kokoro Player 选择了轻量级的模板引擎 lit-html，所有三个组件加上图标字体加上 Kokoro 播放器内核总共 gzip 之后只有约 40K。同时 LitElement 提供的 Web Component 封装能够使得用户无需任何额外开发，在 Markdown 文档中就能够轻松引入 Kokoro Player 卡片。

**设计现代，移动友好。** 在设计上，不同于部分 Web 音乐播放器（如 [aplayer](https://github.com/DIYgod/APlayer)、[cplayer](https://github.com/MoePlayer/cPlayer)）那小巧、精致的设计，Kokoro Player 采用了高度现代化、移动端优先的设计：按钮比较大，用面板切换代替浮动控件等等。这些都是专为触摸场景而优化的：毕竟如今人们主要的操控方式是触摸，即使在大屏幕上，也可能是平板或触屏电脑。Kokoro Player 在交互上是极为触摸友好的，不仅如此，还为小屏幕打造了专门的一套 UI，让用户在手机上也能体验到为移动场景精心设计的交互。Kokoro Player 卡片能够自动适应不同宽度的各种文档，既可以嵌入到文章中，也可以放在你网站的一角作为装饰。

**局限性。** 为了实现上面的响应特性和使用的便捷性，Kokoro Player 大量使用了 ResizeObserver 以及 Web Component 的 API。因此，它只能工作在现代浏览器中。

## 致谢

为 Kokoro 的设想提供帮助的项目

+ [Redux](https://redux.js.org/)
+ [Polymer](https://www.polymer-project.org/)
+ [wc-context](https://github.com/blikblum/wc-context)

为 Kokoro 播放器 UI 提供设计灵感的项目

- [MUSE](https://github.com/moefront/muse)

- 网易云音乐桌面版

- 网易云音乐 Android 版

- QQ音乐 Android 版
- Android Oreo 媒体通知栏
