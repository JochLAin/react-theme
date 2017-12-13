'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

export default class Container extends Component {
    static propTypes = {
        ...Tag.propTypes,
        fluid: PropTypes.bool,
        gelled: PropTypes.bool,
    }

    static defaultProps = {
        fluid: false,
        gelled: false,
        tag: 'article'
    }

    render() {
        const { className, fluid, gelled, ...props } = this.props;
        const classes = Classnames(className, (!fluid && !gelled) && 'container', fluid && `container-fluid`, gelled && 'container-gelled');
        return <Tag {...props} className={classes} />
    }
}