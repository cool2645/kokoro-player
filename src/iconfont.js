import { css } from 'lit-element'

export const iconfont = css`
  .icon {
    font-family: "iconfont" !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-check:before {
    content: "\\e63f";
  }

  .icon-lock:before {
    content: "\\e62e";
  }

  .icon-font-smaller:before {
    content: "\\e635";
  }

  .icon-font-larger:before {
    content: "\\e6fe";
  }

  .icon-font-color:before {
    content: "\\e62d";
  }

  .icon-note:before {
    content: "\\e6ce";
  }

  .icon-clear:before {
    content: "\\e6d8";
  }

  .icon-warn:before {
    content: "\\e613";
  }

  .icon-ok:before {
    content: "\\e645";
  }

  .icon-right:before {
    content: "\\e62b";
  }

  .icon-left:before {
    content: "\\e605";
  }

  .icon-close:before {
    content: "\\e602";
  }

  .icon-lyrics:before {
    content: "\\e61b";
  }
  
  .icon-lyrics-on {
    position: relative;
    line-height: 1;
  }

  .icon-lyrics-on:before {
    content: "\\e61b";
  }

  .icon-lyrics-on:after {
    content: "\\e63f";
    font-size: 1em;
    transform: scale(0.4);
    transform-origin: bottom right;
    position: absolute;
    right: 0.1em;
    bottom: 0;
    line-height: 1;
  }

  .icon-volume:before {
    content: "\\e606";
  }

  .icon-pause-solid:before {
    content: "\\e6b3";
  }

  .icon-play-solid:before {
    content: "\\e603";
  }

  .icon-playlist:before {
    content: "\\e601";
  }

  .icon-solo:before {
    content: "\\e622";
  }

  .icon-shuffle:before {
    content: "\\e609";
  }

  .icon-loop:before {
    content: "\\e60c";
  }

  .icon-pause:before {
    content: "\\e60e";
  }

  .icon-play:before {
    content: "\\e6ee";
  }

  .icon-back:before {
    content: "\\e65e";
  }

  .icon-next:before {
    content: "\\e663";
  }

  .icon-previous:before {
    content: "\\e664";
  }

  .icon-pause-circle:before {
    content: "\\e666";
  }

  .icon-play-circle:before {
    content: "\\e667";
  }

  .icon-menu:before {
    content: "\\e60a";
  }

  .icon-play-next:before {
    content: "\\e786";
  }
`
