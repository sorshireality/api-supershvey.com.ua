import React, {Component} from "react";
import {Link} from "react-router-dom";
import SingleLineOptionsRow from "./SingleLineOptionsRow";

class SingleOrderLine extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const processClickOnLine = () => {
            let options = document.getElementById(this.props.content.id + "_options")
            let last_display_value = options.style.display
            if (last_display_value === "block") {
                options.style.display = "none"
                options.style.top = options.value
            } else {
                options.style.display = "block"
                let last_top_value = options.offsetTop
                options.style.top = last_top_value - 30
                options.value = last_top_value
            }
        }

        const getStatus = (status) => {
            let title
            switch (status) {
                case "new" :
                    title = "Новый"
                    break;
                case "pending" :
                    title = "В процессе"
                    break;
                case "paid" :
                    title = "Оплачен"
                    break;
                case "cancelled" :
                    title = "Отменен"
                    break;
                case "failed" :
                    title = "Ошибочный"
                    break;
                case "completed" :
                    title = "Успешен"
                    break;
            }
            return title
        }

        const information = this.props.content
        return (
            <>
                <SingleLineOptionsRow id={information.id}/>

                <tr id={information.id + "_line"} onClick={processClickOnLine} key={information.id}
                    className={"OrderLineFromList"}>

                    <th scope="row">
                        {information.id}

                    </th>
                    <td>{information.customer.name + " " + information.customer.lastname}</td>
                    <td>{"город: " + information.address.city + " " + information.address.district + ", улица: " + information.address.street + " " + information.address.house_number + ", квартира: " + information.address.apartment_number}</td>
                    <td style={{float: "left"}}>{information.amount / 100}</td>
                    <td>{getStatus(information.status)}</td>
                </tr>
            </>
        )
    }
}

export default SingleOrderLine
