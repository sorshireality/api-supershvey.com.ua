import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import OrdersPage from "./Order/OrdersPage";
import CreateOrder from "./Order/CreateOrder";
import ProductPage from "./Products/ProductPage";
import CustomerPage from "./Customer/CustomerPage";

function Content() {
    return (
        <Routes>

            <Route path="/v1/public/admin/orders/*" element={<OrdersPage/>}/>
            <Route path="/v1/public/admin/orders/create" element={<CreateOrder/>}/>

            <Route path="/v1/public/admin/products" element={<ProductPage/>}/>
            <Route path="/v1/public/admin/customers/*" element={<CustomerPage/>}/>
        </Routes>
    )
}

export default Content
