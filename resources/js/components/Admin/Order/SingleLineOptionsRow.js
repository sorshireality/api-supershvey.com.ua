import {Component} from "react";
import {Link} from "react-router-dom";


class SingleLineOptionsRow extends Component {
    render() {
        const removeOrderById = (id) => {
            console.log("Order " + id + " has been removed")
            document.getElementById("order_list_tbody").removeChild(document.getElementById(id + "_options"))
            document.getElementById("order_list_tbody").removeChild(document.getElementById(id + "_line"))

            const requestOptions = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            }
            new Promise((resolve, _) => {
                fetch('/v1/public/api/orders/' + id, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        resolve(data.data)
                    })
            })

        }
        return <tr className={"additionalOptionsForOrderOnList"} id={this.props.id + "_options"}>
            <td onClick={() => {
                removeOrderById(this.props.id)
            }}>Удалить
            </td>

            <td>
                <Link to={'/v1/public/admin/orders/' + this.props.id}>Просмотр </Link>
            </td>

        </tr>;
    }
}

export default SingleLineOptionsRow
