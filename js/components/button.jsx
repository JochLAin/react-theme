'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';
import Dropdown from './dropdown';
import Icon from './icon';
import { PopoverToggle } from './popover'; 
import Tooltip, { TooltipBody, TooltipInner, TooltipToggle } from './tooltip';

export default class Button extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        block: PropTypes.bool,
        color: PropTypes.string,
        disabled: PropTypes.bool,
        outline: PropTypes.bool,
        type: PropTypes.string,
        role: PropTypes.string,
        size: PropTypes.string,

        onClick: PropTypes.func,
    };

    static defaultProps = {
        color: 'secondary',
        role: 'button',
        type: 'button',
        tag: 'button',
        linkable: true,
    };

    render() {
        const { active, block, className, color, disabled, onClick, outline, size, type, ...props } = this.props;
        const classes = Classnames(className, 'btn', `btn${outline ? '-outline' : ''}-${color}`, size && `btn-${size}`, block && `btn-block`, { active, disabled });
        return <Tag type={type} {...props} className={classes} onClick={this.onClick} disabled={disabled} aria-pressed={active} aria-disabled={disabled} />
    }

    onClick = event => {
        if (this.props.disabled) return event.preventDefault();
        if (this.props.onClick) this.props.onClick(event);
    }
}

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

export class ButtonGroup extends Component {
    static propTypes = {
        ...Tag.propTypes,
        role: PropTypes.string,
        size: PropTypes.string,
        vertical: PropTypes.bool,
    }

    static defaultProps = {
        tag: 'article',
        role: 'group'
    };

    render() {
        const { className, size, vertical, ...props } = this.props;
        const classes = Classnames(className, vertical ? 'btn-group-vertical' : 'btn-group', size && `btn-group-${size}`);
        return <Tag {...props} className={classes} />
    }
}

export class ButtonToolbar extends Component {
    static propTypes = {
        ...Tag.propTypes,
        role: PropTypes.string,
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

export class ButtonAction extends Component {
    static propTypes = {
        ...PopoverToggle.propTypes,
        ...ButtonTooltip.propTypes,
    };

    static contextTypes = {
        popover: PropTypes.object
    }        

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'btn-action rounded-circle');
        if (!this.context.popover) return <Button {...props} className={classes} />
        return <PopoverToggle tag={ButtonTooltip} {...props} className={classes} />
    }
}

export class ButtonActionItem extends Component {
    static propTypes = ButtonTooltip.propTypes;

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'btn-action-item rounded-circle');
        return <ButtonTooltip {...props} className={classes} arrow />
    }
}

export class ButtonIcon extends Component {
    static propTypes = {
        ...Button.propTypes,
        ...Icon.propTypes,
        right: PropTypes.bool,
    }

    render() {
        const { children, name, right, ...props } = this.props;
        if (!name) return <Button {...props}>{children}</Button>
        return <Button {...props}>
            {!right && <Icon name={name} className="mr-1" />}
            {children}
            {right && <Icon name={name} className="ml-1" />}
        </Button>
    }
}