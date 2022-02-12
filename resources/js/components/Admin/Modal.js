import React, {Component} from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import CreateOrder from "./Modals/CreateOrder";
import CreateCustomer from "./Modals/CreateCustomer";

class Modal extends Component {
    state = {
        process_status: "Ожидание запроса"
    }

    constructor(props) {
        super(props);
    }

    updateProcessStatus = (new_status) => {
        this.setState({
            process_status: new_status
        })
    }

    render() {
        return (
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static"
                 data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">
                                <Routes>
                                    <Route path="/v1/public/admin/orders" element={"Добавить заказ"}/>
                                    <Route path="/v1/public/admin/customers" element={"Добавить покупателя"}/>
                                </Routes>
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div style={{"textAlign": "center"}}>
                            {this.state.process_status}
                        </div>
                        <div className="modal-body" id={"modal_root"}>
                            <Routes>
                                <Route path="/v1/public/admin/orders"
                                       element={<CreateOrder updateStatus={this.updateProcessStatus}/>}/>
                                <Route path="/v1/public/admin/customers"
                                       element={<CreateCustomer updateStatus={this.updateProcessStatus}/>}/>
                            </Routes>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-primary" type={"submit"} form={"create_modal_form"}>
                                <Routes>
                                    <Route path="/v1/public/admin/orders" element={"Сохранить"}/>
                                    <Route path="/v1/public/admin/customers" element={"Сохранить"}/>
                                </Routes>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default Modal
