# next-audio
> Pure audio api for next.

## install
```bash
npm install -S afeiship/next-audio --registry=https://registry.npm.taobao.org
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
| stop  | method   | -           | Stop audio                          |
| prop  | method   | (name,args) | Set props(loop/volume/rate/current) |
| move  | method   | (num)       | Set seek percent(0-1)               |
| times | property | -           | Return rate/current/total seconds   |

## usage
```html
<audio id="audio" controls src="http://kolber.github.io/audiojs/demos/mp3/juicy.mp3">
  NOT SUPPORT
</audio>
```

```js
import NxAudio from 'next-audio';

// code goes here:
const nxAudio = new nx.Audio({ element: document.getElementById('audio') });
nxAudio.play();
nxAudio.prop('loop', true);
```

## resources
- https://www.developphp.com/lib/JavaScript/Audio
