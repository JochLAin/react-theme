'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

export default class Progress extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };
    static defaultProps = {
        tag: 'article'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'progress');
        return <Tag {...props} className={classes} />
    }
}

export class ProgressBar extends Component {
    static propTypes = {
        value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        max: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        animated: PropTypes.bool,
        striped: PropTypes.bool,
        color: PropTypes.string,
    };

    static defaultProps = {
        tag: 'section',
        value: 0,
        max: 100,
    };

    render() {
        const { children, className, barClassName, value, max, animated, striped, color, bar, multi, ...props } = this.props;
        const percent = ((Number(value) / Number(max)) * 100);
        const classes = Classnames('progress-bar', bar ? className || barClassName : barClassName, animated && 'progress-bar-animated', color && `bg-${color}`, (striped || animated) && 'progress-bar-striped');
        return <Tag {...props} className={classes} style={{ ...this.props.style, width: `${percent}%` }} role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax={max} children={children} />
    }
}