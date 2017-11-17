'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

export default class Container extends Component {
    static propTypes = {
        ...Tag.propTypes,
        fluid: PropTypes.bool,
    }

    static defaultProps = {
        fluid: false,
        tag: 'article'
    }

    render() {
        const { className, fluid, ...props } = this.props;
        const classes = Classnames(className, fluid ? `container-fluid` : 'container');
        return <Tag {...props} className={classes} />
    }
}