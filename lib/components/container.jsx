'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Container integration
 * @see [Bootstrap Grid]{@link https://getbootstrap.com/docs/4.0/layout/grid/}
 *
 * @class Container
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.fluid] - Specify container to fluid style
 * @property {Boolean} [props.gelled] - Container will take min-width with min-width container breakpoint
 * @property {Boolean} [props.layout] - Container will take all remainiing space on the screen
 */
export default class Container extends Component {
    static propTypes = {
        ...Tag.propTypes,
        fluid: PropTypes.bool,
        gelled: PropTypes.bool,
        layout: PropTypes.bool,
    };

    static defaultProps = {
        fluid: false,
        gelled: false,
        layout: false,
        tag: 'article',
    };

    render() {
        const { className, fluid, gelled, layout, ...props } = this.props;
        const classes = Classnames(className, 
            (!fluid && !gelled) && 'container', 
            fluid && `container-fluid`, 
            gelled && 'container-gelled', 
            layout && 'container-layout'
        );

        return <Tag {...props} className={classes} />
    }
}