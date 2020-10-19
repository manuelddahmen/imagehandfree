@section("pagelogo", "/images/applogo.png")
        <!DOCTYPE html>
<?php echo "<?xml version=\"1.0\" encoding=\"UTF-8\""; ?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr" dir="ltr">
<head>
    <script language="JavaScript" type="text/javascript" src="{{asset('/js/tinyMCE.init.js')}}"></script>
    <title>@yield("title")</title>
    @include("header")
    @yield("header")
</head>
<body>
@include("note.tree", ["noteId" => (isset($noteId)?$noteId:NULL)])


<div id="sidebar" class="col-md-4">
    <ul id="menu-accordeon">
        <li id="navbar">
            @include("navigation.navbuttons")
            @include("navigation.history")
            <a onclick="history().back()">&lt;&minus;</a><a onclick="history().next()">&minus;&gt;</a>
        </li>

        @include("sidebar")

        @yield("menuitems")



    </ul>
    <a id="maximize_button" class="btn-large btn-primary openbutton" onclick="showMenuProfile();">Maximize</a>

</div>


<div class="containerBlocnoteBrowser">
    <div id="top_container">

        <h1><img src="@yield('pagelogo')" height="2em" width="2em"/>&nbsp;@yield("title")</h1>
        @show

        @section("top")
    </div>

    @yield('content')

</div>


<div id="footer">
    @yield("footer.master")
    <div id="api"></div>
    <!-- place in header of your html document -->
    <a href="https://mixpanel.com/f/partner" rel="nofollow"><img
                src="http://cdn.mxpnl.com/site_media/images/partner/badge_light.png" alt="Mobile Analytics"/></a>
</div>
</body>
</html>
@show
