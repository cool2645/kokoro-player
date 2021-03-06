import { css } from 'lit-element'

export const waveStyle = css`
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
    bottom: 0;
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
    animation: move_wave 6s linear infinite;
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

export const sharedPageStyle = css`
  .demo {
    height: 100%;
    position: relative;
  }
  .source {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 800px;
    padding: 100px 10px;
    margin: 0 auto;
  }
  .content {
    height: 100%;
    z-index: 100;
    position: relative;
  }
  .main {
    height: calc(100% - 140px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .landing {
    max-width: 800px;
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding: 10px;
  }
  h1 {
    margin: 1em auto;
  }
`
