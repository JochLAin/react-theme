'use strict';

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

import Collapse from './collapse';
import Navbar from './navbar';

/** @TODO: add generated menu */

export default class Sidebar extends Component {
    static propTypes = {
        ...Navbar.propTypes,
        layout: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    };

    render() {
        const { align, className, color, layout, width, ...props } = this.props;
        const classes = Classnames(className, 'sidebar', layout && 'sidebar-layout');
        const collapseClasses = Classnames('flex-column', `justify-content-${align || 'between'}`, 'h-100');

        return <Navbar {...props} className={classes} color={`${color}-middle`} style={width && { width: typeof width ==  'string' ? width : `${width}rem` }}>
            <Collapse active={true} navbar className={collapseClasses}>
                {this.props.children}
            </Collapse>
        </Navbar>
    }
}