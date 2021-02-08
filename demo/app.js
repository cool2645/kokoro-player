import { Router } from '@vaadin/router'

import { Kokoro, Provider, PLAY_ORDER_LOOP } from '../'
import { routes } from './nav'
import './solo'
import './playlist'
import './source'

window.player = new Kokoro()
window.customElements.define('kokoro-provider', Provider.connect(window.player))
window.player.setPlaylist([{
  title: '冬眠',
  artist: '司南',
  album: '冬眠',
  src: 'https://cdn.innocent.love/%E5%8F%B8%E5%8D%97%20-%20%E5%86%AC%E7%9C%A0.mp3',
  cover: 'https://cdn.innocent.love/%E5%8F%B8%E5%8D%97%20-%20%E5%86%AC%E7%9C%A0.jpg',
  lyrics: {
    type: 'lrc',
    value: `[ar:司南]
[ti:冬眠]
[al:冬眠]
[length: 4:30]
[00:00.00]作词：桃玖
[00:09.48]作曲：CMJ
[00:20.57]司南 - 冬眠
[00:35.58]巷口灯光忽明忽灭
[00:42.16]手中甜咖啡已冷却
[00:49.52]嘴角不经意泄露想念
[00:57.39]在发呆的窗前凝结
[01:05.32]其实不爱漫漫长夜
[01:12.44]因为你才多了情结
[01:19.14]可是蜷缩的回忆不热烈
[01:27.43]我如何把孤单融解
[01:33.04]你看啊春日的蝴蝶
[01:36.57]你看它颤抖着飞越
[01:40.25]和风与暖阳倾斜
[01:43.62]却冰冷 的季节
[01:47.96]你看啊仲夏的弯月
[01:51.34]你看它把欢愉偷窃
[01:55.87]倒挂天际的笑靥
[02:33.21]故事里的最后一页
[02:40.87]过往和光阴都重叠
[02:47.98]我用尽所有字眼去描写
[02:56.11]无法留你片刻停歇
[03:01.55][03:31.21]你听啊秋末的落叶
[03:05.25][03:34.70]你听它叹息着离别
[03:08.75][03:38.34]只剩我独自领略
[03:12.19][03:41.59]海与山 风和月
[03:16.35][03:45.96]你听啊冬至的白雪
[03:19.98][03:49.49]你听它掩饰着哽咽
[03:24.85][03:54.41]在没有你的世界
[04:01.87]再没有你的冬眠`,
    translations: [{
      lang: 'phonetic-latin',
      name: 'Pīnyīn',
      value: `[ar:司南]
[ti:冬眠]
[al:冬眠]
[length: 4:30]
[00:00.00]
[00:09.48]
[00:20.57]司南 - dōngmián
[00:35.58]xiangkou dengguang huminghumie
[00:42.16]shouzhong tiankafei yi lengque
[00:49.52]zuijiao bujingyi xielou xiangnian
[00:57.39]zai fadai de chuangqian ningjie
[01:05.32]qishi bu ai manman changye
[01:12.44]yinwei ni cai duole qingjie
[01:19.14]keshi quansuo de huiyi bu relie
[01:27.43]wo ruhe ba gudan rongjie
[01:33.04]ni kan a chunri de hudie
[01:36.57]ni kan ta chandou zhe feiyue
[01:40.25]hefeng yu nuanyang qingxie
[01:43.62]que bingleng de jijie
[01:47.96]ni kan a zhongxia de wanyue
[01:51.34]ni kan ta ba huanyu touqie
[01:55.87]daogua tianji de xiaoye
[02:33.21]gushi li de zuihou yi ye
[02:40.87]guowang he guangyin dou chongdie
[02:47.98]wo yongjin suoyou ziyan qu miaoxie
[02:56.11]wufa liu ni pianke tingxie
[03:01.55][03:31.21]ni ting a qiumo de luoye
[03:05.25][03:34.70]ni ting ta tanxi zhe libie
[03:08.75][03:38.34]zhi sheng wo duzi linglue
[03:12.19][03:41.59]hai yu shan feng he yue
[03:16.35][03:45.96]ni ting a dongzhi de baixue
[03:19.98][03:49.49]ni ting ta yanshi zhe gengye
[03:24.85][03:54.41]zai meiyou ni de shijie
[04:01.87]zai meiyou ni de dongmian`
    }]
  }
}, {
  title: '我乐意',
  artist: '玖笙',
  album: '我乐意',
  src: 'https://cdn.innocent.love/%E7%8E%96%E7%AC%99%20-%20%E6%88%91%E4%B9%90%E6%84%8F.mp3',
  cover: 'https://cdn.innocent.love/%E7%8E%96%E7%AC%99%20-%20%E6%88%91%E4%B9%90%E6%84%8F.jpg',
  lyrics: {
    type: 'lrc',
    value: `[ar:玖笙]
[ti:我乐意（Cover：许嵩）]
[al:我乐意]
[length: 4:03]
[00:00.00]作词：许嵩
[00:04.10]作曲：许嵩
[00:08:50]玖笙 - 我乐意
[00:13.27]潇洒如我最近却变得有点敏感
[00:18.14]半小时收不到你讯息就会坐立不安
[00:22.63]都说别爱的太满 这道理知易行难
[00:27.18]我还挺乐意享受这份甜中微酸
[00:31.50][01:32.21]你的笑像西瓜最中间那一勺的口感
[00:36.08][01:36.75]点亮了一整个夏天 星空也为你斑斓
[00:40.49][01:41.19]我不会深情款款上演什么套路桥段
[00:45.11][01:45.71]我的爱纯粹简单
[00:50.69][01:51.46][03:05.29]我乐意站在你身后 把你揽在胸口
[00:55.15][01:55.73][03:09.74]低头看你素净的脸颊粉红
[00:59.41][02:00.05][03:14.08]我乐意把着你的手 心猿意马弹奏
[01:04.22][02:04.81][03:18.80]每颗音符里都有幸福闪动
[01:08.34][02:09.10][03:23.21][03:41.41]我乐意守在你左右 为你挡雨遮风
[01:13.18][02:13.69][03:27.71][03:45.60]今后的路我陪你一起走过
[01:17.50][02:18.15][03:32.04][03:49.99]我乐意把自己奉送 做你独家宇宙
[01:22.14][02:22.73][03:36.73][03:54.68]抱着你旁若无人尽情舞动
[02:30.51]我非常乐意为你做任何任何的事情
[02:36.48]你说只要求我每天过得开心
[02:39.69]我非常乐意陪你到任何任何地方去
[02:45.30]你说今年秋天想去趟南极`,
    translations: [{
      lang: 'phonetic-latin',
      name: 'Pīnyīn',
      value: `[ar:玖笙]
[ti:我乐意（Cover：许嵩）]
[al:我乐意]
[length: 4:03]
[00:00.00]
[00:04.10]
[00:08:50]玖笙 - wǒ lèyì
[00:13.27]xiaosa ru wo zuijin que bian de youdian mingan
[00:18.14]banxiaoshi shoubudao ni xunxi jiu hui zuolibuan
[00:22.63]dou shuo bie ai de tai man zhe daoli zhiyixingnan
[00:27.18]wo hai ting leyi xiangshou zhe fen tian zhong weisuan
[00:31.50][01:32.21]ni de xiao xiang xigua zui zhongjian na yi shao de kougan
[00:36.08][01:36.75]dianliang le yizhengge xiatian xingkong ye wei ni banlan
[00:40.49][01:41.19]wo buhui shenqingkuankuan shangyan shenme taolu qiaoduan
[00:45.11][01:45.71]wo de ai chuncui jiandan
[00:50.69][01:51.46][03:05.29]wo leyi zhan zai ni shenhou ba ni lan zai xiongkou
[00:55.15][01:55.73][03:09.74]ditou kan ni sujing de lianjia fenhong
[00:59.41][02:00.05][03:14.08]wo leyi ba zhe ni de shou xinyuanyima tanzou
[01:04.22][02:04.81][03:18.80]mei ke yinfu li dou you xingfu shandong
[01:08.34][02:09.10][03:23.21][03:41.41]wo leyi shou zai ni zuo you wei ni dangyuzhefeng
[01:13.18][02:13.69][03:27.71][03:45.60]jin hou de lu wo pei ni yiqi zou guo
[01:17.50][02:18.15][03:32.04][03:49.99]wo leyi ba ziji fengsong zuo ni dujia yuzhou
[01:22.14][02:22.73][03:36.73][03:54.68]bao zhe ni pangruowuren jinqing wudong
[02:30.51]wo feichang leyi wei ni zuo renhe renhe de shiqing
[02:36.48]ni shuo zhi yaoqiu wo meitian guo de kaixin
[02:39.69]wo feichang leyi pei ni dao renhe renhe difang qu
[02:45.30]ni shuo jinnian qiutian xiang qu tang nanji`
    }]
  }
}, {
  title: '绿茶',
  artist: '孙羽幽',
  album: '孙羽幽翻唱集',
  src: 'https://cdn.innocent.love/%E5%AD%99%E7%BE%BD%E5%B9%BD%20-%20%E7%BB%BF%E8%8C%B6.mp3',
  cover: 'https://cdn.innocent.love/%E5%AD%99%E7%BE%BD%E5%B9%BD%20-%20%E7%BB%BF%E8%8C%B6.jpg',
  lyrics: {
    type: 'lrc',
    value: `[ar:孙羽幽]
[ti:绿茶（Cover：灰色）]
[al:孙羽幽翻唱集]
[length: 3:59]
[00:00.00]作词：纱朵
[00:08.97]作曲：灰色
[00:16:69]孙羽幽 - 绿茶
[00:26.35][02:30.48]小小的步伐 跟着外婆采绿茶
[00:29.77][02:33.95]蚯蚓钻出泥土看小野花
[00:32.95][02:37.06]专属小背篓 汗水阳光中蒸发
[00:36.46][02:40.64]飘满茶香的地方就是我家
[00:39.75][02:43.97]那小花在门口懒懒地摇尾巴
[00:43.24][02:47.26]哼着小调 外公躺椅上饮茶
[00:46.47][02:50.63]那回忆把时间凝结成一幅画
[00:50.22]外公，你在练铁砂掌吗？
[00:53.07][02:57.01]隔壁猫叫喵喵
[00:54.10][02:58.45]知了躲树梢捉蟋蟀捉得跳脚
[00:56.41][03:00.62]养小蝌蚪看尾巴一个个没鸟
[00:58.87][03:03.11]掉哪里了呢
[01:00.19][03:04.07]我抱着紫砂壶喝着汽水想着明天笑了
[01:03.67][03:07.96]哦哦哦哦
[01:06.98][03:11.18]多年后想起那味道
[01:09.89][03:14.11]牵着你的手回去瞧一瞧
[01:13.29][03:17.47]那小河倾听过我的烦恼
[01:16.65]还在绕啊绕
[01:20.44][03:38.05]天空的颜色刚刚好
[01:23.36]绿茶的香味随着风在飘
[01:26.76][03:30.90]我说喜欢有这样的美好
[01:30.29]在围绕 不去管花落了多少
[01:37.10]喜欢煮茶时袅袅的香气
[01:39.98]捧一杯绿悠悠 用一下午陪着外公下围棋
[01:44.18]总拿不好写字那支笔呀
[01:46.70]妈妈搬走电视罚我的淘气
[01:50.35]人说长大后有很多失意
[01:53.50]就像你拼搏了拥有了失去了精彩的曾经
[01:57.57]我想说我喜欢现在的安逸
[02:00.32]懂得珍惜的人生才最美丽
[02:04.37]那夏天喜欢撑着雨伞光脚丫
[02:07.44]蜗牛背着壳子爬上了葡萄架
[02:10.24]那笑脸一直迎着阳光 绽开了花
[02:13.72]外婆顺着梯田慢慢种她的绿茶
[02:16.88]那香甜总是顺着小路 然后绕回家
[02:20.37]茶碗洗过之后记得要反复地擦
[02:23.65]那时间总是跑得跑得跑得跑得很潇洒
[02:28.03]喵喵！快下来！要迟到啦！！
[02:54.39]怎么舍得擦
[03:20.81]那童谣 耳边绕
[03:24.71]拉着你迎风跑呀跑
[03:27.53]踏在泥巴小路上光着脚
[03:34.27]在围绕 偷偷笑
[03:41.01]绿茶的香味 鼻尖飘呀飘
[03:44.31]不管故事里花落了多少
[03:47.73]梦还在 幸福在转角`,
    translations: [{
      lang: 'phonetic-latin',
      name: 'Pīnyīn',
      value: `[ar:孙羽幽]
[ti:绿茶（Cover：灰色）]
[al:孙羽幽翻唱集]
[length: 3:59]
[00:00.00]
[00:08.97]
[00:16:69]孙羽幽 - lǜchá
[00:26.35][02:30.48]xiaoxiaode bufa gen zhe waipo cai lücha
[00:29.77][02:33.95]qiuyin zuan chu nitu kan xiao yehua
[00:32.95][02:37.06]zhuanshu xiao beilou hanshui yangguang zhong zhengfa
[00:36.46][02:40.64]piaoman chaxiang de difang jiu shi wo jia
[00:39.75][02:43.97]na xiaohua zai menkou lanlande yao weiba
[00:43.24][02:47.26]heng zhe xiaodiao waigong tangyi shang yincha
[00:46.47][02:50.63]na huiyi ba shijian ningjie cheng yi fu hua
[00:50.22]wàigōng nǐ zài liàn tiěshāzhǎng ma
[00:53.07][02:57.01]gebi mao jiao miaomiao
[00:54.10][02:58.45]zhiliao duo shushao zhuo xishuai zhuo de tiaojiao
[00:56.41][03:00.62]yang xiao kedou kan weiba yigege mei niao
[00:58.87][03:03.11]diao nali le ne
[01:00.19][03:04.07]wo bao zhe zishahu he zhe qishui xiang zhe mingtian xiao le
[01:03.67][03:07.96]o o o o
[01:06.98][03:11.18]duonian hou xiangqi na weidao
[01:09.89][03:14.11]qian zhe ni de shou huiqu qiaoyiqiao
[01:13.29][03:17.47]na xiaohe qingting guo wo de fannao
[01:16.65]hai zai rao a rao
[01:20.44][03:38.05]tiankong de yanse gangganghao
[01:23.36]lücha de xiangwei suizhe feng zai piao
[01:26.76][03:30.90]wo shuo xihuan you zheyang de meihao
[01:30.29]zai weirao bu qu guan hua luo le duoshao
[01:37.10]xihuan zhu cha shi niaoniao de xiangqi
[01:39.98]peng yi bei lüyouyou yong yi xiawu peizhe waigong xia weiqi
[01:44.18]zong na buhao xiezi na zhi bi ya
[01:46.70]mama banzou dianshi fa wo de taoqi
[01:50.35]ren shuo zhangdahou you henduo shiyi
[01:53.50]jiu xiang ni pinbo le yongyou le shiqu le jingcai de cengjing
[01:57.57]wo xiang shuo wo xihuan xianzai de anyi
[02:00.32]dongde zhenxi de rensheng cai zui meili
[02:04.37]nà xiàtiān xǐhuān chēng zhe yǔsǎn guāng jiǎoyā
[02:07.44]wōniú bēi zhe kézi pá shàng le pútáojià
[02:10.24]nà xiàoliǎn yìzhí yíng zhe yángguāng zhànkāi le huā
[02:13.72]wàipó shùn zhe tītián mànmàn zhòng tā de lǜchá
[02:16.88]nà xiāngtián zǒngshì shùn zhe xiǎolù ránhòu rào huí jiā
[02:20.37]cháwǎn xǐ guò zhīhòu jìde yào fǎnfù de cā
[02:23.65]nà shíjiān zǒngshì pǎode pǎode pǎode pǎode hěn xiāosǎ
[02:28.03]miāomiāo kuài xiàlái yào chídào la
[02:54.39]zenme shede ca
[03:20.81]na tongyao erbian rao
[03:24.71]la zhe ni yingfeng pao ya pao
[03:27.53]ta zai niba xiaolu shang guang zhe jiao
[03:34.27]zai weirao toutou xiao
[03:41.01]lücha de xiangwei bijian piao ya piao
[03:44.31]buguan gushi li hualuo le duoshao
[03:47.73]meng haizai xingfu zai zhuanjiao`
    }]
  }
}, {
  title: 'あの頃～ジンジンバオヂュオニー～ (zerokoi ver.)',
  artist: 'whiteeeen',
  album: 'ゼロ恋',
  src: 'https://cdn.innocent.love/whiteeeen%20-%20%E3%81%82%E3%81%AE%E9%A0%83%EF%BD%9E%E3%82%B7%E3%82%99%E3%83%B3%E3%82%B7%E3%82%99%E3%83%B3%E3%83%8F%E3%82%99%E3%82%AA%E3%83%81%E3%82%99%E3%83%A5%E3%82%AA%E3%83%8B%E3%83%BC%EF%BD%9E%20(zerokoi%20ver.).mp3',
  cover: 'https://cdn.innocent.love/whiteeeen%20-%20%E3%81%82%E3%81%AE%E9%A0%83%EF%BD%9E%E3%82%B7%E3%82%99%E3%83%B3%E3%82%B7%E3%82%99%E3%83%B3%E3%83%8F%E3%82%99%E3%82%AA%E3%83%81%E3%82%99%E3%83%A5%E3%82%AA%E3%83%8B%E3%83%BC%EF%BD%9E%20(zerokoi%20ver.).jpg',
  lyrics: {
    type: 'lrc',
    value: `[ar:whiteeeen]
[ti:あの頃～ジンジンバオヂュオニー～ (zerokoi ver.)]
[al:ゼロ恋]
[length: 5:43]
[00:00.00]作詞：九把刀・山下歩・JIN
[00:05.01]作曲：木村充利
[00:10.71]whiteeeen - あの頃～ジンジンバオヂュオニー～
[00:16.81]月日が流れて
[00:19.72]溢れ出す思い出
[00:22.79]無邪気な君の笑顔
[00:28.36]少年は今日 ネクタイして
[00:33.39]少女との誓いを立てる
[00:39.68]鏡を見つめて
[00:42.48]落ち着きなくして
[00:45.53]着飾る君はきっと
[00:50.16]これまでで一番
[00:53.91]綺麗な姿を
[00:56.39]僕に見せてくれるんだろう
[01:03.19]あの頃に戻れるなら
[01:07.26]また君の前の席に座るんだ
[01:14.46]もう一度君に恋をして
[01:20.22]いたずらをしかって
[01:28.53][04:31.37]風が吹く季節
[01:31.31][04:34.16]すれ違った恋
[01:33.85][04:36.74]言い出せず 想い閉じ込めた
[01:39.84][04:42.84]君はいつだってそう僕のすべて
[01:44.90][04:47.84]この世界中にただ一人
[01:51.28][04:54.18]できるだけ強く
[01:54.10][04:56.97]ああ抱きしめたい
[01:56.70][04:59.58]輝く満天の夜空に
[02:02.71][05:05.68]汚れなき僕ら 二人で交わした
[02:07.86][05:10.74]あの約束を忘れない
[02:13.06][05:15.89]ジンジンバオヂュオニー
[02:28.36]なれない手つきで
[02:31.30]髪を整えて
[02:34.13]背伸びした立ち姿
[02:38.73]君は笑うのかな？
[02:42.62]笑ってくれるかな？
[02:44.85]喜ぶ顔がみたいの
[02:51.64]黒板の数式すら
[02:55.79]そっちのけでふざけあっていたよね
[03:03.05]隣に座る誰もが皆
[03:08.71]君に恋してたよ
[03:17.05]いつも思い出す君が離れない
[03:22.42]何も手につかないくらいに
[03:28.46]僕を呼ぶ声も 弾ける笑顔も
[03:33.53]いますぐ君にただ会いたい
[03:39.87]儚く散りゆく あの流れ星に
[03:45.25]何度も何度も願ったよ
[03:51.31]小さな幸せ 届け未来まで
[03:56.53]止まった記憶そのままに
[04:01.63]ああずっと`,
    translations: [{
      lang: 'zh-Hans',
      name: '中译',
      value: `[ar:whiteeeen]
[ti:あの頃～ジンジンバオヂュオニー～ (zerokoi ver.)]
[al:ゼロ恋]
[length: 5:43]
[00:00.00]作词：九把刀・山下歩・JIN
[00:05.01]作曲：木村充利
[00:10.71]whiteeeen - 那些年～紧紧抱着你～
[00:16.81]光阴在飞逝
[00:19.72]回忆在一点点漫溢
[00:22.79]想起你天真的笑脸
[00:28.36]今天少年系上领带
[00:33.39]履行与少女的誓约
[00:39.68]呆呆地望着镜子
[00:42.48]心完全静不下来
[00:45.53]盛装打扮的你
[00:50.16]等会在我面前
[00:53.91]一定是至今为止
[00:56.39]我见过最美的样子
[01:03.19]若还能回到那些年的时光
[01:07.26]我要再一次坐在你的前桌
[01:14.46]再次与你坠入爱河
[01:20.22]故意讨你温柔的骂
[01:28.53][04:31.37]风吹的季节
[01:31.31][04:34.16]错过的爱情
[01:33.85][04:36.74]说不出口的爱意封锁在心底
[01:39.84][04:42.84]你自始至终都是我的全部
[01:44.90][04:47.84]在这世界里你就是我唯一
[01:51.28][04:54.18]只想尽可能
[01:54.10][04:56.97]紧紧抱着你
[01:56.70][04:59.58]漫天璀璨的夜空下
[02:02.71][05:05.68]天真无邪的我们
[02:07.86][05:10.74]彼此交换的约定 我不会忘记
[02:13.06][05:15.89]紧紧抱着你
[02:28.36]笨拙的手势
[02:31.30]整理着发型
[02:34.13]直挺挺站在原地的我
[02:38.73]你会不会忍俊不禁呢
[02:42.62]你还会不会冲我笑呢
[02:44.85]想看到你开心的样子
[02:51.64]写在黑板上的算式
[02:55.79]抛在一旁不管不顾相互开着彼此玩笑
[03:03.05]坐在邻座的每个人
[03:08.71]都深深为你而着迷
[03:17.05]时刻都会想起你 总是挥之不去
[03:22.42]让我无心再专注于任何一件事
[03:28.46]你呼唤我的声音 你灿烂的笑容
[03:33.53]我只想要现在马上就能看见你
[03:39.87]对着那颗转瞬即逝的流星
[03:45.25]一次又一次地许下了心愿
[03:51.31]愿这份小幸福能抵达未来
[03:56.53]一度静止的记忆
[04:01.63]就这样永恒延续
`
    }, {
      lang: 'phonetic-latin',
      name: 'Rōmaji',
      value: `[ar:whiteeeen]
[ti:あの頃～ジンジンバオヂュオニー～ (zerokoi ver.)]
[al:ゼロ恋]
[length: 5:43]
[00:00.00]
[00:05.01]
[00:10.71]whiteeeen - anogoro ~ jinjinbaozheni ~
[00:16.81]tsukihi ga nagarete
[00:19.72]afure dasu omoide
[00:22.79]mujakina kimi no egao
[00:28.36]shōnen wa kyō nekutai shite
[00:33.39]shōjo to no chikai o tateru
[00:39.68]kagami o mitsumete
[00:42.48]ochitsuki naku shite
[00:45.53]kikazaru kimi wa kitto
[00:50.16]kore made de ichiban
[00:53.91]kireina sugata o
[00:56.39]boku ni misete kurerun darou
[01:03.19]anogoro ni modorerunara
[01:07.26]mata kimi no mae no seki ni suwarun da
[01:14.46]mōichido kimi ni koi o shite
[01:20.22]itazura o shikatte
[01:28.53][04:31.37]kazegafuku kisetsu
[01:31.31][04:34.16]surechigatta koi
[01:33.85][04:36.74]iidasezu omoi tojikometa
[01:39.84][04:42.84]kimi wa itsu datte sō boku no subete
[01:44.90][04:47.84]kono sekaijū ni tadahitori
[01:51.28][04:54.18]dekirudake tsuyoku
[01:54.10][04:56.97]ā dakishimetai
[01:56.70][04:59.58]kagayaku manten no yozora ni
[02:02.71][05:05.68]kegare naki bokura futari de kawashita
[02:07.86][05:10.74]ano yakusoku o wasurenai
[02:13.06][05:15.89]jin jin baozhe ni
[02:28.36]narenai tetsuki de
[02:31.30]kami o totonoete
[02:34.13]senobi shita tachisugata
[02:38.73]kimi wa warau no ka na
[02:42.62]wara tte kureru ka na
[02:44.85]yorokobu kao ga mitai no
[02:51.64]kokuban no sūshiki sura
[02:55.79]sotchinoke de fuzake atte ita yo ne
[03:03.05]tonari ni suwaru daremoga mina
[03:08.71]kimi ni koishi teta yo
[03:17.05]itsumo omoidasu kimi ga hanarenai
[03:22.42]nani mo te ni tsukanai kurai ni
[03:28.46]boku o yobu koe mo hajikeru egao mo
[03:33.53]ima sugu kimi ni tada aitai
[03:39.87]hakanaku chiri yuku ano nagareboshi ni
[03:45.25]nandomonandomo negatta yo
[03:51.31]chīsana shiawase todoke mirai made
[03:56.53]tomatta kioku sonomama ni
[04:01.63]ā zutto
`
    }]
  }
}, {
  title: '你的答案',
  artist: '阿冗',
  album: '你的答案',
  src: 'https://cdn.innocent.love/%E9%98%BF%E5%86%97%20-%20%E4%BD%A0%E7%9A%84%E7%AD%94%E6%A1%88.mp3',
  cover: 'https://cdn.innocent.love/%E9%98%BF%E5%86%97%20-%20%E4%BD%A0%E7%9A%84%E7%AD%94%E6%A1%88.jpg',
  lyrics: {
    type: 'lrc',
    value: `[ar:阿冗]
[ti:你的答案]
[al:你的答案]
[length: 3:40]
[00:00.00]作词：林晨阳，刘涛
[00:06.26]作曲：刘涛
[00:12.52]阿冗 - 你的答案
[00:25.03][01:38.84]也许世界就这样
[00:27.88][01:41.96]我也还在路上
[00:30.77][01:44.57]没有人能诉说
[00:35.99][01:49.75]也许我只能沉默
[00:39.08][01:52.62]眼泪湿润眼眶
[00:41.87][01:55.59]可又不甘懦弱
[00:45.14][01:58.81]低着头期待白昼
[00:50.79][02:04.49]接受所有的嘲讽
[00:56.11][02:09.98]向着风拥抱彩虹
[01:01.65][02:15.46]勇敢地向前走
[01:06.55][02:20.22][02:48.93]黎明的那道光
[01:08.56][02:22.39][02:52.38]会越过黑暗
[01:11.54][02:25.17][02:55.34]打破一切恐惧我能
[01:14.44][02:28.09][02:58.12]找到答案
[01:17.23][02:30.97][03:00.83]哪怕要逆着光
[01:19.68][02:33.29][03:03.27]就驱散黑暗
[01:22.50][02:36.15]丢弃所有的负担
[01:25.46][01:28.34][02:39.19][02:41.94][03:11.89]不再孤单
[03:06.14]有一万种的力量
[03:09.17]淹没孤单
[03:14.68](也许世界就这样)
[03:17.23](我也还在路上)
[03:19.82](没有人能诉说)
[03:24.80](也许我只能沉默)
[03:28.25](眼泪湿润眼眶)
[03:31.04](可又不甘懦弱)`,
    translations: [{
      lang: 'phonetic-latin',
      name: 'Pīnyīn',
      value: `[ar:阿冗]
[ti:你的答案]
[al:你的答案]
[length: 3:40]
[00:00.00]
[00:06.26]
[00:12.52]阿冗 - nǐ de dáàn
[00:25.03][01:38.84][03:14.68]yexu shijie jiu zheyang
[00:27.88][01:41.96][03:17.23]wo ye hai zai lu shang
[00:30.77][01:44.57][03:19.82]meiyou ren neng sushuo
[00:35.99][01:49.75][03:24.80]yexu wo zhineng chenmo
[00:39.08][01:52.62][03:28.25]yanlei shirun yankuang
[00:41.87][01:55.59][03:31.04]ke you bugan nuoruo
[00:45.14][01:58.81]di zhe tou qidai baizhou
[00:50.79][02:04.49]jieshou suoyou de chaofeng
[00:56.11][02:09.98]xiang zhe feng yongbao caihong
[01:01.65][02:15.46]yonggan de xiang qian zou
[01:06.55][02:20.22][02:48.93]liming de na dao guang
[01:08.56][02:22.39][02:52.38]hui yueguo heian
[01:11.54][02:25.17][02:55.34]dapo yiqie kongju wo neng 
[01:14.44][02:28.09][02:58.12]zhaodao daan
[01:17.23][02:30.97][03:00.83]na pa yao ni zhe guang
[01:19.68][02:33.29][03:03.27]jiu qusan heian
[01:22.50][02:36.15]diuqi suoyou de fudan
[01:25.46][01:28.34][02:39.19][02:41.94][03:11.89]buzai gudan
[03:06.14]you yiwan zhong de liliang
[03:09.17]yanmo gudan`
    }]
  }
}, {
  title: '真的爱你',
  artist: 'Beyond',
  album: 'Beyond 25th Anniversary',
  src: 'https://cdn.innocent.love/Beyond%20-%20%E7%9C%9F%E7%9A%84%E7%88%B1%E4%BD%A0.flac',
  cover: 'https://cdn.innocent.love/Beyond%20-%20%E7%9C%9F%E7%9A%84%E7%88%B1%E4%BD%A0.jpg',
  lyrics: {
    type: 'lrc',
    value: `[ar:Beyond]
[ti:真的爱你]
[al:25周年精选]
[length: 4:38]
[00:00.00]作詞：小美
[00:07.91]作曲：黃家駒
[00:15.93]Beyond - 真的愛你
[00:24.82][01:35.01]無法可修飾的一對手 帶出溫暖永遠在背後
[00:31.84][01:42.05]縱使囉唆始終關注 不懂珍惜太內咎
[00:37.26]沉醉於音階她不讚賞 母親的愛卻永未退讓
[00:44.13]決心衝開心中掙扎 親恩終可報答
[00:50.17][02:00.33][02:58.18]春風化雨暖透我的心 一生眷顧無言地送贈
[00:57.99][02:07.90][03:05.76][03:30.72]是妳多麼溫馨的目光 教我堅毅望著前路
[01:04.46][02:14.57][03:12.17][03:36.96]叮囑我跌倒不應放棄
[01:10.62][02:20.37][03:18.20][03:42.99]沒法解釋怎可報盡親恩 愛意寬大是無限
[01:17.05][02:27.13][03:24.59][03:49.57]請准我說聲真的愛妳
[01:47.55]仍記起溫馨的一對手 始終給我照顧未變樣
[01:54.40]理想今天終於等到 分享光輝盼做到`,
    translations: [{
      lang: 'phonetic-latin',
      name: 'Ping³jam¹',
      value: `[ar:Beyond]
[ti:真的爱你]
[al:25周年精选]
[length: 4:38]
[00:00.00]
[00:07.91]
[00:15.93]Beyond - dzan¹dik⁷ oi³ nei⁵
[00:24.82][01:35.01]moufaat ho sausikdik jatdoey sau daaitsoet wannyn wingjyn dzoi buihau
[00:31.84][01:42.05]dzungsi loso tsidzung gwaandzy batdung dzansik taai noigau
[00:37.26]tsamdzoey jy jamgaai taa bat dzaansoeng moutsan dik oi koek wingmei toeyjoeng
[00:44.13]kytsam tsunghoi samdzung dzangdzaat tsanjan dzungho boudaap
[00:50.17][02:00.33][02:58.18]tsoenfungfaajy nyntau ngodik sam jatsang gyngu moujin dei sungdzang
[00:57.99][02:07.90][03:05.76][03:30.72]si nei domo wanhing dik mukgwong gaau ngo ginngai mong dzoek tsinlou
[01:04.46][02:14.57][03:12.17][03:36.96]dingdzuk ngo ditdou batjing fonghei
[01:10.62][02:20.37][03:18.20][03:42.99]mutfaat gaaisik dzamho boudzoen tsanjan oiji fundaai si mouhaan
[01:17.05][02:27.13][03:24.59][03:49.57]tsing dzoen ngo sytseng dzandik oi nei
[01:47.55]jing geihei wanhing dik jatdoey sau tsidzung kap ngo dziugu mei binjoeng
[01:54.40]leisoeng gamtin dzungjy dangdou fanhoeng gwongfai paan dzoudou`
    }]
  }
}], 0, PLAY_ORDER_LOOP)

const router = new Router(document.getElementById('app'))
router.setRoutes(routes)
