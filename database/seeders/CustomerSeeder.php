<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Attributes;
use App\Models\Categorie;
use App\Models\Customers;
use App\Models\Products;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    public function run()
    {
        $address = Address::create(
            array(
          'city' => 'Полтава',
          'district' => 'Кременчуг',
          'street'=> 'Выдуманая',
          'house_number' => '15',
          'apartment_number' => '0',
          'postcode' => '666'
            )
        );
        Customers::create(
            array(
                'name' => 'Полина',
                'lastname' => 'Ткаченко',
                'phone' => '123',
                'email' => 'polinka@top.ua',
                'billing_address_id' => $address->id
            )
        );
    }

}
