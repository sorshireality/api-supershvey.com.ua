<?php

namespace App\Http\Controllers;

use App\Models\Address;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\DB;

class PageController extends Controller
{
    public function showAdmin()
    {
        return view('admin.index', [
            'page' => 'content'
        ]);
    }

    public function showOrders(): \Illuminate\View\View
    {
        $orders = app('\App\Http\Controllers\OrderController')->index()->getContent();
        $customers = app('\App\Http\Controllers\CustomerController')->index()->getContent();
        $address = app('\App\Http\Controllers\AddressController')->index()->getContent();
        return view('admin.index', [
            "page" => "orders",
            "orders" => json_decode($orders),
            "customers" => json_decode($customers),
            "address" => json_decode($address)
        ]);
    }

    public function addOrders()
    {
        $request = new \Illuminate\Http\Request();
        $request->request->set('customer_id', $_POST['customer']);
        $request->request->set('shipping_address_id', $_POST['address']);
        $response = app('\App\Http\Controllers\OrderController')->store($request);
        if ($response->getStatusCode() == 200) {
            return redirect('admin/orders');
        }
    }

    public function showOrderLines(): \Illuminate\View\View
    {
        $order_lines = app('\App\Http\Controllers\OrderLinesController')->index()->getContent();
        $products = json_decode(app('\App\Http\Controllers\ProductController')->index()->getContent());
        $orders = json_decode(app('\App\Http\Controllers\OrderController')->index()->getContent());
        return view('admin.index', [
            "page" => "order-lines",
            "order_lines" => json_decode($order_lines),
            "products" => $products,
            "orders" => $orders
        ]);
    }

    public function addOrderLines()
    {
        $request = new \Illuminate\Http\Request();
        $request->request->set('order_id', $_POST['order_id']);
        $request->request->set('product_id', $_POST['product_id']);
        $request->request->set('quantity', $_POST['quantity']);
        $response = app('\App\Http\Controllers\OrderLinesController')->store($request);
        if ($response->getStatusCode() == 200) {
            return redirect('admin/order-lines');
        }
    }

    public function showCategories(): \Illuminate\View\View
    {
        $categories = app('\App\Http\Controllers\CategoryController')->index()->getContent();
        return view('admin.index', [
            "page" => "categories",
            "categories" => json_decode($categories)
        ]);
    }

    public function addCategory()
    {
        $request = new \Illuminate\Http\Request();
        $request->request->set('title', $_POST['title']);
        $response = app('\App\Http\Controllers\CategoryController')->store($request);
        if ($response->getStatusCode() == 200) {
            return redirect('admin/categories');
        }
    }

    public function showAttributes(): \Illuminate\View\View
    {
        $attributes = json_decode(app('\App\Http\Controllers\AttributesController')->index()->getContent());
        $products = json_decode(app('\App\Http\Controllers\ProductController')->index()->getContent());
        foreach ($attributes as $attribute => $key) {
            //dd($key->product_id);
            unset($products->{$key->product_id});
        }

        return view('admin.index', [
            "page" => "attributes",
            "products" => ($products),
            "attributes" => ($attributes)
        ]);
    }

    public function addAttributes()
    {
        $request = new \Illuminate\Http\Request();
        $request->request->set('product_id', $_POST['product_number']);
        $request->request->set('color', $_POST['color']);
        $request->request->set('price', (int)$_POST['price']);
        $request->request->set('image', $_POST['photo']);
        $response = app('\App\Http\Controllers\AttributesController')->store($request);
        if ($response->getStatusCode() == 200) {
            return redirect('admin/attributes');
        }
    }

    public function showAttributesComposition()
    {
        $attributes_composition = json_decode(app('\App\Http\Controllers\AttributeCompositionsController')->index()->getContent());
        $products = json_decode(app('\App\Http\Controllers\ProductController')->index()->getContent());
        $materials = json_decode(app('\App\Http\Controllers\CompositionController')->index()->getContent());
        return view('admin.index', [
            "page" => "attributes-composition",
            "attributes_composition" => $attributes_composition,
            "products" => $products,
            "materials" => $materials
        ]);
    }

    public function addAttributesComposition()
    {
        $request = new \Illuminate\Http\Request();
        $request->request->set('attribute_id', $_POST['product_number']);
        $request->request->set('material_id', $_POST['meterial_id']);
        $request->request->set('percentage', (int)$_POST['percentage']);
        $response = app('\App\Http\Controllers\AttributeCompositionsController')->store($request);
        if ($response->getStatusCode() == 200) {
            return redirect('admin/attributes-composition');
        }
    }

    public function showCompositions()
    {
        $compositions = app('\App\Http\Controllers\CompositionController')->index()->getContent();
        return view('admin.index', [
            "page" => "compositions",
            "compositions" => json_decode($compositions)
        ]);
    }

    public function addCompositions()
    {
        $request = new \Illuminate\Http\Request();
        $request->request->set('material', $_POST['material']);
        $response = app('\App\Http\Controllers\CompositionController')->store($request);
        if ($response->getStatusCode() == 200) {
            return redirect('admin/compositions');
        }
    }

    public function showProducts(): \Illuminate\View\View
    {
        $products = DB::table('products')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.title')
            ->get();
        $categories = app('\App\Http\Controllers\CategoryController')->index()->getContent();
        $compositions = app('\App\Http\Controllers\CompositionController')->index()->getContent();
        return view('admin.index', [
            "page" => "products",
            "products" => json_decode($products),
            "categories_list" => json_decode($categories),
            "compositions" => json_decode($compositions)
        ]);
    }

    /**
     *
     */
    public function addProduct()
    {
        $request = new \Illuminate\Http\Request();
        $request->request->set('title', $_POST['title']);
        $request->request->set('desc', $_POST['desc']);
        $request->request->set('quantity', $_POST['quantity']);
        $request->request->set('category_id', $_POST['category_id']);
        $response = app('\App\Http\Controllers\ProductController')->store($request);

        if ($response->getStatusCode() != 200) {
            return redirect('admin/products');
        }

        $product_id = json_decode($response->getContent())->id;

        $request = new \Illuminate\Http\Request();
        $request->request->set('color', $_POST['color']);
        $request->request->set('price', $_POST['price']);
        $request->request->set('image', $_POST['photo']);
        $request->request->set('product_id', $product_id);
        $response = app('\App\Http\Controllers\AttributesController')->store($request);

        if ($response->getStatusCode() != 200) {
            return redirect('admin/products');
        }

        for ($i = 1; $i <= $_POST['composition_number']; $i++) {
            $request = new \Illuminate\Http\Request();
            $request->request->set('attribute_id', $product_id);
            $request->request->set('material_id', $_POST['composition_' . $i]);
            $request->request->set('percentage', $_POST['composition_' . $i . '_percentage']);
            app('\App\Http\Controllers\AttributeCompositionsController')->store($request);
        }

        return redirect('admin/products');

    }

    /**
     * Show page with addresses CRUD table
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function showAddresses()
    {
        $addresses = app('\App\Http\Controllers\AddressController')->index()->getContent();
        return view('admin.index', [
            "page" => "addresses",
            "addresses" => json_decode($addresses),
        ]);
    }

    public function addAddress()
    {
        $request = new \Illuminate\Http\Request();
        $request->request->set('city', $_POST['city']);
        $request->request->set('district', $_POST['district']);
        $request->request->set('postcode', $_POST['postcode']);
        $request->request->set('street', $_POST['street']);
        $request->request->set('house_number', $_POST['house_number']);
        $request->request->set('apartment_number', $_POST['apartment_number']);
        $request->request->set('np_department', $_POST['np_department']);
        $request->request->set('ukrp_department', $_POST['ukrp_department']);
        $response = app('\App\Http\Controllers\AddressController')->store($request);
        if ($response->getStatusCode() == 200) {
            return redirect('admin/addresses');
        }
    }

    public function showCustomers(): \Illuminate\View\View
    {
        $customers = app('\App\Http\Controllers\CustomerController')->index()->getContent();
        $address = app('\App\Http\Controllers\AddressController')->index()->getContent();
        return view('admin.index', [
            "page" => "customers",
            "customers" => json_decode($customers),
            "billing_addresses" => json_decode($address)
        ]);
    }

    public function addCustomer()
    {
        $request = new \Illuminate\Http\Request();
        $request->request->set('name', $_POST['name']);
        $request->request->set('lastname', $_POST['lastname']);
        $request->request->set('phone', $_POST['phone']);
        $request->request->set('email', $_POST['email']);
        $request->request->set('billing_address_id', $_POST['billing_address_id']);
        $response = app('\App\Http\Controllers\CustomerController')->store($request);
        if ($response->getStatusCode() == 200) {
            return redirect('admin/customers');
        }
    }
}
