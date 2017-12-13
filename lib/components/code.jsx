'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import hljs from 'highlight.js';

export default class Code extends Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        inline: PropTypes.bool,
        theme: PropTypes.string,
        language: PropTypes.string.isRequired,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    static defaultProps = {
        theme: 'agate',
    };

    render() {
        const { className, content, inline, language, width, theme, ...props } = this.props;
        const preClasses = Classnames(className, 'code', `code-${theme}`,  'mb-0', inline && 'd-inline align-baseline');
        const classes = Classnames('hljs', language, inline && 'd-inline align-super');
    
        const code = hljs.getLanguage(language) && hljs.highlight(language, content).value;

        return <pre {...props} className={preClasses} style={width && { width: `${width}rem` }}>
            <code className={classes} dangerouslySetInnerHTML={content && { __html: code }} style={width && { width: `${width}rem` }} />
            {this.props.children}
        </pre>
    }
}