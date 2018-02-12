'use strict';

import Action, { ActionInner } from './lib/components/action';
import Alert, { AlertMessage, AlertFlash, AlertHeading, AlertLink } from './lib/components/alert';
import Badge from './lib/components/badge';
import Breadcrumb, { BreadcrumbItem } from './lib/components/breadcrumb';
import Button, { ButtonAction, ButtonActionItem, ButtonDropdown, ButtonGroup, ButtonIcon, ButtonToolbar, ButtonTooltip } from './lib/components/button';
import Card, { CardBody, CardColumns, CardDeck, CardFooter, CardGroup, CardHeader, CardImage, CardOverlay, CardLink, CardSubtitle, CardText, CardTitle } from './lib/components/card';
import Carousel, { CarouselCaption, CarouselCaptionHeader, CarouselCaptionText, CarouselControls, CarouselIndicators, CarouselInner, CarouselItem } from './lib/components/carousel';
import Code from './lib/components/code';
import Column from './lib/components/column';
import Collapse from './lib/components/collapse';
import Container from './lib/components/container';
import Dropdown, { DropdownItem, DropdownInner, DropdownToggle } from './lib/components/dropdown';
import Form, { FormFeedback, FormGroup, FormText } from './lib/components/form';
import Icon, { FontAwesome, IconCard, IconCheckers, IconChess, IconDice, IconDomino, IconMahjong, IconZodiac } from './lib/components/icon';
import Input, { InputGroup, InputGroupAddon, InputGroupButton } from './lib/components/input';
import Jumbotron from './lib/components/jumbotron';
import Label from './lib/components/label';
import Layer from './lib/components/layer';
import ListGroup, { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from './lib/components/listgroup';
import Media, { MediaBody } from './lib/components/media';
import Nav, { NavDropdown, NavLink, NavItem, NavMenu } from './lib/components/nav';
import Navbar, { NavbarBrand, NavbarMenu, NavbarToggler, NavbarText } from './lib/components/navbar';
import Pagination, { PageItem, PageLink } from './lib/components/pagination';
import Popover, { PopoverBody, PopoverHeader, PopoverInner, PopoverToggle } from './lib/components/popover';
import Progress, { ProgressBar } from './lib/components/progress';
import Row from './lib/components/row';
import Sidebar, { SidebarMenu, SidebarItem } from './lib/components/sidebar';
import Switch from './lib/components/switch';
import Table from './lib/components/table';
import Tabs, { TabPane } from './lib/components/tabs';
import Tag from './lib/components/tag';
import Tooltip, { TooltipBody, TooltipInner, TooltipToggle } from './lib/components/tooltip';

import Transition from './lib/components/transition';
import Fade from './lib/components/transition/fade';

let _exports = module.exports = { 
    Badge, Code, Column, Collapse, Container, Jumbotron, 
    Label, Layer, Row, Switch, Table, Tag
};

// Object.assign(_exports, { Action, ActionInner });
Object.assign(_exports, { Alertn AlertMessage, AlertFlash, AlertHeading, AlertLink });
Object.assign(_exports, { Breadcrumb, BreadcrumbItem });
Object.assign(_exports, { Button, ButtonAction, ButtonActionItem, ButtonDropdown, ButtonGroup, ButtonIcon, ButtonToolbar, ButtonTooltip });
Object.assign(_exports, { Card, CardBody, CardColumns, CardDeck, CardFooter, CardGroup, CardHeader, CardImage, CardOverlay, CardLink, CardSubtitle, CardText, CardTitle });
Object.assign(_exports, { Carousel, CarouselCaption, CarouselCaptionHeader, CarouselCaptionText, CarouselControls, CarouselIndicators, CarouselInner, CarouselItem });
Object.assign(_exports, { Dropdown, DropdownItem, DropdownInner, DropdownToggle });
Object.assign(_exports, { Form, FormFeedback, FormGroup, FormText });
Object.assign(_exports, { Icon, IconCard, IconCheckers, IconChess, IconDice, IconDomino, IconMahjong, IconZodiac });
Object.assign(_exports, { Input, InputGroup, InputGroupAddon, InputGroupButton });
Object.assign(_exports, { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText });
Object.assign(_exports, { Media, MediaBody });
Object.assign(_exports, { Nav, NavDropdown, NavLink, NavItem, NavMenu });
Object.assign(_exports, { Navbar, NavbarBrand, NavbarMenu, NavbarToggler, NavbarText });
Object.assign(_exports, { Pagination, PageItem, PageLink });
// Object.assign(_exports, { Popover, PopoverBody, PopoverHeader, PopoverInner, PopoverToggle });
Object.assign(_exports, { Progress, ProgressBar });
// Object.assign(_exports, { Sidebar, SidebarMenu, SidebarItem });
Object.assign(_exports, { Tabs, TabPane });
// Object.assign(_exports, { Tooltip, TooltipBody, TooltipInner, TooltipToggle });

Object.assign(_exports, { FontAwesome });
Object.assign(_exports, { Transition, Fade });