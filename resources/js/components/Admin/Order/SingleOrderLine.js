import React, {Component} from "react";
import {Link} from "react-router-dom";

class SingleOrderLine extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const STATUS_MAP = {
            'new': "Новый"
        }
        const information = this.props.content
        return (
            <tr key={information.id}>
                <th scope="row"> {information.id}
                </th>
                <td>{information.customer.name + " " + information.customer.lastname}</td>
                <td>{"город: " + information.address.city + " " + information.address.district + ", улица: " + information.address.street + " " + information.address.house_number + ", квартира: " + information.address.apartment_number}</td>
                <td style={{float: "left"}}>{information.amount / 100}</td>
                <td>{STATUS_MAP[information.status]}</td>
            </tr>

        )
    }
}

export default SingleOrderLine
