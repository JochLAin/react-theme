'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Breadcrumb integration
 * @see [Bootstrap Breadcrumb]{@link https://getbootstrap.com/docs/4.0/components/breadcrumb/}
 *
 * @class Breadcrumb
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export default class Breadcrumb extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'ol'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'breadcrumb');
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap Breadcrumb Item integration
 * @see [Bootstrap Breadcrumb]{@link https://getbootstrap.com/docs/4.0/components/breadcrumb/}
 *
 * @class BreadcrumbItem
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @augments Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.active] - Set breadcrumb item to active state
 */
export class BreadcrumbItem extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'li'
    };

    render() {
        const { active, className, ...props } = this.props;
        const classes = Classnames(className, 'breadcrumb-item', { active });
        return <Tag {...props} className={classes} />
    }
}