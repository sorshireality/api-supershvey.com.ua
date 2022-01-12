<div class="entity_table_view ">
    <table>
        <thead>
        <tr>
            <th><label for="id">Номер</label></th>
            <th>Покупатели</th>
            <th>Адреса</th>
            <th>Дата добавления</th>
            <th>Дата последнего изминения</th>
            <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        @foreach($orders as $order)
            <tr>
                <td>{{$order->id}}</td>
                <td>{{$order->customer_id}}</td>
                <td>{{$order->shipping_address_id}}</td>
                <td>{{$order->created_at}}</td>
                <td>{{$order->updated_at}}</td>
                <td>
                    <button class="delete-btn" onclick="removeOrder({{$order->id}})">x</button>
                </td>
            </tr>
        @endforeach

        </tbody>
    </table>
    <div id="add-order" class="table_add_form">
        <div class="add-form">
            <form action="orders" method="POST" id="order_form">
            @csrf <!-- {{ csrf_field() }} -->
                Строки заказа :
                <br>
                <div class="order_line_embedded">
                    Выберите продукт : <select>

                    </select>
                    Укажите количество : <input type="text">
                </div>

                <div id="order_lines_embedded_to_order"></div>

                Покупатель : <select name="customer" id="customer" form="order_form"
                                     onchange="handleAddNewOrdersCustomerChanging(event)">
                    @foreach($customers as $customer)
                        <option value="{{$customer->id}}">{{$customer->name}}</option>
                    @endforeach
                    <option value="">Не добавлять нового</option>
                    <option id="add_new_customer" value="add_new_customer">Добавить нового</option>
                </select>

                <div id="customer_embedded_to_order"></div>

                Адресс доставки : <select name="address" id="address" form="order_form"
                                          onchange="handleAddNewOrdersDeliveryAddressChanging(event)">
                    @foreach($address as $single_address)
                        <option value="{{$single_address->id}}">{{$single_address->district}}</option>
                    @endforeach
                    <option value="">Не добавлять новый адресс</option>
                    <option id="add_new_delivery_address" value="add_new_delivery_address">Добавить новый</option>
                </select>

                <div id="address_embedded_to_order"></div>

                <button class="create-btn" onclick="addNewOrder(this)">Add</button>
            </form>
        </div>
    </div>
</div>
