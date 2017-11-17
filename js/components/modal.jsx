'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './icon';

export default class Modal extends Component {
    static propTypes = {
        large: PropTypes.bool
    }

    render() {
        return [
            <section key="modal-backdrop" className="modal-backdrop fade show" onClick={this.props.toggle}></section>,
            <article key="modal" className={`modal fade show d-block`} onClick={this.props.toggle} style={{ overflowY: 'initial' }}>
                <section className={`modal-dialog ${this.props.large ? 'modal-lg' : ''}`} onClick={event => event.stopPropagation()}>
                    {this.props.children}
                </section>
            </article>
        ];
    }
};

export class ModalContent extends Component {
    static propTypes = {
        title: PropTypes.string,
        footer: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    };

    render() {
        let { className, style, title, toggle, footer, ...props } = this.props;
        let classname = 'modal-content';
        if (className) classname += ' ' + className;
        style = Object.assign({}, style, { overflowY: 'auto' });

        return <article className={classname} style={style} {...props}>
            {this.props.title && (
                <header className="modal-header">
                    <h4 className="d-flex justify-content-between">
                        <span>{this.props.title}</span>
                        {this.props.toggle && <span onClick={this.props.toggle}><Icon name="times" /></span>}
                    </h4>
                </header>
            )}
            {this.props.children && (
                <section className={`modal-body${this.props.center ? ' d-flex justify-content-center' : ''}`} style={{ overflowY: 'auto' }}>
                    {this.props.children}
                </section>
            )}
            {this.props.footer && (
                <footer className="modal-footer d-flex justify-content-between">
                    {this.props.footer}
                </footer>
            )}
        </article>
    }
};

export class ModalConfirm extends Component {
    static propTypes = {
        title: PropTypes.string,

        cancel_text: PropTypes.string,
        cancel_color: PropTypes.string,
        onCancel: PropTypes.func,

        submit_text: PropTypes.string,
        submit_color: PropTypes.string,
        onSubmit: PropTypes.func
    };

    render() {
        return <article className="modal-content" style={{ overflowY: 'auto' }}>
            { this.props.title && (
                <header className="modal-header">
                    <h4>{this.props.title}</h4>
                </header>
            )}
            { this.props.children && (
                <section className="modal-body">
                    {this.props.children}
                </section>
            )}
            <footer className="modal-footer d-flex justify-content-between">
                <button type={this.props.cancel_type || 'reset'} className={`btn btn-${this.props.cancel_color || 'info'}`} onClick={this.props.onCancel}>{ this.props.cancel_text || 'Annuler'}</button>
                <button type={this.props.submit_type || 'submit'} className={`btn btn-${this.props.submit_color || 'success'}`} onClick={this.props.onSubmit}>{ this.props.submit_text || 'Valider'}</button>
            </footer>
        </article>
    }
};
