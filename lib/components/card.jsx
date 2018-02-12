'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

/**
 * Bootstrap Card integration
 * @see [Bootstrap Card]{@link https://getbootstrap.com/docs/4.0/components/card/}
 *
 * @class Card
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.body] - Wrap content inside a card body
 * @property {String} [props.color] - Card background or border color
 * @property {Boolean} [props.inverse] - Set text to white
 * @property {Boolean} [props.outline] - Set the card style to border card
 */
export default class Card extends Component {
    static propTypes = {
        ...Tag.propTypes,
        body: PropTypes.bool,
        color: PropTypes.string,
        inverse: PropTypes.bool,
        outline: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'article'
    };

    render() {
        const {
            body,
            color,
            className,
            inverse,
            outline,
            ...props
        } = this.props;
        const classes = Classnames(
            className, 
            'card', 
            inverse && 'text-white', 
            color && `${outline ? 'border' : 'bg'}-${color}`
        );

        if (!body) return <Tag {...props} className={classes} />
        return <Tag {...props} className={classes}>
            <CardBody>{props.children}</CardBody>
        </Tag>
    }
}

/**
 * Bootstrap Card Body integration
 * @see [Bootstrap card body]{@link https://getbootstrap.com/docs/4.0/components/card/#body}
 *
 * @class CardBody
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CardBody extends Component {
    static propTypes = {
        ...Tag.propTypes
    };

    static defaultProps = {
        tag: 'section'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'card-body');
        return <Tag {...props} className={classes} />
    }
}


/**
 * Bootstrap Card Columns integration
 * @see [Bootstrap Card Columns]{@link https://getbootstrap.com/docs/4.0/components/card/#card-columns}
 *
 * @class CardColumns
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CardColumns extends Component {
    static propTypes = {
        ...Tag.propTypes
    };

    static defaultProps = {
        tag: 'article'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'card-columns');
        return <Tag {...props} className={classes} />
    }
}


/**
 * Bootstrap Card Deck integration
 * @see [Bootstrap Card Deck]{@link https://getbootstrap.com/docs/4.0/components/card/#card-decks}
 *
 * @class CardDeck
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CardDeck extends Component {
    static propTypes = {
        ...Tag.propTypes
    };

    static defaultProps = {
        tag: 'article'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'card-deck');
        return <Tag {...props} className={classes} />
    }
}


/**
 * Bootstrap CardFooter integration
 * @see [Bootstrap Card Footer]{@link https://getbootstrap.com/docs/4.0/components/card/#header-and-footer}
 *
 * @class CardFooter
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CardFooter extends Component {
    static propTypes = {
        ...Tag.propTypes
    };

    static defaultProps = {
        tag: 'footer'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'card-footer');
        return <Tag {...props} className={classes} />
    }
}


/**
 * Bootstrap Card Group integration
 * @see [Bootstrap Card Group]{@link https://getbootstrap.com/docs/4.0/components/card/#card-groups}
 *
 * @class CardGroup
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CardGroup extends Component {
    static propTypes = {
        ...Tag.propTypes
    };

    static defaultProps = {
        tag: 'article'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'card-group');
        return <Tag {...props} className={classes} />
    }
}


/**
 * Bootstrap Card Header integration
 * @see [Bootstrap Card Header]{@link https://getbootstrap.com/docs/4.0/components/card/#header-and-footer}
 *
 * @class CardHeader
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CardHeader extends Component {
    static propTypes = {
        ...Tag.propTypes
    };

    static defaultProps = {
        tag: 'header'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'card-header');
        return <Tag {...props} className={classes} />
    }
}


/**
 * Bootstrap Card Image integration
 * @see [Bootstrap Card Image]{@link https://getbootstrap.com/docs/4.0/components/card/#images}
 *
 * @class CardImage
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {Boolean} [props.bottom] - Add image on card's bottom
 * @property {Boolean} [props.top] - Add image on card's top
 */
export class CardImage extends Component {
    static propTypes = {
        ...Tag.propTypes,
        bottom: PropTypes.bool,
        top: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'img'
    };

    render() {
        const { bottom, className, top, ...props } = this.props;
        let classImage = 'card-img';
        if (bottom) classImage = 'card-img-bottom';
        if (top) classImage = 'card-img-top';
        const classes = Classnames(className, classImage);
        return <Tag {...props} className={classes} />
    }
}


/**
 * Bootstrap Card Overlay integration
 * @see [Bootstrap Card Image Overlay]{@link https://getbootstrap.com/docs/4.0/components/card/#image-overlays}
 *
 * @class CardOverlay
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CardOverlay extends Component {
    static propTypes = {
        ...Tag.propTypes
    };

    static defaultProps = {
        tag: 'section'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'card-img-overlay');
        return <Tag {...props} className={classes} />
    }
}


/**
 * Bootstrap CardLink integration
 * @see [Bootstrap Card Link]{@link https://getbootstrap.com/docs/4.0/components/card/#titles-text-and-links}
 *
 * @class CardLink
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CardLink extends Component {
    static propTypes = {
        ...Tag.propTypes
    };

    static defaultProps = {
        tag: 'a',
        href: 'javascript:void(0);'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'card-link');
        return <Tag {...props} className={classes} />
    }
}


/**
 * Bootstrap CardSubtitle integration
 * @see [Bootstrap Card Subtitle]{@link https://getbootstrap.com/docs/4.0/components/card/#titles-text-and-links}
 *
 * @class CardSubtitle
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CardSubtitle extends Component {
    static propTypes = {
        ...Tag.propTypes
    };

    static defaultProps = {
        tag: 'h6'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'card-subtitle');
        return <Tag {...props} className={classes} />
    }
}


/**
 * Bootstrap CardText integration
 * @see [Bootstrap Card Text]{@link https://getbootstrap.com/docs/4.0/components/card/#titles-text-and-links}
 *
 * @class CardText
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CardText extends Component {
    static propTypes = {
        ...Tag.propTypes
    };

    static defaultProps = {
        tag: 'p'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'card-text');
        return <Tag {...props} className={classes} />
    }
}


/**
 * Bootstrap CardTitle integration
 * @see [Bootstrap Card Title]{@link https://getbootstrap.com/docs/4.0/components/card/#titles-text-and-links}
 *
 * @class CardTitle
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 */
export class CardTitle extends Component {
    static propTypes = {
        ...Tag.propTypes
    };

    static defaultProps = {
        tag: 'h4'
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'card-title');
        return <Tag {...props} className={classes} />
    }
}