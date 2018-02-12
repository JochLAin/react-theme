'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Jumbotron integration
 * @see [Bootstrap Jumbotron]{@link https://getbootstrap.com/docs/4.0/components/jumbotron/}
 *
 * @class Jumbotron
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.fluid] - Specify jumbotron to fluid style
 */
export default class Jumbotron extends Component {
    static propTypes = {
        ...Tag.propTypes,
        fluid: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'article'
    };

    render() {
        const { className, fluid, ...props } = this.props;
        const classes = Classnames(className, 
            'jumbotron', 
            fluid && 'jumbotron-fluid'
        );
        return <Tag {...props} className={classes} />
    }
}