import {Component} from "react";

class CustomerCardBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let information = this.props.content
        return (
            <div className="{container}">
                <div className={"row"}>
                    <div className="col">
                        Имя :
                    </div>
                    <div className="col">
                        {information.name}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Фамилия :
                    </div>
                    <div className="col">
                        {information.lastname}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Номер телефона :
                    </div>
                    <div className="col">
                        {information.phone}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Почта :
                    </div>
                    <div className="col">
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
