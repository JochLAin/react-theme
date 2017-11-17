'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

class SwitchControlled extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        color: PropTypes.string,
        background: PropTypes.string,
    };

    render() {
        const { active, background, className, color, rounded, ...props } = this.props;
        const classes = Classnames(className, 'switch', active && 'active');
        const sliderClasses = Classnames('slider', rounded && 'slider-rounded', active 
            ? (color ? `bg-${color}` : 'bg-primary') 
            : (background ? `bg-${background}` : 'bg-secondary')
        );

        const innerClasses = Classnames('slider-inner', active 
            ? (color ? `border-${color}` : 'border-primary') 
            : (background ? `border-${background}` : 'border-secondary')
        );

        return <Tag {...props} className={classes}>
            <span className={sliderClasses}>
                <span className={innerClasses}></span>
            </span>
        </Tag>
    }
}

export default class Switch extends Component {
    static propTypes = {
        controlled: PropTypes.bool,
    };

    state = { active: false };
    toggle = () => this.setState({ active: !this.state.active });

    render() {
        const { controlled, ...props } = this.props;
        if (controlled) return <SwitchControlled {...props} />
        return <SwitchControlled {...props} active={this.state.active} onClick={this.onClick}/>
    }

    onClick = event => {
        this.toggle();
        if (this.props.onClick) this.props.onClick(event);
    }
}