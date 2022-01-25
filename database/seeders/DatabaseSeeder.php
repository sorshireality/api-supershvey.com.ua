<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ProductsSeeder::class);
        $this->call(CustomerSeeder::class);
        $this->call(OrderSeeder::class);
        // \App\Models\User::factory(10)->create();
    }
}
