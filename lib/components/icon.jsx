'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';
import webfonts from '@fortawesome/fontawesome-free-webfonts';
import FontAwesome from '@fortawesome/react-fontawesome';
import Tag from './tag';
import * as icons from '../constants/icon';

fontawesome.library.add(brands, regular, solid, webfonts);

/**
 * Icon multiplexer
 * @see [FontAwesome 5 Gallery]{@link https://fontawesome.com/icons?d=gallery}
 *
 * @class Icon
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.prefix] - Specify what kind of icon is used
 * @property {String} [props.name] - Icon name 
 */
export default class Icon extends Component {
    static propTypes = {
        ...Tag.propTypes,
        prefix: PropTypes.oneOf([
            'fa', 'fontawesome', 'card', 'checkers', 'chess',
            'dice', 'domino', 'emoji', 'mahjong', 'zodiac'
        ]),
        name: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.string
        ]),
    };

    static defaultProps = {
        prefix: 'fontawesome',
        tag: 'span',
    };

    render() {
        let icon;
        const { prefix, name, ...props } = this.props;
        switch (prefix) {
            case 'fa':
            case 'fontawesome':
                return <FontAwesome icon={name} {...props} />
            case 'card': return <IconCard name={name} {...props} />
            case 'checkers': return <IconCheckers name={name} {...props} />
            case 'chess': return <IconChess name={name} {...props} />
            case 'dice': return <IconDice name={name} {...props} />
            case 'domino': return <IconDomino name={name} {...props} />
            case 'emoji': return <IconEmoji name={name} {...props} />
            case 'mahjong': return <IconMahjong name={name} {...props} />
            case 'zodiac': return <IconZodiac name={name} {...props} />
            default:
                const { className, ...attr } = props;
                const classes = Classnames(className, 'icon', `icon-${name}`);
                return <Tag {...attr} className={classes} aria-hidden />
        }
    }
}

/**
 * Card Icon integration
 * @see https://fontawesome.com/icons
 *
 * @class IconCard
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.color] - Card color
 * @property {Boolean} [props.back] - Specify that the card is returned
 * @property {String} [props.name] - Card name
 * @property {String} [props.shade] - Card shade
 * @property {String|Number} [props.value] - Card value
 */
export class IconCard extends Component {
    static propTypes = {
        ...Tag.propTypes,
        color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        back: PropTypes.bool,
        name: PropTypes.oneOf(icons.card),
        shade: PropTypes.oneOf(['spade','diamond','club','heart','trump', 'joker', 'back', 'empty']),
        value: PropTypes.oneOf([
            ...([...Array(21)].map((a, index) => index + 1)),
            ...([...Array(21)].map((a, index) => String(index + 1))),
            'ace', 'A', 'jack', 'J', 'knight', 'C', 'queen', 'Q', 'king', 'K', 'fool', 'red', 'white'
        ]),
    };

    static defaultProps = {
        tag: 'span'
    };

    render() {
        let { back, className, color, name, shade, value, ...props } = this.props;
        if (name) {
            shade = name.split('-')[0];
            value = name.split('-')[1];
        }
        if (back) {
            shade = 'back';
            value = undefined;
        }
        name = `${shade}${value ? '-' + value : ''}`;
        if (shade == 'empty') return <IconMahjong name="dragon-white" color="muted" background="transparent" />
        if (icons.card.indexOf(name) == -1) return null;

        if (!color) {
            switch (shade) {
                case 'spade': color = 'dark'; break;
                case 'heart': color = 'red-light'; break;
                case 'diamond': color = 'orange'; break;
                case 'club': color = 'green'; break;
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
        if (shade != 'back') {
            switch (shade) {
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

        const classes = Classnames(className, 
            'icon icon-card', 
            `card-${name}`, 
            'font-unicode', 
            `text-${color}`
        );
        return <Tag {...props} className={classes}>
            {String.fromCodePoint(code)}
        </Tag>
    }
}

/**
 * Checkers Icon integration
 *
 * @class IconCheckers
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.color] - Checkers color
 * @property {String} [props.name] - Checkers name
 * @property {Boolean} [props.empty] - Specify that the checkers is empty
 * @property {String} [props.view] - Checkers view
 * @property {String} [props.shade] - Checkers shade
 * @property {String|Number} [props.value] - Checkers value
 */
export class IconCheckers extends Component {
    static propTypes = {
        ...Tag.propTypes,
        color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        name: PropTypes.string,
        empty: PropTypes.bool,
        view: PropTypes.oneOf(['top','bias']),
        shade: PropTypes.oneOf(['black','white']),
        value: PropTypes.oneOf([0, 1, 2, '0', '1', '2']),
    };

    static defaultProps = {
        tag: 'span',
        shade: 'black',
        view: 'top',
        value: 0,
    };

    render() {
        let { className, color, name, view, value, shade, ...props } = this.props;
        if (name) {
            view = name.split('-')[0];
            shade = name.split('-')[1];
            value = name.split('-')[2];
        }
        name = `${view}-${shade}-${value}`;
        if (icons.checkers.indexOf(name) == -1) return null;

        let code;
        if (!Number(value)) {
            if (shade == 'white') code = 9898;
            else if (shade == 'black') code = 9899;
        } else if (view == 'top') {
            if (shade == 'white') code = 9861;
            else if (shade == 'black') code = 9863;
        } else if (view == 'bias') {
            if (shade == 'white') code = 9919;
            else if (shade == 'black') code = 9921;
        }
        if (Number(value)) code += Number(value);

        const classes = Classnames(className, 
            'icon icon-checkers', 
            `checkers-${name}`, 
            'text-unicode', 
            color && `text-${color}`
        );
        return <Tag {...props} className={classes}>
            {String.fromCodePoint(code)}
        </Tag>
    }
}

/**
 * Chess Icon integration
 *
 * @class IconChess
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.color] - Chess color
 * @property {String} [props.name] - Chess name
 * @property {String} [props.shade] - Chess shade
 * @property {String} [props.role] - Chess role
 */
export class IconChess extends Component {
    static propTypes = {
        ...Tag.propTypes,
        name: PropTypes.string,
        color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        shade: PropTypes.oneOf(['white', 'black']),
        role: PropTypes.oneOf(['king', 'queen', 'rook', 'bishop', 'knight', 'pawn']),
    };

    static defaultProps = {
        tag: 'span'
    };

    render() {
        let { className, color, name, shade, role, ...props } = this.props;
        if (name) {
            shade = name.split('-')[0];
            role = name.split('-')[1];
        }
        name = `${shade}-${role}`;
        if (icons.chess.indexOf(name) == -1) return null;

        let code = 9812;
        if (shade == 'black') code += 6;
        switch (role) {
            case 'king': code += 0; break;
            case 'queen': code += 1; break;
            case 'rook': code += 2; break;
            case 'bishop': code += 3; break;
            case 'knight': code += 4; break;
            case 'pawn': code += 5; break;
        }

        const classes = Classnames(className, 
            'icon icon-chess', 
            `chess-${name}`, 
            'text-unicode', 
            color && `text-${color}`
        );
        return <Tag {...props} className={classes}>
            {String.fromCodePoint(code)}
        </Tag>
    }
}

/**
 * Dice Icon integration
 *
 * @class IconDice
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.color] - Dice color
 * @property {String} [props.name] - Dice name
 * @property {String|Number} [props.value] - Dice value
 */
export class IconDice extends Component {
    static propTypes = {
        ...Tag.propTypes,
        name: PropTypes.string,
        color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        value: PropTypes.oneOf([
            ...([...Array(6)].map((a, index) => index + 1)),
            ...([...Array(6)].map((a, index) => String(index + 1))),
        ]),
    };

    static defaultProps = {
        tag: 'span'
    };

    render() {
        let { className, color, name, value, ...props } = this.props;
        if (name) value = name;
        name = `${value}`;
        if (icons.dice.indexOf(name) == -1) return null;

        let code = 9855;
        code += Number(value);
        const classes = Classnames(className, 
            'icon icon-dice', 
            `dice-${name}`, 
            'text-unicode', 
            color && `text-${color}`
        );
        return <Tag {...props} className={classes}>
            {String.fromCodePoint(code)}
        </Tag>
    }
}

/**
 * Domino Icon integration
 *
 * @class IconDomino
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.color] - Domino color
 * @property {String} [props.name] - Domino name
 * @property {String} [props.direction] - Domino orientation
 * @property {String|Number} [props.left] - Domino left/top value
 * @property {String|Number} [props.right] - Domino right/bottom value
 */
export class IconDomino extends Component {
    static propTypes = {
        ...Tag.propTypes,
        name: PropTypes.string,
        color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
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

        const classes = Classnames(className, 
            'icon icon-domino', 
            `domino-${name}`, 
            color && `text-${color}`
        );
        return <Tag {...props} className={classes}>
            {String.fromCodePoint(code)}
        </Tag>
    }
}

/**
 * Emoji Icon integration
 *
 * @class IconEmoji
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.color] - Emoji color
 * @property {String} [props.name] - Emoji name
 */
export class IconEmoji extends Component {
    static propTypes = {
        ...Tag.propTypes,
        color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        name: PropTypes.string,
    };

    static defaultProps = {
        tag: 'span'
    };

    render() {
        const { className, color, name, ...props } = this.props;
        if (icons.emoji.indexOf(name) == -1) return null;

        const classes = Classnames(className, 
            'icon icon-emoji', 
            `emoji-${name}`, 
            color && `text-${color}`
        );
        return <Tag {...props} className={classes}>
            {String.fromCodePoint(128512 + icons.emoji.indexOf(name))}
        </Tag>
    }
}

/**
 * Mahjong Icon integration
 *
 * @class IconMahjong
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.color] - Mahjong color
 * @property {String} [props.name] - Mahjong name
 * @property {String} [props.shade] - Mahjong shade
 * @property {String} [props.modifier] - Mahjong modifier
 */
export class IconMahjong extends Component {
    static propTypes = {
        ...Tag.propTypes,
        color: PropTypes.string,
        name: PropTypes.string,
        shade: PropTypes.string,
        modifier: PropTypes.string,
    };

    static defaultProps = {
        tag: 'span'
    };

    render() {
        let { className, color, name, shade, modifier, ...props } = this.props;
        if (name) {
            shade = name.split('-')[0];
            modifier = name.split('-')[1];
        }
        name = `${shade}${modifier ? '-' + modifier : ''}`;
        if (icons.mahjong.indexOf(name) == -1) return null;

        let code = 126976;
        code += icons.mahjong.indexOf(name);
        const classes = Classnames(className, 
            'icon icon-mahjong', 
            `mahjong-${name}`, 
            color && `text-${color}`
        );
        return <Tag {...props} className={classes}>
            {String.fromCodePoint(code)}
        </Tag>
    }
}

/**
 * Zodiac Icon integration
 *
 * @class IconZodiac
 * @extends React.Component
 * @author Jocelyn Faihy <jocelyn@faihy.fr>
 *
 * @root Theme.Tag
 * @property {Object} [props] - Component properties
 * @property {String} [props.color] - Zodiac color
 * @property {String} [props.name] - Zodiac name
 * @property {String} [props.sign] - Zodiac sign
 */
export class IconZodiac extends Component {
    static propTypes = {
        ...Tag.propTypes,
        color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        name: PropTypes.string,
        sign: PropTypes.string,
    };

    static defaultProps = {
        tag: 'span'
    };

    render() {
        let { className, color, name, sign, ...props } = this.props;
        if (name) sign = name;
        name = `${sign}`;
        if (icons.zodiac.indexOf(name) == -1) return null;

        let code = 9800;
        code += icons.zodiac.indexOf(name);
        const classes = Classnames(className, 
            'icon icon-zodiac', 
            `zodiac-${name}`, 
            color && `text-${color}`
        );
        return <Tag {...props} className={classes}>
            {String.fromCodePoint(code)}
        </Tag>
    }
}
