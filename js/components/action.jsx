'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Popover, { PopoverInner } from './popover';

export default class Action extends Component {
    static propTypes = {
        ...Popover.propTypes,
        corner: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
        direction: PropTypes.oneOf(['column', 'row']),
        layout: PropTypes.bool,
    };

    static defaultProps = {
        ...Popover.defaultProps,
        corner: 'bottom-right',
        direction: 'column',
    };

    render() {
        const { className, corner, direction, layout, style, ...props } = this.props;
        const classes = Classnames(className, 'action', `action-${direction}`, `action-${corner}`, layout ? 'position-fixed' : 'position-absolute');
        const styles = Object.assign({}, style, { zIndex: 1000 });
        return <article className={classes} style={styles}>
            <Popover {...props} />
        </article>
    }
}

export class ActionInner extends Component {
    static propTypes = PopoverInner.propTypes;

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'action-inner');
        return <PopoverInner {...props} className={classes} />
    }
}