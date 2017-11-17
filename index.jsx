'use strict';

import Action, { ActionInner } from './js/components/action';
import Alert, { AlertFlash, AlertHeading, AlertLink, AlertMessage } from './js/components/alert';
import Badge from './js/components/badge';
import Breadcrumb, { BreadcrumbItem } from './js/components/breadcrumb';
import Button, { ButtonAction, ButtonActionItem, ButtonDropdown, ButtonGroup, ButtonIcon, ButtonToolbar, ButtonTooltip } from './js/components/button';
import Card, { CardBody, CardColumns, CardDeck, CardFooter, CardGroup, CardHeader, CardImage, CardOverlay, CardLink, CardSubtitle, CardText, CardTitle } from './js/components/card';
import Carousel, { CarouselCaption, CarouselCaptionHeader, CarouselCaptionText, CarouselControls, CarouselIndicators, CarouselInner, CarouselItem } from './js/components/carousel';
import Code from './js/components/code';
import Column from './js/components/column';
import Collapse from './js/components/collapse';
import Container from './js/components/container';
import Dropdown, { DropdownItem, DropdownInner, DropdownToggle } from './js/components/dropdown';
import Form, { FormFeedback, FormGroup, FormText } from './js/components/form';
import Icon, { FontAwesome, IconCard, IconChess, IconDomino, IconMahjong } from './js/components/icon';
import Input, { InputGroup, InputGroupAddon, InputGroupButton } from './js/components/input';
import Jumbotron from './js/components/jumbotron';
import Label from './js/components/label';
import Layer from './js/components/layer';
import ListGroup, { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from './js/components/listgroup';
import Media, { MediaBody } from './js/components/media';
import Nav, { NavDropdown, NavLink, NavItem } from './js/components/nav';
import Navbar, { NavbarBrand, NavbarMenu, NavbarToggler, NavbarText } from './js/components/navbar';
import Pagination, { PaginationItem, PaginationLink } from './js/components/navbar';
import Popover, { PopoverBody, PopoverHeader, PopoverInner, PopoverToggle } from './js/components/popover';
import Progress, { ProgressBar } from './js/components/progress';
import Row from './js/components/row';
import Sidebar, { SidebarMenu, SidebarItem } from './js/components/sidebar';
import Switch from './js/components/switch';
import Table from './js/components/table';
import Tabs, { TabPane } from './js/components/tabs';
import Tag from './js/components/tag';
import Tooltip, { TooltipBody, TooltipInner, TooltipToggle } from './js/components/tooltip';

import Transition from './js/components/transition';
import Fade from './js/components/transition/fade';

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