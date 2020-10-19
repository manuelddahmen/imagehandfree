    <meta name="description" content="Free web application: file management and notes">
    <meta name="keywords" content="Text, Image, Audio, Video">
    <script language="JavaScript">

        function go(url) {
            document.location.href = url;
        }


                <?php if(Auth::check())
                { ?>
        var noteId = "{{$noteId = isset($noteId) ? $noteId :  getRootForUser(Auth::user()->email) }}";
                <?php }
                else
                {?>
        var noteId = -1;
        <?php
        $noteId = -1;
        }?>

    </script>
    <script src="{{asset("js/soundmanagerv2/script/soundmanager2-nodebug.js") }}"></script>
    <!-- start Mixpanel -->
    <script type="text/javascript">(function (e, b) {
            if (!b.__SV) {
                var a, f, i, g;
                window.mixpanel = b;
                b._i = [];
                b.init = function (a, e, d) {
                    function f(b, h) {
                        var a = h.split(".");
                        2 == a.length && (b = b[a[0]], h = a[1]);
                        b[h] = function () {
                            b.push([h].concat(Array.prototype.slice.call(arguments, 0)))
                        }
                    }

                    var c = b;
                    "undefined" !== typeof d ? c = b[d] = [] : d = "mixpanel";
                    c.people = c.people || [];
                    c.toString = function (b) {
                        var a = "mixpanel";
                        "mixpanel" !== d && (a += "." + d);
                        b || (a += " (stub)");
                        return a
                    };
                    c.people.toString = function () {
                        return c.toString(1) + ".people (stub)"
                    };
                    i = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
                    for (g = 0; g < i.length; g++)f(c, i[g]);
                    b._i.push([a, e, d])
                };
                b.__SV = 1.2;
                a = e.createElement("script");
                a.type = "text/javascript";
                a.async = !0;
                a.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === e.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
                f = e.getElementsByTagName("script")[0];
                f.parentNode.insertBefore(a, f)
            }
        })(document, window.mixpanel || []);
        mixpanel.init("8ac6f09b23ba5b96087d5e6c33fe056e");
    </script>
    <!-- end Mixpanel -->

    <script type="text/javascript">
        mixpanel.track("Navigation dans l'Application", {"User": "", "note": noteId});
    </script>
    <meta charset="UTF-8">
    <title>@yield('title')</title>
    <!-- Set the viewport width to device width for mobile -->
    <meta name="viewport" content="width=device-width"/>
    <script src="{{ asset('js/audio/audio.min.js')}}"></script>
    <script>
        audiojs.events.ready(function () {
            var as = audiojs.createAll();
        });
    </script>
    <!--<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">-->
    <link href="{{ asset(   'css/main.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ asset(  'js/viewerJS/viewer.css') }}" rel="stylesheet" type="text/css"/>
    <!--<link href="http://viewerjs.org/stylesheets/app.css" rel="stylesheet" type="text/css"/>-->
    <script src="{{ asset(   'js/jquery-1.11.3.min.js') }}"></script>
    <script src="{{ asset(  'js/tinymce/jquery.tinymce.min.js') }}"></script>
    <script src="{{ asset(   'js/rdio.com/jquery.rdio.min.js') }}"></script>
    <script src="{{ asset(   'js/tinymce/tinymce.min.js') }}"></script>
    <script src="{{ asset(   'js/jquery-1.11.3.min.js') }}"></script>
    <script src="{{ asset(   'js/jquery-1.11.3.min.js') }}"></script>
    <script language="JavaScript">
        function showPlus(id) {
            $("#plus_button_" + id).removeClass('invisible').addClass('visible');
            //$("#plus_button")
            $("#moins_button_" + id).addClass('invisible').removeClass('visible');
            //$("#moins_button").removeClass('visible');
        }
        function showMoins(id) {
            $("#moins_button_" + id).addClass('visible').removeClass('invisible');
            //$("#moins_button").removeClass('invisible');
            $("#plus_button_" + id).addClass('invisible').removeClass('visible');
            //$("#plus_button").removeClass('visible');
        }
        function showMenu(id) {
            $('#ul' + id).removeClass("invisible").addClass("visible").addClass("row-3");
            //$('#' + id).addClass("visible");
            //$('#' + id).addClass("row-3");
            showMoins(id);
        }
        function hideMenu(id) {
            $('#ul' + id).addClass("invisible").removeClass("visible").removeClass("row-3");
            //$('#' + id).removeClass("visible");
            //$('#' + id).removeClass("row-3");
            showPlus(id);
        }
        function showMenuProfile() {
            $('#profile_info').removeClass("minimize_menu").addClass("maximize_menu");
            $('#sidebar').removeClass("minimize_menu").addClass("maximize_menu");
        }
        function hideMenuProfile() {
            $('#profile_info').removeClass("maximize_menu").addClass("minimize_menu");
            $('#sidebar').removeClass("maximize_menu").addClass("maximize_menu");
        }
    </script>


    <script src="{{ asset("js/jquery-tree.js") }}" type="application/javascript"></script>

    <meta name="csrf-token" content="{{ csrf_token() }}"/>