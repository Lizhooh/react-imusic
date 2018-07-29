
## React-IMusic
React-IMusic is an HTML5 Audio integration component.

### Install
Simply install it using npm/yarn.

```bash
npm install react-imusic
```

### Usage

```js
<Music
    ref={r => this.music = r}
    src={list[index].url}
    play={play}
    onProgress={d => {
        if (this.$lock !== true) {
            this.slider.update(d.currentTime, d.duration);
            this.timetext.update(d.currentTime, d.duration);
        }
    }}
/>
```

### Example
You can also directly view the [Example](https://github.com/Lizhooh/redux-fine/tree/master/example) code.

### API

#### Props

name | type | default | description
:--- | :--- | :--- | :---
src | string | null | __@required__
autoPlay | bool | false |
preload | bool | true |
initSeek | number | 0 |
onProgress | function | d => d,
onError | function | e => e,
onLoadStart | function | e => e,
onLoadMetaData | function | e => e,
onLoad | function | e => e,
onPlay | function | e => e,
onPause | function | e => e,
onEnd | function | e => e,
onCanplay | function | e => e,
onCanplayThrough | function | e => e,
onRateChange | function | e => e,
onDurationChange | function | e => e,
onVolumeChange | function | e => e,
onSuspend | function | e => e,
onWaiting | function | e => e,
onPlaying | function | e => e,
onSeeking | function | e => e,
onSeeked | function | e => e,

onProgress callback param data:

```js
{
    currentTime: number,
    duration: number,
    seeking: boolean,
    buffered: number,
    seekable: number,
    percent: number,
    networkState: number,
}
```

#### Module

name | params | description
:--- | :--- | :---
reLoad | () |
isPlay | () |
seek | (val: number) |
