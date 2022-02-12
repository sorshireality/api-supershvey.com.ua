import {Component} from "react";
import Loader from "./Loader";
import ReactDOM from "react-dom";

class CustomerCardBody extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let cols = document.getElementsByClassName('customer_fields')
        let cols_array = Array.from(cols)
        cols_array.forEach((col) => {
            col.addEventListener("click", function (e) {
                let count = e.detail
                if (count === 2 && e.target.textContent !== "" && !col.classList.contains('busy')) {
                    let new_input = document.createElement('input')
                    new_input.type = 'text'
                    new_input.value = e.target.textContent
                    const element = (
                        <>
                        </>
                    )
                    ReactDOM.render(element, col)
                    col.appendChild(new_input)
                    new_input.focus()
                }
            })
            const process_field_update = (e) => {
                col.classList.add('busy')
                const updateField = (field_name, $field_value) => {
                    const requestOptions = {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            name: field_name,
                            value: $field_value.trim()
                        })
                    }
                    new Promise((resolve, _) => {
                        fetch('/v1/public/api/customers/' + this.props.content.id, requestOptions)
                            .then(response => response.json())
                            .then(data => {
                                resolve(data.data)
                            });
                    }).then((r) => {
                            let col = document.getElementById(
                                'customer.' + JSON.parse(requestOptions.body).name
                            )
                            let last_word = col.textContent
                            const element = (
                                <>
                                    {col.textContent}<Loader loading={false}/>
                                </>
                            )
                            ReactDOM.render(element, col)
                            setTimeout(function () {
                                const element = (
                                    <>
                                        {last_word}
                                    </>
                                )
                                ReactDOM.render(element, col)
                                col.classList.remove('busy')
                            }, 500)
                        }
                    )
                }
                updateField(col.id.split('customer.')[1], e.target.value)
                const element = (
                    <>
                        {e.target.value}<Loader loading={true}/>
                    </>
                )
                ReactDOM.render(element, col)
            }
            col.addEventListener("focusout", process_field_update.bind(this))
            col.addEventListener("keyup", function (event) {
                if (event.keyCode === 13) {
                    event.preventDefault()
                    process_field_update(event).bind(this)
                }
            })
        })
    }

    render() {
        let information = this.props.content
        return (
            <div className={"container custom"}>
                <div className={"row"}>
                    <div className="col">
                        Имя :
                    </div>
                    <div className="col customer_fields" id={"customer.name"}>
                        {information.name}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Фамилия :
                    </div>
                    <div className="col customer_fields" id={"customer.lastname"}>
                        {information.lastname}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Номер телефона :
                    </div>
                    <div className="col customer_fields" id={"customer.phone"}>
                        {information.phone}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Почта :
                    </div>
                    <div className="col customer_fields" id={"customer.email"}>
                        {information.email}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Адресс Оплаты : {information.billing_address_id}
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerCardBody
