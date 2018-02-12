'use strict';

import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';
import Transition from './transition';

const LEFT = 'left';
const RIGHT = 'right';

/**
 * Bootstrap Carousel integration
 * @see [Bootstrap Carousel]{@link https://getbootstrap.com/docs/4.0/components/carousel/}
 *
 * @class CarouselControlled
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} props - Component properties
 * @property {Number} [props.active] - Item index shown
 * @property {Number} [props.interval] - Interval between item index change (in ms)
 * @property {Boolean} [props.keyboard] - Allow keyboard controls
 * @property {Boolean} [props.pause] - Specify if pause on hover
 * @property {Function} props.previous - Callback to pass on previous item
 * @property {Function} props.next - Callback to pass on next item
 * @property {Boolean} [props.ride] - Specify if carousel can ride items on mount
 * @property {Boolean} [props.slide] - Specify slide animation is used
 */
class CarouselControlled extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.number,
        interval: PropTypes.oneOfType([ PropTypes.number, PropTypes.string, PropTypes.bool ]),
        keyboard: PropTypes.bool,
        pause: PropTypes.bool,
        previous: PropTypes.func,
        next: PropTypes.func,
        ride: PropTypes.bool,
        slide: PropTypes.bool,
    };

    static defaultProps = {
        interval: 5000,
        pause: true,
        keyboard: true,
        onMouseEnter: () => {},
        onMouseLeave: () => {},
        slide: true,
        tag: 'article',
    };

    static childContextTypes = {
        direction: PropTypes.string
    };

    getChildContext = () => Object({ 
        direction: this.state.direction 
    });

    state = { direction: RIGHT };

    componentDidMount() {
        if (this.props.ride) this.setInterval();
        document.addEventListener('keyup', this.onKeyPress);
    }

    componentWillReceiveProps(props) {
        this.setInterval(props);
        if (this.props.active + 1 == props.active) this.setState({ direction: RIGHT });
        else if (this.props.active - 1 == props.active) this.setState({ direction: LEFT });
        else if (this.props.active > props.active) this.setState({ direction: RIGHT });
        else if (this.props.active !== props.active) this.setState({ direction: LEFT });
    }

    render() {
        const { 
            active, className, interval, keyboard, 
            next, onMouseEnter, onMouseLeave, pause, 
            previous, ride, slide, ...props 
        } = Transition.getOtherProps(this.props);
        const classes = Classnames(className, 'carousel', { slide });

        return <Tag {...props} className={classes} 
            onMouseEnter={this.onMouseEnter} 
            onMouseLeave={this.onMouseEnter} 
        />
    }

    componentWillUnmount() {
        this.clearInterval();
        document.removeEventListener('keyup', this.onKeyPress)
    }

    setInterval = (props = this.props) => {
        this.clearInterval();
        if (props.interval) {
            this.interval = setInterval(() => {
                props.next();
            }, Number(props.interval));
        }
    }

    clearInterval = () => this.interval && clearInterval(this.interval);

    onMouseEnter = () => {
        if (this.props.pause) this.clearInterval();
        this.props.onMouseEnter(...arguments);
    }

    onMouseLeave = () => {
        if (this.props.pause) this.setInterval();
        this.props.onMouseLeave(...arguments);
    }

    onKeyPress = event => {
        if (this.props.keyboard) {
            if (event.keyCode == 37) {
                this.props.previous();
            } else if (event.keyCode == 39) {
                this.props.next();
            }
        }
    }
}

/**
 * Bootstrap Carousel simplier integration
 * @see [Bootstrap Carousel]{@link https://getbootstrap.com/docs/4.0/components/carousel/}
 *
 * @class Carousel
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.CarouselControlled
 * @property {Object} [props] - Component properties
 * @property {Boolean|Element} [props.controls] - Specify to use control arrows
 * @property {Boolean|Element} [props.indicators] - Specify to use indocator points
 * @property {Boolean} [props.controlled] - Set carousel to controlled state
 */
export default class Carousel extends Component {
    static propTypes = {
        ...CarouselControlled.propTypes,
        controls: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
        indicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
        controlled: PropTypes.bool,
    };

    animating = false;
    state = { active: this.props.active || 0 };
    previous = () => !this.animating && this.setState({ 
        active: !this.state.active 
            ? (Children.toArray(this.props.children).length - 1) 
            : (this.state.active - 1) 
    });
    next = () => !this.animating && this.setState({ 
        active: (this.state.active + 1) % Children.toArray(this.props.children).length 
    });
    count = this.props.children.length || 1;

    componentWillReceiveProps(props) {
        if (this.props.children.length != props.children.length) {
            this.count = props.children.length;
        }
    }

    render() {
        const { controlled, ..._props } = this.props;
        if (controlled) return <CarouselControlled {..._props} />

        const transition = Transition.getTransitionProps(this.props);
        let { children, controls, indicators, next, previous, slide, ...props } = Transition.getOtherProps(_props);

        return <CarouselControlled {...props} active={this.state.active} next={this.next} previous={this.previous} slide={slide}>
            {children.length && indicators && (
                <CarouselIndicators 
                    active={this.state.active} count={children.length} 
                    onClick={active => this.setState({ active })}
                />
            )}
            <CarouselInner>
                { Children.map(children, (child, index) => {
                    return React.cloneElement(child, {
                        ...transition,
                        slide, index, 
                        active: index == this.state.active,
                        current: this.state.active,
                        count: this.count,
                        onExited: function () { 
                            this.animating = false;
                            if (child.props.onExited) {
                                child.props.onExited(...arguments);
                            }
                        }.bind(this),
                        onExiting: function () { 
                            this.animating = true;
                            if (child.props.onExiting) {
                                child.props.onExiting(...arguments);
                            }
                        }.bind(this),
                    });
                })}
            </CarouselInner>
            {children.length && controls && (
                <CarouselControls 
                    onPrevious={this.previous} 
                    onNext={this.next}
                />)}
        </CarouselControlled>
    }
}

/**
 * Bootstrap Carousel Caption integration
 * @see [Bootstrap Carousel Caption]{@link https://getbootstrap.com/docs/4.0/components/carousel/#with-captions}
 *
 * @class CarouselCaption
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String|Element} [props.header] - Header caption element
 * @property {String|Element} [props.text] - Text caption element
 */
export class CarouselCaption extends Component {
    static propTypes = {
        ...Tag.propTypes,
        header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    };

    static defaultProps = {
        tag: 'article'
    };

    render() {
        const { className, children, header, text, ...props } = this.props;
        const classes = Classnames(className, 'carousel-caption', 'd-none', 'd-md-block');
        return <Tag {...props} className={classes}>
            {children || [
                <h3 key={`carousel-caption-header`}>{header}</h3>,
                <p key={`carousel-caption-text`}>{text}</p>
            ]}
        </Tag>
    }
}

/**
 * Bootstrap Carousel Caption Header integration
 * @see [Bootstrap Carousel Caption Header]{@link https://getbootstrap.com/docs/4.0/components/carousel/#with-captions}
 *
 * @class CarouselCaptionHeader
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CarouselCaptionHeader extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'h3'
    };

    render() {
        return <Tag {...this.props} />
    }
}

/**
 * Bootstrap Carousel Caption Text integration
 * @see [Bootstrap Carousel Caption Text]{@link https://getbootstrap.com/docs/4.0/components/carousel/#with-captions}
 *
 * @class CarouselCaptionText
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CarouselCaptionText extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'p'
    };

    render() {
        return <Tag {...this.props} />
    }
}

/**
 * Bootstrap Carousel Controls integration
 * @see [Bootstrap Carousel Controls]{@link https://getbootstrap.com/docs/4.0/components/carousel/#with-controls}
 *
 * @class CarouselControls
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CarouselControls extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'a',
        href: 'javascript:void(0);'
    };

    render() {
        const { className, pointer, onPrevious, onNext, ...props } = this.props;
        return [
            <Tag key={`carousel-controls-prev`} 
                pointer={pointer && (typeof pointer == 'string' ? `${pointer}-left` : 
                    function () { return pointer(...arguments, 'left'); }
                )} 
                {...props}
                onClick={onPrevious}
                className={Classnames(className, 'carousel-control-prev')} 
                role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Précédent</span>
            </Tag>,
            <Tag key={`carousel-controls-next`} 
                pointer={pointer && (typeof pointer == 'string' ? `${pointer}-right` : 
                    function () { return pointer(...arguments, 'right'); }
                )} 
                {...props} 
                onClick={onNext}
                className={Classnames(className, 'carousel-control-next')} 
                role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Suivant</span>
            </Tag>
        ];
    }
}

/**
 * Bootstrap Carousel Indicators integration
 * @see [Bootstrap Carousel Indicators]{@link https://getbootstrap.com/docs/4.0/components/carousel/#with-indicators}
 *
 * @class CarouselIndicators
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CarouselIndicators extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.number,
        count: PropTypes.number,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        tag: 'ol'
    };

    render() {
        const { className, active, count, onClick, ...props } = this.props;
        const classes = Classnames(className, 'carousel-indicators');
        return <Tag {...props} className={classes}>
            {[...Array(count)].map((item, index) => {
                const classes = Classnames({ active: active == index });
                return <li key={`carousel-item-${index}`} className={classes} onClick={this.onClick} />
            })}
        </Tag>
    }

    onClick = event => {
        event.preventDefault();
        this.props.onClick();
    }
}

/**
 * Bootstrap Carousel Inner integration
 * @see [Bootstrap Carousel]{@link https://getbootstrap.com/docs/4.0/components/carousel/}
 * 
 * @class CarouselInner
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CarouselInner extends Component {
    static propTypes = {
        ...Tag.propTypes,
    };

    static defaultProps = {
        tag: 'article',
        role: 'listbox',
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'carousel-inner');
        return <Tag {...props} className={classes} />
    }
}

/**
 * Bootstrap Carousel Item integration
 * @see [Bootstrap Carousel]{@link https://getbootstrap.com/docs/4.0/components/carousel/}
 *
 * @class CarouselItem
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @root Theme.Transition
 * @property {Object} [props] - Component properties
 * @property {String} [props.alt] - Item image's alt text
 * @property {String} [props.src] - Item image's url
 * @property {Boolean} [props.active] - Specify item is active
 * @property {Number} [props.count] - Number of items inside carousel
 * @property {Number} [props.index] - Item's index inside carousel
 * @property {Number} [props.current] - Current index inside carousel
 * @property {Boolean} [props.slide] - Specify slide animation is used
 */
export class CarouselItem extends Component {
    static propTypes = {
        ...Tag.propTypes,
        ...Transition.propTypes,
        alt: PropTypes.string,
        src: PropTypes.string,
        active: PropTypes.bool,
        count: PropTypes.number,
        index: PropTypes.number,
        current: PropTypes.number,
        slide: PropTypes.bool,
    };

    static contextTypes = {
        direction: PropTypes.string
    };

    static defaultProps = {
        ...Transition.defaultProps,
        slide: true,
        tag: 'section',
        timeout: 600,
    };

    state = { start: false };

    render() {
        const { children, tag, pointer, ...props } = Transition.getTransitionProps(this.props);

        return <Transition 
            {...props} 
            enter={this.props.slide} 
            exit={this.props.slide} 
            onEnter={this.onEnter} 
            onEntering={this.onEntering} 
            onExit={this.onExit} 
            onExiting={this.onExiting} 
            onRender={this.onRender} 
        />
    }

    onEntering = (node, appearing) => {
        this.setState({ start: true });
        this.props.onEntering(node, appearing);
    }
    onEnter = (node, appearing) => {
        this.setState({ start: false });
        this.props.onEnter(node, appearing);
    }

    onExiting = node => {
        this.setState({ start: true });
        this.props.onExiting(node);
    }
    onExit = node => {
        this.setState({ start: false });
        this.props.onExit(node);
    }

    onRender = status => {
        const { direction } = this.context;
        const { index, current, count, src, alt, children, slide, ...props } = Transition.getOtherProps(this.props);
        const previous = current ? (current - 1) : (count - 1);
        const next = (current + 1) % count;

        const classes = Classnames('carousel-item', { 
            active:                 index == current,
            'carousel-item-prev':   index == previous, 
            'carousel-item-next':   index == next,
            'carousel-item-left':   status == Transition.EXITING && direction == RIGHT,
            'carousel-item-right':  status == Transition.EXITING && direction == LEFT,
        });

        return <Tag {...props} className={classes}>
            {src && <img className={'d-flex img-fluid w-100'} src={src} alt={alt} />}
            {children}
        </Tag>
    }
}