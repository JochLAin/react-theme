'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

export default class Input extends Component {
    static propTypes = {
        ...Tag.propTypes,
        custom: PropTypes.bool,
        type: PropTypes.string,
        size: PropTypes.string,
        valid: PropTypes.bool,
        plaintext: PropTypes.bool,
        addon: PropTypes.bool,
        control: PropTypes.bool,
        indeterminate: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'p',
        type: 'text',
        control: true,
    };

    render() {
        let { className, custom, control, type, size, valid, indeterminate, plaintext, addon, tag, ...props } = this.props;
        if (['textarea', 'select'].indexOf(type) != -1) tag = type;
        else if (type && !plaintext) tag = 'input';

        let classes;
        if (control) {
            classes = 'form-control';
            if (plaintext) classes += '-plaintext';
            else if (type == 'file') {
                if (custom) classes = 'custom-file-input';
                else classes += '-file';
            } else if (['checkbox', 'radio'].indexOf(type) != -1) {
                if (addon) classes = null;
                else if (custom) classes = 'custom-control-input'; 
                else classes = 'form-check-input';
            }
        }
        if (type == 'select' && custom) classes = Classnames(classes, 'custom-select');
        if (tag != 'input') type = undefined;

        classes = Classnames(className, classes, valid === false && 'is-invalid', valid && 'is-valid', size && `form-control-${size}`);
        return <Tag {...props} tag={tag} type={type} className={classes} />
    }
}

export class InputGroup extends Component {
    static propTypes = {
        ...Tag.propTypes,
        size: PropTypes.string,
    }
    static defaultProps = {
        tag: 'article'
    }

    render() {
        const { className, size, ...props } = this.props;
        const classes = Classnames(className, 'input-group', size && `input-group-${size}`);
        return <Tag {...props} className={classes} />
    }
}

export class InputGroupAddon extends Component {
    static propTypes = {
        ...Tag.propTypes,
    }
    static defaultProps = {
        tag: 'section'
    }

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'input-group-addon');
        return <Tag {...props} className={classes} />
    }
}

export class InputGroupButton extends Component {
    static propTypes = {
        ...Tag.propTypes,
    }
    static defaultProps = {
        tag: 'section'
    }

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'input-group-btn');
        return <Tag {...props} className={classes} />
    }
}