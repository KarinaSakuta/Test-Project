import React, { Component } from 'react';
import { getCatsList } from '../api/cats';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';

export default class ListPage extends Component {
    constructor () {
        super();
        this.state = {
            list: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        getCatsList().then((list) => {
            this.setState({
                isLoading: false,
                list,
            });
        });
    }

    renderListItems() {
        return this.state.list.map((element, index) => {
            return (
               <li className="list__item">
                   <Link className="list__item-link" to={`/details/${index}`} key={index}>
                       <h3 className="list__item-title">{element.name}</h3>
                       <div className="list__item-container">
                            <div className="list__item-image-container">
                                <img className="list__item-image" src={element.imageUrl} alt={element.name}/>
                            </div>
                            <div className="list__item-text-container">
                                <div className="list__item-text-container-inner">                                
                                    <div className="list__item-text">
                                        <span className="list__item-text-title">Страна:</span>
                                        <span className="list__item-text-value">{element.originCountry}</span>
                                    </div>
                                    <div className="list__item-text">
                                        <span className="list__item-text-title">Выведено:</span>
                                        <span className="list__item-text-value">{element.foundationDate}</span>
                                    </div>
                                    <div className="list__item-text">
                                        <span className="list__item-text-title">Категория WCF:</span>
                                        <span className="list__item-text-value">{element.wcfCategory}</span>
                                    </div>
                                </div>
                                <button className="list__item-button">Подробнее...</button>
                            </div>
                        </div>
                   </Link>
                </li>
            );
        });
    }

    render() {
        if (this.state.isLoading) {
            return <Loading />;
        }

        return (
            <div className="page">
                <Header/>
                <div className="page__content">
                    <h2 className="page__content-header">Список котиков Каринки</h2>
                    <div className="list">
                        <ul className="list__container">
                            {this.renderListItems()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
