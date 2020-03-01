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
                       <div className="list__item-image-container">
                           <img className="list__item-image" src={element.imageUrl} alt={element.name}/>
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
                    <div className="list">
                        <h2 className="list__title">Список котиков Карины</h2>
                        <ul className="list__container">
                            {this.renderListItems()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
