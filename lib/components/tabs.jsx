'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Tabs integration
 * @see [Bootstrap List Group Tabs]{@link https://getbootstrap.com/docs/4.0/components/list-group/#javascript-behavior}
 *
 * @class Tabs
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Any} [props.active] - Specify what tab is active
 */
export default class Tabs extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.any,
    };

    static defaultProps = {
        tag: 'article'
    };

    static childContextTypes = {
        active: PropTypes.any
    };

    getChildContext = () => Object({ active: this.state.active });

    state = { active: this.props.active };

    componentWillReceiveProps(props) {
        if (props.active != this.props.active) this.setState({ active: props.active });
    }

    render() {
        const { active, className, ...props } = this.props;
        const classes = Classnames(className, 'tab-content');
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap TabPane integration
 * @see [Bootstrap List Group Tabs]{@link https://getbootstrap.com/docs/4.0/components/list-group/#javascript-behavior}
 *
 * @class TabPane
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Any} [props.tab] - Tab key
 */
export class TabPane extends Component {
    static propTypes = {
        ...Tag.propTypes,
        tab: PropTypes.any,
    };

    static defaultProps = {
        tag: 'section'
    };

    static contextTypes = {
        active: PropTypes.any
    };

    render() {
        const { className, tab, ...props } = this.props;
        const classes = Classnames(className, 'tab-pane', { active: this.context.active == tab });
        return <Tag {...props} className={classes} />
    }
}