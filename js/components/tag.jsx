'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tag extends Component {
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string,
        icon: PropTypes.string,
        caret: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

        linkable: PropTypes.bool,
        pointer: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

        flex: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        block: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        hidden: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

        text: PropTypes.string,
        background: PropTypes.string,

        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    };

    static defaultProps = {
        linkable: false,
        tag: 'div',
    };

    render() {
        let { tag, pointer, linkable, title, icon, caret, ...props } = this.props;
    
        if (linkable && this.props.href) tag = 'a';

        const Tag = tag;
        return <Tag ref={pointer} {...props}>
            {this.props.children || (() => {
                const children = [];
                if (icon) children.push(<Icon key="nav-link-icon" name={icon} />);
                children.push(title);
                if (typeof caret == 'string') children.push(<Icon key="nav-link-caret" name={caret} />);
                else if (caret instanceof Function) children.push(<Icon key="nav-link-caret" name={caret(active)} />);
                else if (caret) children.push(<Icon key="nav-link-caret" name={active ? 'caret-down' : 'caret-left'} />);
                return children;
            })()}
        </Tag>
    }
}