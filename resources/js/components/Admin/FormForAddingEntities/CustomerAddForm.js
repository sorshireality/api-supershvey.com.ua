import React, {Component} from "react";

class CustomerAddForm extends Component {
    constructor(props) {
        super(props);
    }

    getListForm() {
        function makeOptionCustomer(value) {
            return <option id={value.id} key={value.id} value={value.id}>{value.name + " " + value.lastname}</option>
        }

        return <select onChange={this.props.changingHandler} name={"customer_selected"} className="form-select"
                       aria-label="Default select example">
            {this.props.customer ? this.props.customer.map(item => makeOptionCustomer(item)) :
                <option>Loading...</option>}
        </select>
    }

    getAddForm() {
        return <div className="input-group" id={"fullCustomer"}>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Имя</span>
                <input onChange={this.props.changingHandler} name={"customer_name"} type="text" className="form-control"
                       aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Фамилия</span>
                <input onChange={this.props.changingHandler} name={"customer_lastname"} type="text" className="form-control"
                       aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Телефон</span>
                <input onChange={this.props.changingHandler} name={"customer_phone"} type="text" className="form-control"
                       aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Почта</span>
                <input onChange={this.props.changingHandler} name={"customer_email"} type="text" className="form-control"
                       aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>
        </div>
    }

    render() {
        return (
            this.props.isNewCustomer ? this.getAddForm() : this.getListForm()
        )
    }
}

export default CustomerAddForm;
