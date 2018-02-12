'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Icon from './icon';
import Tag from './tag';
import Fade from './transition/fade';

/**
 * Bootstrap Alert integration
 * @see [Bootstrap Alert]{@link https://getbootstrap.com/docs/4.0/components/alerts/}
 * @see [Reactstrap Alert]{@link https://reactstrap.github.io/components/alerts/}
 *
 * @class Alert
 * @category Alert
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Fade
 * @branch Theme.AlertMessage
 * @branch Theme.AlertFlash
 * @property {Object} [props] - Component properties
 * @property {String} [props.color] - Alert background and text color
 * @property {Boolean|Function} [props.toggle] - Function that modifies the display of the element
 */
export default class Alert extends Component {
    static propTypes = {
        ...Fade.propTypes,
        color: PropTypes.string,
        toggle: PropTypes.oneOfType([
            PropTypes.bool, 
            PropTypes.func
        ]),
    };

    static defaultProps = {
        active: true,
        color: 'success',
        tag: 'aside',
        toggle: true,
        role: 'alert'
    };

    state = { active: this.props.active === undefined ? true : this.props.active };
    toggle = () => this.setState({ active: !this.state.active });

    render() {
        let {
            active,
            children,
            className,
            color,
            toggle,
            ...props
        } = this.props;
        if (toggle === true) {
            active = this.state.active;
            toggle = this.toggle;
        }

        const classes = Classnames(
            className,
            'alert',
            `alert-${color}`,
            { 'alert-dismissable': toggle }
        );

        return <Fade ref="transition" {...props} 
            active={active} className={classes} 
            unmountOnExit={true}>
            {children}
            {toggle && (
                <AlertLink className="float-right" onClick={toggle}>
                    <Icon name="times" />
                </AlertLink>
            )}
        </Fade>
    }
}

/**
 * Flash Alert
 * @see [Bootstrap Alert]{@link https://getbootstrap.com/docs/4.0/components/alerts/}
 * @see [Reactstrap Alert]{@link https://reactstrap.github.io/components/alerts/}
 *
 * @class AlertFlash
 * @category Alert
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Alert
 * @property {Object} [props] - Component properties
 * @property {Number} [props.delay] - The delay before item is hidden (in ms)
 */
export class AlertFlash extends Component {
    static propTypes = {
        ...Alert.propTypes,
        delay: PropTypes.number
    };

    static defaultProps = {
        active: true,
        delay: 1000,
    };

    state = { active: this.props.active };
    toggle = () => this.setState({ active: !this.state.active });

    render() {
        const { active, delay, ...props } = this.props;
        return <Alert toggle={false} {...props} active={active && this.state.active} />
    }

    componentDidMount() {
        setTimeout(this.toggle, this.props.delay);
    }
}

/**
 * Bootstrap Alert without close button
 * @see [Bootstrap Alert]{@link https://getbootstrap.com/docs/4.0/components/alerts/}
 * @see [Reactstrap Alert]{@link https://reactstrap.github.io/components/alerts/}
 *
 * @class AlertMessage
 * @category Alert
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Alert
 */
export class AlertMessage extends Component {
    static propTypes = {
        ...Alert.propTypes,
    };

    render() {
        return <Alert {...this.props} toggle={false} />
    }
}

/**
 * Bootstrap Alert Heading integration
 * @see [Bootstrap Alert Heading]{@link https://getbootstrap.com/docs/4.0/components/alerts/#additional-content}
 *
 * @class AlertHeading
 * @category Alert
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class AlertHeading extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'h4'
    };

    render() {
        const { className, pointer, ...props } = this.props;
        const classes = Classnames(className, 'alert-heading');

        return <Tag ref={pointer} {...props} className={classes} />
    }
}

/**
 * Bootstrap Alert Link integration
 * @see [Bootstrap Alert Link]{@link https://getbootstrap.com/docs/4.0/components/alerts/#link-color}
 *
 * @class AlertLink
 * @category Alert
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag 
 * @property {Object} [props] - Component properties
 */
export class AlertLink extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'a',
        href: 'javascript:void(0);'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'alert-link');
        return <Tag {...props} className={classes} />
    }
}