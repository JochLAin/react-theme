'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Icon from './icon';
import Tag from './tag';

export default class Pagination extends Component {
    static propTypes = {
        ...Tag.propTypes,
        size: PropTypes.string,
    }
    static defaultProps = {
        tag: 'ul'
    }

    render() {
        const { className, size, ...props } = this.props;
        const classes = Classnames(className, 'pagination', size && `pagination-${size}`);
        return <Tag {...props} className={classes} />
    }
}

export class PageItem extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
    }
    static defaultProps = {
        tag: 'li'
    }

    render() {
        const { active, className, disabled, ...props } = this.props;
        const classes = Classnames(className, 'page-item', { active, disabled });
        return <Tag {...props} className={classes} disabled={disabled} />
    }
}

export class PageLink extends Component {
    static propTypes = {
        ...Tag.propTypes,
        first: PropTypes.bool,
        last: PropTypes.bool,
        next: PropTypes.bool,
        previous: PropTypes.bool,
        item: PropTypes.bool,
    }

    static defaultProps = {
        href: 'javascript:void(0);',
        tag: 'a',
    }

    render() {
        const { first, last, next, previous, item, className, ...props } = this.props;
        const classes = Classnames(className, 'page-link');
        let children = props.children;
        if (!children && first) children = <Icon name="angle-double-left" />
        else if (!children && last) children = <Icon name="angle-double-right" />
        else if (!children && previous) children = <Icon name="angle-left" />
        else if (!children && next) children = <Icon name="angle-right" />

        const label = props['aria-label'] || (previous && 'Précédent') || (next && 'Suivant') || (first && 'Début') || (last && 'Fin');
        if (item) return <PageItem><Tag {...props} aria-label={label} className={classes} children={children} /></PageItem>
        return <Tag {...props} aria-label={label} className={classes} children={children} />
    }
}