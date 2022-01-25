<?php

namespace Database\Seeders;

use App\Models\Attributes;
use App\Models\Categorie;
use App\Models\Products;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{

    public function run()
    {
        $id = (Categorie::create(array(
            'title' => 'Ткани'
        )));
        $product = Products::create(array(
            'name' => 'Нейлон',
            'description' => 'Качественный турецкий нейлон',
            'quantity' => 1000,
            'category_id' => $id->id
        ));
        Attributes::create(array(
            'product_id' => $product->id,
            'color' => 'Синий',
            'price' => '666',
            'image' => '1'
        ));
    }

}
