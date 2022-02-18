import {Component} from "react";


class AddressAddForm extends Component {
    constructor(props) {
        super(props);
    }

    getListForm() {
        function makeOptionAddress(value) {
            return <option id={value.id}
                           key={value.id}
                           value={value.id}>{"Город: " + value.city + ", " + value.district + ", улица: " + value.street + " " + value.house_number}</option>
        }

        return <select onChange={this.props.changingHandler} name={"address_selected"} className="form-select"
                       aria-label="Default select example">
            <option>test</option>
            {this.props.address ? this.props.address.map(item => makeOptionAddress(item)) : <option>Loading...</option>}
        </select>
    }

    getAddForm() {
        return <div className="input-group" id={"addressForm"}>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Город</span>
                <input onChange={this.props.changingHandler} name={"address_city"} type="text" className="form-control"
                       aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>

            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Область/село</span>
                <input onChange={this.props.changingHandler} name={"address_district"} type="text"
                       className="form-control"
                       aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>

            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Индекс</span>
                <input onChange={this.props.changingHandler} name={"address_postcode"} type="text"
                       className="form-control"
                       aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>

            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Улица</span>
                <input onChange={this.props.changingHandler} name={"address_street"} type="text"
                       className="form-control"
                       aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>

            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Номер дома</span>
                <input onChange={this.props.changingHandler} name={"address_house_number"} type="text"
                       className="form-control"
                       aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>

            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Номер квартиры</span>
                <input onChange={this.props.changingHandler} name={"address_apartment_number"} type="text"
                       className="form-control"
                       aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>

            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Новая Почта, №</span>
                <input onChange={this.props.changingHandler} name={"address_np_department"} type="text"
                       className="form-control"
                       aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>

            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Укр Почта, №</span>
                <input onChange={this.props.changingHandler} name={"address_ukrp_department"} type="text"
                       className="form-control"
                       aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>
        </div>
    }

    render() {
        return (
            this.props.isNewAddress ? this.getAddForm() : this.getListForm()
        )
    }
}

export default AddressAddForm
