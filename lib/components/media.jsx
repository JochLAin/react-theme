'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Media integration
 * @see [Bootstrap Media Object]{@link https://getbootstrap.com/docs/4.0/layout/media-object/}
 *
 * @class Media
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export default class Media extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'article',
    };

    render() {
        let { className, ...props } = this.props;
        const classes = Classnames( className, 'media');
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap Media Body integration
 * @see https://getbootstrap.com/docs/4.0/layout/media-object/
 *
 * @class MediaBody
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
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
