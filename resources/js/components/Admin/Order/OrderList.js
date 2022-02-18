import React, {Component} from "react";
import SingleOrderLine from "./SingleOrderLine";

class OrderList extends Component {
    state = {
        order_list: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let orders = []
        this.props.orders.data.map(item => {
            orders.push(this.getOrderById(item.id))
        })
        Promise.all(orders).then(r => {
            this.setState({
                order_list: r,
            })
        })
    }

    getOrderById = (id) => {
        return new Promise((resolve) => {
            fetch("/v1/public/api/orders/" + id)
                .then(res => res.json())
                .then((result) => {
                    resolve(result.data)
                })
        })
    }

    render() {
        const placeholder = () => {
            return (
                <tr className={"placeholder-glow"}>
                    <td><span className={"placeholder col-4"}/></td>
                    <td><span className={"placeholder col-4"}/></td>
                    <td><span className={"placeholder col-4"}/></td>
                    <td><span className={"placeholder col-4"}/></td>
                    <td><span className={"placeholder col-4"}/></td>
                </tr>
            )
        }
        let crab = null
        const STATUS_MAP = {
            'new': "Новый"
        }
        if (this.state.order_list) {
            crab = this.state.order_list.map(value => {
                return (
                    <SingleOrderLine key={value.id} content={value}/>
                )
            })
        }
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Покупатель</th>
                    <th scope="col">Адресс доставки</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Статус</th>
                </tr>
                </thead>
                <tbody id={"order_list_tbody"}>
                {crab ?? placeholder()}
                <tr><td colSpan={5}>Количество заказов : {this.state.order_list.length}</td></tr>
                </tbody>

            </table>
        )
    }
}

export default OrderList
