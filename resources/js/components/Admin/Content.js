import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Customers from "./Customers";
import CreateOrder from './Modals/CreateOrder'
import OrdersPage from "./Order/OrdersPage";

function Content() {
    return (
        <Routes>
            <Route path="/v1/public/admin/orders/create" element={<CreateOrder/>}/>
            <Route path="/v1/public/admin/orders" element={<OrdersPage/>}/>
            <Route path="/v1/public/admin/customers" element={<Customers/>}/>
        </Routes>
    )
}

export default Content
