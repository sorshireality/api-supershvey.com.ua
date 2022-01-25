import React, {Component} from "react";

class CustomerAddForm extends Component {
    constructor(props) {
        super(props);
    }

    getListForm() {
        function makeOptionCustomer(value) {
            return <option id={value.id} key={value.id} value={value.id}>{value.name + " " + value.lastname}</option>
        }

        return <select onChange={this.props.changingHandler} name={"customer_selected"} className="form-select" aria-label="Default select example">
            {this.props.customer ? this.props.customer.map(item => makeOptionCustomer(item)) : <option>Loading...</option>}
        </select>
    }

    getAddForm() {
        return <div className="input-group" id={"fullCustomer"}>
            <input onChange={this.props.changingHandler} name={"customer_name"} className={"input-group-text"} type={"text"} placeholder={"Имя"}/>
            <input onChange={this.props.changingHandler} name={"customer_lastname"} className={"input-group-text"} type={"text"} placeholder={"Фамилия"}/>
            <input onChange={this.props.changingHandler} name={"customer_phone"} className={"input-group-text"} type={"text"} placeholder={"Телефон"}/>
            <input onChange={this.props.changingHandler} name={"customer_email"} className={"input-group-text"} type={"text"} placeholder={"Почта"}/>
        </div>
    }

    render() {
        return (
            this.props.isNewCustomer ? this.getAddForm() : this.getListForm()
        )
    }
}

export default CustomerAddForm;
