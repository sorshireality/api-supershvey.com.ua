<div class="entity_table_view ">

    <div id="crud-message" class="slide"></div>

    <table>
        <thead>
        <tr>
            <th><label for="id">Номер продукта</label></th>
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
                <td>{{$attribute_composition->attribute_id}}</td>
                <td>{{$attribute_composition->material_id}}</td>
                <td>{{$attribute_composition->percentage}}</td>
                <td>{{$attribute_composition->created_at}}</td>
                <td>{{$attribute_composition->updated_at}}</td>
                <td>
                    <button class="delete-btn" onclick="removeSingleEntity('$attributes-composition',{{$attribute_composition->attribute_id                                  }})">x</button>
                </td>
            </tr>
        @endforeach
        <tr class="add-form">
            <form action="compositions" method="POST" id="compositions_form">
            @csrf <!-- {{ csrf_field() }} -->
                <td colspan="4">
                    <label for="material">Название : </label><input type="text" id="material" name="material" placeholder="Пух">
                </td>
                <td>
                    <input type="submit" class="create-btn" value="Add">
                </td>
            </form>
        </tr>
        </tbody>
    </table>
</div>
