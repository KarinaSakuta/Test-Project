import React, { Component } from 'react';
import { getCatInfo, getCatsList } from '../api/cats';
import Menu from './Menu';
import Header from './Header';
import Loading from './Loading';

export default class DetailsPage extends Component {
    constructor () {
        super();
        this.state = {
            isLoading: true,
            info: null,
            catsList: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        const newId = this.getCatIdFromProps(nextProps);
        const oldId = this.getCatIdFromProps(this.props);

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

    render() {
        if (this.state.isLoading) {
            return <Loading />;
        }

        return (
            <div className="page">
                <Header />
                <div className="page__content">
                    <div className="details">
                        <img className="details__img" src={this.state.info.imageUrl} alt={this.state.info.name}></img>
                        <h2 className="details__title">{this.state.info.name}</h2>
                        <div className="details__container">
                        </div>
                        <Menu items={this.getMenuItems()} activeId={this.getCatIdFromProps(this.props)}/>
                    </div>
                </div>
            </div>
        );
    }
}
