import {Component} from "react";
import ReactDOM from "react-dom";
import Loader from "./Loader";


class AddressCardBody extends Component {
    componentDidMount() {
        let cols = document.getElementsByClassName('address_fields')
        let cols_array = Array.from(cols)
        cols_array.forEach((col) => {
            col.addEventListener("click", function (e) {
                let count = e.detail
                if (count === 2 && e.target.textContent !== "") {
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
                        fetch('/v1/public/api/addresses/' + this.props.content.id, requestOptions)
                            .then(response => response.json())
                            .then(data => {
                                resolve(data.data)
                            });
                    }).then((r) => {
                            let col = document.getElementById(
                                'address.' + JSON.parse(requestOptions.body).name
                            )
                            let last_word = col.textContent
                            const element = (
                                <>
                                    {col.textContent}
                                    <Loader loading={false}/>
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
                            }, 2000)
                        }
                    )
                }
                updateField(col.id.split('address.')[1], e.target.value)
                const element = (
                    <>
                        {e.target.value} <Loader loading={true}/>
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
            <div className="container">
                <div className={"row"}>
                    <div className={"col"}>Город :</div>
                    <div className={"col address_fields"} id={"address.city"}>
                        {information.city}
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        Область/Населенный пункт :
                    </div>
                    <div className={"col address_fields"} id={"address.district"}>
                        {information.district}
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        Улица:
                    </div>
                    <div className={"col address_fields"} id={"address.street"}>
                        {information.street}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Номер дома :
                    </div>
                    <div className={"col address_fields"} id={"address.number"}>
                        {information.house_number}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Номер квартиры :
                    </div>
                    <div className={"col address_fields"} id={"address.apartment_number"}>
                        {information.apartment_number}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Индекс :
                    </div>
                    <div className={"col address_fields"} id={"address.postcode"}>
                        {information.postcode}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Отделение Новой Почты :
                    </div>
                    <div className={"col address_fields"} id={"address.np_department"}>
                        {information.np_department ?? "-"}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Отделение Укрпочты :
                    </div>
                    <div className={"col address_fields"} id={"address.ukrp_department"} >
                        {information.ukrp_department ?? "-"}
                    </div>
                </div>
            </div>
        );
    }
}

export default AddressCardBody
