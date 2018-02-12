'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Badge integration
 * @see [Bootstrap Badge]{@link https://getbootstrap.com/docs/4.0/components/badge/}
 *
 * @class Badge
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.color] - Badge background color
 * @property {Boolean} [props.pill] - Badge border style
 */
export default class Badge extends Component {
    static propTypes = {
        ...Tag.propTypes,
        color: PropTypes.string,
        pill: PropTypes.bool,
    };

    static defaultProps = {
        color: 'secondary',
        pill: false,
        tag: 'span',
    };

    render() {
        const { className, color, pill, ...props } = this.props;
        const classes = Classnames(className, 'badge', `badge-${color}`, pill && 'badge-pill');
        return <Tag {...props} className={classes} />
    }
}