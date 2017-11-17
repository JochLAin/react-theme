'use strict';

import Action, { ActionInner } from './lib/action';
import Alert, { AlertFlash, AlertHeading, AlertLink, AlertMessage } from './lib/alert';
import Badge from './lib/badge';
import Breadcrumb, { BreadcrumbItem } from './lib/breadcrumb';
import Button, { ButtonAction, ButtonActionItem, ButtonDropdown, ButtonGroup, ButtonIcon, ButtonToolbar, ButtonTooltip } from './lib/button';
import Card, { CardBody, CardColumns, CardDeck, CardFooter, CardGroup, CardHeader, CardImage, CardOverlay, CardLink, CardSubtitle, CardText, CardTitle } from './lib/card';
import Carousel, { CarouselCaption, CarouselCaptionHeader, CarouselCaptionText, CarouselControls, CarouselIndicators, CarouselInner, CarouselItem } from './lib/carousel';
import Code from './lib/code';
import Column from './lib/column';
import Collapse from './lib/collapse';
import Container from './lib/container';
import Dropdown, { DropdownItem, DropdownInner, DropdownToggle } from './lib/dropdown';
import Form, { FormFeedback, FormGroup, FormText } from './lib/form';
import Icon, { FontAwesome, IconCard, IconChess, IconDomino, IconMahjong } from './lib/icon';
import Input, { InputGroup, InputGroupAddon, InputGroupButton } from './lib/input';
import Jumbotron from './lib/jumbotron';
import Label from './lib/label';
import Layer from './lib/layer';
import ListGroup, { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from './lib/listgroup';
import Media, { MediaBody } from './lib/media';
import Nav, { NavDropdown, NavLink, NavItem } from './lib/nav';
import Navbar, { NavbarBrand, NavbarMenu, NavbarToggler, NavbarText } from './lib/navbar';
import Pagination, { PaginationItem, PaginationLink } from './lib/navbar';
import Popover, { PopoverBody, PopoverHeader, PopoverInner, PopoverToggle } from './lib/popover';
import Progress, { ProgressBar } from './lib/progress';
import Row from './lib/row';
import Sidebar, { SidebarMenu, SidebarItem } from './lib/sidebar';
import Switch from './lib/switch';
import Table from './lib/table';
import Tabs, { TabPane } from './lib/tabs';
import Tag from './lib/tag';
import Tooltip, { TooltipBody, TooltipInner, TooltipToggle } from './lib/tooltip';

import Transition from './lib/transition';
import Fade from './lib/transition/fade';

let _exports = module.exports = { 
    Action, Alert, Badge, Breadcrumb, Button, Card, Carousel, Code, Column, Collapse, 
    Container, Dropdown, Form, Icon, Input, Jumbotron, Label, Layer, ListGroup, Media, 
    Nav, Navbar, Pagination, Popover, Progress, Row, Sidebar, Switch, Table, Tabs, Tag, Tooltip
};

Object.assign(_exports, { ActionInner });
Object.assign(_exports, { AlertFlash, AlertHeading, AlertLink, AlertMessage });
Object.assign(_exports, { BreadcrumbItem });
Object.assign(_exports, { ButtonAction, ButtonActionItem, ButtonDropdown, ButtonGroup, ButtonIcon, ButtonToolbar, ButtonTooltip });
Object.assign(_exports, { CardBody, CardColumns, CardDeck, CardFooter, CardGroup, CardHeader, CardImage, CardOverlay, CardLink, CardSubtitle, CardText, CardTitle });
Object.assign(_exports, { CarouselCaption, CarouselCaptionHeader, CarouselCaptionText, CarouselControls, CarouselIndicators, CarouselInner, CarouselItem });
Object.assign(_exports, { DropdownItem, DropdownInner, DropdownToggle });
Object.assign(_exports, { FormFeedback, FormGroup, FormText });
Object.assign(_exports, { IconCard, IconChess, IconDomino, IconMahjong });
Object.assign(_exports, { InputGroup, InputGroupAddon, InputGroupButton });
Object.assign(_exports, { ListGroupItem, ListGroupItemHeading, ListGroupItemText });
Object.assign(_exports, { MediaBody });
Object.assign(_exports, { NavDropdown, NavLink, NavItem });
Object.assign(_exports, { NavbarBrand, NavbarMenu, NavbarToggler, NavbarText });
Object.assign(_exports, { PaginationItem, PaginationLink });
Object.assign(_exports, { PopoverBody, PopoverHeader, PopoverInner, PopoverToggle });
Object.assign(_exports, { ProgressBar });
Object.assign(_exports, { SidebarMenu, SidebarItem });
Object.assign(_exports, { TabPane });
Object.assign(_exports, { TooltipBody, TooltipInner, TooltipToggle });

Object.assign(_exports, { FontAwesome });
Object.assign(_exports, { Transition, Fade });