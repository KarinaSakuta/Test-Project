import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor () {
        super();

        this.onLogOutClick = this.onLogOutClick.bind(this);
        this.onLogInClick = this.onLogInClick.bind(this);
    }

    isAuthorized() {
        const credentials = localStorage.getItem('credentials');
        return Boolean(credentials);
    }

    onLogOutClick() {
        localStorage.removeItem('credentials');
        window.location.reload();
    }

    onLogInClick() {
        const { history } = this.props;
        history.push('/login');
    }

    renderButton() {
        if (this.isAuthorized()) {
            return (
                <button className="header__button header__button_logout" onClick={this.onLogOutClick}>Выйти</button>
            );
        } else {
            return (
                <button className="header__button header__button_login" onClick={this.onLogInClick}>Войти</button>
            );
        }
    }

    render() {
        return (
            <header className="header">
                <div className="header__container">
                <Link className="header__title" to="/">Karina's cats list</Link>
                    {this.renderButton()}
                </div>
            </header>
        );
    }
}

const HeaderWithRouter = withRouter(Header);

export default HeaderWithRouter;
