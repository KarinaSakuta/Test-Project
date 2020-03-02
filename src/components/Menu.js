import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Menu extends Component {
    renderLinks() {
        const menuItems = this.props.items;
        const activeId = this.props.activeId;
        const sortedMenuItems = [...menuItems].sort((element1) => {
            if (element1.id === activeId) {
                return -1;
            } else {
                return 1;
            }
        });

        return sortedMenuItems.map((element) => {
            const elementClasses = classnames('menu__item', {
                'menu__item_active': element.id === activeId,
            });

            return (
                <li className={elementClasses}>
                    <Link className="menu__item-link" to={`/details/${element.id}`}>
                        <div className="menu__item-img-container">
                            <img className="menu__item-img" alt={element.title} src={element.imageUrl} />
                        </div>
                        <span className="menu__item-title">{element.title}</span>
                    </Link>
                </li>
            );
        })
    }

    render() {
        return (
            <nav className="menu">
                <ul className="menu__list">
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

Menu.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
        }),
    ).isRequired,
    activeId: PropTypes.number.isRequired,
};
