'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';
import { middle } from '@constants/stylesheets';

export default class Layer extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        color: PropTypes.string,
        layout: PropTypes.bool,
        center: PropTypes.bool,
        middle: PropTypes.bool,
    }

    static defaultProps = {
        active: true,
        color: 'white',
        tag: 'article',
        center: true,
    };

    body = document.getElementsByTagName('body')[0];
    componentWillMount() {
        if (this.props.layout && this.props.active) {
            this.body.style.overflow = 'hidden';
        }
    }

    componentWillReceiveProps(props) {
        if (this.props.layout) {
            if (props.active) this.body.style.overflow = 'hidden';
            else this.body.style.overflow = 'auto';
        }
    }

    render() {
        const { active, className, color, layout, center, middle, ...props } = this.props;
        if (!active) return null;

        const classes = Classnames(className, 'layer', layout && 'layer-layout', middle && 'justify-content-center', center && 'align-items-center');
        return <Tag {...props} className={classes}>
            <section className={Classnames('layer-backdrop', `backdrop-${color}`)}></section>
            <section className="layer-inner">
                {this.props.children}
            </section>
        </Tag>
    }

    componentWillUnmount() {
        if (this.props.layout) this.body.style.overflow = 'auto';
    }
}