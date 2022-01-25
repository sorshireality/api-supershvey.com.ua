import React, {Component} from "react";
import Order from "./Order";


class OrderList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const order_list = []
        this.props.orders.data.map(item => (
            order_list.push(<Order id={item.id}/>)
        ))
        return (
            <React.Fragment>
                {order_list}
            </React.Fragment>
        )

    }
}

export default OrderList
