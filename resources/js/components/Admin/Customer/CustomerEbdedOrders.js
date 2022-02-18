import React, {Component} from "react";
import SingleOrderLine from "../Order/SingleOrderLine";


class CustomerEbdedOrders extends Component {

    state = {
        orders: false
    }

    componentDidMount() {
        this.getCustomerOrdersByid(this.props.id).then(
            (r) => {
                this.setState({
                    orders: r
                })
            }
        )

    }

    getCustomerOrdersByid = (id) => {
        return new Promise((resolve) => {
            fetch("/v1/public/api/customers/" + id + "/orders")
                .then(res => res.json())
                .then((result) => {
                    resolve(result.data)
                })
        })
    }

    render() {
        if (!this.state.orders) {
            return 123;
        }

        const getList = (orders) => {
            let printout = []
            orders.forEach((order) => {
                printout.push(
                    <SingleOrderLine content={order}/>
                )
            })
            return printout;
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
                <React.Fragment>
                    {getList(this.state.orders)}
                </React.Fragment>
                <tr>
                    <td colSpan={5}>Количество заказов : {this.state.orders.length}</td>
                </tr>
                </tbody>

            </table>
        );
    }
}

export default CustomerEbdedOrders
