import {Component} from "react";

class ProductList extends Component {
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

export default ProductList
