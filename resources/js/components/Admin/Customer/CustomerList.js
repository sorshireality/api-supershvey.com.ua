import React, {Component} from "react";
import SingleCustomerLine from "./SingleCustomerLine";

class CustomerList extends Component {
    state = {
        customer_list: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let customers = []
        this.props.content.data.map(item => {
            customers.push(this.getCustomerById(item.id))
        })
        Promise.all(customers).then(r => {
            this.setState({
                customer_list: r,
            })
        })
    }

    getCustomerById = (id) => {
        return new Promise((resolve) => {
            fetch("/v1/public/api/customers/" + id)
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

        if (this.state.customer_list) {
            crab = this.state.customer_list.map(value => {
                return (
                    <SingleCustomerLine key={value.id} content={value}/>
                )
            })
        }
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Фамилия</th>
                    <th scope="col">Номер телефона</th>
                    <th scope="col">Почта</th>
                </tr>
                </thead>
                <tbody>
                {crab ?? placeholder()}
                <tr><td colSpan={5}>Количество покупателей : {this.state.customer_list.length}</td></tr>
                </tbody>
            </table>
        )
    }
}

export default CustomerList
