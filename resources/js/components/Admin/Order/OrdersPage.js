import React, {Component, useEffect} from 'react';
import OrderList from "./OrderList";
import SingleOrderOverview from "./SingleOrderOverview"
import {Route, Routes} from "react-router-dom";
import Menu from "../Menu";

class OrdersPage extends Component {
    state = {
        orders: false,
    }

    constructor(props) {
        super(props);
        this.getOrders()
    }

    getOrders() {
        fetch("/v1/public/api/orders")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    orders: result
                })
            })
    }

    render() {
        if (!this.state.orders) {
            return (
                <div>
                    <img src="/v1/public/images/anime_loader.gif" alt=""/>
                </div>
            )
        }
        return (
            <Routes>
                <Route path="" exact element={<OrderList orders={this.state.orders}/>}/>
                <Route path=":id" element={<SingleOrderOverview />}/>
            </Routes>
        )
    }
}

export default OrdersPage
