import {Component} from "react";


class OrderProductLineForm extends Component {
    state = {
        is_removed: false,
        product_id: false
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    addProductLine() {
        return <div id={"order_line_" + this.props.id}
                    className="input-group mb-3">

            {this.addProductList()}


            <input className={"input-group-text"} type={"text"} name={"product_quantity"}
                   placeholder={"Количество"} onChange={this.handleChange}/>
            <div className={"input-group-text removeProduct"} onClick={this.handleClick}>X</div>

        </div>
    }

    handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({[name]: value});
    }

    handleClick = () => {
        this.setState({
            is_removed: true
        })
    }

    makeOptionProduct(value) {
        return <option id={value.id} key={value.id} value={value.id}>{value.name}</option>
    }

    addProductList() {
        return <select onChange={this.handleChange} name={'product_id'} className="form-select"
                       aria-label="Default select example">
            {this.props.products ? this.props.products.map(item => this.makeOptionProduct(item)) :
                <option>Loading...</option>}
        </select>
    }

    render() {
        return (
            this.state.is_removed ? "" : (this.props.products ? this.addProductLine() : "Loading ...")
        )
    }

}

export default OrderProductLineForm
