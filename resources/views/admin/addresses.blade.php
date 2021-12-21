<div class="entity_table_view ">

    <div id="crud-message" class="slide"></div>

    <table>
        <thead>
        <tr>
            <th><label for="id">Номер</label></th>
            <th>Город</th>
            <th>Область</th>
            <th>Индекс</th>
            <th>Улица</th>
            <th>Номер дома</th>
            <th>Номер апартаментов</th>
            <th>Отделение Новой Почты</th>
            <th>Отделение Укрпочты</th>
            <th>Создано</th>
            <th>Послед. изм.</th>
            <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        @foreach($addresses as $address)
            <tr>
                <td>{{$address->id}}</td>
                <td>{{$address->city}}</td>
                <td>{{$address->district}}</td>
                <td>{{$address->postcode}}</td>
                <td>{{$address->street}}</td>
                <td>{{$address->house_number}}</td>
                <td>{{$address->apartment_number}}</td>
                <td>{{$address->np_department}}</td>
                <td>{{$address->ukrp_department}}</td>
                <td>{{$address->created_at}}</td>
                <td>{{$address->updated_at}}</td>
                <td>
                    <button class="delete-btn" onclick="removeSingleEntity('addresses',{{$address->id}})">x</button>
                </td>
            </tr>
        @endforeach
        <tr class="add-form">
            <form action="addresses" method="POST" id="addresses_form">
            @csrf <!-- {{ csrf_field() }} -->
                <td colspan="11">
                    <div>
                        <label for="city">Город : </label><input class="for_data_input" type="text"
                                                                 placeholder="Полтава" id="city" name="city"><br>
                    </div>
                    <div>
                        Населенный пункт : <input class="for_data_input" type="text" placeholder="Супруновка"
                                                  id="district"
                                                  name="district"><br>
                    </div>
                    <div>
                        Улица : <input class="for_data_input" type="text" placeholder="Кузнецкая" id="street"
                                       name="street"><br>
                    </div>
                    <div>
                        № Дома : <input class="for_data_input" type="text" placeholder="30" id="house_number"
                                        name="house_number"><br>
                    </div>
                    <div>
                        № Квартиры : <input class="for_data_input" type="text" placeholder="18" id="apartment_number"
                                        name="apartment_number"><br>
                    </div>
                    <div>
                        Индекс : <input class="for_data_input" type="text" placeholder="1100" id="postcode"
                                        name="postcode"><br>
                    </div>
                    <div>
                        Отделение Новой Почты : <input class="for_data_input" type="text" placeholder="29"
                                                       id="np_department" name="np_department"><br>
                    </div>
                    <div>
                        Отделение Укрпочты : <input class="for_data_input" type="text" placeholder="11019"
                                                    id="ukrp_department" name="ukrp_department"><br>
                    </div>
                </td>
                <td>
                    <input type="submit" class="create-btn" value="Add">
                </td>
            </form>
        </tr>
        </tbody>
    </table>
</div>
