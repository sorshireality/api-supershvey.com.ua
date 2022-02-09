import {Component} from "react";


class AddressCardBody extends Component {
    render() {
        let information = this.props.content
        return (
            <div className="container">
                <div className={"row"}>
                    <div className={"col"}>Город :</div>
                    <div className={"col"}>{information.city}</div>
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        Область/Населенный пункт :
                    </div>
                    <div className={"col"}>
                        {information.district}
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        Улица:
                    </div>
                    <div className={"col"}>
                        {information.street}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Номер дома :
                    </div>
                    <div className="col">
                        {information.house_number}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Номер квартиры :
                    </div>
                    <div className="col">
                        {information.apartment_number}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Индекс :
                    </div>
                    <div className="col">
                        {information.postcode}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Отделение Новой Почты :
                    </div>
                    <div className="col">
                        {information.np_department ?? "-"}
                    </div>
                </div>
                <div className={"row"}>
                    <div className="col">
                        Отделение Укрпочты :
                    </div>
                    <div className="col">
                        {information.ukrp_department ?? "-"}
                    </div>
                </div>
            </div>
        );
    }
}

export default AddressCardBody
