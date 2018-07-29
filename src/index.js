import React, { Component } from 'react';
import propTypes from 'prop-types';

const DEBUG = false;

export default class Music extends Component {

    static defaultProps = {
        autoPlay: false,
        src: null,
        preload: true,
        initSeek: 0,

        onProgress: d => d,
        onError: e => e,
        onLoadStart: e => e,
        onLoadMetaData: e => e,
        onLoad: e => e,
        onPlay: e => e,
        onPause: e => e,
        onEnd: e => e,
        onCanplay: e => e,
        onCanplayThrough: e => e,
        onRateChange: e => e,
        onDurationChange: e => e,
        onVolumeChange: e => e,
        onSuspend: e => e,
        onWaiting: e => e,
        onPlaying: e => e,
        onSeeking: e => e,
        onSeeked: e => e,
    }

    static propTypes = {
        autoPlay: propTypes.bool,
        src: propTypes.string,
        preload: propTypes.bool,
        initSeek: propTypes.number,

        onProgress: propTypes.func,
        onError: propTypes.func,
        onLoadStart: propTypes.func,
        onLoadMetaData: propTypes.func,
        onLoad: propTypes.func,
        onPlay: propTypes.func,
        onPause: propTypes.func,
        onEnd: propTypes.func,
        onCanplay: propTypes.func,
        onCanplayThrough: propTypes.func,
        onRateChange: propTypes.func,
        onDurationChange: propTypes.func,
        onVolumeChange: propTypes.func,
        onSuspend: propTypes.func,
        onWaiting: propTypes.func,
        onPlaying: propTypes.func,
        onSeeking: propTypes.func,
        onSeeked: propTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            play: props.autoPlay ? true : props.play,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.play !== this.state.play) {
            this.setState({ play: nextProps.play }, () => {
                this.audio && nextProps.play ?
                    this.audio.play() : this.audio.pause();
            });
        }
    }

    componentDidMount() {
        this.audio.ontimeupdate = e => {
            if (this.audio.readyState === 4) { // ok
                this._onProgress({
                    currentTime: this.audio.currentTime,
                    duration: this.audio.duration,
                    seeking: this.audio.seeking,
                    buffered: this.audio.buffered.end(0),
                    seekable: this.audio.seekable.end(0),
                    percent: (this.audio.currentTime / this.audio.duration * 10000 | 0) / 100,
                    networkState: this.audio.networkState,
                });
            }
        }
        this.audio.onerror = this._onError;
        this.audio.onloadstart = this._onLoadStart;
        this.audio.onloadedmetadata = this._onLoadMetaData;
        this.audio.onloadeddata = this._onLoad;
        this.audio.onended = this._onEnd;
        this.audio.oncanplay = this._onCanplay;
        this.audio.oncanplaythrough = this._onCanplayThrough;
        this.audio.onratechange = this._onRateChange;
        this.audio.ondurationchange = this._onDurationChange;
        this.audio.onvolumechange = this._onVolumeChange;
        this.audio.onsuspend = this._onSuspend;
        this.audio.onwaiting = this._onWaiting;
        this.audio.onplaying = this._onPlaying;
        this.audio.onseeking = this._onSeeking;
        this.audio.onseeked = this._onSeeked;
    }

    componentWillUnmount() {
        this._timer && clearTimeout(this._timer);
    }

    _debug = (...arg) => {
        DEBUG && console.log(...arg);
    }

    // events
    _onProgress = d => {
        this._debug('_onProgress');
        this.props.onProgress(d);
    }
    _onError = e => {
        this._debug('_onError');
        this.props.onError(e);
    }
    _onLoadStart = e => {
        this._debug('_onLoadstart');
        this.props.onLoadStart(e);
    }
    _onLoad = e => {
        this._debug('_onLoad');
        this.state.play && this.audio.play();
        if (this.props.initSeek > 0) {
            this.seek(this.props.initSeek);
        }
        this.props.onLoad(e);
    }
    _onPlay = e => {
        this._debug('_onPlay');
        this.props.onPlay(e);
    }
    _onPause = e => {
        this._debug('_onPause');
        this.props.onPause(e);
    }
    _onEnd = e => {
        this._debug('_onEnd');
        this.props.onEnd(e);
    }
    _onCanplay = e => {
        this._debug('_onCanplay');
        this.props.onCanplay(e);
    }
    _onCanplayThrough = e => {
        this._debug('_onCanplaythrough');
        this.props.onCanplayThrough(e);
    }
    _onRateChange = e => {
        this._debug('_onRatechange');
        this.props.onRateChange(e);
    }
    _onDurationChange = e => {
        this._debug('_onDurationchange');
        this.props.onDurationChange(e);
    }
    _onVolumeChange = e => {
        this._debug('_onVolumechange');
        this.props.onVolumeChange(e);
    }
    _onSuspend = e => {
        this._debug('_onSuspend');
        this.props.onSuspend(e);
    }
    _onLoadMetaData = e => {
        this._debug('_onLoadMetaData');
        this.props.onLoadMetaData(e);
    }
    _onWaiting = e => {
        this._debug('_onWaiting');
        this.props.onWaiting(e);
    }
    _onPlaying = e => {
        this._debug('_onPlaying');
        this.props.onPlaying(e);
    }
    _onSeeking = e => {
        this._debug('_onSeeking');
        this.props.onSeeking(e);
    }
    _onSeeked = e => {
        this._debug('_onSeeked');
        this.props.onSeeked(e);
    }

    // methods
    reLoad = () => {
        this.audio && this.audio.load();
        return this;
    }

    isPlay = () => {
        return this.audio ? this.audio.played : false;
    }

    seek = (val) => {
        this.audio && (this.audio.currentTime = val);
    }

    render() {
        const { src, autoPlay, preload } = this.props;

        return (
            <audio
                style={style}
                ref={r => this.audio = r}
                src={src}
                autoPlay={autoPlay}
                preload={`${preload}`}
                controls={false}
            />
        )
    }
}

const style = {
    width: 0,
    height: 0,
    overflow: 'hidden',
}