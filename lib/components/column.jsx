'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Column integration
 * @see [Bootstrap Grid]{@link https://getbootstrap.com/docs/4.0/layout/grid/}
 *
 * @class Column
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Array} [props.widths] - Breakpoints alias
 * @property {Boolean|Number|String|Object} [props.xs] - Breakpoint size
 * @property {Boolean|Number|String} props.xs.size - Breakpoint size
 * @property {Boolean|Number|String} props.xs.offset - Breakpoint offset
 * @property {Boolean|Number|String|Object} [props.sm] - Breakpoint size
 * @property {Boolean|Number|String} props.sm.size - Breakpoint size
 * @property {Boolean|Number|String} props.sm.offset - Breakpoint offset
 * @property {Boolean|Number|String|Object} [props.md] - Breakpoint size
 * @property {Boolean|Number|String} props.md.size - Breakpoint size
 * @property {Boolean|Number|String} props.md.offset - Breakpoint offset
 * @property {Boolean|Number|String|Object} [props.lg] - Breakpoint size
 * @property {Boolean|Number|String} props.lg.size - Breakpoint size
 * @property {Boolean|Number|String} props.lg.offset - Breakpoint offset
 * @property {Boolean|Number|String|Object} [props.xl] - Breakpoint size
 * @property {Boolean|Number|String} props.xl.size - Breakpoint size
 * @property {Boolean|Number|String} props.xl.offset - Breakpoint offset
 */
export default class Column extends Component {
    static propTypes = {
        ...Tag.propTypes,
        widths: PropTypes.array,
        xs: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
                offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            })
        ]),
        sm: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
                offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            })
        ]),
        md: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
                offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            })
        ]),
        lg: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
                offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            })
        ]),
        xl: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
                offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            })
        ]),
    };

    static defaultProps = {
        tag: 'section',
        widths: ['xs', 'sm', 'md', 'lg', 'xl']
    };

    render() {
        const { className, xs, sm, md, lg, xl, widths, ...props } = this.props;

        let classes = [];
        for (let index in widths) {
            let column = this.props[widths[index]];
            if (index == 0 && column === undefined) column = true;
            if (!column) continue;
            if (typeof column != 'object') column = { size: column };

            const interfix = index == 0 ? '-' : `-${widths[index]}-`;
            const classname = Classnames(
                (column.size === true || column.size === '') 
                    ? (index == 0 ? 'col' : `col-${widths[index]}`) 
                    : `col${interfix}${column.size}`,
                (column.push || column.push === 0) && `push${interfix}${column.push}`,
                (column.pull || column.pull === 0) && `pull${interfix}${column.pull}`,
                (column.offset || column.offset === 0) && `offset${interfix}${column.offset}`
            );
            classes.push(classname);
        }
        classes = Classnames(className, classes);
        return <Tag {...props} className={classes} />
    }
}