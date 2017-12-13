'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Input from './input';
import Tag from './tag';

export default class Label extends Component {
    static propTypes = {
        ...Tag.propTypes,
        custom: PropTypes.oneOf(['checkbox', 'radio', 'file']),
        check: PropTypes.bool,
        checked: PropTypes.bool,
        size: PropTypes.number,
        color: PropTypes.string,
        widths: PropTypes.array,
        xs: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
                push: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                pull: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            })
        ]),
        sm: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
                push: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                pull: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            })
        ]),
        md: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
                push: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                pull: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            })
        ]),
        lg: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
                push: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                pull: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            })
        ]),
        xl: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({
                size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
                push: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                pull: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            })
        ]),
    }

    static defaultProps = {
        tag: 'label',
        widths: ['xs', 'sm', 'md', 'lg', 'xl']
    }

    render() {
        const { custom, color, className, xs, sm, md, lg, xl, size, widths, check, checked, hidden, ...props } = this.props;

        let classes = [];
        for (let index in widths) {
            let column = this.props[widths[index]];
            if (!index && column === undefined) column = true;
            if (!column) continue;
            if (typeof column != 'object') column = { size: column };

            const interfix = !index ? '-' : `-${widths[index]}-`;
            const classname = Classnames(
                (column.size === true || column.size === '') ? (!index ? 'col' : `col-${widths[index]}`) : `col${interfix}${column.size}`,
                (column.push || column.push === 0) && `push${interfix}${column.push}`,
                (column.pull || column.pull === 0) && `pull${interfix}${column.pull}`,
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
                    {this.props.children || <Input type={custom} custom checked={checked} readOnly />}
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