'use strict';

import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export const UNMOUNTED = 'unmounted';
export const EXIT = 'exit';
export const EXITED = 'exited';
export const ENTERING = 'entering';
export const ENTER = 'enter';
export const ENTERED = 'entered';
export const EXITING = 'exiting';
export const STATUS = [UNMOUNTED, EXITED, ENTERING, ENTERED, EXITING];

/**
 * Transition manager for animation
 * @see [React Community - Transition Group]{@link https://reactcommunity.org/react-transition-group/}
 *
 * @class Transition
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.appear] - Define if element can appear on mouting
 * @property {Boolean} [props.enter] - Add callback and timeout on entered state
 * @property {Boolean} [props.exit] - Add callback and timeout on exited state
 * @property {Boolean} [props.active] - Set element state to active
 * @property {Boolean} [props.mountOnEnter] - Define if element can be in unmounted state on mounting when is not active
 * @property {Boolean} [props.unmountOnExit] - Define if element can be in unmounted state
 * @property {Number|Object} [props.timeout] - Timeout between state change
 * @property {Number} [props.timeout.appear] - Timeout between appear state
 * @property {Number} [props.timeout.enter] - Timeout between enter state
 * @property {Number} [props.timeout.exit] - Timeout between exit state
 * @property {Function} [props.onEnter] - Callback on specific state change
 * @property {Function} [props.onEntering] - Callback on specific state change
 * @property {Function} [props.onEntered] - Callback on specific state change
 * @property {Function} [props.onExit] - Callback on specific state change
 * @property {Function} [props.onExiting] - Callback on specific state change
 * @property {Function} [props.onExited] - Callback on specific state change
 * @property {Function} [props.onRender] - Callback on state change
 */
export default class Transition extends Component {
    static UNMOUNTED = UNMOUNTED;
    static EXIT = EXIT;
    static EXITED = EXITED;
    static ENTERING = ENTERING;
    static ENTER = ENTER;
    static ENTERED = ENTERED;
    static EXITING = EXITING;
    static STATUS = STATUS;

    static propTypes = {
        appear: PropTypes.bool,
        enter: PropTypes.bool,
        exit: PropTypes.bool,
        active: PropTypes.bool,
        mountOnEnter: PropTypes.bool,
        unmountOnExit: PropTypes.bool,
        addEndListener: PropTypes.func,
        onEnter: PropTypes.func,
        onEntering: PropTypes.func,
        onEntered: PropTypes.func,
        onExit: PropTypes.func,
        onExiting: PropTypes.func,
        onExited: PropTypes.func,
        onRender: PropTypes.func,

        timeout: PropTypes.oneOfType([
            PropTypes.number, 
            PropTypes.shape({
                appear: PropTypes.number,
                enter: PropTypes.number,
                exit: PropTypes.number
            })
        ]),
    };

    static defaultProps = {
        appear: false,
        exit: true,
        enter: true,
        active: false,
        mountOnEnter: false,
        unmountOnExit: false,

        addEndListener: () => {},
        onEnter: () => {},
        onEntering: () => {},
        onEntered: () => {},
        onExit: () => {},
        onExiting: () => {},
        onExited: () => {},
    };

    static getOtherProps = props => {
        const { 
            active, mountOnEnter, unmountOnExit, appear, enter, exit, 
            addEndListener, onEnter, onEntering, onEntered, onExit, 
            onExiting, onExited, timeout,
            ...attr
        } = props;
        return attr;
    };

    static getTransitionProps = props => {
        const { 
            active, mountOnEnter, unmountOnExit, appear, enter, exit, 
            addEndListener, onEnter, onEntering, onEntered, onExit, 
            onExiting, onExited, timeout 
        } = props;
        return { 
            active, mountOnEnter, unmountOnExit, appear, enter, exit, 
            addEndListener, onEnter, onEntering, onEntered, onExit, 
            onExiting, onExited, timeout
        };
    };

    callback = null;
    constructor(props, context) {
        super(props, context);

        if (this.props.active) {
            if (this.props.appear) {
                status = EXITED;
                this.next = ENTERING;
            } else status = ENTERED;
        } else {
            if (this.props.unmountOnExit || this.props.mountOnEnter) status = UNMOUNTED;
            else status = EXITED;
        }
        this.state = { status };
    }

    componentWillReceiveProps(props) {
        const { status } = this.pending || this.state;
        if (props.active) {
            if (status === UNMOUNTED) this.setState({ status: EXITED });
            if ([ENTERING, ENTERED].indexOf(status) == -1) this.next = ENTERING;
        } else if ([ENTERING, ENTERED].indexOf(status) != -1) this.next = EXITING;
    }

    render() {
        if (this.state.status === UNMOUNTED) return null;
        if (this.props.onRender instanceof Function) return this.props.onRender(this.state.status, this.props);
        return React.cloneElement(Children.only(this.props.children), Transition.getOtherProps(this.props));
    }

    componentDidMount() {
        this.update(true);
    }

    componentDidUpdate() {
        this.update();
    }

    componentWillUnmount() {
        this.cancel();
    }

    update = (mounting = false) => {
        let next = this.next;
        if (next) {
            this.next = null;
            this.cancel();
            const node = ReactDOM.findDOMNode(this);
            if (next == ENTERING) this.perform(ENTER, node, mounting);
            else this.perform(EXIT, node);
        } else if (this.props.unmountOnExit && this.state.status == EXITED) {
            this.setState({ status: UNMOUNTED });
        }
    }

    perform(time, node, mounting) {
        const { enter, exit } = this.props;
        const timeouts = this.getTimeouts();

        if (time === ENTER) {
            if (!mounting && !enter) {
                return this.saveState(
                    { status: ENTERED }, 
                    () => this.props.onEntered(node)
                );
            }

            this.props.onEnter(node, mounting);
            this.saveState({ status: ENTERING }, () => {
                this.props.onEntering(node, mounting);
                this.onEnd(node, timeouts.enter, () => {
                    this.saveState(
                        { status: ENTERED }, 
                        () => this.props.onEntered(node, mounting)
                    );
                });
            });
        } else if (time == EXIT) {
            if (!exit) {
                return this.saveState(
                    { status: EXITED },
                    () => this.props.onExited(node)
                );
            }
            this.props.onExit(node);
            this.saveState({ status: EXITING }, () => {
                this.props.onExiting(node);
                this.onEnd(node, timeouts.exit, () => {
                    this.saveState(
                        { status: EXITED },
                        () => this.props.onExited(node)
                    );
                });
            })
        }
    }

    cancel() {
        if (this.callback) {
            this.callback.cancel();
            this.callback = null;
        }
    }

    saveState(state, callback) {
        this.pending = state;
        callback = this.setCallback(callback);
        this.setState(state, () => {
            this.pending = null;
            callback();
        });
    }

    setCallback (callback) {
        let active = true;
        this.callback = event => {
            if (active) {
                active = false;
                this.callback = false;
                callback(event);
            }
        };
        this.callback.cancel = () => {
            active = false;
        };
        return this.callback;
    }

    onEnd(node, timeout, handler) {
        this.setCallback(handler);
        if (node) {
            this.props.addEndListener(node, this.callback);
            if (timeout !== null) setTimeout(this.callback, timeout);
        } else setTimeout(this.callback, 0);
    }

    getTimeouts() {
        const { timeout } = this.props;
        if (timeout && typeof timeout !== 'number') {
            let { appear, enter, exit } = timeout;
            return { appear, enter, exit };
        }
        let exit, enter, appear;
        exit = enter = appear = timeout || 0;
        return { appear, enter, exit };
    }
}