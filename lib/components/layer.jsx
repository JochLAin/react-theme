'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';
import { middle } from '../constants/stylesheets';

/**
 * Layer integration
 *
 * @class Layer
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.active] - Set layer to active state
 * @property {Boolean} [props.backdrop] - Close layer on click backdrop
 * @property {String} [props.color] - Layer background color
 * @property {Boolean} [props.layout] - Specify if layer hide all screen
 * @property {Boolean} [props.center] - Center horizontally content
 * @property {Boolean} [props.middle] - Center vertically content
 */
export default class Layer extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        backdrop: PropTypes.bool,
        color: PropTypes.string,
        layout: PropTypes.bool,
        center: PropTypes.bool,
        middle: PropTypes.bool,
    }

    static defaultProps = {
        active: true,
        backdrop: true,
        color: 'white',
        tag: 'article',
        center: true,
    };

    body = document.getElementsByTagName('body')[0];
    state = { active: this.props.active };
    toggle = () => this.setState({ active: !this.state.active });

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
        if (this.props.active != props.active) {
            this.setState({ active: prop.active });
        }
    }

    render() {
        const { active, className, backdrop, background, layout, ...props } = this.props;
        if (!this.state.active) return null;

        const classes = Classnames(className, 'layer', layout && 'layer-layout');
        return <Tag {...props} flex className={classes}>
            <Tag background={background} className="layer-backdrop" onClick={backdrop && this.toggle} />
            <section className="layer-inner">
                {this.props.children}
            </section>
        </Tag>
    }

    componentWillUnmount() {
        if (this.props.layout) this.body.style.overflow = 'auto';
    }
}