<div class="entity_table_view ">

    <div id="crud-message" class="slide"></div>

    <table>
        <thead>
        <tr>
            <th><label for="id">Номер</label></th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Телефон</th>
            <th>Почта</th>
            <th>Адресс оплаты</th>
            <th>Дата добавления</th>
            <th>Дата последнего изминения</th>
            <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        @foreach($customers as $customer)
            <tr>
                <td>{{$customer->id}}</td>
                <td>{{$customer->name}}</td>
                <td>{{$customer->lastname}}</td>
                <td>{{$customer->phone}}</td>
                <td>{{$customer->email}}</td>
                <td>{{$customer->billing_address_id}}</td>
                <td>{{$customer->created_at}}</td>
                <td>{{$customer->updated_at}}</td>
                <td>
                    <button class="delete-btn" onclick="removeSingleEntity('customers',{{$customer->id}})">x</button>
                </td>
            </tr>
        @endforeach
        <tr class="add-form">
            <td></td>
            <form action="customers" method="POST" id="customer_form">
            @csrf <!-- {{ csrf_field() }} -->
                <td>
                    <input type="text" placeholder="Имя"  id="name" name="name">
                </td>
                <td>
                    <input type="text" placeholder="Фамилия" id="lastname" name="lastname">
                <td>
                    <input type="text" placeholder="Номер" id="phone" name="phone">
                </td>
                <td>
                    <input type="text" placeholder="Почта" id="email" name="email">
                </td>
                <td>
                    <select form="customer_form" id="billing_address_id" name="billing_address_id">
                        @foreach($billing_addresses as $address)
                            <option value="{{$address->id}}">{{$address->district}} - {{$address->street}}
                                - {{$address->house_number}}</option>
                        @endforeach
                    </select>
                </td>
                <td></td>
                <td></td>
                <td>
                    <input type="submit" class="create-btn" value="Добавить"/>
                </td>
            </form>
        </tr>
        </tbody>
    </table>
</div>
