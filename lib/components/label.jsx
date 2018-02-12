'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Input from './input';
import Tag from './tag';

/**
 * Bootstrap Label integration
 * @see [Bootstrap Forms]{https://getbootstrap.com/docs/4.0/components/forms/}
 * @see [Bootstrap Custom Forms]{https://getbootstrap.com/docs/4.0/components/forms/#custom-forms}
 *
 * @class Label
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.custom] - Set custom style for checkbox/radio/file
 * @property {Boolean} [props.check] - Specify if the label contains check input
 * @property {String} [props.size] - Input group size (sm, lg)
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
export default class Label extends Component {
    static propTypes = {
        ...Tag.propTypes,
        custom: PropTypes.oneOf(['checkbox', 'radio', 'file']),
        check: PropTypes.bool,
        size: PropTypes.number,
        color: PropTypes.string,
        widths: PropTypes.array,
        xs: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([
                    PropTypes.bool, 
                    PropTypes.number, 
                    PropTypes.string
                ]),
                offset: PropTypes.oneOfType([
                    PropTypes.number, 
                    PropTypes.string
                ])
            })
        ]),
        sm: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([
                    PropTypes.bool, 
                    PropTypes.number, 
                    PropTypes.string
                ]),
                offset: PropTypes.oneOfType([
                    PropTypes.number, 
                    PropTypes.string
                ])
            })
        ]),
        md: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([
                    PropTypes.bool, 
                    PropTypes.number, 
                    PropTypes.string
                ]),
                offset: PropTypes.oneOfType([
                    PropTypes.number, 
                    PropTypes.string
                ])
            })
        ]),
        lg: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([
                    PropTypes.bool, 
                    PropTypes.number, 
                    PropTypes.string
                ]),
                offset: PropTypes.oneOfType([
                    PropTypes.number, 
                    PropTypes.string
                ])
            })
        ]),
        xl: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([
                    PropTypes.bool, 
                    PropTypes.number, 
                    PropTypes.string
                ]),
                offset: PropTypes.oneOfType([
                    PropTypes.number, 
                    PropTypes.string
                ])
            })
        ]),
    };

    static defaultProps = {
        tag: 'label',
        widths: ['xs', 'sm', 'md', 'lg', 'xl']
    };

    render() {
        const { custom, color, className, 
            xs, sm, md, lg, xl, size, 
            widths, check, hidden, ...props 
        } = this.props;

        let classes = [];
        for (let index in widths) {
            let column = this.props[widths[index]];
            if (!index && column === undefined) column = true;
            if (!column) continue;
            if (typeof column != 'object') column = { size: column };

            const interfix = !index ? '-' : `-${widths[index]}-`;
            const classname = Classnames(
                (column.size === true || column.size === '') 
                    ? (!index ? 'col' : `col-${widths[index]}`) 
                    : `col${interfix}${column.size}`,
                (column.offset || column.offset === 0) && `offset${interfix}${column.offset}`
            );
            classes.push(classname);
        }

        classes = Classnames(className, classes, 
            hidden && 'sr-only', 
            check && 'form-check-label', 
            size && `col-form-label-${size}`, 
            classes.length && 'col-form-label', 
            !check && !classes.length && 'form-control-label', 
            custom && (custom == 'file' ? 'custom-file' : 'custom-control'), 
            custom == 'checkbox' && 'custom-checkbox', 
            custom == 'radio' && 'custom-radio',
        );

        switch (custom) {
            case 'checkbox':
            case 'radio':
                if (Array.isArray(this.props.children)) {
                    return <Tag {...props} className={classes}>
                        {this.props.children[0]}
                        <span className={Classnames('custom-control-indicator', color && `indicator-${color}`)} />
                        <span className="custom-control-description">{this.props.children.slice(1)}</span>
                    </Tag>
                }
                return <Tag {...props} className={classes}>
                    {this.props.children || <Input type={custom} custom readOnly />}
                    <span className={Classnames('custom-control-indicator', color && `indicator-${color}`)} />
                    <span className="custom-control-description" />
                </Tag>
            case 'file':
                return <Tag {...props} className={classes}>
                    {this.props.children}
                    <span className="custom-file-control" />
                </Tag>
            default: return <Tag {...props} className={classes} />
        }
    }
}