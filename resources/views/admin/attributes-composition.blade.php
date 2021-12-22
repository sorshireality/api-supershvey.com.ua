<div class="entity_table_view ">

    <div id="crud-message" class="slide"></div>

    <table>
        <thead>
        <tr>
            <th><label for="id">Товар</label></th>
            <th>Название материала</th>
            <th>Процент</th>
            <th>Создано</th>
            <th>Послед. изм.</th>
            <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        @foreach($attributes_composition as $attribute_composition)
            <tr>
                <td>{{$products->{$attribute_composition->attribute_id}->name}}</td>
                <td>{{$materials->{$attribute_composition->material_id}->material}}</td>
                <td>{{$attribute_composition->percentage}}</td>
                <td>{{(new DateTime($attribute_composition->created_at))->format('Y-m-d [h:i]')}}</td>
                <td>{{(new DateTime($attribute_composition->updated_at))->format('Y-m-d [h:i]')}}</td>
                <td>
                    <button class="delete-btn"
                            onclick="removeSingleEntity('attributes-composition',{{$attribute_composition->id}})">
                        x
                    </button>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
    <table id="add-attribute-composition" class="table_add_form">
        <tr class="add-form">
            <form action="attributes-composition" method="POST" id="compositions_form">
            @csrf <!-- {{ csrf_field() }} -->
                <td>
                    <select name="product_number" id="product_number" form="compositions_form">
                        @foreach($products as $product)
                            <option value="{{$product->id}}">
                                {{$product->id}} - {{$product->name}}
                            </option>
                        @endforeach
                    </select>
                    Товар
                </td>
                <td>
                    <select name="meterial_id" id="meterial_id" form="compositions_form">
                        @foreach($materials as $material)
                            <option value="{{$material->id}}">
                                {{$material->id}} - {{$material->material}}
                            </option>
                        @endforeach
                    </select>
                    Материал
                </td>
                <td>
                    <input type="text" name="percentage" id="percentage" form="compositions_form" style="width: 50px; font-size: 15px">
                    Процент
                </td>
                <td colspan="2"></td>
                <td>
                    <input type="submit" class="create-btn" value="Add">
                </td>
            </form>
        </tr>
    </table>
</div>
