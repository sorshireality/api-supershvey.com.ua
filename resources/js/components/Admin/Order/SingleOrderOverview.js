import React, {Component} from "react";
import CustomerCardBody from "../AdditionalEntities/CustomerCardBody"
import AddressCardBody from "../AdditionalEntities/AddressCardBody"
import OrderLinesCardBody from "../AdditionalEntities/OrderLinesCardBody"


class SingleOrderOverview extends Component {
    state = {
        order: null,
        isLoaded: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let order_id = window.location.pathname.split('/').pop()
        this.getOrderById(order_id).then(
            (result) => {
                this.setState({
                    order: result,
                    isLoaded: true
                })
            }
        )
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

        this.state.isLoaded ? console.dir(this.state.order) : false
        const getStatusSpan = (status) => {
            switch (status) {
                case "new" : {
                    return (<span className={"orderStatus " + status}>Новый</span>)
                }
            }
        }
        return (
            <div className="container placeholder-glow">
                <div id={"orderOverviewHeader"}>
                    <div className="row justify-content-between">
                        <div className="col-2">
                            Заказ № {this.state.isLoaded ? this.state.order.id : <div className="placeholder col-4"/>}
                        </div>
                        <div className="col-2">
                            Статус :
                            {!this.state.isLoaded ?
                                <div className={"placeholder col-4"}/> : getStatusSpan(this.state.order.status)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Покупатель
                            </div>
                            <div className="card-body">
                                {this.state.isLoaded ? <CustomerCardBody content={this.state.order.customer}/> :
                                    <div className={"placeholder col-8"}/>}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Адресс
                            </div>
                            <div className="card-body">
                                {this.state.isLoaded ? <AddressCardBody content={this.state.order.address}/> :
                                    <div className={"placeholder col-8"}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Строки заказа
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    {
                                        this.state.isLoaded ? this.state.order.order_lines.map(element => {
                                            return (<li key={element.id} className="list-group-item">
                                                    <OrderLinesCardBody content={element}/>
                                                </li>
                                            )
                                        }) : <div className={"placeholder col-10"} />
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default SingleOrderOverview
