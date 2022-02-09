import React, {Component} from "react";


class OrderLinesCardBody extends Component {
    render() {
        let information = this.props.content
        return (
            <div className="card">
                <div className="card-header">
                    {information.product.name}
                </div>
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-2">
                                <div className="card" style={{
                                    width: "100px"
                                }}>
                                    <img className={"orderLinesCardImg"} src="/v1/public/images/test_product1.png"
                                         alt=""/>
                                </div>
                            </div>
                            <div className="col" style={{float: "left"}}>
                                <div className="card">
                                    <div className={"container"}>
                                        <div className="row">
                                            <div className="col-3">
                                                Стоимость за 1 единицу :
                                            </div>
                                            <div className="col-1">
                                                {information.product.attributes.price / 100}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-3">
                                                Цвет :
                                            </div>
                                            <div className="col-2">
                                                {information.product.attributes.color}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-3">
                                                Категория :
                                            </div>
                                            <div className="col-2">
                                                {information.product.category.title}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-3">
                                                Количество :
                                            </div>
                                            <div className="col-2">
                                                {information.quantity}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-3">
                                                Состав :
                                            </div>
                                            <div className="col">
                                                Есть шанс что тут будет выпадающий список
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"card-footer"}>
                    <div>Сумма : {(information.quantity * information.product.attributes.price) / 100}</div>
                </div>
            </div>
        );
    }
}

export default OrderLinesCardBody
