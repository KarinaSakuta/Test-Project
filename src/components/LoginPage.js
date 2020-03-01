import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LoginPage extends Component {
    constructor () {
        super();
        this.state = {
            login: '',
            password: '',
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    isAuthorized() {
        const credentials = localStorage.getItem('credentials');
        return Boolean(credentials);
    }

    componentDidMount() {
        if (this.isAuthorized()) {
            this.props.history.push('/');
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value,
        });
      }

    onFormSubmit(event) {
        event.preventDefault();

        const loginData = {
            login: this.state.login,
            password: this.state.password,
        };

        localStorage.setItem('credentials', JSON.stringify(loginData));
        window.location.reload();
    }

    render() {
        return (
            <div className="page page_login">
                <div className="page__content">
                    <div className="login">
                        <form className="login__form" onSubmit={this.onFormSubmit}>
                            <label className="login__form-label">
                                Логин:
                                <input type="text" name="login" required className="login__form-input" value={this.state.login} onChange={this.handleInputChange} />
                            </label>
                            <label className="login__form-label">
                                Пароль:
                                <input type="password" name="password" required className="login__form-input" value={this.state.password} onChange={this.handleInputChange} />
                            </label>
                            <input type="submit" value="Войти" className="login__form-submit" />
                        </form>
                        <Link className="login__link" to="/">Вернуться на главную</Link>
                    </div>
                </div>
            </div>
        );
    }
}
