'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

export default class ListGroup extends Component {
    static propTypes = {
        ...Tag.propTypes,
        flush: PropTypes.bool,
    }
    static defaultProps = {
        tag: 'ul'
    }

    render() {
        const { className, flush, ...props } = this.props;
        const classes = Classnames(className, 'list-group', flush && 'list-group-flush');
        return <Tag {...props} className={classes} />
    }
}

export class ListGroupItem extends Component {
    static propTypes = {
        ...Tag.propTypes,
        action: PropTypes.bool,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        color: PropTypes.string,
    }
    static defaultProps = {
        tag: 'li'
    }

    render() {
        const { action, active, color, className, disabled, ...props } = this.props;
        const classes = Classnames(className, 'list-group-item', { active, disabled }, action && 'list-group-item-action', color && `list-group-item-${color}`);
        return <Tag {...props} className={classes} disabled={disabled} />
    }
}

export class ListGroupItemHeading extends Component {
    static propTypes = {
        ...Tag.propTypes,
    }
    static defaultProps = {
        tag: 'h5'
    }

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'list-group-item-heading');
        return <Tag {...props} className={classes} />
    }
}

export class ListGroupItemText extends Component {
    static propTypes = {
        ...Tag.propTypes,
    }
    static defaultProps = {
        tag: 'p'
    }

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'list-group-item-text');
        return <Tag {...props} className={classes} />
    }
}