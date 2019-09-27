import { LitElement, html, css } from 'lit-element'

class SoloPage extends LitElement {
  static get styles () {
    return css`
      .demo {
        height: 100%;
        background: linear-gradient(315deg, #24354E, #04142D);
        position: relative;
      }
      .source {
        height: 700px;
      }
      .content {
        z-index: 100;
        position: relative;
      }
      @keyframes move_wave {
        0% {
            transform: translateX(0) translateZ(0) scaleY(1)
        }
        50% {
            transform: translateX(-25%) translateZ(0) scaleY(0.55)
        }
        100% {
            transform: translateX(-50%) translateZ(0) scaleY(1)
        }
      }
      .waveWrapper {
          overflow: hidden;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          margin: auto;
      }
      .waveWrapperInner {
          position: absolute;
          width: 100%;
          overflow: hidden;
          height: 100%;
          bottom: 0px;
      }
      .bgTop {
          z-index: 15;
          opacity: 0.5;
      }
      .bgMiddle {
          z-index: 10;
          opacity: 0.75;
      }
      .bgBottom {
          z-index: 5;
      }
      .wave {
          position: absolute;
          left: 0;
          width: 200%;
          height: 100%;
          background-repeat: repeat no-repeat;
          background-position: 0 bottom;
          transform-origin: center bottom;
      }
      .waveTop {
          background-size: 50% 100px;
      }
      .waveAnimation .waveTop {
        animation: move-wave 3s;
         -webkit-animation: move-wave 3s;
         -webkit-animation-delay: 1s;
         animation-delay: 1s;
      }
      .waveMiddle {
          background-size: 50% 120px;
      }
      .waveAnimation .waveMiddle {
          animation: move_wave 10s linear infinite;
      }
      .waveBottom {
          background-size: 50% 100px;
      }
      .waveAnimation .waveBottom {
          animation: move_wave 15s linear infinite;
      }
    `
  }

  render () {
    return html`
      <div class="demo waveAnimation">
        <div class="content">
          <nav-bar .location=${this.location} color="#fff"></nav-bar>
          <h1>Solo Page</h1>
          <kokoro-provider>
            <kokoro-player></kokoro-player>
          </kokoro-provider>
        </div>
        <div class="waveWrapperInner bgTop">
          <div class="wave waveTop" style="background-image: url('https://i.loli.net/2019/09/27/DgOiUhxQM69RlWL.png')"></div>
        </div>
        <div class="waveWrapperInner bgMiddle">
          <div class="wave waveMiddle" style="background-image: url('https://i.loli.net/2019/09/27/2Y3j86Mznb5tRwX.png')"></div>
        </div>
        <div class="waveWrapperInner bgBottom">
          <div class="wave waveBottom" style="background-image: url('https://i.loli.net/2019/09/27/GmvokX216OyHr7Q.png')"></div>
        </div>
      </div>
      <div class="source">
      
      </div>
    `
  }
}

window.customElements.define('solo-page', SoloPage)
