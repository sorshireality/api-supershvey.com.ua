import {Component} from "react";
import ColWithUpdateAction from "./ColWithUpdateAction";

class CustomerCardBody extends Component {

    render() {
        let information = this.props.content
        return (
            <div className={"container custom"}>
                <div className={"row"}>
                    <div className="col">
                        <b>Имя</b> :
                    </div>
                    <ColWithUpdateAction name={'customers.name'} value={information.name} id={information.id}/>
                </div>
                <div className={"row"}>
                    <div className="col">
                        <b>Фамилия</b> :
                    </div>
                    <ColWithUpdateAction name={'customers.lastname'} value={information.lastname} id={information.id}/>
                </div>
                <div className={"row"}>
                    <div className="col">
                        <b>Номер телефона</b> :
                    </div>
                    <ColWithUpdateAction name={'customers.phone'} value={information.phone} id={information.id}/>
                </div>
                <div className={"row"}>
                    <div className="col">
                        <b>Почта</b> :
                    </div>
                    <ColWithUpdateAction name={'customers.email'} value={information.email} id={information.id}/>
                </div>
                <div className={"row"}>
                    <div className="col">
                        <b>Адресс Оплаты</b> : {information.billing_address_id}
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerCardBody
