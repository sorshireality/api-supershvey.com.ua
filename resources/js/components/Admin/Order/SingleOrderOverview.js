import React, {Component} from "react";
import CustomerCardBody from "../AdditionalEntities/CustomerCardBody"
import AddressCardBody from "../AdditionalEntities/AddressCardBody"
import OrderLinesCardBody from "../AdditionalEntities/OrderLinesCardBody"


class SingleOrderOverview extends Component {
    state = {
        order: false,
        isLoaded: false,
        order_id: false,
        order_status: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let id = window.location.pathname.split('/').pop()
        this.getOrderById(id).then(
            (result) => {
                console.dir(result)
                this.setState({
                    order: result,
                    order_id: id,
                    order_status: result.status,
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
                    console.dir("/v1/public/api/orders/" + id)
                    resolve(result.data)
                })
        })
    }

    render() {
        const processStatusClick = (event) => {
            let last_display_status = document.getElementById("status_dropdown_list").style.display
            document.getElementById("status_dropdown_list").style.display = last_display_status === "block" ? "none" : "block"
        }
        const processStatusListClick = (status) => {
            document.getElementById("status_dropdown_list").style.display = "none"
            const requestOptions = {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: 'status',
                    value: status
                })
            }
            new Promise((resolve, _) => {
                fetch('/v1/public/api/orders/' + this.state.order_id, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        resolve(data.data)
                    })
            }).then((resp) => {
                this.setState(({
                        order_status: status
                    }
                ))
            })
        }

        const getStatusSpan = (status) => {
            let title = ""
            switch (status) {
                case "new" :
                    title = "??????????"
                    break;
                case "pending" :
                    title = "?? ????????????????"
                    break;
                case "paid" :
                    title = "??????????????"
                    break;
                case "cancelled" :
                    title = "??????????????"
                    break;
                case "failed" :
                    title = "??????????????????"
                    break;
                case "completed" :
                    title = "??????????????"
                    break;
            }
            let response = (
                <div className={"container"}>
                    <div className="row">
                        <div className={"col-4"}>???????????? :</div>
                        <div className={"col-7"}>
                            <div onClick={processStatusClick}>
                            <span className={"orderStatus " + status}>
                                {title}
                                <img src={"/v1/public/images/dropdown-icon.png"} alt={"dropdown_icon"}/>
                            </span>
                            </div>
                            <div className={"statusList"} id={"status_dropdown_list"}>
                                <ul>
                                    <li onClick={() => processStatusListClick("new")}>??????????</li>
                                    <li onClick={() => processStatusListClick("pending")}>?? ????????????????</li>
                                    <li onClick={() => processStatusListClick("paid")}>??????????????</li>
                                    <li onClick={() => processStatusListClick("cancelled")}>??????????????</li>
                                    <li onClick={() => processStatusListClick("completed")}>??????????????</li>
                                    <li onClick={() => processStatusListClick("failed")}>??????????????????</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
            return response
        }

        return (
            <div className="container placeholder-glow">
                <div id={"orderOverviewHeader"}>
                    <div className="row justify-content-between">
                        <div className="col-2">
                            ?????????? ??? {this.state.isLoaded ? this.state.order.id : <div className="placeholder col-4"/>}
                        </div>
                        <div className="col-3">
                            {!this.state.order_status ?
                                <div className={"placeholder col-4"}/> : getStatusSpan(this.state.order_status)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                ????????????????????
                            </div>
                            <div className="card-body">
                                {this.state.isLoaded ? <CustomerCardBody content={this.state.order.customer}/> :
                                    <div className={"placeholder col-8"}/>}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card addressFormCard">
                            <div className="card-header">
                                ????????????
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
                                ???????????? ????????????
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    {
                                        this.state.isLoaded ? this.state.order.order_lines.map(element => {
                                            return (<li key={element.id} className="list-group-item">
                                                    <OrderLinesCardBody content={element}/>
                                                </li>
                                            )
                                        }) : <div className={"placeholder col-10"}/>
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
