'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

export default class Form extends Component {
    static propTypes = {
        ...Tag.propTypes,
        inline: PropTypes.bool,
        validated: PropTypes.bool,
    }
    static defaultProps = {
        inline: false,
        tag: 'form'
    }

    render() {
        const { className, inline, validated, ...props } = this.props;
        const classes = Classnames(className, 'form', inline && 'form-inline', validated && 'was-validated');
        return <Tag {...props} className={classes} />
    }
}

export class FormFeedback extends Component {
    static propTypes = {
        ...Tag.propTypes,
    }
    static defaultProps = {
        tag: 'section'
    }

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'invalid-feedback');
        return <Tag {...props} className={classes} />
    }
}

export class FormGroup extends Component {
    static propTypes = {
        ...Tag.propTypes,
        row: PropTypes.bool,
        check: PropTypes.bool,
        inline: PropTypes.bool,
        disabled: PropTypes.bool,
    }
    static defaultProps = {
        tag: 'section'
    }

    render() {
        const { className, row, check, inline, disabled, ...props } = this.props;
        const classes = Classnames(className, { row }, check ? 'form-check' : 'form-group', check && inline && 'form-check-inline', check && disabled && 'disabled');
        return <Tag {...props} className={classes} />
    }
}

export class FormText extends Component {
    static propTypes = {
        ...Tag.propTypes,
        inline: PropTypes.bool,
        color: PropTypes.string,
    }
    static defaultProps = {
        tag: 'small',
        color: 'muted',
    }

    render() {
        const { className, inline, color, ...props } = this.props;
        const classes = Classnames(className, !inline && 'form-text', color && `text-${color}`);
        return <Tag {...props} className={classes} />
    }
}