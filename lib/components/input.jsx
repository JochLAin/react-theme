'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Input integration
 * @see [Bootstrap Form Controls]{@link https://getbootstrap.com/docs/4.0/components/forms/#form-controls}
 * @see [Bootstrap Custom Forms]{@link https://getbootstrap.com/docs/4.0/components/forms/#custom-forms}
 *
 * @class Input
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.custom] - Use Bootstrap custom input
 * @property {String} [props.type] - Button/Input type
 * @property {String} [props.size] - Input size (sm, lg)
 * @property {Boolean} [props.valid] - Specify if input is valid
 * @property {Boolean} [props.plaintext] - Specify if input is a plaintext input
 * @property {Boolean} [props.addon] - Specify if input is an addon
 * @property {Boolean} [props.control] - Specify that the input is a form control
 */
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
    };

    static defaultProps = {
        tag: 'p',
        type: 'text',
        control: true,
    };

    render() {
        let { className, custom, control, 
            type, size, valid, plaintext, 
            addon, tag, ...props 
        } = this.props;
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

        classes = Classnames(className, classes, 
            valid === false && 'is-invalid', 
            valid && 'is-valid', 
            size && `form-control-${size}`
        );
        return <Tag {...props} tag={tag} type={type} className={classes} />
    }
}

/**
 * Bootstrap Input Group integration
 * @see [Bootstrap Input Group]{@link https://getbootstrap.com/docs/4.0/components/input-group/}
 *
 * @class InputGroup
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.size] - Input group size (sm, lg)
 */
export class InputGroup extends Component {
    static propTypes = {
        ...Tag.propTypes,
        size: PropTypes.string,
    };

    static defaultProps = {
        tag: 'article'
    };

    render() {
        const { className, size, ...props } = this.props;
        const classes = Classnames(className, 
            'input-group', 
            size && `input-group-${size}`
        );
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap Input Group Addon integration
 * @see [Bootstrap Input Group]{@link https://getbootstrap.com/docs/4.0/components/input-group/}
 *
 * @class InputGroupAddon
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class InputGroupAddon extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'section'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'input-group-addon');
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap Input Group Button integration
 * @see [Bootstrap Input Group Button Addons]{@link https://getbootstrap.com/docs/4.0/components/input-group/#button-addons}
 *
 * @class InputGroupButton
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class InputGroupButton extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'section'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'input-group-btn');
        return <Tag {...props} className={classes} />
    }
}