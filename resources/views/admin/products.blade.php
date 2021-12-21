<div class="entity_table_view ">

    <div id="crud-message" class="slide"></div>

    <table>
        <thead>
        <tr>
            <th><label for="id">Номер</label></th>
            <th>Название</th>
            <th>Описание</th>
            <th>Количество</th>
            <th>Категория</th>
            <th>Дата добавления</th>
            <th>Дата последнего изминения</th>
            <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        @foreach($products as $product)
            <tr>
                <td>{{$product->id}}</td>
                <td>{{$product->name}}</td>
                <td>{{$product->description}}</td>
                <td>{{$product->quantity}}</td>
                <td>{{$product->title}}</td>
                <td>{{$product->created_at}}</td>
                <td>{{$product->updated_at}}</td>
                <td>
                    <button class="delete-btn" onclick="removeSingleEntity('products',{{$product->id}})">x</button>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>

    <table id="add-product" class="table_add_form">
        <tr class="add-form">
            <form action="products" method="POST" id="product_form">
            @csrf <!-- {{ csrf_field() }} -->
                <td colspan="8">
                    <table>
                        <tr>
                            <td colspan="5">Общая информация</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" placeholder="Шапка" id="title" name="title">
                                Название
                            </td>
                            <td>
                                <input type="text" placeholder="Шапка с рожками" id="desc" name="desc">
                                Описание
                            </td>
                            <td>
                                <input type="text" placeholder="900" id="quantity" name="quantity">
                                Количество
                            </td>
                            <td>
                                <select form="product_form" name="category_id">
                                    @foreach($categories_list as $category)
                                        <option value="{{$category->id}}">{{$category->title}}</option>
                                    @endforeach
                                </select>
                                Категория
                            </td>
                            <td>
                                <input type="submit" class="create-btn" value="Add">
                            </td>
                        </tr>

                        <tr>
                            <td colspan="5">Атрибуты продукта</td>
                        </tr>

                        <tr class="add-form">
                            <td>

                                <input type="text" placeholder="Виолент" id="color" name="color">
                                Цвет
                            </td>
                            <td>
                                <input type="text" placeholder="666" id="price" name="price">
                                Цена
                            </td>
                            <td>
                                <input type="text" placeholder="в разработке" id="photo" name="photo">
                                Фото
                            </td>
                        </tr>

                        <tr>
                            <td colspan="5">Состав продукта</td>
                        </tr>

                        <tr>
                            <table id="add-composition">
                                <input type="text" hidden name="composition_number" id="composition_number">

                            </table>
                        </tr>

                    </table>
                </td>
            </form>
        </tr>
    </table>
</div>
