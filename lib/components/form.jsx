'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Form integration
 * @see [Bootstrap Form]{@link https://getbootstrap.com/docs/4.0/components/forms/}
 *
 * @class Form
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.inline] - Specify that the form is an inline form
 * @property {Boolean} [props.validated] - Specify that the form is a validated form
 */
export default class Form extends Component {
    static propTypes = {
        ...Tag.propTypes,
        inline: PropTypes.bool,
        validated: PropTypes.bool,
    };

    static defaultProps = {
        inline: false,
        tag: 'form'
    };

    render() {
        const { className, inline, validated, ...props } = this.props;
        const classes = Classnames(className, 
            'form', 
            inline && 'form-inline', 
            validated && 'was-validated'
        );
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap Form Feedback integration
 * @see [Bootstrap Form Validation]{@link https://getbootstrap.com/docs/4.0/components/forms/#validation}
 *
 * @class FormFeedback
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class FormFeedback extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'section'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'invalid-feedback');
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap Form Group integration
 * @see [Bootstrap Form Group]{@link https://getbootstrap.com/docs/4.0/components/forms/#form-groups}
 *
 * @class FormGroup
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.row] - Specify that the group is a row
 * @property {Boolean} [props.check] - Specify that the group contains check widget
 * @property {Boolean} [props.inline] - Specify that the group is inline
 * @property {Boolean} [props.disabled] - Disable widget inside
 */
export class FormGroup extends Component {
    static propTypes = {
        ...Tag.propTypes,
        row: PropTypes.bool,
        check: PropTypes.bool,
        inline: PropTypes.bool,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'section'
    };

    render() {
        const { className, row, check, inline, disabled, ...props } = this.props;
        const classes = Classnames(className, 
            { row }, 
            check ? 'form-check' : 'form-group', 
            check && inline && 'form-check-inline', 
            check && disabled && 'disabled'
        );
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap Form Text integration
 * @see [Bootstrap Form]{@link https://getbootstrap.com/docs/4.0/components/forms/}
 *
 * @class FormText
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.inline] - Specify that the text is inline
 * @property {String} [props.color] - Text color
 */
export class FormText extends Component {
    static propTypes = {
        ...Tag.propTypes,
        inline: PropTypes.bool,
        color: PropTypes.string,
    };

    static defaultProps = {
        tag: 'small',
        color: 'muted',
    };

    render() {
        const { className, inline, color, ...props } = this.props;
        const classes = Classnames(className, 
            !inline && 'form-text', 
            color && `text-${color}`
        );
        return <Tag {...props} className={classes} />
    }
}