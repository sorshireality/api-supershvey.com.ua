import React, {Component} from "react";
import {Link} from "react-router-dom";

class SingleCustomerLine extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const information = this.props.content
        return (

            <tr key={information.id}>

                <th scope="row">
                    <Link to={'/v1/public/admin/customers/' + information.id}>
                        {information.id}
                    </Link>
                </th>
                <td>{information.name}</td>
                <td>{information.lastname}</td>
                <td>{information.phone}</td>
                <td>{information.email}</td>
            </tr>


        )
    }
}

export default SingleCustomerLine
