'use strict';

import uuid from 'uuid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';
import Dropdown, { DropdownInner, DropdownItem, DropdownToggle } from './dropdown';
import Tag from './tag';
import { slugify } from '@utils';

export class NavItem extends Component {
    static propTypes = {
        ...Tag.propTypes,
    }
    static defaultProps = {
        tag: 'li'
    }

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'nav-item');
        return <Tag {...props} className={classes} />
    }
}

export class NavDropdown extends Component {
    static propTypes = {
        ...Dropdown.propTypes,
    };

    static defaultProps = {
        tag: 'li',
    };

    render() {
        const { className, ...props } = this.props;
        const classes = Classnames(className, 'nav-item');
        return <Dropdown {...this.props} className={classes} />
    }
}

export class NavLink extends Component {
    static propTypes = {
        ...Tag.propTypes,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        item: PropTypes.bool,
    };

    static defaultProps = {
        tag: 'a',
        href: 'javascript:void(0);'
    };

    static getProps(props) {
        const { acitve, disabled, item } = props;
        return { acitve, disabled, item };
    }

    render() {
        const { active, className, disabled, item, ...props } = this.props;
        const classes = Classnames(className, 'nav-link', item && 'nav-item', { active, disabled });
        return <Tag {...props} className={classes} disabled={disabled} onClick={this.onClick} />
    }

    onClick = event => {
        if (this.props.disabled) return event.preventDefault();
        if (this.props.href === '#') event.preventDefault();
        if (this.props.onClick) this.props.onClick(event); 
    }
}

export class NavMenu extends Component {
    static propTypes = {
        menu: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string, 
            PropTypes.shape({
                ...Tag.propTypes,
                children: PropTypes.arrayOf(PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.shape(Tag.propTypes)
                ])),
            })
        ])).isRequired,
    }

    static contextTypes = {
        nav: PropTypes.shape({
            vertical: PropTypes.bool,
        })
    };

    state = { active: undefined };

    render() {
        return this.map(this.reduce(this.props.menu));
    }

    reduce = items => {
        return items.filter(item => item).reduce((accu, item) => {
            if (typeof item == 'string') accu.push({ title: item })
            else if (Array.isArray(item)) accu = accu.concat(this.reduce(item));
            else if (item) accu.push(item);
            return accu;
        }, []);
    }

    map = items => {
        const { menu, ...props } = this.props;
        return items.map((item, index) => {
            const { children, ...link } = item;
            if (!children) return <NavLink key={`nav-link-${index}`} item {...link} {...props} active={this.isActive(link, 'active')} onClick={this.onClick.bind(this, link, 'active')} />
            if (!this.context.nav.vertical) {
                return <NavDropdown key={`nav-dropdown-${index}`}>
                    <DropdownToggle nav {...link} {...props} active={this.isActive(link, 'deploy')} onClick={this.onClick.bind(this, link, 'deploy')} />
                    <DropdownInner>
                        {this.reduce(children).map((link, key) => {
                            return <DropdownItem key={`nav-item-${index}-${key}`} 
                                {...link} {...props} nav={!link.divider} 
                                active={link.title && this.isActive(link, 'active')} 
                                onClick={link.title && this.onClick.bind(this, link, 'active')} 
                            />
                        })}
                    </DropdownInner>
                </NavDropdown>
            } else {
                return [
                    <NavLink key={`nav-link-${index}`} item {...link} {...props} active={this.isActive(link, 'deploy')} onClick={this.onClick.bind(this, link, 'deploy')} />,
                    <Collapse key={`nav-collapse-${index}`} active={this.isActive(link, 'deploy')}>
                        <NavMenu menu={children} />
                    </Collapse>
                ];
            }
        });
    }

    isActive = (item, name) => {
        return this.state[name] == slugify(item.title);
    }

    onClick = (item, name, event) => {
        this.setState({ [name]: slugify(item.title) });
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }
}

export default class Nav extends Component {
    static propTypes = {
        ...Tag.propTypes,
        tabs: PropTypes.bool,
        pills: PropTypes.bool,
        vertical: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        horizontal: PropTypes.string,
        justified: PropTypes.bool,
        fill: PropTypes.bool,
        navbar: PropTypes.bool,
        card: PropTypes.bool,
    };

    static defaultProps = {
        vertical: false,
    };

    static childContextTypes = {
        nav: PropTypes.shape({
            vertical: PropTypes.bool.isRequired,
        })
    };

    getChildContext = () => Object({
        nav: {
            vertical: this.props.vertical,
        }
    });

    render() {
        let { className, tabs, pills, vertical, horizontal, menu, justified, fill, navbar, card, tag, ...props } = this.props;
        tag = !tag && navbar ? 'ul' : 'nav';
        const classes = Classnames(className, navbar ? 'navbar-nav' : 'nav', horizontal && `justify-content-${horizontal}`, vertical && ((vertical === true || vertical == 'xs') ? 'flex-column' : `flex-${vertical}-column`), tabs && 'nav-tabs', card && tabs && 'card-header-tabs', pills && 'nav-pills', card && pills && 'card-header-pills', justified && 'nav-justified', fill && 'nav-fill');
        return <Tag tag={tag} {...props} className={classes}>
            {menu && <NavMenu menu={this.props.menu} />}
            {this.props.children}
        </Tag>
    }
}