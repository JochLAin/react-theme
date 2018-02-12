'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Table integration
 * @see [Bootstrap Table]{@link https://getbootstrap.com/docs/4.0/content/tables/}
 *
 * @class Table
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.size] - Table size (sm, lg)
 * @property {Boolean} [props.bordered] - Apply bordered style
 * @property {Boolean} [props.striped] - Apply striped style
 * @property {Boolean} [props.fixed] - Apply fixed style
 * @property {Boolean} [props.inverse] - Apply inverse style
 * @property {Boolean} [props.hover] - Apply hover style
 * @property {Boolean} [props.reflow] - Apply reflow style
 * @property {Boolean} [props.responsive] - Apply responsive style
 */
export default class Table extends Component {
    static propTypes = {
        ...Tag.propTypes,
        size: PropTypes.string,
        bordered: PropTypes.bool,
        striped: PropTypes.bool,
        fixed: PropTypes.bool,
        inverse: PropTypes.bool,
        hover: PropTypes.bool,
        reflow: PropTypes.bool,
        responsive: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'table',
    };

    render() {
        const { className, size, fixed, bordered, striped, inverse, hover, reflow, responsive, ...props } = this.props;
        const classes = Classnames(className, 'table', 
            size && `table-${size}`, 
            bordered && 'table-bordered', 
            responsive && ((responsive === true || responsive == 'xs') 
                ? 'table-responsive' 
                : `table-responsive-${responsive}`), 
            striped && 'table-striped', 
            inverse && 'table-inverse', 
            hover && 'table-hover', 
            reflow && 'table-reflow', 
            fixed && 'table-fixed'
        );
        return <Tag {...props} className={classes} />
    }
}