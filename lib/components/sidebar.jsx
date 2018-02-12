'use strict';

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

import Collapse from './collapse';
import Navbar from './navbar';

/**
 * Sidebar integration
 *
 * @class Sidebar
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.layout] - Specify that sidebar must take all screen height
 * @property {String|Number} [props.width] - Sidebar width
 */
export default class Sidebar extends Component {
    static propTypes = {
        ...Navbar.propTypes,
        layout: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    };

    render() {
        const { align, className, color, layout, width, ...props } = this.props;
        const classes = Classnames(className, 'sidebar', layout && 'sidebar-layout');
        const collapseClasses = Classnames('flex-column', 
            `justify-content-${align || 'between'}`, 
            'h-100', 
            layout && 'mx-0'
        );

        return <Navbar {...props} className={classes} color={`${color}-light`} 
            style={width && { width: typeof width ==  'string' ? width : `${width}rem` }}>
            <Collapse active={true} navbar className={collapseClasses}>
                {this.props.children}
            </Collapse>
        </Navbar>
    }
}