<html>
<head>
    <title>
        Админ панель
    </title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <meta id="csrf_token" name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
<div id="root"></div>

<script src="{{ asset('js/std.js', '')}}"></script>
<script src="{{ asset('js/app.js', '')}}"></script>
</body>
</html>
