'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Fade from './transition/fade';
import Tag from './tag';

/**
 * Bootstrap Popover integration
 * @see [Bootstrap Popovers]{@link https://getbootstrap.com/docs/4.0/components/popovers/}
 *
 * @class PopoverControlled
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.active] - Set popover to active state
 * @property {Function} [props.enable] - Set popover to active state
 * @property {Function} [props.disable] - Set popover to inactive state
 * @property {Function} [props.toggle] - Toggle popover to active state
 */
class PopoverControlled extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        enable: PropTypes.func,
        disable: PropTypes.func,
        toggle: PropTypes.func,
    };

    static defaultProps = {
        tag: 'span',
    };

    static childContextTypes = {
        popover: PropTypes.shape({
            active: PropTypes.bool.isRequired,
            inside: PropTypes.bool,
            enable: PropTypes.func,
            disable: PropTypes.func,
            toggle: PropTypes.func,
            setTarget: PropTypes.func.isRequired,
            getTarget: PropTypes.func.isRequired,
        })
    };

    getChildContext = () => Object({
        popover: {
            inside: false,
            active: this.props.active,
            enable: this.props.enable,
            disable: this.props.disable,
            toggle: this.props.toggle,
            setTarget: node => this.target = node,
            getTarget: () => this.target,
        }
    });

    render() {
        const { active, className, direction, enable, disable, toggle, ...props } = this.props;
        const classes = Classnames(className, 'popover-layout');
        return <Tag {...props} className={classes} />
    }

    componentDidMount() {
        if (this.props.active) this.addEvents();
        else this.removeEvents();
    }

    componentDidUpdate(props) {
        if (this.props.active !== props.active) {
            if (this.props.active) this.addEvents();
            else this.removeEvents();
        }
    }

    componentWillUnmount() { this.removeEvents(); }

    addEvents = () => {
        document.addEventListener('click', this.onClick, true);
        document.addEventListener('touchstart', this.onClick, true);
        document.addEventListener('keyup', this.onClick, true);
    }
    
    removeEvents = () => {
        document.removeEventListener('click', this.onClick, true);
        document.removeEventListener('touchstart', this.onClick, true);
        document.removeEventListener('keyup', this.onClick, true);
    }
}

/**
 * Bootstrap Popover simplier integration
 * @see [Bootstrap Popovers]{@link https://getbootstrap.com/docs/4.0/components/popovers/}
 *
 * @class Popover
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.controlled] - Set popover to controlled state
 */
export default class Popover extends Component {
    static propTypes = {
        ...PopoverControlled.propTypes,
        controlled: PropTypes.bool,
    };

    state = { focused: false, hovered: false, inside: false };
    enable = () => this.setState({ hovered: true, inside: true });
    disable = () => this.setState({ hovered: false });
    toggle = () => this.setState({ focused: !this.state.focused });

    componentWillUpdate(props, state) {
        if (!state.hovered && state.hovered != this.state.hovered) {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.setState({ inside: this.state.hovered }), 300);
        }
    }

    render() {
        let { controlled, ...props } = this.props;
        if (controlled) return <PopoverControlled {...props} />
        return <PopoverControlled {...props} 
            active={this.state.focused || this.state.inside} 
            enable={this.enable} disable={this.disable} toggle={this.toggle} 
        />
    }

    componentWillUnmount() {
        if (this.timeout) clearTimeout(this.timeout);
    }
}

/**
 * Bootstrap Popover Inner integration
 * @see [Bootstrap Popovers]{@link https://getbootstrap.com/docs/4.0/components/popovers/}
 *
 * @class PopoverInner
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean|String|Number} [props.arrow] - Specify what kind of arrow appear
 * @property {String} [props.direction] - Specify direction where popover will appear (auto|top|bottom|left|right)
 */
export class PopoverInner extends Component {
    static propTypes = {
        ...Fade.propTypes,
        arrow: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
        direction: PropTypes.oneOf(['auto', 'top','bottom','left','right']),
    };

    static defaultProps = {
        tag: 'article',
        direction: 'auto',
    };

    static contextTypes = {
        popover: PropTypes.shape({
            active: PropTypes.bool.isRequired,
            enable: PropTypes.func,
            disable: PropTypes.func,
            toggle: PropTypes.func,
            setTarget: PropTypes.func.isRequired,
            getTarget: PropTypes.func.isRequired,
        })
    };

    render() {
        const { active } = this.context.popover;
        const { arrow, className, children, direction, transition, ...props } = this.props;
        const classes = Classnames(className, 'popover', `popover-${this.props.direction}`, { active });
        const arrowClasses = Classnames(className, 'arrow', arrow === true ? 'arrow-middle' : `arrow-${arrow}`);

        return <Fade {...props} {...transition} className={classes}  role="popover" 
            active={this.context.popover.active}
            onMouseEnter={this.onMouseEnter} 
            onMouseLeave={this.onMouseLeave}>
            {arrow === true ? <section className={arrowClasses} /> : arrow}
            {children}
        </Fade>
    }

    componentDidMount() {
        this.componentDidRendered();
    }

    componentDidUpdate() {
        this.componentDidRendered();
    }

    componentDidRendered() {
        if (this.context.popover.active) {
            const popper = ReactDOM.findDOMNode(this);
            const target = this.context.popover.getTarget();
            this.setOffsetLeft(target, popper, this.props.direction);
            this.setOffsetTop(target, popper, this.props.direction);
        }
    }

    onMouseEnter = event => {
        if (this.props.onMouseEnter) this.props.onMouseEnter(event);
        this.context.popover.enable();
    } 

    onMouseLeave = event => {
        if (this.props.onMouseLeave) this.props.onMouseLeave(event);
        this.context.popover.disable();
    }

    setOffsetLeft = (target, popper, direction) => {
        switch (direction) {
            case 'left':
                popper.style.right = `${target.offsetWidth}px`;
                break;
            case 'right':
                popper.style.left = `${target.offsetWidth}px`;
                break;
            case 'bottom':
            case 'top':
                popper.style.left = `${target.offsetWidth / 2 - popper.offsetWidth / 2}px`;
                break;
        }
    }

    setOffsetTop = (target, popper, direction) => {
        switch (direction) {
            case 'top':
                popper.style.bottom = `${target.offsetHeight}px`;
                break;
            case 'bottom':
                popper.style.top = `${target.offsetHeight}px`;
                break;
            case 'left':
            case 'right':
                popper.style.top = `${target.offsetHeight / 2 - popper.offsetHeight / 2}px`;
                break;
        }
    }
}

/**
 * Bootstrap Popover Toggle integration
 * @see [Bootstrap Popovers]{@link https://getbootstrap.com/docs/4.0/components/popovers/}
 *
 * @class PopoverToggle
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class PopoverToggle extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'span'
    };

    static contextTypes = {
        popover: PropTypes.shape({
            active: PropTypes.bool.isRequired,
            enable: PropTypes.func,
            disable: PropTypes.func,
            toggle: PropTypes.func,
            setTarget: PropTypes.func.isRequired,
            getTarget: PropTypes.func.isRequired,
        })
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'popover-toggle');
        return <Tag {...props} className={classes} 
            onMouseDown={this.onMouseDown} 
            onMouseEnter={this.onMouseEnter} 
            onMouseLeave={this.onMouseLeave} 
        />
    }

    componentDidMount() {
        this.context.popover.setTarget(ReactDOM.findDOMNode(this));
    }

    onMouseEnter = event => {
        if (this.props.onMouseEnter) this.props.onMouseEnter(event);
        if (this.context.popover.enable) this.context.popover.enable(event);
    }

    onMouseLeave = event => {
        if (this.props.onMouseLeave) this.props.onMouseLeave(event);
        if (this.context.popover.disable) this.context.popover.disable(event);
    }

    onMouseDown = event => {
        if (this.props.onMouseDown) this.props.onMouseDown(event);
        if (this.context.popover.toggle) this.context.popover.toggle(event);
    }
}

/**
 * Bootstrap Popover Header integration
 * @see [Bootstrap Popovers]{@link https://getbootstrap.com/docs/4.0/components/popovers/}
 *
 * @class PopoverHeader
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class PopoverHeader extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'h3'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'popover-header');
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap Popover Body integration
 * @see [Bootstrap Popovers]{@link https://getbootstrap.com/docs/4.0/components/popovers/}
 *
 * @class PopoverBody
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class PopoverBody extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'section'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'popover-body');
        return <Tag {...props} className={classes} />
    }    
}