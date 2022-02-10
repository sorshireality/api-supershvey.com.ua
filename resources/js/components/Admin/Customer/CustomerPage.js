import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import CustomerList from "./CustomerList";
import SingleCustomerLine from "./SingleCustomerLine";
import SingleCustomerOverview from "./SingleCustomerOverview";


class CustomerPage extends Component {
    state = {
        customers: false,
    }

    constructor(props) {
        super(props);
        this.getCustomers()
    }

    getCustomers() {
        fetch("/v1/public/api/customers")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    customers: result
                })
            })
    }

    render() {
        if (!this.state.customers) {
            return (
                <div>
                    <img src="/v1/public/images/anime_loader.gif" alt=""/>
                </div>
            )
        }
        return (
            <Routes>
                <Route path="" exact element={<CustomerList content={this.state.customers}/>}/>
                <Route path=":id" element={<SingleCustomerOverview />}/>
            </Routes>
        )
    }
}

export default CustomerPage
