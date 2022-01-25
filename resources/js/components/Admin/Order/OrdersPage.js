import React, {Component, useEffect} from 'react';
import OrderList from "./OrderList";

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

    //
    // async getOrders() {
    //     await fetch("/v1/public/api/orders")
    //         .then(res => res.json())
    //         .then((result) => {
    //             this.setState({
    //                 orders: result
    //             })
    //             result.data.forEach(item => {
    //                 this.getCustomers(item.customer_id).then(result => {
    //                     this.setState(
    //                         {
    //                             customers: result
    //                         })
    //                 })
    //
    //                 this.getOrderLines(item.id).then(result => {
    //                     this.setState({
    //                         order_lines: result
    //                     })
    //                     let product_count = result.length
    //                     let attributes = 0
    //                     if (product_count !== 0) {
    //                         result.map(line => {
    //                             this.getAttributesProduct(line.product_id)
    //                                 .then(result => {
    //                                     attributes = result
    //                                     price += (result.price * line.quantity)
    //                                     product_count--
    //
    //                                     if (product_count === 0) {
    //                                         let prev_state = this.state.orders
    //                                         prev_state[item.id - 1].price = price
    //                                         this.setState({orders: prev_state})
    //                                     }
    //                                 })
    //                         })
    //                     }
    //                 })
    //
    //             })
    //         })
    // }

    // async getAttributesProduct(product_id) {
    //     let attribute
    //
    //     function setAttribute(it) {
    //         attribute = it
    //     }
    //
    //     await fetch("/v1/public/api/attributes/" + product_id)
    //         .then(res => res.json())
    //         .then((response) => {
    //             setAttribute(response.data)
    //         })
    //
    //     return attribute
    // }

    // async getCustomers(id) {
    //     let customer
    //
    //     function setCustomer(it) {
    //         customer = it
    //     }
    //
    //     await fetch("/v1/public/api/customers/" + id)
    //         .then(res => res.json())
    //         .then((response) => {
    //             setCustomer(response.data)
    //         })
    //     return customer
    // }
    //
    //
    // async getOrderLines(order_id) {
    //     let order_lines;
    //
    //     function setOrderLines(it) {
    //         order_lines = it
    //     }
    //
    //     await fetch("/v1/public/api/order-lines?order_id=" + order_id)
    //         .then(res => res.json())
    //         .then((response) => {
    //             setOrderLines(response.data)
    //         })
    //
    //     return order_lines
    // }

    render() {
        if (!this.state.orders) {
            return (
                <div>
                    <img src="/v1/public/images/f56a28796baf1a9043283db85313a3cbfda8fe86.gif" alt=""/>
                </div>
            )
        }
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Покупатель</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Статус</th>
                </tr>
                </thead>
                <tbody>
                <OrderList orders={this.state.orders}/>
                </tbody>
            </table>
        )
    }
}

export default OrdersPage
