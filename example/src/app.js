import React, { Component } from 'react';
import './styles/app.css';

import Music from 'react-imusic';
import Slider from './components/slider';
import TimeText from './components/time-text';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: true,
            index: 0,
            list: [{
                name: '李玉刚 - 刚好遇见你',
                url: 'http://fs.w.kugou.com/201807282123/fecb2749b5d8cd835861c197145b65cc/G078/M08/18/17/jg0DAFgi6G-AKqsqADDP_nSW5F4051.mp3',
            }, {
                name: '张清芳 - 大雨的夜里',
                url: 'http://fs.w.kugou.com/201807282233/1f2470b5010dcb9c82eeba0f362e964b/G080/M00/05/17/MJQEAFgvhqqABEy9ADSPO9qTGc4240.mp3',
            }],
        }
    }

    render() {
        const { play, list, index } = this.state;

        return (
            <div>
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

                <div style={{ padding: 20, fontSize: 32 }}>
                    <span>{list[index].name}</span>
                </div>

                <div style={{ padding: 20 }}>
                    <button style={{ color: play ? '#39f' : null }} onClick={e => this.setState({ play: true })}>播放</button>
                    <button style={{ color: !play ? '#39f' : null }} onClick={e => this.setState({ play: false })}>暂停</button>
                    <button onClick={e => this.setState({ index: index === 0 ? list.length - 1 : index - 1 })}>上一首</button>
                    <button onClick={e => this.setState({ index: index === list.length - 1 ? 0 : index + 1 })}>下一首</button>
                </div>

                <div style={{ padding: 20 }}>
                    <Slider
                        ref={r => this.slider = r}
                        onChangeCompleted={v => this.music.seek(v)}
                        onChange={v => this.timetext.update(v)}
                        onBeforeChange={v => this.$lock = true}
                        onAfterChange={v => this.$lock = false}
                    />
                </div>

                <div style={{ padding: 20, fontSize: 32 }}>
                    <TimeText ref={r => this.timetext = r} />
                </div>
            </div>
        );
    }
}