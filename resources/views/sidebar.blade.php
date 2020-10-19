<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 10-09-16
 * Time: 05:50
 */
?><?php
if (Auth::check())
{?>
<li><a href="{{ asset(   "note/list/0/1") }}"
       class="btn-large btn-primary openbutton">Filesystem</a>

<li><a href="{{asset(   "profile")}}"
       class="btn-large btn-primary openbutton">
        <?php echo Auth::user()->email; ?></a>
</li>
<li><input onclick="filtreDyn();" type="text" name="filterText" value="" placeholder="Chercher le titre ou dans le texte"/></li>
<li><input onclick="filtreDyn();" type="checkbox" name="filterType" value="bookmark"/><a href="{{asset("ft/bookmark/")}}">Signet</a></li>
<li><input onclick="filtreDyn();" type="checkbox" name="filterType" value="text"/><a href="{{asset("ft/text/")}}">Texte</a></li>
<li><input onclick="filtreDyn();" type="checkbox" name="filterType" value="doc"/><a href="{{asset("ft/docs")}}">Document</a></li>
<li><input onclick="filtreDyn();" type="checkbox" name="filterType" value="img"/><a href="{{asset("ft/img")}}">Image</a></li>
<li><input onclick="filtreDyn();" type="checkbox" name="filterType" value="music"/><a href="{{asset("ft/freezer")}}"
                         class="btn-large btn-primary openbutton">
            Musique</a></li>
<li><input onclick="filtreDyn();" type="checkbox" name="filterType" value="movie"/><a href=""{{asset("ft/movie")}}>Films</a></li>
<li><input onclick="filtreDyn();" type="checkbox" name="filterType" value="contact"/><a href="{{asset("contacts")}}"
       class="btn-large btn-primary openbutton">
        Mes Contacts</a>
</li>
<li><a href="{{asset("user/addcontact")}}"
       class="btn-large btn-primary openbutton">
        Ajouter un contact</a>
</li>
<li><a href="{{asset(   "user/myseats")}}"
       class="btn-large btn-primary openbutton">
        My seats</a>
</li>
<li><a href="{{asset(   "user/contacts")}}"
       class="btn-large btn-primary openbutton">
        Mes contacts 2</a>
</li>
<li><a href="{{asset(   "note/share/from")}}"
       class="btn-large btn-primary openbutton">
                les objets patagés avec moi</a>
</li>
<li><a href="{{asset(   "note/share/to")}}"
       class="btn-large btn-primary openbutton">
                je partage les objets...</a>
</li>

<br/>

<li id="logout">

    <a href="{{   URL::to("auth/logout")}}"><img src="{{ asset("images/disconnect.jpg") }}"/><label
                class="onrolloverShow">Logout</label></a>
</li>
<li id="connected_user" class="btn-large btn-primary openbutton">L'utilisateur est connect&eacute; ....
</li>
<li><a href="{{URL::to("statistics/personal")}}">Statistiques personnelles pour <?= Auth::user()->email ?></a></li>
<?php
}
else
{
?>
<li id="login" class="">Non connect&eacute;</li>

<li><a href="{{URL::to("auth/login")}}">Login</a></li><?php



}
?>

<li><a href="{{URL::to("statistics/totale")}}">Statistiques globales</a></li>
