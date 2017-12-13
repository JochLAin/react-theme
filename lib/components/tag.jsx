'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

export default class Tag extends Component {
    static propTypes = {
        className: PropTypes.string,
        pointer: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

        format: PropTypes.oneOf(['box', 'line', 'column']),
        box: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        line: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        column: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

        display: PropTypes.oneOf(['flex', 'block', 'inline', 'hidden']),
        flex: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        center: PropTypes.bool,
        middle: PropTypes.bool,
        block: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        hidden: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

        position: PropTypes.string,

        text: PropTypes.string,
        background: PropTypes.string,

        onClick: PropTypes.func,
        onChange: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onMouseLeave: PropTypes.func,
    };

    static getOtherProps = (props) => {
        const { 
            pointer, tag, 
            format, box, line, column, 
            display, flex, block, inline, hidden, 
            center, middle, 
            position, 
            text, background, 
            ...attr 
        } = props;
        return attr;
    }

    render() {
        let { pointer, tag, inline } = this.props;
        const { className, ...props } = Tag.getOtherProps(this.props);
        if (this.props.href) tag = 'a';

        let classes = Classnames(className);
        classes = this.getColorClass(classes);
        classes = this.getDisplayClass(classes);
        classes = this.getFormatClass(classes);

        let HTMLTag = tag;
        if (!tag) HTMLTag = inline ? 'span' : 'div';
        return <HTMLTag ref={pointer} {...props} className={classes} />
    }

    getColorClass = (classes) => {
        const { background, text } = this.props;
        return Classnames(classes, background && `bg-${background}`, text && `text-${text}`);
    }

    getDisplayClass = (classes) => {
        const { display, flex, block, inline, center, middle } = this.props;
        if (display) return Classnames(classes, `d-${display}`);
        else if (typeof flex == 'boolean' && flex) {
            if (center) return Classnames(classes, 'd-flex-center');
            else if (middle) return Classnames(classes, 'd-flex-middle');
            return Classnames(classes, 'd-flex');
        } else if (typeof block == 'boolean' && block) {
            classes = Classnames(classes, 'd-block');
        } else if (typeof inline == 'boolean' && inline) {
            classes = Classnames(classes, 'd-inline');
        }
        if (middle) {
            classes = Classnames(classes, 'align-middle');
        } 
        if (center) {
            classes = Classnames(classes, 'text-center');
        }
        return classes;
    }

    getFormatClass = (classes) => {
        const { format, box, line, column } = this.props;
        if (format) return Classnames(classes, `f-${display}`);
        if (typeof box == 'boolean' && box) return Classnames(classes, 'f-box');
        else if (typeof column == 'boolean' && column) return Classnames(classes, 'f-column');
        else if (typeof line == 'boolean' && line) return Classnames(classes, 'f-line');
        return classes;
    }
}