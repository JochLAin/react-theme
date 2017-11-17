'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Icon from './icon';
import Tag from './tag';
import Fade from './transition/fade';

export class AlertControlled extends Component {
    static propTypes = {
        active: PropTypes.bool,
        color: PropTypes.string,
        toggle: PropTypes.func,
        transition: PropTypes.shape(Fade.propTypes),
    };

    static defaultProps = {
        active: true,
        color: 'success',
        tag: 'aside',
        transition: {
            unmountOnExit: true
        },
    };

    render() {
        const { children, className, color, active, toggle, transition, style, ...props } = this.props;
        const classes = Classnames(className, 'alert', `alert-${color}`, { 'alert-dismissable': toggle });

        return <Fade ref="transition" {...props} {...transition} className={classes} active={active} role="alert">
            {toggle && (
                <button type="reset" className="close" onClick={toggle}>
                    <Icon name="times" />
                </button>
            )}
            {children}
        </Fade>
    }
}

export default class Alert extends Component {
    static propTypes = {
        controlled: PropTypes.bool,
    }

    state = { active: this.props.active };
    toggle = () => this.setState({ active: !this.state.active });

    render() {
        const { controlled, ...props } = this.props;
        if (controlled) return <AlertControlled {...props} />
        return <AlertControlled {...props} toggle={this.toggle} active={this.state.active} />
    }
}

export class AlertMessage extends Component {
    static propTypes = {
        ...AlertControlled.propTypes,
    };

    static defaultProps = {
        controlled: true,
    };

    state = { active: this.props.active };
    toggle = () => this.setState({ active: !this.state.active });

    render() {
        return <Alert {...this.props} />
    }
}

export class AlertFlash extends Component {
    static propTypes = {
        ...AlertControlled.propTypes,
        delay: PropTypes.number
    };

    static defaultProps = {
        delay: 1000
    };

    state = { active: true };
    toggle = () => this.setState({ active: !this.state.active });

    render() {
        const { delay, ...props } = this.props;
        return <AlertMessage {...props} active={this.state.active} />
    }

    componentDidMount() {
        setTimeout(this.toggle, this.props.delay);
    }
}

export class AlertHeading extends Component {
    static propTypes = {
        ...Tag.propTypes,
        pointer: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    }
    static defaultProps = {
        tag: 'h4'
    }

    render() {
        const { className, pointer, tag, ...props } = this.props;
        const classes = Classnames(className, 'alert-heading');

        const Tag = (props.href && tag == this.constructor.defaultProps.tag) ? 'a' : tag;
        return <Tag ref={pointer} {...props} className={classes} />
    }
}

export class AlertLink extends Component {
    static propTypes = {
        ...Tag.propTypes,
    }
    static defaultProps = {
        tag: 'a',
        href: 'javascript:void(0);'
    }

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'alert-link');
        return <Tag {...props} className={classes} />
    }
}