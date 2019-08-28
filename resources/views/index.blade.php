<!doctype html>
<html lang="{{ app()->getLocale() }}">
  <head>
      <meta charset="utf-8">
      <meta name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">

      <link rel="icon" href="{{ 'favicon2.ico?v=2' }}"/>
      <!-- manifest.json (chrome version) -->
      <!-- <link rel="manifest" href="manifest.json"> -->

      <!-- inline (safari version) -->
      <!-- <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="black">
      <meta name="apple-mobile-web-app-title" content="PWAGram">
      <link rel="apple-touch-icon" href="pwa/icons/apple-icon-57x57.png" sizes="57x57">
      <link rel="apple-touch-icon" href="pwa/icons/apple-icon-60x60.png" sizes="60x60">
      <link rel="apple-touch-icon" href="pwa/icons/apple-icon-72x72.png" sizes="72x72">
      <link rel="apple-touch-icon" href="pwa/icons/apple-icon-76x76.png" sizes="76x76">
      <link rel="apple-touch-icon" href="pwa/icons/apple-icon-114x114.png" sizes="114x114">
      <link rel="apple-touch-icon" href="pwa/icons/apple-icon-120x120.png" sizes="120x120">
      <link rel="apple-touch-icon" href="pwa/icons/apple-icon-144x144.png" sizes="144x144">
      <link rel="apple-touch-icon" href="pwa/icons/apple-icon-152x152.png" sizes="152x152">
      <link rel="apple-touch-icon" href="pwa/icons/apple-icon-180x180.png" sizes="180x180"> -->

      <!-- inline (explorer version) -->
      <!-- <meta name="msapplication-TitleImage" content="pwa/icons/app-icon-114x114.png">
      <meta name="msapplication-TitleColor" content="#fff">
      <meta name="theme-color" content="#3f51b5"> -->

      <meta name="csrf-token" content="{{ csrf_token() }}">
      <meta http-equiv="Cache-control" content="public" max-age=86400>
      <meta http-equiv="Cache-control" content="must-revalidate">

      <title>E-SPJ BAPPEDA KALTIM</title>

      <link async rel="stylesheet" href="vue/css/app.css" defer>

      <link async href="{{ url('vue/css/index.css') }}" rel="stylesheet" media="all" defer>
  </head>

  <body onload="">
    <main id="app" class="page"></main>

    <script src="vue/js/app.js" defer></script>
    <!-- <script src="{{ url('vue/js/app.js') }}" defer></script> -->
    <!-- <script src="sw.js"></script> -->

    <script type="text/javascript">
        // Add a script element as a child of the body
        function downloadJSAtOnload() {
          setTimeout(() => {
            var element = document.createElement("script");
            element.src = "{{ url('/api/app/js') }}" // "vue/js/app.js";
            document.body.appendChild(element);
          }, 1000);
        }
    </script>
  </body>
</html>
