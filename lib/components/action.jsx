'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Popover, { PopoverInner } from './popover';

/**
 * Material floating action button like
 * @see [Material floating button]{@link https://material.io/guidelines/components/buttons-floating-action-button.html}
 *
 * @class Action
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Popover
 * @property {Object} [props] - Component properties
 * @property {String} [props.corner] - Corner where the button will be rendered (top-left, top-right, bottom-left, bottom-right)
 * @property {String} [props.direction] - Direction where the button items will be render (column, row)
 * @property {Boolean} [props.layout] - Define if the component will be relative to window
 */
export default class Action extends Component {
    static propTypes = {
        ...Popover.propTypes,
        corner: PropTypes.oneOf([
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right'
        ]),
        direction: PropTypes.oneOf(['column', 'row']),
        layout: PropTypes.bool,
    };

    static defaultProps = {
        ...Popover.defaultProps,
        corner: 'bottom-right',
        direction: 'column',
    };

    render() {
        const { className, corner, direction, layout, ...props } = this.props;
        const classes = Classnames(
            className,
            'action',
            `action-${direction}`,
            `action-${corner}`,
            layout && 'action-layout'
        );

        return <article className={classes}>
            <Popover {...props} />
        </article>
    }
}

/**
 * Container for action buttons
 * @see [Material floating button]{@link https://material.io/guidelines/components/buttons-floating-action-button.html}
 *
 * @class ActionInner
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.PopoverInner
 * @property {Object} [props] - Component properties
 */
export class ActionInner extends Component {
    static propTypes = PopoverInner.propTypes;

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'action-inner');
        return <PopoverInner {...props} className={classes} />
    }
}