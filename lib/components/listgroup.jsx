'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap List Group integration
 * @see [Bootstrap List Group]{@link https://getbootstrap.com/docs/4.0/components/list-group/}
 *
 * @class ListGroup
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.flush] - Apply flush style
 */
export default class ListGroup extends Component {
    static propTypes = {
        ...Tag.propTypes,
        flush: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'ul'
    };

    render() {
        const { className, flush, ...props } = this.props;
        const classes = Classnames(className, 'list-group', flush && 'list-group-flush');
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap List Group Item integration
 * @see https://getbootstrap.com/docs/4.0/components/list-group/
 *
 * @class ListGroupItem
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.action] - Apply action style
 * @property {Boolean} [props.active] - Apply active style
 * @property {Boolean} [props.disabled] - Apply idsabled style
 * @property {String} [props.color] - Item background color
 */
export class ListGroupItem extends Component {
    static propTypes = {
        ...Tag.propTypes,
        action: PropTypes.bool,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        color: PropTypes.string,
    };

    static defaultProps = {
        tag: 'li'
    };

    render() {
        const { action, active, color, className, disabled, ...props } = this.props;
        const classes = Classnames(className, 
            'list-group-item', 
            { active, disabled }, 
            action && 'list-group-item-action', 
            color && `list-group-item-${color}`
        );
        return <Tag {...props} className={classes} disabled={disabled} />
    }
}

/**
 * Bootstrap List Group Item Heading integration
 * @see https://getbootstrap.com/docs/4.0/components/list-group/#custom-content
 *
 * @class ListGroupItemHeading
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class ListGroupItemHeading extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'h5'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'list-group-item-heading');
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap List Group Item Text integration
 * @see https://getbootstrap.com/docs/4.0/components/list-group/#custom-content
 *
 * @class ListGroupItemText
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class ListGroupItemText extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'p'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'list-group-item-text');
        return <Tag {...props} className={classes} />
    }
}