# next-audio
> Pure audio api for next.

## install
```bash
npm install -S afeiship/next-audio --registry=https://registry.npm.taobao.org
```

## status
| code | status | description                  |
| ---- | ------ | ---------------------------- |
| 0    | init   | Initial load                 |
| 1    | play   | When audio start play        |
| 3    | pause  | When audio pause play        |
| 3    | loaded | When audio loaded            |
| 4    | ended  | When audio has played to end |
| -1   | error  | When audio meet error        |


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
