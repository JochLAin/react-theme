'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

export default class Badge extends Component {
    static propTypes = {
        ...Tag.propTypes,
        color: PropTypes.string,
        pill: PropTypes.bool,
    }
    static defaultProps = {
        color: 'secondary',
        pill: false,
        tag: 'span',
    }

    render() {
        const { className, color, pill, ...props } = this.props;
        const classes = Classnames(className, 'badge', `badge-${color}`, pill && 'badge-pill');
        return <Tag {...props} className={classes} />
    }
}