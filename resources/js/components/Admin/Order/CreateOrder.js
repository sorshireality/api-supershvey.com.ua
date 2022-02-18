import React, {Component} from "react";
import CustomerAddForm from "../FormForAddingEntities/CustomerAddForm";
import AddressAddForm from "../FormForAddingEntities/AddressAddForm";
import OrderProductLineForm from "../FormForAddingEntities/OrderProductLineForm";

class CreateOrder extends Component {
    state = {
        customer: false,
        address: false,
        products: false,
        isNewCustomer: true,
        isNewAddress: true,
        order_lines: false,
        order_lines_pointer: 0
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.order_lines_handler = new Map();
    }

    handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({[name]: value});
    }

    updateProgress(name) {
        document.getElementById(name).src = "/v1/public/images/" + name + "_completed.png"
    }

    handleSubmit(event) {
        document.getElementById("progress_bar").focus()
        let address_id
        let customer_id
        event.preventDefault();
        this.updateProgress('creating_address')
        new Promise((resolve, _) => {
            if (this.state.isNewAddress) {
                const requestAddressOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        city: this.state.address_city,
                        district: this.state.address_district,
                        postcode: this.state.address_postcode,
                        street: this.state.address_street,
                        house_number: this.state.address_house_number,
                        apartment_number: this.state.address_apartment_number ?? "",
                        np_department: this.state.address_np_department ?? "",
                        ukrp_department: this.state.address_ukrp_department ?? "",
                    })
                };
                fetch('/v1/public/api/addresses', requestAddressOptions)
                    .then(response => response.json())
                    .then(data => {
                        resolve(data.data.id)
                    });
            } else {
                let head_address_id = this.state.address[0].id
                resolve(this.state.address_selected ? this.state.address_selected : head_address_id)
            }
        }).then(response => {
            this.updateProgress('creating_customer')
            address_id = response
            new Promise((resolve, _) => {
                if (this.state.isNewCustomer) {
                    const requestCustomerOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            name: this.state.customer_name,
                            lastname: this.state.customer_lastname,
                            phone: this.state.customer_phone,
                            email: this.state.customer_email,
                            billing_address_id: address_id
                        })
                    };
                    fetch('/v1/public/api/customers', requestCustomerOptions)
                        .then(response => response.json())
                        .then(data => {
                            resolve(data.data.id)
                        });
                } else {
                    let head_customer_id = this.state.customer[0].id
                    resolve(this.state.customer_selected ? this.state.customer_selected : head_customer_id)
                }
            }).then((response) => {
                this.updateProgress('creating_order')
                customer_id = response
                new Promise((resolve, reject) => {
                    const requestOrderOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            customer_id: customer_id,
                            shipping_address_id: address_id
                        })
                    };
                    fetch('/v1/public/api/orders', requestOrderOptions)
                        .then(response => response.json())
                        .then(data => {
                            resolve(data.data)
                        });

                }).then((response) => {
                    this.updateProgress('creating_order_lines')
                    let order_id = response.id
                    let promises = []
                    let count_request = 0
                    for (const key of this.order_lines_handler.keys()) {
                        let handler = this.order_lines_handler.get(key).current
                        if (handler.state.is_removed) {
                            continue
                        }
                        promises.push(new Promise((resolve, _) => {
                            let head_product_id = handler.props.products[0].id
                            let requestOrderLinesOptions = {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    product_id: (handler.state.product_id ? handler.state.product_id : head_product_id),
                                    order_id: order_id,
                                    quantity: handler.state.product_quantity
                                })
                            };
                            fetch('/v1/public/api/order-lines', requestOrderLinesOptions)
                                .then(response => response.json())
                                .then(data => {
                                    resolve(data)
                                });
                        }))
                    }
                    Promise.all(promises).then((response) => {
                        window.location = "/v1/public/admin/orders/" + order_id
                    })
                })
            })
        })
    }

    componentDidMount() {
        this.getCustomers("").then((result) => {
            this.setState({
                'customer': result
            })
        })
        this.getAddress("").then((result) => {
            this.setState({
                'address': result
            })
        })
        this.getProducts("").then((result) => {
            this.setState({
                'products': result
            })
        })
    }

    async getAddress(id) {
        let address

        function setAddress(it) {
            address = it
        }

        await fetch("/v1/public/api/addresses/" + id)
            .then(res => res.json())
            .then((response) => {
                setAddress(response.data)
            })

        return address
    }

    async getCustomers(id) {
        let customer

        function setCustomer(it) {
            customer = it
        }

        await fetch("/v1/public/api/customers/" + id)
            .then(res => res.json())
            .then((response) => {
                setCustomer(response.data)
            })

        return customer
    }

    async getProducts(id) {
        let products

        function setProducts(it) {
            products = it
        }

        await fetch("/v1/public/api/products" + id)
            .then(res => res.json())
            .then((response) => {
                setProducts(response.data)
            })

        return products
    }

    toggleCustomerForm = () => {
        this.setState({
            isNewCustomer: !this.state.isNewCustomer
        })
    }

    toggleAddressForm = () => {
        this.setState({
            isNewAddress: !this.state.isNewAddress
        })
    }


    addProductLine = () => {
        let id = this.state.order_lines_pointer

        if (!this.state.order_lines) {
            let order_lines_map = new Map();
            this.order_lines_handler.set(id, React.createRef());
            order_lines_map.set(id, <OrderProductLineForm key={id} ref={this.order_lines_handler.get(id)} id={id}
                                                          products={this.state.products}/>)
            return this.setState({
                order_lines_pointer: ++id,
                order_lines: order_lines_map
            })

        }
        this.order_lines_handler.set(id, React.createRef());

        let lines = this.state.order_lines
        lines.set(id, <OrderProductLineForm key={id} ref={this.order_lines_handler.get(id)} id={id}
                                            products={this.state.products}/>)

        this.setState({
            order_lines: lines,
            order_lines_pointer: ++id
        })
    }

    printOrderLines = () => {
        let result = []
        for (const key of this.state.order_lines.keys()) {
            result.push(this.state.order_lines.get(key))
        }
        return result
    }


    render() {
        return (
            <div className={"container"}>
                <div className={"row"} id={"progress_bar"} style={{"textAlign": "center"}}>
                    <div className="col">
                        <img src="/v1/public/images/creating_customer_todo.png" alt="" id={"creating_customer"}/>
                    </div>
                    <div className="col">
                        <img src="/v1/public/images/creating_address_todo.png" alt="" id={"creating_address"}/>
                    </div>
                    <div className="col">
                        <img src="/v1/public/images/creating_order_todo.png" alt="" id={"creating_order"}/>
                    </div>
                    <div className="col">
                        <img src="/v1/public/images/creating_order_lines_todo.png" alt="" id={"creating_order_lines"}/>
                    </div>
                </div>
                <form id={"create_modal_form"} name={"create_modal_form"} onSubmit={this.handleSubmit}>
                    <div className={"container"}>
                        <div className="row">
                            <div className="col">
                                <h4 align={"center"}>Покупатель</h4>
                                <div>
                                    Уже сущетсвующий ? <input onChange={this.toggleCustomerForm} type="checkbox"/>
                                </div>
                                <CustomerAddForm changingHandler={this.handleChange}
                                                 isNewCustomer={this.state.isNewCustomer}
                                                 customer={this.state.customer}/>
                            </div>
                            <div className="col">
                                <h4 align={"center"}>Адресс доставки</h4>
                                <div>
                                    Уже сущетсвующий ? <input onChange={this.toggleAddressForm} type="checkbox"/>
                                </div>
                                <AddressAddForm changingHandler={this.handleChange} isNewAddress={this.state.isNewAddress}
                                                address={this.state.address}/>
                            </div>
                        </div>

                    </div>
                    <hr/>
                    <div>
                        <h4 align={"center"}>Продукты</h4>
                        <div id={"order_lines"}>
                            {

                                this.state.order_lines ?
                                    <React.Fragment>{this.printOrderLines()}</React.Fragment> : 'Loading'
                            }
                        </div>
                        <div>
                            {this.state.products ?
                                <a className={"btn btn-primary"}
                                   onClick={this.addProductLine}>Добавить ещё одну линию продуктов</a> : "Loading ..."}
                        </div>
                    </div>
                    <input form={"create_modal_form"} type={"submit"} className={"col align-self-end btn btn-primary"}
                           value={"Отправить"}/>
                </form>
            </div>
        )
    }
}

export default CreateOrder
