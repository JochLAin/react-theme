'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import ReactDOM from 'react-dom';
import Button from './button';
import Tag from './tag';

/**
 * Bootstrap Dropdown integration
 * @see [Bootstrap Dropdowns]{@link https://getbootstrap.com/docs/4.0/components/dropdowns/}
 *
 * @class DropdownControlled
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.active] - Set dropdown to active state
 * @property {Boolean} [props.disabled] - Prevent click on dropdown
 * @property {Boolean} [props.dropdup] - Show dropdown above
 * @property {Boolean} [props.group] - Specify that dropdown is used with button group
 * @property {String} [props.size] - Dropdown size
 * @property {Function} [props.toggle] - Callback which active/inactive dropdown
 */
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
        const classes = Classnames(className, 
            group && 'btn-group', 
            !!size && `btn-group-${size}`, 
            !group && 'dropdown', 
            { dropup }
        );
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
        if (container.contains(event.target) 
        && container !== event.target 
        && (event.type !== 'keyup' || event.which === keyCodes.tab)) {
            return;
        }
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

/**
 * Bootstrap Dropdwn simplier integration
 * @see [Bootstrap Dropdowns]{@link https://getbootstrap.com/docs/4.0/components/dropdowns/}
 *
 * @class Dropdwn
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @root Theme.DropdownControlled
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.controlled] - Set dropdown to controlled state
 */
export default class Dropdown extends Component {
    static propTypes = {
        ...DropdownControlled.propTypes,
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

/**
 * Bootstrap Dropdown Item integration
 * @see [Bootstrap Menu Item]{@link https://getbootstrap.com/docs/4.0/components/dropdowns/#menu-items}
 *
 * @class DropdownItem
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.active] - Set item to active state
 * @property {Boolean} [props.disabled] - Prevent click on item
 * @property {Boolean} [props.divider] - Specify that item is a divider
 * @property {Boolean} [props.header] - Specify that element is a header
 * @property {Function} [props.toggle] - Callback on click for button
 * @property {Boolean} [props.nav] - Specify that it's a nav dropdown
 */
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
        const classes = Classnames(className, 
            { disabled, active }, 
            (!divider && !header) && 'dropdown-item', 
            header && 'dropdown-header', 
            divider && 'dropdown-divider', 
            nav && 'nav-link'
        );

        if (!tag && header) tag = 'h6';
        else if (!tag && divider) tag = 'section';
        else if (!tag && props.href) tag = 'a';
        else if (!tag) tag = 'button';
        return <Tag type={type} {...props} tag={tag} 
            tabIndex={index} className={classes} 
            disabled={disabled} onClick={this.onClick} 
        />
    }

    onClick = event => {
        const { disabled, header, divider } = this.props;
        if (disabled || header || divider) return event.preventDefault();
        if (this.props.onClick) this.props.onClick(event);
        if (this.props.toggle) this.props.toggle(event);
    }
}

/**
 * Bootstrap Dropdown Inner integration
 * @see [Bootstrap Dropdowns]{@link https://getbootstrap.com/docs/4.0/components/dropdowns/}
 *
 * @class DropdownInner
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.right] - Set inner align to right end
 */
export class DropdownInner extends Component {
    static propTypes = {
        ...Tag.propTypes,
        right: PropTypes.bool,
    };

    static defaultProps = {
        role: 'menu',
        tabIndex: -1,
        tag: 'section',
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
        const { className, right, ...props } = this.props;
        const classes = Classnames(className, 
            'dropdown-menu', 
            right && 'dropdown-menu-right', 
            this.context.dropdown.active && 'show'
        );
        return <Tag {...props} className={classes}
            aria-hidden={!this.context.dropdown.active}
        />
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

/**
 * Bootstrap Dropdown Toggle integration
 * @see [Bootstrap Dropdowns]{@link https://getbootstrap.com/docs/4.0/components/dropdowns/}
 *
 * @class DropdownToggle
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.active] - Set toggle to active state
 * @property {Boolean} [props.caret] - Add caret on right of text
 * @property {String} [props.color] - Background color
 * @property {Boolean} [props.disabled] - Prevent click
 * @property {Boolean} [props.split] - Specify that dropdown toggle is splitted
 * @property {Boolean} [props.nav] - Specify that it's a nav dropdown
 */
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
        const classes = Classnames(className, 
            (caret || split) && 'dropdown-toggle', 
            split && 'dropdown-toggle-split', 
            nav && 'nav-link', 
            { active }
        );
        if (nav && !tag) { tag = 'a'; props.href = '#'; }
        else if (!tag) { tag = Button; props.color = color; }
        else if (props.href) tag = 'a';

        return <Tag {...props} tag={tag} 
            className={classes} onClick={this.onClick} 
            aria-expanded={this.context.dropdown.active} 
        />
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