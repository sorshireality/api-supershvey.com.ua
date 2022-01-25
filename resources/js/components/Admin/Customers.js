import React, {Component} from "react";

function Customers() {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [items, setItems] = React.useState([]);



    React.useEffect(() => {
        fetch("/v1/public/api/customers")
            .then(res => res.json())
            .then(
                (result) => {
                    console.dir(result)
                    setIsLoaded(true);
                    setItems(result.data);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (!isLoaded) {
        return (
            <div><img src="/v1/public/images/f56a28796baf1a9043283db85313a3cbfda8fe86.gif" alt=""/></div>
        )
    }
    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Имя</th>
                <th scope="col">Фамилия</th>
                <th scope="col">Номер телефона</th>
                <th scope="col">Почта</th>
                <th scope="col">Адресс оплаты</th>
            </tr>
            </thead>
            <tbody>
            {items.map(item => (
                <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.billing_address_id}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Customers
