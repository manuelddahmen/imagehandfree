<?php
/**
 * Created by PhpStorm.
 * User: manue
 * Date: 27-08-15
 * Time: 06:12
 *
 * */


?>
<ul id="menu-demo2" xmlns="http://www.w3.org/1999/html">
    <li><a href="<?php echo asset("note/view/" . $noteId);?>"><img
                    src="{{ asset( "images/see.png") }}"/>Voir</a></li>
            <!-- note/view demande un login de plus!-->
    <li><a href="<?php echo asset("note/edit/" . $noteId); ?>"><img
                    src="{{asset( "images/edit.png") }}"/>Modifier</a></li>
    <li><a href="{{asset("file/view/" . $noteId) }}"><img
                    src="{{asset( "images/download.png") }}"/>T&eacute;l&eacute;charger</a>
    </li>
    <li><a href=" {{ asset( "note/delete/$noteId") }}?>"
           style="color: red; background: #000;"><img
                    src="{{  asset("images/delete.png") }}"/>Supprimer</a></li>
    <li><a href="<?php echo asset("note/edit/" . $noteId); ?>"><img
                    src="{{ asset("images/move.png")  }}"/>D&eacute;placer</a></li>
    <li>
        <a href="<?php echo asset("note/list/" . getParentNoteId($noteId) . "/0"); ?>"><img
                    src="{{ asset("images/folder.png")  }}"/>Dossier parent</a></li>
    <li><a href="<?php echo asset("note/share/" . $noteId); ?>"><img
                    src="{{  asset("images/partager.png") }}"/>Partager</a></li>
    <li><a href="<?php echo asset("note/editPageForm.blade.php/" . $noteId); ?>"><img
                    src="{{  asset("images/mime-types/video.png") }}"/>Editer l'adresse de la page</a></li>
</ul>