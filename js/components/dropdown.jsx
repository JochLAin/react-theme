'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import ReactDOM from 'react-dom';
import Button from './button';
import Tag from './tag';

class DropdownControlled extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        dropup: PropTypes.bool,
        group: PropTypes.bool,
        size: PropTypes.string,
        toggle: PropTypes.func,
    };

    static defaultProps = {
        active: false,
        dropup: false,
        tag: 'article',
    };

    static childContextTypes = {
        dropdown: PropTypes.shape({
            active: PropTypes.bool.isRequired,
            dropup: PropTypes.bool.isRequired,
            toggle: PropTypes.func.isRequired,
            setTarget: PropTypes.func.isRequired,
            getTarget: PropTypes.func.isRequired,
            setInside: PropTypes.func.isRequired,
            getInside: PropTypes.func.isRequired,
        })
    };

    getChildContext = () => Object({
        dropdown: {
            active: this.props.active,
            dropup: this.props.dropup,
            toggle: this.props.toggle,
            setTarget: node => this.target = node,
            getTarget: () => this.target,
            setInside: inside => this.inside = inside,
            getInside: () => this.inside,
        }
    });

    render() {
        const { className, disabled, dropup, active, group, size, toggle, ...props } = this.props;
        const classes = Classnames(className, group && 'btn-group', !!size && `btn-group-${size}`, !group && 'dropdown', { dropup });
        return <Tag {...props} className={classes} onKeyDown={this.onKeyDown} />
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

    onClick = event => {
        const keyCodes = { esc: 27, space: 32, tab: 9, up: 38, down: 40 };
        if (event && (event.which === 3 || (event.type === 'keyup' && event.which !== keyCodes.tab))) return;
        const container = ReactDOM.findDOMNode(this);
        if (container.contains(event.target) && container !== event.target && (event.type !== 'keyup' || event.which === keyCodes.tab)) return;
        this.onToggle(event);
    }

    onKeyDown = event => {
        const keyCodes = { esc: 27, space: 32, tab: 9, up: 38, down: 40 };
        const codes = [keyCodes.esc, keyCodes.up, keyCodes.down, keyCodes.space];
        if (codes.indexOf(event.which) === -1 || (/button/i.test(event.target.tagName) && event.which === keyCodes.space) || /input|textarea/i.test(event.target.tagName)) return;

        event.preventDefault();
        if (this.props.disabled) return;

        const container = ReactDOM.findDOMNode(this);
        if (event.which === keyCodes.space && this.props.active && container !== event.target) event.target.click();

        if (event.which === keyCodes.esc || !this.props.active) {
            this.toggle(event);
            container.querySelector('[aria-expanded]').focus();
            return;
        }

        const menuClasses = Classnames('dropdown-menu');
        const itemClasses = Classnames('dropdown-item');
        const disabledClasses = Classnames('disabled');
        const items = container.querySelectorAll(`.${menuClasses} .${itemClasses}:not(.${disabledClasses})`);
        if (!items.length) return;

        let index = -1;
        for (let i = 0; i < items.length; i += 1) {
            if (items[i] === event.target) {
                index = i;
                break;
            }
        }

        if (event.which === keyCodes.up && index > 0) index -= 1;
        if (event.which === keyCodes.down && index < items.length - 1) index += 1;
        if (index < 0) index = 0;
        items[index].focus();
    }

    onToggle = event => {
        if (this.props.disabled) return event && event.preventDefault();
        return this.props.toggle(event);
    }
}

export default class Dropdown extends Component {
    static propTypes = {
        controlled: PropTypes.bool,
    };

    state = { active: this.props.active };
    toggle = () => this.setState({ active: !this.state.active });
    render() {
        let { controlled, ...props } = this.props;
        if (controlled) return <DropdownControlled {...props} />
        return <DropdownControlled {...props} toggle={this.toggle} active={this.state.active} />
    }
}

export class DropdownItem extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        divider: PropTypes.bool,
        header: PropTypes.bool,
        toggle: PropTypes.func,
        nav: PropTypes.bool,
    };

    static contextTypes = {
        dropdown: PropTypes.shape({
            toggle: PropTypes.func,
        })
    };

    static getProps = props => {
        const { active, disabled, divider, header, toggle, nav } = props;
        return { active, disabled, divider, header, toggle, nav };
    }

    render() {
        let { className, divider, disabled, header, active, onClick, tag, nav, toggle, ...props } = this.props;
        const index = (disabled || header || divider) ? -1 : 0;
        const type = (tag === 'button' && (onClick || toggle) && !header && !divider) ? 'button' : undefined;
        const classes = Classnames(className, { disabled, active }, (!divider && !header) && 'dropdown-item', header && 'dropdown-header', divider && 'dropdown-divider', nav && 'nav-link');

        if (!tag && header) tag = 'h6';
        else if (!tag && divider) tag = 'section';
        else if (!tag && props.href) tag = 'a';
        else if (!tag) tag = 'button';
        return <Tag type={type} {...props} tag={tag} tabIndex={index} className={classes} disabled={disabled} onClick={this.onClick} />
    }

    onClick = event => {
        const { disabled, header, divider } = this.props;
        if (disabled || header || divider) return event.preventDefault();
        if (this.props.onClick) this.props.onClick(event);
        if (this.props.toggle) this.props.toggle(event);
    }
}

export class DropdownInner extends Component {
    static propTypes = {
        ...Tag.propTypes,
        right: PropTypes.bool,
        flip: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'section',
        flip: true,
    };

    static contextTypes = {
        dropdown: PropTypes.shape({
            active: PropTypes.bool.isRequired,
            dropup: PropTypes.bool.isRequired,
            getTarget: PropTypes.func.isRequired,
            setTarget: PropTypes.func.isRequired,
            getInside: PropTypes.func.isRequired,
            setInside: PropTypes.func.isRequired,
        })
    };

    render() {
        const { className, right, flip, ...props } = this.props;
        const classes = Classnames(className, 'dropdown-menu', right && 'dropdown-menu-right', this.context.dropdown.active && 'show');
        return <Tag tabIndex="-1" role="menu" {...props} aria-hidden={!this.context.dropdown.active} className={classes} />
    }

    componentDidMount() {
        this.componentDidRendered();
    }

    componentDidUpdate() {
        this.componentDidRendered();
    }

    componentDidRendered() {
        if (this.context.dropdown.active) {
            const target = this.context.dropdown.getTarget();
            const popper = ReactDOM.findDOMNode(this);
            this.setOffsetLeft(target, popper, this.props.direction);
            this.setOffsetTop(target, popper, this.props.direction);
        }
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

export class DropdownToggle extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        caret: PropTypes.bool,
        color: PropTypes.string,
        disabled: PropTypes.bool,
        'aria-haspopup': PropTypes.bool,
        split: PropTypes.bool,
        nav: PropTypes.bool,
    };

    static defaultProps = {
        'aria-haspopup': true,
        color: 'secondary',
    };

    static contextTypes = {
        dropdown: PropTypes.shape({
            active: PropTypes.bool.isRequired,
            toggle: PropTypes.func.isRequired,
            setTarget: PropTypes.func.isRequired,
            getTarget: PropTypes.func.isRequired,
        })
    };

    render() {
        let { active, className, color, caret, split, nav, tag, ...props } = this.props;
        const classes = Classnames(className, (caret || split) && 'dropdown-toggle', split && 'dropdown-toggle-split', nav && 'nav-link', { active });
        if (nav && !tag) { tag = 'a'; props.href = '#'; }
        else if (!tag) { tag = Button; props.color = color; }
        else if (props.href) tag = 'a';

        return <Tag {...props} tag={tag} className={classes} onClick={this.onClick} aria-expanded={this.context.dropdown.active} />
    }

    onClick = event => {
        if (this.props.disabled) return event.preventDefault();
        if (this.props.nav && !this.props.tag) event.preventDefault();
        if (this.props.onClick) this.props.onClick(event);
        this.context.dropdown.toggle(event);
    }

    componentDidMount() {
        this.context.dropdown.setTarget(ReactDOM.findDOMNode(this)); 
    }
}