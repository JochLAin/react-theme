'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';
import Dropdown from './dropdown';
import Icon from './icon';
import { PopoverToggle } from './popover';
import Tooltip, { TooltipBody, TooltipInner, TooltipToggle } from './tooltip';

/**
 * Bootstrap Button integration
 * @see [Bootstrap Button]{@link https://getbootstrap.com/docs/4.0/components/buttons/}
 *
 * @class Button
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.active] - Set button state to active
 * @property {Boolean} [props.block] - Set button style to block button
 * @property {String} [props.color] - Button background color
 * @property {Boolean} [props.disabled] - Set button state to disabled and prevent click
 * @property {Boolean} [props.outline] - Set the button style to border button
 * @property {String} [props.size] - Button size (sm, lg)
 */
export default class Button extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        block: PropTypes.bool,
        color: PropTypes.string,
        disabled: PropTypes.bool,
        outline: PropTypes.bool,
        size: PropTypes.string,
    };

    static defaultProps = {
        color: 'secondary',
        role: 'button',
        type: 'button',
        tag: 'button',
    };

    render() {
        let {
            active,
            block,
            className,
            color,
            disabled,
            outline,
            size,
            tag,
            type,
            ...props
        } = this.props;

        const classes = Classnames(
            className,
            'btn',
            `btn${outline ? '-outline' : ''}-${color}`,
            size && `btn-${size}`,
            block && `btn-block`,
            { active, disabled }
        );

        if (tag != 'button') type = undefined

        return <Tag {...props} tag={tag} type={type} className={classes} 
            onClick={this.onClick} disabled={disabled} 
            aria-pressed={active} aria-disabled={disabled}
        />
    }

    onClick = event => {
        if (this.props.disabled) return event.preventDefault();
        if (this.props.onClick) this.props.onClick(event);
    }
}

/**
 * Bootstrap Button Dropdown integration
 * @see [Bootstrap Button Dropdown]{@link https://getbootstrap.com/docs/4.0/components/buttons/}
 *
 * @class ButtonDropdown
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Dropdown
 * @property {Object} [props] - Component properties
 */
export class ButtonDropdown extends Component {
    static propTypes = {
        ...Dropdown.propTypes,
    };

    state = { active: false };
    toggle = () => this.setState({ active: !this.state.active });

    render() {
        return <Dropdown group {...this.props} />
    }
}

/**
 * Bootstrap Button Group integration
 * @see [Bootstrap Button Group]{@link https://getbootstrap.com/docs/4.0/components/button-group/}
 *
 * @class ButtonGroup
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.size] - Button group size (sm, lg)
 * @property {Boolean} [props.vertical] - Set button group alignment
 */
export class ButtonGroup extends Component {
    static propTypes = {
        ...Tag.propTypes,
        toggle: PropTypes.bool,
        size: PropTypes.string,
        vertical: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'article',
        role: 'group'
    };

    render() {
        const { className, size, toggle, vertical, ...props } = this.props;
        const classes = Classnames(
            className,
            vertical ? 'btn-group-vertical' : 'btn-group',
            size && `btn-group-${size}`,
            toggle && 'btn-group-toggle'
        );
        return <Tag {...props} className={classes} data-toggle={toggle ? 'buttons' : undefined} />
    }
}

/**
 * Bootstrap Button Toolbar integration
 * @see [Bootstrap Button Toolbar]{@link https://getbootstrap.com/docs/4.0/components/button-group/}
 *
 * @class ButtonToolbar
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class ButtonToolbar extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'section',
        role: 'toolbar',
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'btn-toolbar');
        return <Tag {...props} className={classes} />
    }
}

/**
 * Button Tooltip integration
 *
 * @class ButtonTooltip
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tooltip
 * @property {Object} [props] - Component properties
 * @property {String} [props.title] - Text in tooltip
 */
export class ButtonTooltip extends Component {
    static propTypes = {
        ...TooltipToggle.propTypes,
        ...Button.propTypes,
        title: PropTypes.string,
    };

    static defaultProps = {
        arrow: true,
        direction: 'right',
    };

    render() {
        const { arrow, className, direction, title, ...props } = this.props;
        const classes = Classnames(className, 'btn-tooltip');
        if (!title) return <Button {...props} className={classes} />
        return <Tooltip>
            <TooltipToggle tag={Button} {...props} className={classes} />
            <TooltipInner arrow={arrow} direction={direction}>
                <TooltipBody>{title}</TooltipBody>
            </TooltipInner>
        </Tooltip>
    }
}

/**
 * Button Action integration
 * @see [Material floating button]{@link https://material.io/guidelines/components/buttons-floating-action-button.html}
 *
 * @class ButtonAction
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.PopoverToggle
 * @root Theme.ButtonTooltip
 * @property {Object} [props] - Component properties
 */
export class ButtonAction extends Component {
    static propTypes = {
        ...PopoverToggle.propTypes,
        ...ButtonTooltip.propTypes,
    };

    static contextTypes = {
        popover: PropTypes.object
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'btn-action rounded-circle');
        if (!this.context.popover) return <Button {...props} className={classes} />
        return <PopoverToggle tag={ButtonTooltip} {...props} className={classes} />
    }
}

/**
 * Button Action Item integration
 * @see [Material floating button]{@link https://material.io/guidelines/components/buttons-floating-action-button.html}
 *
 * @class ButtonActionItem
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.ButtonTooltip
 * @property {Object} [props] - Component properties
 */
export class ButtonActionItem extends Component {
    static propTypes = ButtonTooltip.propTypes;

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'btn-action-item rounded-circle');
        return <ButtonTooltip {...props} className={classes} arrow />
    }
}

/**
 * Button Icon integration
 *
 * @class ButtonIcon
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Button
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.right] - Set the icon position
 */
export class ButtonIcon extends Component {
    static propTypes = {
        ...Button.propTypes,
        ...Icon.propTypes,
        right: PropTypes.bool,
    };

    render() {
        const { children, prefix, name, right, ...props } = this.props;
        if (!name) return <Button {...props}>{children}</Button>
        return <Button {...props}>
            {!right && <Icon prefix={prefix} name={name} className="mr-1" />}
            {children}
            {right && <Icon prefix={prefix} name={name} className="ml-1" />}
        </Button>
    }
}