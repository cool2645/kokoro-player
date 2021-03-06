import { html, css } from 'lit-element'

import { waveStyle, sharedPageStyle } from './style'
import Locale from './locale'

class PlaylistPage extends Locale {
  static get properties () {
    return {
      connected: { type: Boolean },
      flatMode: { type: Boolean },
      showTitle: { type: Boolean },
      darkMode: { type: Boolean }
    }
  }

  constructor () {
    super()
    this.connected = true
    this.flatMode = false
    this.showTitle = true
    this.darkMode = false
  }

  toggleConnect () {
    this.connected = !this.connected
    if (this.connected) {
      this.shadowRoot.querySelectorAll('kokoro-provider').forEach((provider) => {
        provider.connect(window.player)
      })
    } else {
      this.shadowRoot.querySelectorAll('kokoro-provider').forEach((provider) => {
        provider.disconnect()
      })
    }
  }

  static get styles () {
    return css`
      ${waveStyle}
      ${sharedPageStyle}
      .demo {
        background: linear-gradient(315deg, #fffbf8, #fffbf0);
      }
      .main {
        color: #3e4f55;
      }
    `
  }

  firstUpdated (_) {
    this.shadowRoot.querySelector('#hanabi').songs = [{
      title: 'あめあかり',
      artist: 'なぎ',
      album: 'あめあかり',
      src: 'https://cdn.innocent.love/%E3%81%AA%E3%81%8E%20-%20%E3%81%82%E3%82%81%E3%81%82%E3%81%8B%E3%82%8A.mp3',
      cover: 'https://cdn.innocent.love/%E3%81%AA%E3%81%8E%20-%20%E3%81%82%E3%82%81%E3%81%82%E3%81%8B%E3%82%8A.jpg',
      lyrics: {
        type: 'lrc',
        value: `[00:00.000]作詞：なぎ
[00:00.505]作曲：なぎ
[00:01.10]夜の足音から逃げるように
[00:06.17]部屋の隅っこで鍵をかけた
[00:10.42]屋根が刻む雨音 君の吐息
[00:15.81]空っぽの 右手はまだ冷たいまま
[00:44.42]誰もいない終わりが始まる街
[00:49.49]凍る息も雨に溶けていく
[00:54.11]記憶を千切って燈した灯も
[00:59.28]少しずつ夜が飲み込んでいく
[01:04.61]君が雨に濡れないようにね
[01:09.66]開いた傘はまだ渡せないまま
[01:15.03]残酷なほど綺麗なセカイに
[01:20.44]君の声は 深く沈んでいく
[01:28.48]僕の声 雨にも涙にも
[01:33.70]滲まない唄 きっと雲を切り裂いてく
[01:39.15]世界中に響いて 遠く悠（とお）く
[01:44.89]君の泪雨が降り止みますように
[01:50.66]何度も何度も 君がいる方へ
[01:55.33]叫んで 喚いて 僕はここだよ
[02:00.59]落ちていく色
[02:06.22]誰にも染まらないで
[02:49.59]明日また きっと雨が降って
[02:55.05]君の声匂い温度を隠しても
[03:00.22]触れられないまま
[03:05.60]灯が消えても
[03:10.90]僕の声 雨にも涙にも
[03:16.58]滲まない唄 きっと雲を切り裂いてく
[03:21.66]世界中に届いて 遠く悠（とお）く
[03:27.39]君の泪雨が降り止みますように
[03:32.37]何度も何度も 君がいる方へ
[03:37.70]叫んで 喚いて 声が枯れても
[03:43.21]落ちていく色
[03:48.19]雨よりも
[03:53.61]透明な 音で響いて`,
        translations: [{
          lang: 'zh-Hans',
          name: '中译',
          value: `[00:00.000]作词：なぎ
[00:00.505]作曲：なぎ
[00:01.10]为了逃避夜晚来临的脚步声
[00:06.17]我躲进上了锁的房间角落
[00:10.42]屋顶刻上雨声 你的叹息
[00:15.81]空空的右手仍然冰冷无比
[00:44.42]在空无一人 结束亦是开始的街道
[00:49.49]结冰的呼吸也融化在雨里
[00:54.11]记忆化为千片 点亮了的灯也
[00:59.28]一点一滴被夜晚吞噬
[01:04.61]你好像永远不会被雨沾湿呢
[01:09.66]我始终未能递上这把开了的伞
[01:15.03]在美丽到近乎残酷的世界中
[01:20.44]你的声音 深深沉陷
[01:28.48]我的声音 是不会被这雨这泪
[01:33.70]渗透的歌声 一定能穿透云间
[01:39.15]响彻世界 遥远悠远
[01:44.89]只为了让你的泪雨能够就此停歇
[01:50.66]好几次好几次 朝向你所在的地方
[01:55.33]大叫着 呼喊着 我就在这里啊
[02:00.59]逐渐褪去的颜色
[02:06.22]请别沾染上谁
[02:49.59]明天一定还是会下起雨
[02:55.05]哪怕掩盖了你的声音气味温度
[03:00.22]你仍是无法触及的啊
[03:05.60]即便这盏灯就此熄灭
[03:10.90]我的声音 是不会被这雨这泪
[03:16.58]渗透的歌声 一定能穿透云间
[03:21.66]传遍世界 遥远悠远
[03:27.39]只为了让你的泪雨能够就此停歇
[03:32.37]好几次好几次 朝向你所在的地方
[03:37.70]大叫着 呼喊着 哪怕声音枯竭
[03:43.21]逐渐褪去的颜色
[03:48.19]比起雨水
[03:53.61]更加透明的声音响起`
        }, {
          lang: 'phonetic-latin',
          name: 'Rōmaji',
          value: `[00:01.10]yoru no ashioto kara nigeru yō ni
[00:06.17]heya no sumikko de kagi o kaketa
[00:10.42]yane ga kizamu amaoto kimi no toiki
[00:15.81]karappo no migite wa mada tsumetai mama
[00:44.42]daremoinai owari ga hajimaru machi
[00:49.49]kōru iki mo ame ni tokete iku
[00:54.11]kioku o chigi tte tomoshita akari mo 
[00:59.28]sukoshizutsu yoru ga nomikonde iku
[01:04.61]kimi ga ame ni nurenai yō ni ne
[01:09.66]hiraita kasa wa mada watasenai mama
[01:15.03]zankokuna hodo kireina sekai ni
[01:20.44]kiminokoe wa fukaku shizunde iku
[01:28.48]boku no koe ame ni mo namida ni mo
[01:33.70]nijimanai uta kitto kumo o kirisaite ku
[01:39.15]sekaijū ni hibii te tōku tōku
[01:44.89]kimi no namidaame ga furi yamimasu yō ni 
[01:50.66]nandomonandomo kimi ga iru hō e
[01:55.33]sakende wameite boku wa kokoda yo
[02:00.59]ochiteiku-iro
[02:06.22]darenimo somaranaide
[02:49.59]ashita mata kitto ame ga futte
[02:55.05]kiminokoe nioi ondo o kakushite mo
[03:00.22]fure rarenai mama
[03:05.60]akari ga kiete mo
[03:10.90]boku no koe ame ni mo namida ni mo
[03:16.58]nijimanai uta kitto kumo o kirisaite ku
[03:21.66]sekaijū ni todoi te tōku tōku
[03:27.39]kimi no namidaame ga ori yamimasu yō ni
[03:32.37]nandomonandomo kimi ga iru hō e 
[03:37.70]sakende wameite koe ga karete mo
[03:43.21]ochiteiku-iro
[03:48.19]ame yori mo
[03:53.61]tōmeina oto de hibiite`
        }]
      }
    }, {
      title: '君だったら',
      artist: 'HAPPY BIRTHDAY',
      album: '今夜きみが怖い夢を見ませんように',
      src: 'https://cdn.innocent.love/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.mp3',
      cover: 'https://cdn.innocent.love/HAPPY%20BIRTHDAY%20-%20%E5%90%9B%E3%81%A0%E3%81%A3%E3%81%9F%E3%82%89.jpg',
      primaryColor: '#0f0000',
      secondaryColor: '#221718',
      backgroundColor: '#8d7d87',
      lyrics: {
        type: 'lrc',
        value: `[00:00.00]作詞：坂口喜咲
[00:01.00]作曲：坂口喜咲
[00:06.64]HAPPY BIRTHDAY - 君だったら
[00:12.33]ずっとしたかったことはついに
[00:20.24]君とはできないままとうとう終わりました
[00:26.63]日付けが変わる頃に手をつないでコンビニへ歩く
[00:35.65]わたしの隣に違う人が居るよ
[00:44.10]「愛してる」と言われても君じゃないから
[00:51.22]わたしは上手に笑うことができない
[00:58.21]一度もそのことばを口にしなかった君を君を
[01:06.86]わたしは忘れられずに居るよ
[01:15.31]新しい恋人と抱き合っているときも
[01:22.68]キスをしている時でも君を思い出すから
[01:33.53][01:40.29][01:47.32][02:56.79][03:03.86][03:10.76][03:52.45][03:59.43][04:06.08][04:20.52][04:27.05][04:34.26]君だったら君だったら
[01:36.69][03:00.23][03:55.88][04:23.63]今ここに居るのが
[01:43.67][03:07.12][04:02.78]どんなによかったか
[01:50.65][03:14.14]わたしはしあわせだったのに
[01:55.51][03:18.84][04:42.68]そんなことばかり考えてしまう
[02:08.01]長い時間が過ぎても何故
[02:15.06]君のことばかり考えてしまうのか
[02:22.06]こころを許しきった君の朝方のまなざしを
[02:30.28]今でも追いかけて夢見ているよ
[02:39.16]新しい恋人と誕生日過ごしても
[02:46.07]旅行に行っても君を思い出すから
[04:09.86][04:37.53]何でも愛せたのにな
[04:14.75]そんなことばかり考えて
[04:30.70]あたしはしあわせだったのに`,
        translations: [{
          lang: 'zh-Hans',
          name: '中译',
          value: `[00:00.00]作词：坂口喜咲
[00:01.00]作曲：坂口喜咲
[00:06.64]HAPPY BIRTHDAY - 如果是你的话
[00:12.33]一直想要做的事情直到最后
[00:20.24]也没能和你一起实现就这样不了了之
[00:26.63]时至今日牵着我手走向便利店
[00:35.65]却是我身边的另一个他
[00:44.10]对我说「我爱你」的人若不是你
[00:51.22]我都不能由衷地笑出来
[00:58.21]但从未对我说出这句话的你 那样的你
[01:06.86]我却始终忘不了
[01:15.31]即便在和新的恋人相拥时
[01:22.68]又或是亲吻时总会想起你
[01:33.53][01:40.29][01:47.32][02:56.79][03:03.86][03:10.76]如果是你的话 如果是你的话
[01:36.69][03:55.88]现在在这里的人
[01:43.67][04:02.78]那该有多好啊
[01:50.65]我该有多幸福啊
[01:55.51][04:14.75]总是这样想象着
[02:08.01]再漫长的岁月流逝却不知为何
[02:15.06]总会按捺不住想起你
[02:22.06]我心心所许的你清晨注视我的眼眸
[02:30.28]如今却只能够在梦中追寻
[02:39.16]即便和新恋人一起庆生时
[02:46.07]又或是一起旅行时却又会想起你
[03:00.23]如今陪伴我身边的人
[03:07.12]那该有多么好啊
[03:14.14][04:30.70]我该是怎样的幸福
[03:18.84]总会这样幻想着
[03:52.45][03:59.43][04:06.08][04:20.52][04:27.05][04:34.26]如果是你 如果是你
[04:09.86]我便能爱上一切
[04:23.63]如今伴我左右的人
[04:37.53]我就能爱上现在的一切吧
[04:42.68]总会这样不切实际的想着`
        }, {
          lang: 'phonetic-latin',
          name: 'Rōmaji',
          value: `[00:00.00]作詞：坂口喜咲
[00:01.00]作曲：坂口喜咲
[00:06.64]HAPPY BIRTHDAY - 君だったら
[00:12.33]zutto shitakatta koto wa tsuini
[00:20.24]kimi to wa dekinai mama tōtō owarimashita
[00:26.63]hidzuke ga kawaru koro ni te o tsunaide konbini e aruku
[00:35.65]watashi no tonari ni chigau hito ga iru yo
[00:44.10]aishi teru to iwa rete mo kimi janaikara 
[00:51.22]watashi wa jōzu ni warau koto ga dekinai
[00:58.21]ichido mo sono kotoba o kuchi ni shinakatta kimi o kimi o
[01:06.86]watashi wa wasure rarezu ni iru yo
[01:15.31]atarashī koibito to dakiatte iru toki mo
[01:22.68]kisu o shite iru toki demo kimi o omoidasukara
[01:33.53][01:40.29][01:47.32][02:56.79][03:03.86][03:10.76][03:52.45][03:59.43][04:06.08][04:20.52][04:27.05][04:34.26]kimidattara kimidattara
[01:36.69][03:00.23][03:55.88][04:23.63]imakoko ni iru no ga
[01:43.67][03:07.12][04:02.78]don'nani yokatta ka
[01:50.65][03:14.14]watashi wa shiawasedattanoni
[01:55.51][03:18.84][04:42.68]son'na koto bakari kangaete shimau
[02:08.01]nagai jikan ga sugite mo naze
[02:15.06]kimi no koto bakari kangaete shimau no ka
[02:22.06]kokoro o yurushi kitta kimi no asagata no manazashi o
[02:30.28]ima demo oikakete yumemite iru yo
[02:39.16]atarashī koibito to tanjōbi sugoshite mo
[02:46.07]ryokō ni itte mo kimi o omoidasukara
[04:09.86][04:37.53]nandemo aisetanoni na
[04:14.75]son'na koto bakari kangaete
[04:30.70]atashi wa shiawasedattanoni`
        }]
      }
    }, {
      title: '聞こえますか',
      artist: 'HoneyWorks こいぬ',
      album: '東京ウインターセッション',
      src: 'https://cdn.innocent.love/HoneyWorks%20%E3%81%93%E3%81%84%E3%81%AC%20-%20%E8%81%9E%E3%81%93%E3%81%88%E3%81%BE%E3%81%99%E3%81%8B.mp3',
      cover: 'https://cdn.innocent.love/HoneyWorks%20%E3%81%93%E3%81%84%E3%81%AC%20-%20%E8%81%9E%E3%81%93%E3%81%88%E3%81%BE%E3%81%99%E3%81%8B.jpg',
      primaryColor: '#ffe3c3',
      secondaryColor: '#f4c7a8',
      backgroundColor: '#743149',
      lyrics: {
        type: 'lrc',
        value: `[00:00.00]詞曲：HoneyWorks（ハニワ）
[00:23.00]泣きそうだ
[00:26.00]今日もまた
[00:29.00]失敗しちゃった
[00:34.00]こんな時あなたなら
[00:39.00]ねぇ、考えるよ
[00:45.00][02:40.00][03:26.00]愛する人よ ああ
[00:51.00][02:46.00]どこにいますか
[00:56.00][02:50.00]聞こえますか
[00:57.00][02:51.00]会えない人よ ああ
[01:02.50][02:57.00]記憶の笑顔に触れたい
[01:32.00]覚えてる 僕の夢
[01:38.00]あなたがくれたんだよ
[01:43.00]レンズ越し残してく
[01:49.00]思い出たち
[01:54.00][03:03.00]愛する人よ
[01:59.00]僕にも友達が出来たよ
[02:04.00]紹介するよ
[02:06.00][03:14.00]不器用だけど
[02:11.00][03:19.00]優しい人です
[02:17.00]大人になれば
[02:22.00]さびしさも忘れていけるの
[02:29.00]なんでいいたら ああ
[02:34.00]怒っちゃうかな
[03:08.00]僕にも大事な人が出来たよ
[03:13.00]聞こえてる
[03:31.00]見ててください`,
        translations: [{
          lang: 'zh-Hans',
          name: '中译',
          value: `[00:00.00]词曲：HoneyWorks（音：haniwa）
[00:23.00]快要哭了
[00:26.00]今天也是
[00:29.00]失败了呢
[00:34.00]此时此刻如果是你的话
[00:39.00]呐，让我想想
[00:45.00]我深爱的人啊
[00:51.00][02:46.00]你到底在哪里啊
[00:56.00][02:50.00]可以听得到吗
[00:57.00]无法相见的人啊
[01:02.50][02:57.00]想要触碰记忆中你的笑颜
[01:32.00]还记得吗 我的梦想
[01:38.00]是你给予我的
[01:43.00]透过透镜残存的
[01:49.00]诸多回忆
[01:54.00][02:40.00][03:03.00][03:26.00]深爱着的人啊
[01:59.00]我也有了新朋友
[02:04.00]让我介绍给你吧
[02:06.00][03:14.00]虽然有些笨拙
[02:11.00][03:19.00]但是是个很温柔的人
[02:17.00]长成大人的话
[02:22.00]就可以忘记寂寞了吧
[02:29.00]要是真的这样说的话
[02:34.00]你会不会生气
[02:51.00]无法见到的人啊
[03:08.00]如今我也有了重要的人
[03:13.00]你听到了吗
[03:31.00]请（在天上）好好看着我吧`
        }, {
          lang: 'phonetic-latin',
          name: 'Rōmaji',
          value: `[00:23.00]naki-sōda
[00:26.00]kyōmomata
[00:29.00]shippai shi chatta
[00:34.00]kon'na toki anatanara
[00:39.00]ne~e, kangaeru yo
[00:45.00][02:40.00][03:26.00]aisuruhito yo ā
[00:51.00][02:46.00]doko ni imasu ka
[00:56.00][02:50.00]kikoemasu ka
[00:57.00][02:51.00]aenai hito yo ā
[01:02.50][02:57.00]kioku no egao ni furetai
[01:32.00]oboe teru boku no yume
[01:38.00]anata ga kureta nda yo 
[01:43.00]renzu-goshi nokoshite ku
[01:49.00]omoide-tachi
[01:54.00][03:03.00]aisuruhito yo
[01:59.00]boku ni mo tomodachi ga dekita yo
[02:04.00]shōkai suru yo
[02:06.00][03:14.00]bukiyōdakedo
[02:11.00][03:19.00]yasashī hitodesu
[02:17.00]otonaninareba
[02:22.00]sabishisa mo wasurete ikeru no
[02:29.00]nande ītara ā
[02:34.00]okotchau ka na
[03:08.00]boku ni mo daijina hito ga dekita yo 
[03:13.00]kikoe teru
[03:31.00]mi tete kudasai`
        }]
      }
    }, {
      title: '止まない雨に花束を',
      artist: 'nayuta',
      album: 'あめあかり',
      src: 'https://cdn.innocent.love/nayuta%20-%20%E6%AD%A2%E3%81%BE%E3%81%AA%E3%81%84%E9%9B%A8%E3%81%AB%E8%8A%B1%E6%9D%9F%E3%82%92.mp3',
      cover: 'https://cdn.innocent.love/%E3%81%AA%E3%81%8E%20-%20%E3%81%82%E3%82%81%E3%81%82%E3%81%8B%E3%82%8A.jpg',
      lyrics: {
        type: 'lrc',
        value: `[00:00.00]詞曲：なぎ
[00:00.50]nayuta - 止まない雨に花束を
[00:26.30]窓を曇らせるため息
[00:31.80]指先を濡らして描く傘
[00:37.20]降り止み そうにない
[00:40.70]雨の音 今日は君に会えないのかな
[00:48.20]そんな夜は 今日も一人で 君を思って
[00:55.30]雨音に 紛れて 泣きじゃくる声
[01:01.30]「手を繋いで 眠ってたらいいな」
[01:06.80]なんて呟く 独り言
[01:12.40][04:10.70]明日雨が止んでいたなら
[01:18.40][04:16.70]君が眠る街に 会いに行こう
[01:24.60]だから今は 電話越しの声で
[01:32.00]おやすみ～
[01:48.20]いつか終わる時だって
[01:54.60]心の中で笑う 君の声
[01:59.00]明日ね 世界が消えてしまっても
[02:05.40]胸の痛みは 消えないのかな
[02:10.20]君のいない静かな夜に
[02:13.70]飲み込まれないように
[02:17.30]そっと 隠した ひとつ分の恋
[02:23.50]「君の温度で目覚めたらいいな」
[02:28.60]なんてが言いた 絵空事
[02:34.40]夜を刻む 時計電子音
[02:40.40]悪戯に 君を無視なんて
[02:46.50]笑う声と震える指
[02:52.40]上手に 私は隠せたかな
[02:57.60]二人きりの箱には怖い夢
[03:03.80]少しずつ 日々晴れ壊れる
[03:09.90]また会えるよ だから今は
[03:15.30]嘘つき おやすみ～
[03:47.30]小指に絡む赤い糸の先
[03:53.40]繋がっている 君は雲の上
[03:59.70]見えてるかな 君のために
[04:05.50]上手に笑えるようになったよ
[04:23.20]向日葵のね 花みたいに
[04:28.30]笑って 見送ろう
[04:34.80]だから今は 写真越しの
[04:40.20]笑顔に おやすみ～`,
        translations: [{
          lang: 'zh-Hans',
          name: '中译',
          value: `[00:00.00]词曲：なぎ
[00:00.50]nayuta - 向无尽的大雨献上花束
[00:26.30]叹息在窗上泛起水雾
[00:31.80]沾湿指尖勾勒出的伞的轮廓
[00:37.20]似乎并没有想停下来
[00:40.70]杂乱的雨音 今天大概也是见不到你的了
[00:48.20]这样的夜晚 今天也孑然一身地 思念着你
[00:55.30]抽噎与零碎雨声淆杂着
[01:01.30]「要是能牵着你的手睡下就好了」
[01:06.80]如此这般 自言自语
[01:12.40][04:10.70]如果明天雨停了的话
[01:18.40][04:16.70]就去到你睡着的小镇 探望你吧
[01:24.60]所以现在 透过电话
[01:32.00]道声晚安
[01:48.20]即使时间终会结束
[01:54.60]心中也是微笑着 你的声音
[01:59.00]即使明天全世界都消失不见
[02:05.40]胸间的疼痛也不可能消去吧
[02:10.20]你不在的静寂的夜晚
[02:13.70]像要吞没我一般
[02:17.30]悄悄藏起的 一颗恋心
[02:23.50]「要是能感受着你的体温醒来就好了」
[02:28.60]这般描绘的 幻想
[02:34.40]铭刻夜晚的 时钟电子音
[02:40.40]销蚀着你 你徒然地挣扎
[02:46.50]笑声 和颤抖的手指
[02:52.40]我有好好掩饰着吗
[02:57.60]唯有两人的箱庭 可怕的梦
[03:03.80]渐渐产生裂缝崩坏开去
[03:09.90]「还能重逢哦，所以现在」
[03:15.30]骗子 晚安
[03:47.30]小指上缠绕的红线前端
[03:53.40]与之相系的你 在云端
[03:59.70]看到了吗 为了你
[04:05.50]我已经能好好地笑出来了
[04:23.20]就像向日葵一般 微笑着
[04:28.30]为你送行
[04:34.80]所以现在 向照片里的笑容
[04:40.20]说声晚安~`
        }, {
          lang: 'phonetic-latin',
          name: 'Rōmaji',
          value: `[00:00.50]nayuta - yamanai ame ni hanataba o
[00:26.30]mado o kumoraseru tameiki
[00:31.80]yubisaki o nurashite kaku kasa
[00:37.20]furi yami-sō ninai
[00:40.70]ame no oto kyō wa kimi ni aenai no ka na
[00:48.20]son'na yoru wa kyō mo hitori de kimi o omotte
[00:55.30]amaoto ni magirete nakijakuru koe
[01:01.30]tewotsunaide nemuttetara ī na
[01:06.80]nante tsubuyaku hitorigoto
[01:12.40][04:10.70]ashita ame ga yande itanara
[01:18.40][04:16.70]kimi ga nemuru machi ni ai ni ikou
[01:24.60]dakara ima wa denwa-goshi no koe de
[01:32.00]oyasumi
[01:48.20]itsuka owaru toki datte
[01:54.60]kokoro no naka de warau kiminokoe
[01:59.00]ashitane sekai ga kiete shimatte mo
[02:05.40]mune no itami wa kienai no ka na
[02:10.20]kimi no inai shizukana yoru ni
[02:13.70]nomikoma renai yō ni
[02:17.30]sotto kakushita hitotsu-bun no koi
[02:23.50]kimi no ondo de mezametara ī na
[02:28.60]nante ga iita esoragoto
[02:34.40]yoru o kizamu tokei denshi-on
[02:40.40]itazura ni kimi o mushi nante
[02:46.50]warau koe to furueru yubi
[02:52.40]jōzu ni watashi wa kakuseta ka na
[02:57.60]futarikiri no hako ni wa kowai yume
[03:03.80]sukoshizutsu hibi hare kowareru
[03:09.90]mata aeru yo dakara ima wa
[03:15.30]usotsuki oyasumi
[03:47.30]koyubi ni karamu akai ito no saki
[03:53.40]tsunagatte iru kimi wa kumonoue
[03:59.70]mie teru ka na kiminotameni
[04:05.50]jōzu ni waraeru yō ni natta yo
[04:23.20]himawari no ne hana mitai ni
[04:28.30]waratte miokurou
[04:34.80]dakara ima wa shashin-goshi no
[04:40.20]egao ni oyasumi`
        }]
      }
    }, {
      title: '花火のような恋',
      artist: 'みゆはん',
      album: '自己スキーマ',
      src: 'https://cdn.innocent.love/%E3%81%BF%E3%82%86%E3%81%AF%E3%82%93%20-%20%E8%8A%B1%E7%81%AB%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E6%81%8B.mp3',
      cover: 'https://cdn.innocent.love/%E3%81%BF%E3%82%86%E3%81%AF%E3%82%93%20-%20%E8%8A%B1%E7%81%AB%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E6%81%8B.jpg',
      primaryColor: '#482100',
      secondaryColor: '#7b4e00',
      backgroundColor: '#bad0d9',
      lyrics: {
        type: 'lrc',
        value: `[00:00.00]作詞：みゆはん
[00:07.00]作曲：みゆはん
[00:15.00]みゆはん - 花火のような恋
[00:25.70]七月のあの日に言った 来年もまたこの花火を
[00:31.50]二人でまた見るからもう離れないで
[00:38.20]その時僕はまだいつか終わりが来るなんてことも
[00:44.10]君が誰かのものになることも知らずに
[00:50.70]さよならの準備が出来てないその夜に
[01:03.20]夢の中の君に触れた
[01:09.30]目覚めるともう消えてなくなってた
[01:16.40][04:06.80]ああ 君がいないと 抱きしめることもできないよ
[01:22.80][04:13.20]もうヤキモチをやく不機嫌そうなあの顔も
[01:29.00][04:19.60]ケンカして仲直りした後の何気ない日常会話も
[01:35.60][04:26.10]ああ…もうないんだ
[01:54.30]空に上がる打ち上げ花火
[01:57.20]開いてはすぐ消えていく まるで儚く散ってく
[02:03.00]君が浮かんだ
[02:06.50]七月のあの日に言った 忘れもしないあの言葉
[02:12.50]愛してるよずっとこれからもよろしくね
[02:19.20]さよならの形に 君の口は動く
[02:31.70]あまりにも突然過ぎて
[02:38.20]言いたいことも言えずに消えてった
[02:44.80]ああ 君がいないと ごめん、ありがとうも言えないよ
[02:51.10]もう照れてはにかむ 赤く染まっていく頬も
[02:57.40]何もかも取り返せなくて
[03:00.90]こんなとき君が横にいてくれたらな
[03:05.80]ああ……寂しくなった
[03:35.10]さよならの準備が出来始めたその夜に
[03:47.50]夢の中の君は笑う
[03:53.80]もうそんな顔で笑わないで
[03:57.10]忘れかけていた君の声
[04:00.20]また僕の頭の中 響いてく`,
        translations: [{
          lang: 'zh-Hans',
          name: '中译',
          value: `[00:00.00]作词：みゆはん
[00:07.00]作曲：みゆはん
[00:15.00]みゆはん - 烟花般的爱情
[00:25.70]七月的那天说好了 明年也要两人一起
[00:31.50]看烟花绽放 所以再也不要离开我了
[00:38.20]那时我还不知道终有一天会迎来结束
[00:44.10]而你又会成为谁身边的人
[00:50.70]在还没做好分别的准备的那个夜晚
[01:03.20]触碰到了梦中的你
[01:09.30]一睁开眼睛就已经消散不见了
[01:16.40][04:06.80]啊啊 你不在的话我再无法抱紧你了
[01:22.80][04:13.20]不管是吃醋后不愉快的表情
[01:29.00][04:19.60]还是吵架了和好后的若无其事的日常对话也好
[01:35.60][04:26.10]啊啊……都不复存在了
[01:54.30]升往高空绽放的烟火
[01:57.20]绽放的瞬间就开始消逝 仿佛就像消散的梦幻一般
[02:03.00]浮现出了你的身影
[02:06.50]七月的那天说好的 绝不会忘记的话语
[02:12.50]永远爱着你哦 从今以后也请多多关照了
[02:19.20]以再见了的口型 你的嘴唇颤动着
[02:31.70]因为实在是太过突然
[02:38.20]想要说出的话还未出口就已消失
[02:44.80]啊啊 你不在之后 我连道歉、谢谢都无法说出口了
[02:51.10]你因害羞腼腆染上红晕的脸颊
[02:57.40]这所有的一切都已经无法挽回了
[03:00.90]如果这时候你能在我身边的话
[03:05.80]啊啊……觉得寂寞了啊
[03:35.10]开始做好分别的觉悟的那个夜晚
[03:47.50]梦中的你只是在微笑着
[03:53.80]不要再这样笑了
[03:57.10]已经快要忘却的你的声音
[04:00.20]又开始在我的脑内响起`
        }, {
          lang: 'phonetic-latin',
          name: 'Rōmaji',
          value: `[00:15.00]みゆはん - hanabi no yōna koi
[00:25.70]shichigatsu no ano hi ni itta rainen mo mata kono hanabi o
[00:31.50]futari de mata mirukara mō hanarenaide
[00:38.20]sonotoki boku wa mada itsuka owari ga kuru nante koto mo
[00:44.10]kimi ga dareka no mono ni naru koto mo shirazu ni
[00:50.70]sayonara no junbi ga deki tenai sono yoru ni
[01:03.20]yume no nakanokimi ni fureta
[01:09.30]mezameruto mō kiete nakunatteta
[01:16.40][04:06.80]ā kimi ga inai to dakishimeru koto mo dekinai yo
[01:22.80][04:13.20]mō yakimochi o yaku fukigen-sōna ano kao mo
[01:29.00][04:19.60]kenka shite nakanaori shita ato no nanigenai nichijō kaiwa mo
[01:35.60][04:26.10]ā mō nainda
[01:54.30]sora ni agaru uchiagehanabi
[01:57.20]hiraite wa sugu kieteyuku marude hakanaku chitte ku
[02:03.00]kimi ga ukanda
[02:06.50]shichigatsu no ano hi ni itta wasure mo shinai ano kotoba
[02:12.50]aishiteruyo zutto korekara mo yoroshiku ne
[02:19.20]sayonara no katachi ni kimi no kuchi wa ugoku
[02:31.70]amarini mo totsuzen sugite
[02:38.20]iitaikotomoiezuni kie tetta
[02:44.80]ā kimigainai to gomen arigatō mo ienai yo
[02:51.10]mō terete hanikamu akaku somatte yuku hoho mo
[02:57.40]nanimokamo torikaesenakute
[03:00.90]kon'na toki kimi ga yoko ni ite kuretara na
[03:05.80]ā sabishiku natta
[03:35.10]sayonara no junbi ga deki hajimeta sono yoru ni
[03:47.50]yume no nakanokimi wa warau
[03:53.80]mō son'na-gao de warawanaide
[03:57.10]wasurekakete ita kiminokoe
[04:00.20]mata boku no atama no naka hibiite ku`
        }]
      }
    }, {
      title: '失う',
      artist: 'らいらい。',
      album: '失う',
      src: 'https://cdn.innocent.love/%E3%82%89%E3%81%84%E3%82%89%E3%81%84%E3%80%82%20-%20%E5%A4%B1%E3%81%86.mp3',
      cover: 'https://cdn.innocent.love/%E3%82%89%E3%81%84%E3%82%89%E3%81%84%E3%80%82%20-%20%E5%A4%B1%E3%81%86.jpg',
      primaryColor: '#6d9bd7',
      secondaryColor: '#5181bb',
      backgroundColor: '#19132a',
      lyrics: {
        type: 'lrc',
        value: `[00:00.00]詞曲：bb1611
[00:05.50]らいらい。 - 失う
[00:15.50]君が好きだから
[00:17.30]君の心の傷に僕を塗った
[00:21.00]君の心の奥底の
[00:23.80]深く沈むキッカケをこの手に掴んだ
[00:28.30]君が好きだから
[00:30.10]君の大好きな夏を好きになった
[00:33.80]焼けるような日差しに腰を下ろして
[00:37.20]溶けて流れた虹に笑った
[00:53.10]立ち並ぶ 愛想も 作り笑いも 全部捨て去って
[00:59.70]佇んでいる
[01:01.70]駐車場のカゲロウにこの身を投げ捨てて
[01:06.10]はにかんでいる
[01:08.00]夏の汗にヘソを曲げた虹が笑うように
[01:12.60][02:17.10]今日も
[01:18.60][01:31.40][02:25.90][02:41.80][02:55.00][03:07.40]さよなら じゃあね 今日も バイバイ
[01:24.80]君は歌って 僕は笑って
[01:28.00][02:38.50]ギターを持って 掠れた声で
[01:37.60][03:13.70]愛してるって 死んじゃやだって
[01:40.90][02:51.10][03:16.90]そんな歌だけ 僕に残して
[01:57.40]立ちすくむ
[01:59.30]恐怖も後ろめたさも膝を抱え込んで
[02:03.80]色褪せる
[02:05.60]駐車場のカゲロウに勇気を振り絞って
[02:10.10]息をする
[02:12.10]夏の汗にベソをかいた蝉が笑うように
[02:35.10]君は笑って 僕は歌って
[02:48.00]君の前だけ 強くいさせて`,
        translations: [{
          lang: 'zh-Hans',
          name: '中译',
          value: `[00:00.00]词曲：bb1611
[00:05.50]らいらい。 - 失去
[00:15.50][00:28.30]因为喜欢你
[00:17.30]所以将我涂在你内心的伤口上
[00:21.00]用这双手
[00:23.80]抓住沉没在你内心深处的契机
[00:30.10]所以也喜欢上你最喜欢的夏天
[00:33.80]在炽热的阳光里坐下
[00:37.20]对着溶化流走的彩虹笑了
[00:53.10]并排的亲切也好假笑也好全都舍弃
[00:59.70]伫立着
[01:01.70]将自己扔进停车场的阳炎里
[01:06.10]害羞着
[01:08.00]闹别扭的彩虹仿佛在笑夏天的汗水
[01:12.60][02:17.10]今天依旧
[01:18.60][01:31.40][02:25.90][02:41.80][02:55.00][03:07.40]再见 再见啦 今天也BYEBYE
[01:24.80]你唱着 我笑着
[01:28.00][02:38.50]拿着吉他 以嘶哑的声音
[01:37.60][03:13.70]「我爱你」「不要死」
[01:40.90][02:51.10][03:16.90]只给我留下了 这样的歌
[01:57.40]呆站着
[01:59.30]恐惧也好内疚也好都抱膝坐下
[02:03.80]褪色的
[02:05.60]鼓起勇气面对停车场的阳炎
[02:10.10]呼吸着
[02:12.10]哭丧着脸的蝉仿佛在笑夏天的汗水
[02:35.10]你笑着 我唱着
[02:48.00]在你面前 让我保持坚强吧`
        }, {
          lang: 'phonetic-latin',
          name: 'Rōmaji',
          value: `[00:05.50]らいらい。 - ushinau
[00:15.50]kimigasukidakara
[00:17.30]kimi no kokoro no kizu ni boku o nutta
[00:21.00]kimi no kokoro no okusoko no
[00:23.80]fukaku shizumu kikkake o kono-te ni tsukanda
[00:28.30]kimigasukidakara
[00:30.10]kimi no daisukina natsu o suki ni natta
[00:33.80]yakeru yōna hizashi ni koshi o oroshite
[00:37.20]tokete nagareta niji ni waratta
[00:53.10]tachinarabu aiso mo tsukuriwarai mo zenbu sutesatte
[00:59.70]tatazunde iru
[01:01.70]chūshajō no kagerō ni kono mi o nagesutete
[01:06.10]hanikande iru
[01:08.00]natsu no ase ni heso o mageta niji ga warau yō ni
[01:12.60][02:17.10]kyō mo
[01:18.60][01:31.40][02:25.90][02:41.80][02:55.00][03:07.40]sayonara jā ne kyō mo baibai
[01:24.80]kimi wa utatte boku wa waratte
[01:28.00][02:38.50]gitā o motte kasureta koe de
[01:37.60][03:13.70]aishi teru tte shinja ya datte
[01:40.90][02:51.10][03:16.90]son'na uta dake boku ni nokoshite
[01:57.40]tachisukumu
[01:59.30]kyōfu mo ushirometa-sa mo hiza o kakaekonde
[02:03.80]iroaseru
[02:05.60]chūshajō no kagerō ni yūki o furishibotte
[02:10.10]iki o suru
[02:12.10]natsu no ase ni beso o kaita semi ga warau yō ni
[02:35.10]kimi wa waratte boku wa utatte
[02:48.00]kimi no mae dake tsuyoku i sasete`
        }]
      }
    }]
  }

  render () {
    return html`
      <link href="https://cdn.jsdelivr.net/gh/PrismJS/prism@1.16.0/themes/prism-coy.css" rel="stylesheet" />
      <div class="demo waveAnimation">
        <div class="content">
          <nav-bar
            .location=${this.location} color="#3e4f55"
            .demo="${this.getLocale('demo')}"
            .langName="${this.getLocale('lang')}"
            .solo="${this.getLocale('solo')}"
            .playlist="${this.getLocale('playlist')}"
            .lang="${this.getLangList()}"
            @demo-change-lang="${(e) => this.changeLang(e.detail.lang)}"
          ></nav-bar>
          <div class="main">
            <h1>${this.getLocale('playlistCard')}</h1>
            <div class="landing">
              <kokoro-provider>
                <kokoro-playlist-card
                  id="hanabi"
                  title="${this.showTitle ? '花火般的恋' : ''}"
                  primaryColor="#0e0400"
                  secondaryColor="#383323"
                  backgroundColor="#bf9356"
                  type="${this.flatMode ? 'flat' : 'classical'}"
                ></kokoro-playlist-card>
              </kokoro-provider>
            </div>
          </div>
          <kokoro-provider>
            <kokoro-player
              ?darkMode="${this.darkMode}"
              top="100"
              left="0"
              mobileDefaultSide="right"
              isDesktopLyricsShowing
            ></kokoro-player>
          </kokoro-provider>
        </div>
        <div class="waveWrapperInner bgTop">
          <div class="wave waveTop" style="background-image: url('https://i.loli.net/2019/09/28/uJiFzLwxGkA8Ecl.png')"></div>
        </div>
        <div class="waveWrapperInner bgMiddle">
          <div class="wave waveMiddle" style="background-image: url('https://i.loli.net/2019/09/28/fhKuB9jLc7wRTEG.png')"></div>
        </div>
        <div class="waveWrapperInner bgBottom">
          <div class="wave waveBottom" style="background-image: url('https://i.loli.net/2019/09/28/lpuMerGD4wbgR5P.png')"></div>
        </div>
      </div>
      <div class="source">
        <h1>${this.getLocale('source')}</h1>
        <div>
          <label for="conn"><input type="checkbox" id="conn"
                                   ?checked="${this.connected}"
                                   @change="${this.toggleConnect}"
          /> Connected</label>
          <label for="title"><input type="checkbox" id="title"
                                   ?checked="${this.showTitle}"
                                   @change="${() => { this.showTitle = !this.showTitle }}"
          /> Title</label>
          <label for="flat"><input type="checkbox" id="flat"
                                   ?checked="${this.flatMode}"
                                   @change="${() => { this.flatMode = !this.flatMode }}"
          /> Flat mode</label>
          <label for="dark"><input type="checkbox" id="dark"
                                   ?checkd="${this.darkMode}"
                                   @change="${() => { this.darkMode = !this.darkMode }}"
          /> Dark mode</label>
        </div>
        <source-box .snippets=${[{
      langCode: 'html',
      lang: 'HTML',
      code: `<html>
<head>
</head>
<body>
  <kokoro-provider>
    <!-- Playlist Card -->
    <kokoro-playlist-card
      id="#hanabi"${this.showTitle ? `
      title="花火般的恋"` : ''}
      primaryColor="#0e0400"
      secondaryColor="#383323"
      backgroundColor="#bf9356"${this.flatMode ? `
      type="flat"` : ''}
    ></kokoro-playlist-card>
  </kokoro-provider>
  <kokoro-provider>
    <!-- Player -->
    <kokoro-player${this.darkMode ? `
      darkMode` : ''}
      language="${this._lang}"
      top="100"
      left="0"
      mobileDefaultSide="right"
      desktopLyricsColorSchemeIndex="2"
      desktopLyricsVerticalCenter="150"
      isDesktopLyricsShowing
    ></kokoro-player>
  </kokoro-provider>
</body>
</html>`
    }, {
      langCode: 'javascript',
      lang: 'JavaScript',
      code: `import { Kokoro, Provider } from 'kokoro-player' 
// const { Kokoro, Provider } = window.KokoroPlayer

window.player = new Kokoro()
window.customElements.define('kokoro-provider', Provider${this.connected ? '.connect(window.player)' : ''})
${this.connected ? `// To disconnect
// document.querySelector('kokoro-provider').disconnect()` : `// To connect
// document.querySelector('kokoro-provider').connect(window.player)`}

document.querySelector('#hanabi').songs = [{
  title: 'あめあかり',
  artist: 'なぎ',
  album: 'あめあかり',
  src: 'https://cdn.innocent.love/なぎ - あめあかり.mp3',
  cover: 'https://cdn.innocent.love/なぎ - あめあかり.jpg'
}, {
  title: '君だったら',
  artist: 'HAPPY BIRTHDAY',
  album: '今夜きみが怖い夢を見ませんように',
  src: 'https://cdn.innocent.love/HAPPY BIRTHDAY - 君だったら.mp3',
  cover: 'https://cdn.innocent.love/HAPPY BIRTHDAY - 君だったら.jpg',
  primaryColor: '#0f0000',
  secondaryColor: '#221718',
  backgroundColor: '#8d7d87'
}, {
  title: '聞こえますか',
  artist: 'HoneyWorks こいぬ',
  album: '東京ウインターセッション',
  src: 'https://cdn.innocent.love/HoneyWorks こいぬ - 聞こえますか.mp3',
  cover: 'https://cdn.innocent.love/HoneyWorks こいぬ - 聞こえますか.jpg',
  primaryColor: '#ffe3c3',
  secondaryColor: '#f4c7a8',
  backgroundColor: '#743149'
}, {
  title: '止まない雨に花束を',
  artist: 'nayuta',
  album: 'あめあかり',
  src: 'https://cdn.innocent.love/nayuta - 止まない雨に花束を.mp3',
  cover: 'https://cdn.innocent.love/なぎ - あめあかり.jpg'
}, {
  title: '花火のような恋',
  artist: 'みゆはん',
  album: '自己スキーマ',
  src: 'https://cdn.innocent.love/みゆはん - 花火のような恋.mp3',
  cover: 'https://cdn.innocent.love/みゆはん - 花火のような恋.jpg',
  primaryColor: '#482100',
  secondaryColor: '#7b4e00',
  backgroundColor: '#bad0d9'
}, {
  title: '失う',
  artist: 'らいらい。',
  album: '失う',
  src: 'https://cdn.innocent.love/らいらい。 - 失う.mp3',
  cover: 'https://cdn.innocent.love/らいらい。 - 失う.jpg',
  primaryColor: '#6d9bd7',
  secondaryColor: '#5181bb',
  backgroundColor: '#19132a'
}]
`
    }]}></source-box>
      </div>
    `
  }
}

window.customElements.define('playlist-page', PlaylistPage)
