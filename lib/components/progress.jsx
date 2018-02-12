'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Progress integration
 * @see [Bootstrap Progress]{@link https://getbootstrap.com/docs/4.0/components/progress/}
 *
 * @class Progress
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
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

/**
 * Bootstrap ProgressBar integration
 * @see [Bootstrap Progress]{@link https://getbootstrap.com/docs/4.0/components/progress/}
 *
 * @class ProgressBar
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.color] - Background color
 * @property {String|Number} [props.value] - Progress value
 * @property {String|Number} [props.max] - Progress maximum value
 * @property {Boolean} [props.animated] - Background animation
 * @property {Boolean} [props.striped] - Strip background
 */
export class ProgressBar extends Component {
    static propTypes = {
        ...Tag.propTypes,
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
        const classes = Classnames('progress-bar', 
            bar ? className || barClassName : barClassName, 
            animated && 'progress-bar-animated', 
            color && `bg-${color}`, 
            (striped || animated) && 'progress-bar-striped'
        );
        return <Tag {...props} className={classes} role="progressbar"
            style={{ ...this.props.style, width: `${percent}%` }} 
            aria-valuenow={value} aria-valuemin="0" aria-valuemax={max} 
            children={children}
        />
    }
}