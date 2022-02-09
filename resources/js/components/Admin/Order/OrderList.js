import React, {Component} from "react";

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
                    <tr key={value.id}>
                        <th scope="row"> {value.id}
                        </th>
                        <td>{value.customer.name + " " + value.customer.lastname}</td>
                        <td>{"город: " + value.address.city + " " + value.address.district + ", улица: " + value.address.street + " " + value.address.house_number + ", квартира: " + value.address.apartment_number}</td>
                        <td style={{float: "left"}}>{value.amount / 100}</td>
                        <td>{STATUS_MAP[value.status]}</td>
                    </tr>
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
                <tbody>
                {crab ?? placeholder()}
                </tbody>
            </table>
        )
    }
}

export default OrderList
