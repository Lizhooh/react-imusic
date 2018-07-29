import React, { Component } from 'react';
import Slider from 'rc-slider';
import '../styles/slider.css';

export default class MySlider extends Component {

    static defaultProps = {
        onChangeCompleted: _ => _,
        onChange: _ => _,
        onBeforeChange: _ => _,
        onAfterChange: _ => _,
    }

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            maxValue: 0,
        }
    }

    update(value, maxValue = this.state.maxValue) {
        if (value !== this.state.value || maxValue !== this.state.maxValue) {
            this.setState({ value, maxValue });
        }
    }

    render() {
        const { value, maxValue } = this.state;
        const {
            onChangeCompleted,
            onChange,
            onAfterChange,
            onBeforeChange,
        } = this.props;

        return (
            <Slider
                value={value}
                max={maxValue}
                onBeforeChange={onBeforeChange}
                onChange={v => {
                    this.setState({ value: v });
                    onChange(v);
                }}
                onAfterChange={v => {
                    onChangeCompleted(v);
                    onAfterChange(v);
                }}
            />
        );
    }
}