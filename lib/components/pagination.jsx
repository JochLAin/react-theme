'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Icon from './icon';
import Tag from './tag';

/**
 * Bootstrap Pagination integration
 * @see [Bootstrap Pagination]{@link https://getbootstrap.com/docs/4.0/components/pagination/}
 *
 * @class Pagination
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.size] - Input size (sm, lg)
 */
export default class Pagination extends Component {
    static propTypes = {
        ...Tag.propTypes,
        size: PropTypes.string,
    };

    static defaultProps = {
        tag: 'ul',
    };

    render() {
        const { className, size, ...props } = this.props;
        const classes = Classnames(className, 'pagination', size && `pagination-${size}`);
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap Page Item integration
 * @see [Bootstrap Pagination]{@link https://getbootstrap.com/docs/4.0/components/pagination/}
 *
 * @class PageItem
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.active] - Apply active style
 * @property {Boolean} [props.disabled] - Apply idsabled style
 */
export class PageItem extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'li'
    };

    render() {
        const { active, className, disabled, ...props } = this.props;
        const classes = Classnames(className, 'page-item', { active, disabled });
        return <Tag {...props} className={classes} disabled={disabled} />
    }
}

/**
 * Bootstrap Page Link integration
 * @see [Bootstrap Pagination]{@link https://getbootstrap.com/docs/4.0/components/pagination/}
 *
 * @class PageLink
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {bool} [props.first] - Set angle double left icon as children if not provided
 * @property {bool} [props.last] - Set angle double right icon as children if not provided
 * @property {bool} [props.previous] - Set angle left icon as children if not provided
 * @property {bool} [props.next] - Set angle right icon as children if not provided
 * @property {bool} [props.item] - Wrap link into a Theme.PageLink
 */
export class PageLink extends Component {
    static propTypes = {
        ...Tag.propTypes,
        first: PropTypes.bool,
        last: PropTypes.bool,
        next: PropTypes.bool,
        previous: PropTypes.bool,
        item: PropTypes.bool,
    };

    static defaultProps = {
        href: 'javascript:void(0);',
        tag: 'a',
    };

    render() {
        const { first, last, next, previous, item, className, ...props } = this.props;
        const classes = Classnames(className, 'page-link');
        let children = props.children;
        if (!children && first) children = <Icon name="angle-double-left" />
        else if (!children && last) children = <Icon name="angle-double-right" />
        else if (!children && previous) children = <Icon name="angle-left" />
        else if (!children && next) children = <Icon name="angle-right" />

        const label = props['aria-label'] || (previous && 'Précédent') || (next && 'Suivant') || (first && 'Début') || (last && 'Fin');
        if (item) return <PageItem>
            <Tag {...props} aria-label={label} className={classes} children={children} />
        </PageItem>
        return <Tag {...props} aria-label={label} className={classes} children={children} />
    }
}