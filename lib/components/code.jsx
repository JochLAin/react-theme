'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';
import hljs from 'highlight.js';

/**
 * HighlightJS Code integration
 * @see [HighlightJS Code Example]{@link https://highlightjs.org/static/demo/}
 *
 * @class Code
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} props - Component properties
 * @property {String} props.content - Code content
 * @property {Boolean} [props.inline] - Specify to use inline element
 * @property {String} [props.theme] - HightlightJS theme name
 * @property {String} props.language - Language name
 * @property {String|Number} [props.width] - Element width (fix inline auto-width HighlightJS)
 */
export default class Code extends Component {
    static propTypes = {
        ...Tag.propTypes,
        content: PropTypes.string,
        inline: PropTypes.bool,
        theme: PropTypes.string,
        language: PropTypes.string,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    static defaultProps = {
        theme: 'agate',
    };

    render() {
        const { className, content, inline, language, width, theme, ...props } = this.props;
        const preClasses = Classnames(className, 'code', `code-${theme}`,  'mb-0');
        const classes = Classnames('hljs', language, inline && 'd-inline align-super');
        const code = hljs.getLanguage(language) && hljs.highlight(language, content).value;

        return <Tag {...props} tag="pre" 
            inline={inline} 
            className={preClasses} 
            style={width && { width: `${width}rem` }}>
            <code className={classes}
                dangerouslySetInnerHTML={content && { __html: code }} 
                style={width && { width: `${width}rem` }} 
            />
            {this.props.children}
        </Tag>
    }
}