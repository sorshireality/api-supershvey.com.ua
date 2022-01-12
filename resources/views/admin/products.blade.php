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
                <td>{{(new DateTime($product->created_at))->format('Y-m-d [h:i]')}}</td>
                <td>{{(new DateTime($product->updated_at))->format('Y-m-d [h:i]')}}</td>
                <td>
                    <button class="delete-btn" onclick="removeSingleEntity('products',{{$product->id}})">x</button>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>

    <div id="add-product" class="table_add_form">
        <div class="add-form">
            <form action="products" method="POST" id="product_form">
            @csrf <!-- {{ csrf_field() }} -->


                <div>
                    <h4>Общая информация</h4>
                    <div>
                        <label for="title">Название</label><input style="width: 250px" type="text" placeholder="Шапка"
                                                                  id="title" name="title"><br>
                    </div>

                    <div style="display: flex">
                        <label style="margin-right: 10px" for="desc">Описание</label>
                        <textarea form="product_form" style="resize: none" placeholder="Шапка с рожками" id="desc"
                                  rows="10" cols="50"
                                  name="desc"></textarea>
                    </div>

                    <div>
                        <label for="quantity">Количество</label>
                        <input type="text" placeholder="900" id="quantity" name="quantity">

                        <label for="category_id">Категория</label>
                        <select form="product_form" name="category_id">
                            @foreach($categories_list as $category)
                                <option value="{{$category->id}}">{{$category->title}}</option>
                            @endforeach
                        </select>

                    </div>

                    <input type="submit" class="create-btn" value="Add">
                </div>
                <div>
                    <h4>Атрибуты продукта</h4>

                    <div class="add-form">
                        <label for="color">Цвет</label>
                        <input type="text" placeholder="Виолент" id="color" name="color">

                        <label for="price">Цена</label>
                        <input type="text" placeholder="666" id="price" name="price">


                    </div>
                    <div>
                        <label for="photo">Фото</label>
                        <input type="text" placeholder="в разработке" id="photo" name="photo">
                    </div>
                </div>
                <div>
                    <h4>Состав продукта</h4>

                    <div id="add-composition" style="display: flex">
                        <input type="text" hidden name="composition_number" id="composition_number">

                    </div>
                </div>

            </form>
        </div>
    </div>
</div>
