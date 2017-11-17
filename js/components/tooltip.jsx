'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Fade from './transition/fade';
import Tag from './tag';

class TooltipControlled extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        enable: PropTypes.func,
        disable: PropTypes.func,
        toggle: PropTypes.func,
    }

    static defaultProps = {
        tag: 'span',
    }

    static childContextTypes = {
        tooltip: PropTypes.shape({
            active: PropTypes.bool.isRequired,
            enable: PropTypes.func,
            disable: PropTypes.func,
            setTarget: PropTypes.func.isRequired,
            getTarget: PropTypes.func.isRequired,
        })
    };

    getChildContext = () => Object({
        tooltip: {
            active: this.props.active,
            enable: this.props.enable,
            disable: this.props.disable,
            setTarget: node => this.target = node,
            getTarget: () => this.target,
        }
    });

    render() {
        const { active, className, direction, enable, disable, ...props } = this.props;
        const classes = Classnames(className, 'tooltip');
        return <Tag {...props} className={classes} />
    }
}

export default class Tooltip extends Component {
    static propTypes = {
        controlled: PropTypes.bool,
    }

    state = { hovered: false, inside: false };
    enable = () => this.setState({ hovered: true, inside: true });
    disable = () => this.setState({ hovered: false });

    componentWillUpdate(props, state) {
        if (!state.hovered && state.hovered != this.state.hovered) {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.setState({ inside: this.state.hovered }), 300);
        }
    }

    render() {
        let { controlled, ...props } = this.props;
        if (controlled) return <TooltipControlled {...props} />
        return <TooltipControlled {...props} active={this.state.inside} enable={this.enable} disable={this.disable} />
    }

    componentWillUnmount() {
        if (this.timeout) clearTimeout(this.timeout);
    }
}

export class TooltipInner extends Component {
    static propTypes = {
        ...Fade.propTypes,
        arrow: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
        direction: PropTypes.oneOf(['auto', 'top','bottom','left','right']),
        transition: PropTypes.shape(Fade.propTypes),
    }

    static defaultProps = {
        tag: 'article',
        direction: 'auto',
    }

    static contextTypes = {
        tooltip: PropTypes.shape({
            active: PropTypes.bool.isRequired,
            enable: PropTypes.func,
            disable: PropTypes.func,
            setTarget: PropTypes.func.isRequired,
            getTarget: PropTypes.func.isRequired,
        })
    }

    render() {
        const { active } = this.context.tooltip;
        const { arrow, className, children, direction, transition, ...props } = this.props;
        const classes = Classnames(className, 'tooltip-inner', `tooltip-${this.props.direction}`, { active });
        const arrowClasses = Classnames(className, 'arrow', arrow === true && 'arrow-middle');

        return <Fade {...props} {...transition} tag={tag} className={classes} active={this.context.tooltip.active} role="tooltip" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            {arrow && <section className={arrowClasses} />}
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
        if (this.context.tooltip.active) {
            const popper = ReactDOM.findDOMNode(this);
            const target = this.context.tooltip.getTarget();
            this.setOffsetLeft(target, popper, this.props.direction);
            this.setOffsetTop(target, popper, this.props.direction);
        }
    }

    onMouseEnter = event => {
        if (this.props.onMouseEnter) this.props.onMouseEnter(event);
        this.context.tooltip.enable();
    } 

    onMouseLeave = event => {
        if (this.props.onMouseLeave) this.props.onMouseLeave(event);
        this.context.tooltip.disable();
    }

    setOffsetLeft = (target, popper, direction) => {
        switch (direction) {
            case 'left':
                popper.style.left = 'auto';
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
                popper.style.top = 'auto';
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

export class TooltipToggle extends Component {
    static propTypes = {
        ...Tag.propTypes,
    }

    static defaultProps = {
        tag: 'span'
    }

    static contextTypes = {
        tooltip: PropTypes.shape({
            active: PropTypes.bool.isRequired,
            enable: PropTypes.func,
            disable: PropTypes.func,
            setTarget: PropTypes.func.isRequired,
            getTarget: PropTypes.func.isRequired,
        })
    }        

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'tooltip-toggle');
        return <Tag {...props} className={classes} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} />
    }

    componentDidMount() {
        this.context.tooltip.setTarget(ReactDOM.findDOMNode(this));
    }

    onMouseEnter = event => {
        if (this.props.onMouseEnter) this.props.onMouseEnter(event);
        this.context.tooltip.enable(event);
    }

    onMouseLeave = event => {
        if (this.props.onMouseLeave) this.props.onMouseLeave(event);
        if (this.context.tooltip.inside) return;
        this.context.tooltip.disable(event);
    }
}

export class TooltipBody extends Component {
    static propTypes = {
        ...Tag.propTypes,
    }
    static defaultProps = {
        tag: 'section'
    }

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'tooltip-body');
        return <Tag {...props} className={classes} />
    }    
}