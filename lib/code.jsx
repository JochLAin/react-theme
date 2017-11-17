'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import hljs from 'highlight.js';
import '@stylesheets/hljs/solarized-dark';

export default class Code extends Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        inline: PropTypes.bool,
        language: PropTypes.string.isRequired,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    render() {
        const { className, content, inline, language, width, ...props } = this.props;
        const preClasses = Classnames(className, 'mb-0', inline && 'd-inline align-baseline');
        const classes = Classnames('hljs', language, inline && 'd-inline align-super');
    
        const code = hljs.getLanguage(language) && hljs.highlight(language, content).value;

        return <pre {...props} className={preClasses} style={width && { width: `${width}rem` }}>
            <code className={classes} dangerouslySetInnerHTML={content && { __html: code }} style={width && { width: `${width}rem` }} />
            {this.props.children}
        </pre>
    }
}