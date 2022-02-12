import {Component} from "react";
import CustomerAddForm from "./CustomerAddForm";
import AddressAddForm from "./AddressAddForm";


class CreateCustomer extends Component {
    state = {
        customer: false,
        isNewAddress: true
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

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getAddress("").then((result) => {
            this.setState({
                'address': result
            })
        })
    }

    handleSubmit = (event) => {
        this.props.updateStatus('Обработка 1/2 [Добавление адресса]')
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
        }).then((r) => {
            new Promise((resolve, _) => {
                this.props.updateStatus('Обработка 2/2 [Добавление покупателя]')
                const requestCustomerOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        name: this.state.customer_name,
                        lastname: this.state.customer_lastname,
                        phone: this.state.customer_phone,
                        email: this.state.customer_email,
                        billing_address_id: r
                    })
                };
                fetch('/v1/public/api/customers', requestCustomerOptions)
                    .then(response => response.json())
                    .then(data => {
                        resolve(data.data.id)
                    });
            }).then((_) => {
                this.props.updateStatus('Успех')
            })
        })
        event.preventDefault();
    }

    handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        console.dir(name)
        this.setState({[name]: value});
    }

    toggleAddressForm = () => {
        this.setState({
            isNewAddress: !this.state.isNewAddress
        })
    }

    render() {

        console.dir(this.state)
        return (
            <form action={"customers/create"} method={"POST"} id={"create_modal_form"} name={"create_modal_form"}
                  onSubmit={this.handleSubmit}>
                <div className={"modalAddEntities"}>
                    <h4 align={"center"}>Покупатель</h4>
                    <CustomerAddForm changingHandler={this.handleChange} isNewCustomer={true}/>
                </div>

                <div className={"modalAddEntities"}>
                    <h4 align={"center"}>Адресс доставки</h4>
                    <div>
                        Уже сущетсвующий ? <input onChange={this.toggleAddressForm} type="checkbox"/>
                    </div>
                    <AddressAddForm changingHandler={this.handleChange} isNewAddress={this.state.isNewAddress}
                                    address={this.state.address}/>
                </div>
            </form>
        );
    }
}

export default CreateCustomer;
