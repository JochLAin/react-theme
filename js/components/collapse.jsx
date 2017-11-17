'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';
import Transition from './transition';

export default class Collapse extends Component {
    static propTypes = {
        ...Tag.propTypes,
        ...Transition.propTypes,
        active: PropTypes.bool,
        className: PropTypes.node,
        navbar: PropTypes.bool,
        reset: PropTypes.bool,
    };

    static defaultProps = {
        ...Transition.defaultProps,
        active: false,
        appear: false,
        enter: true,
        exit: true,
        tag: 'article',
        timeout: 350,
    };
    state = { height: null };

    render() {
        const { tag, pointer, ...props } = this.props;
        return <Transition
            {...Transition.getTransitionProps(props)} 
            onEntering={this.onEntering} 
            onEntered={this.onEntered} 
            onExit={this.onExit} 
            onExiting={this.onExiting} 
            onExited={this.onExited} 
            onRender={this.onRender} 
        />
    }

    getTransitionClass(status) {
        switch (status) {
            case Transition.ENTERING: 
            case Transition.EXITING: 
                return this.props.line 
                    ? 'collapsing-line' 
                    : 'collapsing';
            case Transition.ENTERED: 
                return 'collapse show';
            case Transition.EXITED: 
                return 'collapse';
        }
    }

    onEntering = (node, appearing) => {
        this.setState({ height: node.scrollHeight });
        this.props.onEntering(node, appearing);
    }

    onEntered = (node, appearing) => {
        this.setState({ height: null });
        this.props.onEntered(node, appearing);
    }

    onExit = node => {
        this.setState({ height: node.scrollHeight });
        this.props.onExit(node);
    }

    onExiting = node => {
        this.setState({ height: 0 });
        this.props.onExiting(node);
    }

    onExited = node => {
        this.setState({ height: null });
        this.props.onExited(node);
    }

    onRender = status => {
        const { height } = this.state;
        const { navbar, className, children, reset, ...props } = Transition.getOtherProps(this.props);

        let classes = Classnames(className, this.getTransitionClass(status), navbar && 'navbar-collapse');
        const style = height === null ? null : { height };
        return <Tag {...props} className={classes} style={{ ...props.style, ...style }} children={reset ? status != Transition.EXITED && children : children} />
    }
}