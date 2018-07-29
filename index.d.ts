import * as React from "react";

interface IProgressData {
    currentTime: number,
    duration: number,
    seeking: boolean,
    buffered: number,
    seekable: number,
    percent: number,
    networkState: number,
}

export interface IMusicProps {
    src: string,
    play: boolean,
    autoPlay?: boolean,
    preload?: boolean,
    initSeek?: number,

    onProgress?(data: IProgressData): any,
    onError?(e: ErrorEvent): any,
    onLoadStart?(e: Event): any,
    onLoadMetaData?(e: Event): any,
    onLoad?(e: Event): any,
    onPlay?(e: Event): any,
    onPause?(e: Event): any,
    onEnd?(e: Event): any,
    onCanplay?(e: Event): any,
    onCanplayThrough?(e: Event): any,
    onRateChange?(e: Event): any,
    onDurationChange?(e: Event): any,
    onVolumeChange?(e: Event): any,
    onSuspend?(e: Event): any,
    onWaiting?(e: Event): any,
    onPlaying?(e: Event): any,
    onSeeking?(e: Event): any,
    onSeeked?(e: Event): any,
}

export default class IMusic extends React.Component<IMusicProps> {
    reLoad(): void;
    isPlay(): boolean;
    seek(val: number): void;
}