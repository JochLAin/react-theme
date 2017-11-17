'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/** @TODO: add generated menu */

export default class Navbar extends Component {
    static propTypes = {
        ...Tag.propTypes,
        light: PropTypes.bool,
        dark: PropTypes.bool,
        fixed: PropTypes.string,
        sticky: PropTypes.string,
        color: PropTypes.string,
        role: PropTypes.string,
        expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    };

    static defaultProps = {
        tag: 'nav',
        expand: true,
    };

    render() {
        const { expand, className, light, dark, fixed, sticky, color, ...props } = this.props;
        const classes = Classnames(className, 'navbar', (expand == true || expand == 'xs') ? 'navbar-expand' : `navbar-expand-${expand}` , light && 'navbar-light', dark && 'navbar-dark', color && `bg-${color}`, fixed && `fixed-${fixed}`, sticky && `sticky-${sticky}`);
        return <Tag {...props} className={classes} />
    }
}

export class NavbarBrand extends Component {
    static propTypes = {
        ...Tag.propTypes,
    }
    static defaultProps = {
        tag: 'a'
    }

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'navbar-brand');
        return <Tag {...props} className={classes} />
    }
}

export class NavbarToggler extends Component {
    static propTypes = {
        type: PropTypes.string,
    }
    static defaultProps = {
        tag: 'button',
        type: 'button'
    }

    render() {
        const { className, children, ...props } = this.props;
        const classes = Classnames(className, 'navbar-toggler');
        return <Tag {...props} className={classes}>
            {children || <span className={'navbar-toggler-icon'} />}
        </Tag>
    }
}

export class NavbarText extends Component {
    static propTypes = {
        ...Tag.propTypes,
    }

    static defaultProps = {
        tag: 'span',
    }

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'navbar-text');
        return <Tag {...props} className={classes} />
    }
}