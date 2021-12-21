<div class="entity_table_view ">

    <div id="crud-message" class="slide"></div>

    <table>
        <thead>
        <tr>
            <th><label for="id">Номер</label></th>
            <th>Название</th>
            <th>Дата добавления</th>
            <th>Дата последнего изминения</th>
            <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        @foreach($categories as $categories)
            <tr>
                <td>{{$categories->id}}</td>
                <td>{{$categories->title}}</td>
                <td>{{$categories->created_at}}</td>
                <td>{{$categories->updated_at}}</td>
                <td>
                    <button class="delete-btn" onclick="removeSingleEntity('categories',{{$categories->id}})">x</button>
                </td>
            </tr>
        @endforeach
        <tr class="add-form">
            <td></td>
            <form action="categories" method="POST" id="categories_form">
            @csrf <!-- {{ csrf_field() }} -->
                <td>
                    <input type="text" placeholder="Название" id="title" name="title">
                </td>
                <td></td>
                <td></td>
                <td>
                    <input type="submit" class="create-btn" value="Add">
                </td>
            </form>
        </tr>
        </tbody>
    </table>
</div>
