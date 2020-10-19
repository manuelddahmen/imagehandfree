<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 10-09-16
 * Time: 06:15
 */
?>
<?php
/**
 * Created by PhpStorm.
 * User: mary
 * Date: 23-03-16
 * Time: 03:25
 *
 *
 * Variable prédifinies
 * * $pathId : Classe : \App\Note
 *         Correspondant au dossier à afficher, -1 est la valeur sur la corbeille
 *  $filtre
 * Appel DB: $results
 *
 */
if (!isset($noteId)) {
    $noteId = getRootForUser();
}

$assoc = unserialize($serialized_data);

?>
@section("content")
    @parent

    <!-- Vue Container -->
    <div class="browserContainer">
    <!--<label for="">{{getLastestSQLStmt()}}</label>-->
        <div class="BrowserTop">
            <ul id="menu-demo2">
                <li>
                    <a href="<?php echo asset("note/list/" . (int)(getDBDocument($noteId)->folder_id) . "/1"); ?>">
                        <img src='<?php echo asset("images/root-folder2.png") ?>'
                             class="miniImg" title="Aller &agrave; : Dossier sup&eacute;rieur"/><span
                                title="What's up?">UP</span>
                    </a></li>
                <li><a href="<?php echo asset("file/uploadform/" . (int)($noteId)); ?>" title="Upload here">
                        <img src="{{asset("/images/uploadfiles.png")}}"/><span
                                title="Stocker des fichiers">UPLOAD</span>
                    </a></li>
                <li><a href="<?php echo asset("record_something"); ?>" title="Webcam">
                        <img src="{{asset("/images/camera.jpg")}}"/><span title="Enregistrer quelque chose <strong>à partir de la
                            webcam</strong>">WCAM REC</span>
                    </a></li>
                <li><a href="<?php echo asset("note/new/" . $noteId); ?>" title="Cr&eacute;er une note ici"><img
                                src="{{asset("/images/notenew.png") }}"/><span
                                title="Créer une note textuelle">NEW NOTE</span></a>
                </li>
                <li><a href="<?php echo asset("folder/new/" . $noteId); ?>"
                       title="Cr&eacute;er un dossier ici"><img
                                src="{{asset("/images/folder.png")}}"/><span title="Créer un dossier">NEW FOLDER</span></a>
                </li>
            </ul>
        </div>


        @yield("fichier")


        @if($assoc != false)
            @foreach($assoc as $tab)
                @include("note.vue_fichier", array("filename" => $tab['filename'],
                "content_file" => $tab['content_file'], "id" => $tab['id'], "noteId" => $tab['id'], "folder_id" => $tab['folder_id'],
                "mime" => $tab['mime'], "isDirectory" => $tab['isDirectory'], "sqlStmt" => getLastestSQLStmt(), "username" => $tab['username']))
            @endforeach
        @else
            @append <strong>Pas de résultat dans cette vue.</strong>
        @endif

    </div>



@endsection