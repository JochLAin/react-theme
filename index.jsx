'use strict';

import Action, { ActionInner } from './lib/components/action';
import Alert, { AlertFlash, AlertHeading, AlertLink, AlertMessage } from './lib/components/alert';
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
import Icon, { FontAwesome, IconCard, IconChess, IconDomino, IconMahjong } from './lib/components/icon';
import Input, { InputGroup, InputGroupAddon, InputGroupButton } from './lib/components/input';
import Jumbotron from './lib/components/jumbotron';
import Label from './lib/components/label';
import Layer from './lib/components/layer';
import ListGroup, { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from './lib/components/listgroup';
import Media, { MediaBody } from './lib/components/media';
import Nav, { NavDropdown, NavLink, NavItem } from './lib/components/nav';
import Navbar, { NavbarBrand, NavbarMenu, NavbarToggler, NavbarText } from './lib/components/navbar';
import Pagination, { PaginationItem, PaginationLink } from './lib/components/navbar';
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