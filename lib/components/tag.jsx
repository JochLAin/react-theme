'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

/**
 * Tag integration
 *
 * @class Tag
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @property {Object} [props] - Component properties
 * @property {String} [props.className] - Tag className
 * @property {Function} [props.pointer] - Ref to tag
 * @property {String|Function} [props.tag] - Tag name
 * @property {String} [props.format] - Dimension helpers (box|line|column)
 * @property {Boolean|String|Array<String>} [props.box] - Box dimension helpers with breakpoints
 * @property {Boolean|String|Array<String>} [props.line] - Line dimension helpers with breakpoints
 * @property {Boolean|String|Array<String>} [props.column] - Column dimension helpers with breakpoints
 * @property {String} [props.display] - Display helpers (flex|block|inline|hidden)
 * @property {Boolean|String|Array<String>} [props.flex] - Flex dimension helpers with breakpoints
 * @property {Boolean|String|Array<String>} [props.block] - Block dimension helpers with breakpoints
 * @property {Boolean|String|Array<String>} [props.inline] - Inline dimension helpers with breakpoints
 * @property {Boolean|String|Array<String>} [props.hidden] - Hidden dimension helpers with breakpoints
 * @property {Boolean} [props.center] - Center horizontally content
 * @property {Boolean} [props.middle] - Center vertically content
 * @property {String} [props.position] - Position helpers (static|relative|absolute|fixed|sticky)
 * @property {String} [props.background] - Background color
 * @property {String} [props.text] - Text color
 * @property {Boolean} [props.bold] - Font weight bold
 * @property {Boolean} [props.italic] - Font italic
 */
export default class Tag extends Component {
    static propTypes = {
        className: PropTypes.string,
        pointer: PropTypes.func,
        tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

        format: PropTypes.oneOf(['box', 'line', 'column']),
        box: PropTypes.oneOfType([
            PropTypes.bool, 
            PropTypes.string, 
            PropTypes.arrayOf(PropTypes.string)
        ]),
        line: PropTypes.oneOfType([
            PropTypes.bool, 
            PropTypes.string, 
            PropTypes.arrayOf(PropTypes.string)
        ]),
        column: PropTypes.oneOfType([
            PropTypes.bool, 
            PropTypes.string, 
            PropTypes.arrayOf(PropTypes.string)
        ]),

        display: PropTypes.oneOf(['flex', 'block', 'inline', 'hidden']),
        flex: PropTypes.oneOfType([
            PropTypes.bool, 
            PropTypes.string, 
            PropTypes.arrayOf(PropTypes.string)
        ]),
        center: PropTypes.bool,
        middle: PropTypes.bool,
        block: PropTypes.oneOfType([
            PropTypes.bool, 
            PropTypes.string, 
            PropTypes.arrayOf(PropTypes.string)
        ]),
        inline: PropTypes.oneOfType([
            PropTypes.bool, 
            PropTypes.string, 
            PropTypes.arrayOf(PropTypes.string)
        ]),
        hidden: PropTypes.oneOfType([
            PropTypes.bool, 
            PropTypes.string, 
            PropTypes.arrayOf(PropTypes.string)
        ]),

        position: PropTypes.string,

        background: PropTypes.string,
        border: PropTypes.string,
        text: PropTypes.string,
        bold: PropTypes.bool,
        decoration: PropTypes.string,
        italic: PropTypes.bool,

        cursor: PropTypes.string,
        role: PropTypes.string,
        type: PropTypes.string,

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
            cursor, position, 
            background, border, text, 
            decoration, bold, italic,
            type, role,
            ...attr 
        } = props;
        return attr;
    };

    render() {
        let { pointer, tag, position, inline, bold, cursor, decoration, italic, type } = this.props;
        const { className, ...props } = Tag.getOtherProps(this.props);
        if (this.props.href) tag = 'a';
        if (this.props.href && type == 'button') type = undefined; 

        let classes = Classnames(className, 
            this.getColorClass(),
            this.getDisplayClass(),
            this.getFormatClass(),
            position && `position-${position}`,
            cursor && `cursor-${cursor}`,
            bold && 'font-weight-bold', 
            italic && 'font-italic', 
            decoration && `text-decoration-${decoration}`,
        );

        let HTMLTag = tag;
        if (!tag) HTMLTag = inline ? 'span' : 'div';
        return <HTMLTag ref={pointer} {...props} type={type} className={classes} />
    }

    getColorClass = () => {
        const { background, border, text } = this.props;
        return Classnames( 
            background && `bg-${background}`,
            border && `border-${border}`,
            text && `text-${text}`
        );
    }

    getDisplayClass = () => {
        let classes;
        const { display, flex, block, inline, center, middle } = this.props;
        if (display) return Classnames(`d-${display}`);
        else if (typeof flex == 'boolean' && flex) {
            classes = Classnames('d-flex');
            if (center) classes = Classnames(classes, 'justify-content-center');
            else if (middle) classes = Classnames(classes, 'align-items-center');
            return classes;
        } else if (typeof block == 'boolean' && block) {
            classes = Classnames('d-block');
        } else if (typeof inline == 'boolean' && inline) {
            classes = Classnames('d-inline');
        }
        if (middle) {
            classes = Classnames('align-middle');
        } 
        if (center) {
            classes = Classnames('text-center');
        }
        return classes;
    }

    getFormatClass = () => {
        const { format, box, line, column } = this.props;
        if (format) return Classnames(`f-${display}`);
        if (typeof box == 'boolean' && box) return Classnames('f-box');
        else if (typeof column == 'boolean' && column) return Classnames('f-column');
        else if (typeof line == 'boolean' && line) return Classnames('f-line');
    }
}