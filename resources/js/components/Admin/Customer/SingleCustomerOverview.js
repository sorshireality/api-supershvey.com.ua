import React, {Component} from "react";
import CustomerCardBody from "../AdditionalEntities/CustomerCardBody"
import AddressCardBody from "../AdditionalEntities/AddressCardBody"
import OrderLinesCardBody from "../AdditionalEntities/OrderLinesCardBody"


class SingleCustomerOverview extends Component {
    state = {
        customer: null,
        isLoaded: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let customer_id = window.location.pathname.split('/').pop()
        this.getCustomerById(customer_id).then(
            (result) => {
                this.setState({
                    customer: result,
                    isLoaded: true
                })
            }
        )
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

        this.state.isLoaded ? console.dir(this.state.customer) : false
        return (
            <div className="container placeholder-glow">
                <div id={"orderOverviewHeader"}>
                    <div className="row justify-content-between">
                        <div className="col-2">
                            Покупатель № {this.state.isLoaded ? this.state.customer.id : <div className="placeholder col-4"/>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Базовая информация
                            </div>
                            <div className="card-body">
                                {this.state.isLoaded ? <CustomerCardBody content={this.state.customer}/> :
                                    <div className={"placeholder col-8"}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Заказы покупателя :
                            </div>
                            <div className="card-body">
                               быстрый пробег по заказам ...
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default SingleCustomerOverview
