'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Tag from './tag';
import * as icons from '@constants/bootstrap/icon';

export default class Icon extends Component {
    static propTypes = {
        ...Tag.propTypes,
        name: PropTypes.string,
    };
    static defaultProps = {
        tag: 'span',
    }

    render() {
        if (icons.card.indexOf(this.props.name) != -1) return <IconCard {...this.props} />
        if (icons.chess.indexOf(this.props.name) != -1) return <IconChess {...this.props} />
        if (icons.domino.indexOf(this.props.name) != -1) return <IconDomino {...this.props} />
        if (icons.emoji.indexOf(this.props.name) != -1) return <IconEmoji {...this.props} />
        if (icons.fontawesome.indexOf(this.props.name) != -1) return <FontAwesome {...this.props} />
        if (icons.mahjong.indexOf(this.props.name) != -1) return <IconMahjong {...this.props} />

        const { className, name, ...props } = this.props;
        const classes = Classnames(className, 'icon', `icon-${name}`);
        return <Tag {...props} className={classes} aria-hidden />
    }
}

export class FontAwesome extends Component {
    static propTypes = {
        ...Tag.propTypes,
        name: PropTypes.string,
        border: PropTypes.bool,
        fw: PropTypes.bool,
        inverse: PropTypes.bool,
        pulse: PropTypes.bool,
        spin: PropTypes.bool,
        flip: PropTypes.string,
        rotate: PropTypes.string,
        size: PropTypes.string,
        stack: PropTypes.string,
    };

    static defaultProps = {
        tag: 'span',
    };

    render() {
        const { border, className, fw, flip, inverse, name, pulse, rotate, size, spin, stack, ...props } = this.props;
        const classes = Classnames(className, 'fa', `fa-${name}`, size && `fa-${size}`, spin && 'fa-spin', pulse && 'fa-pulse', border && 'fa-border', fw && 'fa-fw', inverse && 'fa-inverse', flip && `fa-flip-${flip}`, rotate && `fa-rotate-${rotate}`, stack && `fa-stack-${stack}`);
        return <Tag {...props} className={classes} aria-hidden />
    }
}

export class IconCard extends Component {
    static propTypes = {
        ...Tag.propTypes,
        color: PropTypes.string,
        name: PropTypes.oneOf(icons.card),
        shape: PropTypes.oneOf(['spade','diamond','club','heart','trump', 'joker']),
        value: PropTypes.oneOf([
            [...Array(21).map((a, index) => index + 1)],
            [...Array(21).map((a, index) => String(index + 1))],
            'back', 'ace', 'A', 'jack', 'J', 'knight', 'C', 'queen', 'Q', 'king', 'K', 'fool', 'red', 'white'
        ]),
    };

    static defaultProps = {
        tag: 'span'
    };

    render() {
        let { className, color, name, shape, value, ...props } = this.props;
        if (name) {
            shape = name.split('-')[0];
            value = name.split('-')[1];
        }
        name = `${shape}${value ? '-' + value : ''}`;
        if (icons.card.indexOf(name) == -1) return null;

        if (!color) {
            switch (shape) {
                case 'spade': color = 'dark'; break;
                case 'heart': color = 'red-middle'; break;
                case 'diamond': color = 'orange-middle'; break;
                case 'club': color = 'green-middle'; break;
                case 'trump': color = 'brown'; break;
                case 'back': color = 'petrol'; break;
                case 'joker': 
                    if (value == 'red') color = 'red-dark';
                    else if (value == 'white') color = 'gray';
                    else if (value == 'black') color = 'dark';
                    break;
            }
        }

        let code = 127136;
        if (shape != 'back') {
            switch (shape) {
                case 'spade': code += 0; break;
                case 'heart': code += 16; break;
                case 'diamond': code += 32; break;
                case 'club': code += 48; break;
                case 'trump': code += 64; break;
            }

            switch (value) {
                case 'ace': case 'A': value = 1; break;
                case 'jack': case 'J': value = 11; break;
                case 'knight': case 'C': value = 12; break;
                case 'queen': case 'Q': value = 13; break;
                case 'king': case 'K': value = 14; break;
                case 'fool': value = 0; break;
                case 'red': value = 31; break;
                case 'black': value = 47; break;
                case 'white': value = 63; break;
                default: value = Number(value);
            }
            code += value;
        }

        const classes = Classnames(className, 'icon', `icon-card`, `card-${name}`, 'font-unicode', `text-${color}`);
        return <Tag {...props} className={classes}>
            {String.fromCodePoint(code)}
        </Tag>
    }
}

export class IconChess extends Component {
    static propTypes = {
        ...Tag.propTypes,
        name: PropTypes.string,
        color: PropTypes.string,
        shape: PropTypes.oneOf(['white', 'black']),
        role: PropTypes.oneOf(['king', 'queen', 'rook', 'bishop', 'knight', 'pawn']),
    };

    static defaultProps = {
        tag: 'span'
    };

    render() {
        let { className, color, name, shape, role, ...props } = this.props;
        if (name) {
            shape = name.split('-')[0];
            role = name.split('-')[1];
        }
        name = `${shape}-${role}`;
        if (icons.chess.indexOf(name) == -1) return null;

        let code = 9812;
        if (shape == 'black') code += 6;
        switch (role) {
            case 'king': code += 0; break;
            case 'queen': code += 1; break;
            case 'rook': code += 2; break;
            case 'bishop': code += 3; break;
            case 'knight': code += 4; break;
            case 'pawn': code += 5; break;
        }

        const classes = Classnames(className, 'icon', 'icon-chess', `chess-${name}`, 'text-unicode', color && `text-${color}`);
        return <Tag {...props} className={classes}>
            {String.fromCodePoint(code)}
        </Tag>
    }
}

export class IconDomino extends Component {
    static propTypes = {
        ...Tag.propTypes,
        name: PropTypes.string,
        color: PropTypes.string,
        direction: PropTypes.oneOf(['horizontal', 'vertical']),
        left: PropTypes.oneOf([
            ...[...Array(7)].map((a, index) => index),
            ...[...Array(7)].map((a, index) => String(index)),
        ]),
        right: PropTypes.oneOf([
            ...[...Array(7)].map((a, index) => index),
            ...[...Array(7)].map((a, index) => String(index)),
        ]),
    };

    static defaultProps = {
        tag: 'span',
    };

    render() {
        let { className, color, direction, name, left, right, ...props } = this.props;
        if (name) {
            direction = name.split('-')[0];
            left = name.split('-')[1];
            right = name.split('-')[2];
        }
        name = `${direction}-${left}${right ? '-' + right : ''}`;
        if (icons.domino.indexOf(name) == -1) return null;

        let code = 127024;
        if (direction == 'vertical') code += 50;
        if (left != 'back') code += 1 + Number(left) * 7 + Number(right);

        const classes = Classnames(className, 'icon', 'icon-domino', `domino-${name}`, color && `text-${color}`);
        return <Tag {...props} className={classes}>
            {String.fromCodePoint(code)}
        </Tag>
    }
}

export class IconEmoji extends Component {
    static propTypes = {
        ...Tag.propTypes,
        color: PropTypes.string,
        name: PropTypes.string,
    };

    static defaultProps = {
        tag: 'span'
    };

    render() {
        const { className, color, name, ...props } = this.props;
        if (icons.emoji.indexOf(name) == -1) return null;

        const classes = Classnames(className, 'icon', 'icon-emoji', `emoji-${name}`, color && `text-${color}`);
        return <Tag {...props} className={classes}>
            {String.fromCodePoint(128512 + icons.emoji.indexOf(name))}
        </Tag>
    }
}

export class IconMahjong extends Component {
    static propTypes = {
        ...Tag.propTypes,
        color: PropTypes.color,
        name: PropTypes.string,
        shape: PropTypes.string,
        modifier: PropTypes.string,
    };

    static defaultProps = {
        tag: 'span'
    };

    render() {
        let { className, color, name, shape, modifier, ...props } = this.props;
        if (name) {
            shape = name.split('-')[0];
            modifier = name.split('-')[1];
        }
        name = `${shape}${modifier ? '-' + modifier : ''}`;
        if (icons.mahjong.indexOf(name) == -1) return null;

        let code = 126976;
        code += icons.mahjong.indexOf(name);
        const classes = Classnames(className, 'icon', 'icon-mahjong', `mahjong-${name}`, color && `text-${color}`)
        return <Tag {...props} className={classes}>
            {String.fromCodePoint(code)}
        </Tag>
    }
}
