import {Component} from "react";
import ColWithUpdateAction from "./ColWithUpdateAction";


class AddressCardBody extends Component {

    render() {
        let information = this.props.content
        return (
            <div className="container custom">
                <div className={"row"}>
                    <div className={"col"}><b>Город</b> :</div>
                    <ColWithUpdateAction name={'addresses.city'} value={information.city} id={information.id}/>
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        <b>Область/Населенный пункт</b> :
                    </div>
                    <ColWithUpdateAction name={'addresses.district'} value={information.district} id={information.id}/>
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        <b>Улица</b>:
                    </div>
                    <ColWithUpdateAction name={'addresses.street'} value={information.street} id={information.id}/>
                </div>
                <div className={"row"}>
                    <div className="col">
                        <b>Номер дома</b> :
                    </div>
                    <ColWithUpdateAction name={'addresses.house_number'} value={information.house_number}
                                         id={information.id}/>
                </div>
                <div className={"row"}>
                    <div className="col">
                        <b>Номер квартиры</b> :
                    </div>
                    <ColWithUpdateAction name={'addresses.apartment_number'} value={information.apartment_number}
                                         id={information.id}/>
                </div>
                <div className={"row"}>
                    <div className="col">
                        <b>Индекс</b> :
                    </div>
                    <ColWithUpdateAction name={'addresses.postcode'} value={information.postcode} id={information.id}/>
                </div>
                <div className={"row"}>
                    <div className="col">
                        <b>Отделение Новой Почты</b> :
                    </div>
                    <ColWithUpdateAction name={'addresses.np_department'} value={information.np_department ?? "-"}
                                         id={information.id}/>
                </div>
                <div className={"row"}>
                    <div className="col">
                        <b>Отделение Укрпочты</b> :
                    </div>
                    <ColWithUpdateAction name={'addresses.ukrp_department'} value={information.ukrp_department ?? "-"}
                                         id={information.id}/>
                </div>
            </div>
        );
    }
}

export default AddressCardBody
