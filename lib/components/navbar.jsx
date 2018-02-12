'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Navbar integration
 * @see [Bootstrap Navbar]{@link https://getbootstrap.com/docs/4.0/components/navbar/}
 *
 * @class Navbar
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.light] - Apply light style
 * @property {Boolean} [props.dark] - Apply dark style
 * @property {String} [props.fixed] - Specify fixed position
 * @property {String} [props.sticky] - Specify sticky position
 * @property {String} [props.role] - Specify role position
 * @property {Boolean|String} [props.expand] - Specify expand breakpoint
 */
export default class Navbar extends Component {
    static propTypes = {
        ...Tag.propTypes,
        light: PropTypes.bool,
        dark: PropTypes.bool,
        fixed: PropTypes.string,
        sticky: PropTypes.string,
        color: PropTypes.string,
        expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    };

    static defaultProps = {
        tag: 'nav',
        expand: true,
    };

    render() {
        const { expand, className, light, dark, fixed, sticky, color, ...props } = this.props;
        const classes = Classnames(
            className, 
            'navbar', 
            (expand == true || expand == 'xs') ? 'navbar-expand' : `navbar-expand-${expand}` , 
            light && 'navbar-light', 
            dark && 'navbar-dark', 
            color && `bg-${color}`, 
            fixed && `fixed-${fixed}`, 
            sticky && `sticky-${sticky}`
        );

        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap Navbar Brand integration
 * @see [Bootstrap Navbar Brand]{@link https://getbootstrap.com/docs/4.0/components/navbar/#brand}
 *
 * @class NavbarBrand
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class NavbarBrand extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'a'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'navbar-brand');
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap Navbar Toggler integration
 * @see [Bootstrap Navbar]{@link https://getbootstrap.com/docs/4.0/components/navbar/}
 *
 * @class Navbar Toggler
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class NavbarToggler extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'button',
        type: 'button'
    };

    render() {
        const { className, children, ...props } = this.props;
        const classes = Classnames(className, 'navbar-toggler');
        return <Tag {...props} className={classes}>
            {children || <span className={'navbar-toggler-icon'} />}
        </Tag>
    }
}

/**
 * Bootstrap Navbar Text integration
 * @see [Bootstrap Navbar Text]{@link https://getbootstrap.com/docs/4.0/components/navbar/#text}
 *
 * @class NavbarText
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class NavbarText extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'span',
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'navbar-text');
        return <Tag {...props} className={classes} />
    }
}