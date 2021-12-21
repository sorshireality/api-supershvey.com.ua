<div class="entity_table_view ">

    <div id="crud-message" class="slide"></div>

    <table>
        <thead>
        <tr>
            <th><label for="id">Номер</label></th>
            <th>Название</th>
            <th>Создано</th>
            <th>Послед. изм.</th>
            <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        @foreach($compositions as $composition)
            <tr>
                <td>{{$composition->id}}</td>
                <td>{{$composition->material}}</td>
                <td>{{$composition->created_at}}</td>
                <td>{{$composition->updated_at}}</td>
                <td>
                    <button class="delete-btn" onclick="removeSingleEntity('compositions',{{$composition->id}})">x</button>
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
