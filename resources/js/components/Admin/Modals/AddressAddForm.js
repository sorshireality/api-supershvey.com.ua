import {Component} from "react";


class AddressAddForm extends Component{
    constructor(props) {
        super(props);
    }

    getListForm() {
        function makeOptionAddress(value) {
            return <option id={value.id}
                           key={value.id} value={value.id}>{"Город: " + value.city + ", " + value.district + ", улица: " + value.street + " " + value.house_number}</option>
        }

        return <select onChange={this.props.changingHandler} name={"address_selected"} className="form-select" aria-label="Default select example">
            <option>test</option>
            {this.props.address ? this.props.address.map(item => makeOptionAddress(item)) : <option>Loading...</option>}
        </select>
    }

    getAddForm() {
        return <div className="input-group" id={"fullCustomer"}>
            <input onChange={this.props.changingHandler} name={"address_city"} className={"input-group-text"} type={"text"} placeholder={"Город"}/>
            <input onChange={this.props.changingHandler} name={"address_district"} className={"input-group-text"} type={"text"} placeholder={"Область"}/>
            <input onChange={this.props.changingHandler} name={"address_postcode"} className={"input-group-text"} type={"text"} placeholder={"Индекс"}/>
            <input onChange={this.props.changingHandler} name={"address_street"} className={"input-group-text"} type={"text"} placeholder={"Улица"}/>
            <input onChange={this.props.changingHandler} name={"address_house_number"} className={"input-group-text"} type={"text"} placeholder={"Номер дома"}/>
            <input onChange={this.props.changingHandler} name={"address_apartment_number"} className={"input-group-text"} type={"text"} placeholder={"Номер квартиры"}/>
            <input onChange={this.props.changingHandler} name={"address_np_department"} className={"input-group-text"} type={"text"} placeholder={"Новая Почта"}/>
            <input onChange={this.props.changingHandler} name={"address_ukrp_department"} className={"input-group-text"} type={"text"} placeholder={"Укрпочта"}/>
        </div>
    }

    render() {
        return (
            this.props.isNewAddress ? this.getAddForm() : this.getListForm()
        )
    }
}

export default AddressAddForm
