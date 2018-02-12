'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Row integration
 * @see [Bootstrap Grid]{@link https://getbootstrap.com/docs/4.0/layout/grid/}
 *
 * @class Row
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.gutters] - Apply no-gutters style
 */
export default class Row extends Component {
    static propTypes = {
        ...Tag.propTypes,
        gutters: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'article',
        gutters: true,
    };

    render() {
        const { className, gutters, ...props } = this.props;
        const classes = Classnames(className, 'row', !gutters && `no-gutters`);
        return <Tag {...props} className={classes} />
    }
}