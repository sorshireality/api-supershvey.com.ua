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
    <table id="add-order" class="table_add_form">
        <tr class="add-form">
            <form action="orders" method="POST" id="order_form">
            @csrf <!-- {{ csrf_field() }} -->
                <td></td>
                <td>
                    <select name="customer" id="customer" form="order_form">
                        @foreach($customers as $customer)
                            <option value="{{$customer->id}}">{{$customer->name}}</option>
                        @endforeach
                    </select>
                </td>
                <td>
                    <select name="address" id="address" form="order_form">
                        @foreach($address as $single_address)
                            <option value="{{$single_address->id}}">{{$single_address->district}}</option>
                        @endforeach
                    </select></td>
                <td></td>
                <td></td>
                <td>
                    <button class="create-btn" onclick="addNewOrder(this)">Add</button>
                </td>
            </form>
        </tr>
    </table>
</div>
