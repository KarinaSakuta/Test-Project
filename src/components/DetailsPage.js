import React, { Component } from 'react';
import { getCatInfo, getCatsList } from '../api/cats';
import Menu from './Menu';
import Header from './Header';
import Loading from './Loading';
import { Link } from 'react-router-dom';

export default class DetailsPage extends Component {
    constructor () {
        super();
        this.state = {
            isLoading: true,
            info: null,
            catsList: [],
        };
    }

    componentDidUpdate(prevProps) {
        const newId = this.getCatIdFromProps(this.props);
        const oldId = this.getCatIdFromProps(prevProps);

        if (newId === oldId) {
            return;
        }

        this.setState({
            isLoading: true,
        });
        
        getCatInfo(newId).then((info) => {    
            this.setState({
                info,
                isLoading: false,
            });
        });
    }

    componentDidMount() {
        const id = this.getCatIdFromProps(this.props);

        Promise.all([
            getCatInfo(id),
            getCatsList(),
        ]).then((data) => {
            const info = data[0];
            const catsList = data[1];

            this.setState({
                isLoading: false,
                info,
                catsList,
            });
        });
    }

    getCatIdFromProps(props) {
        const params = props.match.params;
        const catId = Number(params.catId);
        return catId;
    }

    getMenuItems() {
        return this.state.catsList.map((element) => {
            return {
                id: element.id,
                imageUrl: element.imageUrl,
                title: element.name,
            };
        });
    }

    renderShortDetails() {
        const info = this.state.info;

        return (
            <div className="details__preview">
                <div className="details__preview-image-container">
                    <img className="details__preview-image" src={info.imageUrl} alt={info.name}></img>
                </div>
                <div className="details__preview-text-container">
                    <div className="details__preview-text-container-inner">                                
                        <div className="details__preview-text">
                            <span className="details__preview-text-title">Страна:</span>
                            <span className="details__preview-text-value">{info.originCountry}</span>
                        </div>
                        <div className="details__preview-text">
                            <span className="details__preview-text-title">Выведено:</span>
                            <span className="details__preview-text-value">{info.foundationDate}</span>
                        </div>
                        <div className="details__preview-text">
                            <span className="details__preview-text-title">Категория WCF:</span>
                            <span className="details__preview-text-value">{info.wcfCategory}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.isLoading) {
            return <Loading />;
        }

        const info = this.state.info;

        return (
            <div className="page page_details">
                <Header />
                <div className="page__content">
                    <Link className="page__back-link" to="/">На главную</Link>
                    <h2 className="page__content-header">{info.name}</h2>
                    <div className="details">
                        {this.renderShortDetails()}
                        <div className="details__section">
                            <h3 className="details__section-title">Внешность</h3>
                            <p className="details__section-content">{info.appearance}</p>
                            <h3 className="details__section-title">Уход</h3>
                            <p className="details__section-content">{info.care}</p>
                            <h3 className="details__section-title">История</h3>
                            <p className="details__section-content">{info.history}</p>
                        </div>
                        <Menu items={this.getMenuItems()} activeId={this.getCatIdFromProps(this.props)}/>
                    </div>
                </div>
            </div>
        );
    }
}
