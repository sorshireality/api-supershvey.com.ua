<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Order;
use App\Models\OrderLines;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{

    public function run()
    {
        $address = Address::create(
            array(
                'city' => 'Полтава',
                'district' => 'Супруновка',
                'street' => 'Соборная',
                'house_number' => '30',
                'apartment_number' => '18',
                'postcode' => '666'
            )
        );
        $order = Order::create(
            array(
                'customer_id' => 1,
                'shipping_address_id' => $address->id,
                'status' => 'new'
            )
        );
        $result = OrderLines::create(
            array(
                'product_id' => '1',
                'quantity' => 1,
                'order_id' => $order->id
            )
        );
    }
}
