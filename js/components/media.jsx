'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

export default class Media extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };
    static defaultProps = {
        tag: 'article',
    }

    render() {
        let { className, ...props } = this.props;
        const classes = Classnames( className, 'media');
        return <Tag {...props} className={classes} />
    }
}
export class MediaBody extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };
    static defaultProps = {
        tag: 'section',
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'media-body');
        return <Tag {...props} className={classes} />
    }
}
