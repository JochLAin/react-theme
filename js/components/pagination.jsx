'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
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

export class PaginationItem extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
    }
    static defaultProps = {
        tag: 'li'
    }

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'page-item', { active, disabled });
        return <Tag ref={pointer} {...props} className={classes} disabled={disabled} />
    }
}

export class PaginationLink extends Component {
    static propTypes = {
        ...Tag.propTypes,
        first: PropTypes.bool,
        last: PropTypes.bool,
        next: PropTypes.bool,
        previous: PropTypes.bool,
    }

    static defaultProps = {
        tag: 'section'
    }

    render() {
        const { first, last, next, previous, className, ...props } = this.props;
        const classes = Classnames(className, 'page-item');
        let children = props.children;
        if (children && !children.length) children = null;

        if (first) children = <span aria-hidden="true">{children || '\u00ab'}</span>;
        if (last) children = <span aria-hidden="true">{children || '\u00bb'}</span>;
        if (previous) children = <span aria-hidden="true">{children || '<'}</span>;
        if (next) children = <span aria-hidden="true">{children || '>'}</span>;

        const label = props['aria-label'] || (previous && 'Précédent') || (next && 'Suivant') || (first && 'Début') || (last && 'Fin');
        return <Tag {...props} aria-label={label} className={classes} children={children} />
    }
}