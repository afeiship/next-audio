# next-audio
> Pure audio api for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @feizheng/next-audio
```

## status
| code | status  | description                       |
| ---- | ------- | --------------------------------- |
| -1   | error   | 当在音频/视频加载期间发生错误时   |
| 0    | init    | 当音频组件在初始状态              |
| 1    | play    | 当音频/视频已开始或不再暂停时     |
| 2    | pause   | 当音频/视频已暂停时               |
| 3    | loaded  | 当浏览器已加载音频/视频的元数据时 |
| 4    | ended   | 当目前的播放列表已结束时          |
| 5    | canplay | 当浏览器可以播放音频/视频时       |


## apis
| api   | member   | params      | description                         |
| ----- | -------- | ----------- | ----------------------------------- |
| play  | method   | -           | Play audio                          |
| pause | method   | -           | Pause audio                         |
| load  | method   | -           | Force load audio                    |
| stop  | method   | -           | Stop audio                          |
| seek  | method   | (num)       | Set seek by currentTime             |
| move  | method   | (num)       | Set seek percent(0-1)               |
| prop  | method   | (name,args) | Set props(loop/volume/rate/current) |
| times | property | -           | Return rate/current/total seconds   |

## props
| name    | description                |
| ------- | -------------------------- |
| loop    | Set/get loop               |
| volume  | Set/get volume             |
| rate    | Set/get playback rate      |
| current | Set/get play currentTime   |
| muted   | Set/get muted(mute/unmute) |
| ended   | Get if audio is ended      |

## usage
```html
<audio id="audio" controls src="http://kolber.github.io/audiojs/demos/mp3/juicy.mp3">
  NOT SUPPORT
</audio>
```

```js
import NxAudio from 'next-audio';

// code goes here:
const nxAudio = new NxAudio({ element: document.getElementById('audio') });
nxAudio.play();
nxAudio.prop('loop', true);
```

## resources
- https://www.developphp.com/lib/JavaScript/Audio
- http://www.w3school.com.cn/html5/html5_ref_audio_video_dom.asp
- https://www.w3schools.com/tags/ref_av_dom.asp

## license
Code released under [the MIT license](https://github.com/afeiship/next-audio/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@feizheng/next-audio
[version-url]: https://npmjs.org/package/@feizheng/next-audio

[license-image]: https://img.shields.io/npm/l/@feizheng/next-audio
[license-url]: https://github.com/afeiship/next-audio/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@feizheng/next-audio
[size-url]: https://github.com/afeiship/next-audio/blob/master/dist/next-audio.min.js

[download-image]: https://img.shields.io/npm/dm/@feizheng/next-audio
[download-url]: https://www.npmjs.com/package/@feizheng/next-audio
