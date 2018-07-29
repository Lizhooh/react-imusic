import React, { Component } from 'react';

// 时间格式化
function formatTime(time) {
    time = Math.round(time);
    const ft = n => n < 10 ? '0' + n : n;
    if (!formatTime.cache) {
        formatTime.cache = {};
    }
    if (formatTime.cache[time]) {
        return formatTime.cache[time];
    }
    else {
        const res = `${ft(time / 60 % 60 | 0)}:${ft(time % 60)}`;
        formatTime.cache[time] = res;
        return res;
    }
}

// 显示时间的文本
export default class TimeText extends Component {

    constructor(props) {
        super(props);
        this.state = {
            start: props.start || 0,
            end: props.end || 0,
        }
    }

    update(start, end = this.state.end) {
        if (start !== this.state.start || end !== this.state.end) {
            this.setState({ start, end: end });
        }
    }

    render() {
        const { start, end } = this.state;

        return (
            <div>
                <span style={styles.time}>{formatTime(start)}</span>
                <span style={styles.ftime}>/</span>
                <span style={styles.ftime}>{formatTime(end)}</span>
            </div>
        );
    }
}

const styles = {
    time: {
        color: '#333',
    },
    ftime: {
        color: '#666',
    }
};