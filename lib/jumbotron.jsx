'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

export default class Jumbotron extends Component {
    static propTypes = {
        ...Tag.propTypes,
        fluid: PropTypes.bool,
    }
    static defaultProps = {
        tag: 'article'
    }

    render() {
        const { className, fluid, ...props } = this.props;
        const classes = Classnames(className, 'jumbotron', fluid && 'jumbotron-fluid');
        return <Tag {...props} className={classes} />
    }
}