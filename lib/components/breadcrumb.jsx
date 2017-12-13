'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

export default class Breadcrumb extends Component {
    static propTypes = {};
    static defaultProps = {
        tag: 'ol'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'breadcrumb');
        return <Tag {...props} className={classes} />
    }
}

export class BreadcrumbItem extends Component {
    static propTypes = {
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