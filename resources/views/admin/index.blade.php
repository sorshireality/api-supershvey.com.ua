<html>
<head>
    <title>
        Админ панель
    </title>
    <script src="{{ asset('js/std.js') }}" type="text/javascript"></script>
    <link href="{{ asset('css/admin.css') }}" rel="stylesheet">
</head>
<body>
@include('admin.menu')
@if ($page == "content")
    @include('admin.content')
@elseif ($page == "orders")
    <script>
        updateCurrentPageIndicator('orders')
    </script>
    @include('admin.orders')
@elseif ($page == "customers")
    <script>
        updateCurrentPageIndicator('customers')
    </script>
    @include('admin.customers')
@elseif ($page == "products")
    <script>
        updateCurrentPageIndicator("products")
        showSubMenuList('sub-products')
    </script>
    @include('admin.products')
@elseif ($page == "categories")
    <script>
        updateCurrentPageIndicator('categories')
        showSubMenuList('sub-products')
    </script>
    @include('admin.categories')
@elseif ($page == "attributes")
    <script>
        updateCurrentPageIndicator('attributes')
        showSubMenuList('sub-products')
    </script>
    @include('admin.attributes')
@elseif ($page == "compositions")
    <script>
        updateCurrentPageIndicator('compositions')
        showSubMenuList('sub-products')
    </script>
    @include('admin.compositions')
@elseif ($page == "addresses")
    <script>
        updateCurrentPageIndicator('addresses')
    </script>
    @include('admin.addresses')
@elseif ($page == "attributes-composition")
    <script>
        updateCurrentPageIndicator('attributes-composition')
        showSubMenuList('sub-products')
    </script>
    @include('admin.attributes-composition')

@endif
</body>
</html>
