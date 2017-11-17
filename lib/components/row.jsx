'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

export default class Row extends Component {
    static propTypes = {
        ...Tag.propTypes,
        gutters: PropTypes.bool,
    }
    static defaultProps = {
        tag: 'article',
        gutters: true,
    }

    render() {
        const { className, gutters, ...props } = this.props;
        const classes = Classnames(className, 'row', !gutters && `no-gutters`);
        return <Tag {...props} className={classes} />
    }
}