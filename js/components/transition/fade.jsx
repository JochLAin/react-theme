'use strict';

import React, { Component } from 'react';
import Classnames from 'classnames';
import PropTypes from 'prop-types';
import Tag from '../tag';
import Transition from './index';

export default class FadeTransition extends Component {
    static propTypes = {
        ...Tag.propTypes,
        ...Transition.propTypes,
        className: PropTypes.string,
        timeout: PropTypes.number,
    };
    static defaultProps = {
        ...Transition.defaultProps,
        appear: true,
        enter: true,
        exit: true,
        tag: 'article',
        timeout: 150,
    };

    render() {
        return <Transition {...Transition.getTransitionProps(this.props)} onRender={this.onRender} />
    }

    onRender = status => {
        if (status == Transition.UNMOUNTED) return;

        const { className, baseClassName, baseClassNameActive, ...props } = Transition.getOtherProps(this.props);
        const active = [Transition.ENTERING, Transition.ENTERED].indexOf(status) != -1;
        const classes = Classnames(className, 'fade', active && 'show');
        return <Tag {...props} className={classes} />
    }
}