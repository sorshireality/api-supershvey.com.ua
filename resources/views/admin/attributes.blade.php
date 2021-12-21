<div class="entity_table_view ">

    <div id="crud-message" class="slide"></div>

    <table>
        <thead>
        <tr>
            <th><label for="id">Номер продукта</label></th>
            <th>Цвет</th>
            <th>Цена</th>
            <th>Фото</th>
            <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        @foreach($attributes as $attribute)
            <tr>
                <td>{{$attribute->product_id}}</td>
                <td>{{$attribute->color}}</td>
                <td>{{$attribute->price}}</td>
                <td>{{$attribute->image}}</td>
                <td>
                    <button class="delete-btn" onclick="removeSingleEntity('attributes',{{$attribute->product_id}})">x
                    </button>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
    <table id="add-attribute" class="table_add_form">
        <tr class="add-form">
            <form action="attributes" method="POST" id="attributes_form">
            @csrf <!-- {{ csrf_field() }} -->
                @if(count((array)$products) < 1)
                    <td colspan="5">
                        Нету продуктов без аттрибутов, удалите аттрибут у продукта что бы добавить новый
                    </td>
                @else
                    <td>

                        <select name="product_number" id="product_number" form="attributes_form">
                            @foreach($products as $product)
                                <option value="{{$product->id}}">
                                    {{$product->id}} - {{$product->name}}
                                </option>
                            @endforeach
                        </select>

                    </td>
                    <td>
                        <input type="text" placeholder="Виолент" id="color" name="color">
                    </td>
                    <td>
                        <input type="text" placeholder="666" id="price" name="price">
                    </td>
                    <td>
                        <input type="text" placeholder="в разработке" id="photo" name="photo">
                    </td>
                    <td>
                        <input type="submit" class="create-btn" value="Add">
                    </td>
                @endif
            </form>
        </tr>
    </table>
</div>
