import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom';

/* Main Component */
class Menu extends Component {
    render() {

        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={'/v1/public/admin/home'}>
                    <span className="navbar-brand">supershvey.com.ua</span>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink"
                               role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Заказы
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark"
                                aria-labelledby="navbarDarkDropdownMenuLink">
                                <li>
                                    <Link to={'/v1/public/admin/orders'}>
                                        <span className="dropdown-item">Обзор</span>
                                    </Link>
                                </li>
                                <li>
                                    <span className="dropdown-item" data-bs-toggle="modal"
                                          data-bs-target="#staticBackdrop">Добавить</span>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink"
                               role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Продукты
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark"
                                aria-labelledby="navbarDarkDropdownMenuLink">
                                <li>
                                    <Link to={'/v1/public/admin/products'}>
                                        <span className="dropdown-item">Обзор</span>
                                    </Link>
                                </li>
                                <li>
                                    <span className="dropdown-item" data-bs-toggle="modal"
                                          data-bs-target="#staticBackdrop">Добавить</span>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink"
                               role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Покупатели
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark"
                                aria-labelledby="navbarDarkDropdownMenuLink">
                                <li>
                                    <Link to={'/v1/public/admin/customers'}>
                                        <span className="dropdown-item" href="#">Обзор</span>
                                    </Link>
                                </li>
                                <li><a className="dropdown-item" href="#">Добавить</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Menu
