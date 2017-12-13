'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';

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
        const { body, color, className, inverse, outline, ...props } = this.props;
        const classes = Classnames(className, 'card', inverse && 'text-white', color && `${outline ? 'border' : 'bg'}-${color}`);
        if (!body) return <Tag {...props} className={classes} />
        return <Tag {...props} className={classes}>
            <CardBody>{props.children}</CardBody>
        </Tag>
    }
}

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