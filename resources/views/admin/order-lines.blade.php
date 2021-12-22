<div class="entity_table_view ">

    <div id="crud-message" class="slide"></div>

    <table>
        <thead>
        <tr>
            <th><label for="id">Номер заказа</label></th>
            <th>Товар</th>
            <th>Количество</th>
            <th>Дата добавления</th>
            <th>Удалить</th>
        </tr>
        </thead>
        <tbody>
        @if(count($order_lines) == 0)
            <tr><td colspan="3" style="text-align: center">Строк заказа нету<td></tr>
        @else
            @foreach($order_lines as $line)
                <tr>
                    <td>{{$line->order_id}}</td>
                    <td>{{$line->product_id}}</td>
                    <td>{{$line->quantity}}</td>
                    <td>{{$line->created_at}}</td>
                    <td>
                        <button class="delete-btn" onclick="removeSingleEntity('order-lines',{{$line->id}})">x
                        </button>
                    </td>
                </tr>
            @endforeach
        @endif
        </tbody>
    </table>
    <div id="add-order-line" class="table_add_form">
        <div class="add-form">
            <form action="order-lines" method="POST" id="order_lines_form">
            @csrf <!-- {{ csrf_field() }} -->
                <div>
                    Номер заказа : <select name="order_id" id="order_id" form="order_lines_form">
                        @foreach($orders as $order)
                            <option value="{{$order->id}}">
                                {{$order->id}}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div>
                    Товар : <select name="product_id" id="product_id" form="order_lines_form">
                        @foreach($products as $product)
                            <option value="{{$product->id}}">
                                {{$product->id}} - {{$product->name}}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div>
                    Количество :
                    <input class="number_input" type="number" name="quantity" id="quantity">
                </div>
                <div>
                    <input type="submit" class="create-btn" value="Add">
                </div>
            </form>
        </div>
    </div>
</div>

