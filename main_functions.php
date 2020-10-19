<?php
/**
 * Created by PhpStorm.
 * User: manue
 * Date: 24-09-15
 * Time: 10:53
 */


require_once("private.php");
/**
 * ::
 */
$appDir = realpath(base_path("/"));

function getDBDocument($id, $user = NULL)
{
    $note = new \App\Note((int)$id);

    $note->load($id);

    return $note;
}

function getSharedDocument($id, $user = NULL)
{
    $note = new \App\Note((int)$id);

    $note->load($id);

    return $note;
}
function getDocRow($noteId)
{
    global $mysqli;
    $res = simpleQ($mysqli, "select * from filesdata where isDeleted=0 and id=" . ((int)$noteId));
    if ($res != NULL) {
        return mysqli_fetch_assoc($res);
    } else {
        return NULL;
    }
}

function getDocuments($username)
{

    global $mysqli;
    $username = mysqli_escape_string($mysqli, $username );
    $res = simpleQ($mysqli, "select * from filesdata where username=".$username.
        " inner join share on username=(select username from users where id=share.givee)" );
    $i = 0;
    if ($res != NULL) {
        while ($res!=NULL)
        $doc = mysqli_fetch_assoc($res);
        $arr[$i++] = $doc;
    } else {
        return NULL;
    }
}

function getShareRow($noteId)
{
    global $mysqli;
    $res = simpleQ("select * from share where id=" . ((int)$noteId), $mysqli);
    if ($res != NULL) {
        return mysqli_fetch_assoc($res);
    } else {
        return FALSE;
    }
}
function getField($row, $fieldName)
{
    return $row[$fieldName];
}
function getFolderList($user) {
    global $mysqli;
    $sql = "select * from filesdata where isDirectory=1 and isDeleted=0 and username='" . mysqli_real_escape_string($mysqli, $user) . "'";
    $res = simpleQ($mysqli, $sql);
    return $res;
}
function getFolderName($noteId)
{
    if ($noteId <= 0 && Auth::check())
    {

        $noteId = getRootForUser(Auth::user()->email);
    }
    if (Auth::check()) {
        $row = getDocRow($noteId);
        $folderName = getField($row, 'isDirectory') == 1 ? getField($row, 'filename') : getField(getDocRow(getField($row, 'folder_id')), 'filename');
        return $folderName;
    } else {
        return "";
    }
}
function getMimeType($id) {
    global $mysqli;
    connect();
    $result = getDocRow($id);
    if ($result != NULL) {
        if (($doc = mysqli_fetch_assoc($result)) != NULL) {
            return $doc["mime"];
        }
    }
}
function folder_field($folder_id, $field_name, $user) {
    ?>
    <fieldset> <select name="<?php echo $field_name; ?>" class="user-control">
        <?php
        $res = getFolderList($user);
        while (($row = mysqli_fetch_assoc($res)) != NULL) {
            if ($row["id"] == $folder_id) {
                $optionSel = "selected='selected'";
            } else {
                $optionSel = "";
            }
            echo "<option value='" . $row['id'] . "' " . $optionSel . " >" . htmlspecialchars($row['filename']) . "</option>";
        }

        mysqli_free_result($res);
        ?>
    </select></fieldset><?php
}
function listerNotesFromDB($filtre, $composed, $path, $user)
{
    $results = getDocumentsFiltered($filtre, $composed, $path, $user);

    ?>

    <div class="browserContainer">
    <div class="BrowserTop"><p><strong>What's up?</p>
        <a href="<?php echo asset("note/list/" . (int)(getDBDocument($path)->folder_id) . "/1"); ?>">
            <img src='<?php echo asset("images/root-folder2.png") ?>'
                 class="miniImg" title="Aller &agrave; : Dossier sup&eacute;rieur"/>
        </a>
        <p><strong>News action</p>
        <p><a href="<?php echo asset("file/uploadform/" . (int)($path)); ?>"
              title="Upload here">
                <img src="{{ }}images/uploadfiles.png"/>Stocker des fichiers
            </a>
        <p><a href="<?php echo asset("record_something"); ?>" title="Webcam">
                <img src="{{ }}images/camera.jpg"/>Enregistrer quelque chose <strong>à partir
                    de la
                    webcam</strong>
            </a>
        <p></p><a href="<?php echo asset("note/new/" . $path); ?>" title="Cr&eacute;er une note ici"><img
                src="{{ }}images/notenew.png"/>Créer une note textuelle</a>
        </a></p>
        <p></p><a href="<?php echo asset("folder/new/" . $path); ?>" title="Cr&eacute;er un dossier ici"><img
                src="{{ }}images/folder.png"/>Créer un dossier</a>
        </a></p>
    </div>

    <?php
    if ($results) {
        while (($row = mysqli_fetch_assoc($results))) {
            $filename = $row['filename'];
            $content = $row['content_file'];
            $id = $row['id'];
            $folder_id = $row["folder_id"];
            typeDB($filename, $content, $id, $row);
        }
    } else {
        echo "Pas de r&eacute;sultat";
    }
    ?></div><?php
}

function listerNotes_browser($user)
{
    global $mysqli;
    $results = mysqli_query($mysqli, "select * from filesdata where isDeleted=0 and username='" . mysqli_real_escape_string($mysqli, Auth::user()->email) . "';");

    while (($doc = mysqli_fetch_assoc($results)) != NULL) {
        $filename = $doc['filename'];
        $content = $doc['content_file'];
        $id = $doc['id'];
        $folder_id = $doc["folder_id"];
        typeDB_type_image($filename, $content, $id, $doc);
    }
}

function typeTxt($cf, $filePath)
{
    global $FILE_THUMB_MAXLEN;
    global $userdataurl;
    global $dataDir;
    $urlaction = "page.xhtml.php?composant=reader.txt&document=" . substr($cf, 0, -4);
    ?>
    <div class="miniImgContainer">
        <input class="filecheckbox" type="checkbox" name="files[]" value="<?php echo "TXT_" . substr($cf, 0, -4); ?>"/>
        <a draggable="true"
           ondragstart="drag(event)" class='miniImg' href="<?= $urlaction ?>">
            <div class="miniImg">
                <?php echo file_get_contents($filePath, null, null, 0, 500); ?>
            </div>
        <span class="filename">
            <?php echo substr(getDocumentFromFullname($cf), 0, -4); ?>
        </span>
        </a>
    </div>
    <?php
}

function typeImg($cf)
{
    global $userdataurl;
    global $dataDir;
    $actionurl = "page.xhtml.php?composant=reader.images&document=$cf";
    ?>
    <div class="miniImgContainer" ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true"
         ondragstart="drag(event)">
        <input class="filecheckbox" type="checkbox" name="files[]" value="<?php echo "IMG_" . $cf; ?>"/>
        <a class='miniImg' href="<?= $actionurl ?>">
            <img src='<?php echo "$userdataurl/$cf"; ?>' class="miniImg">
            <span class="filename"><?php echo $cf; ?></span></a>
    </div>

    <?php
}

function typeCls($classeur, $f)
{
    global $userdataurl;
    global $dataDir;
    $actionurl = "page.xhtml.php?composant=browser&classeur=$f";
    ?>
    <div class="miniImgContainer" ondrop="drop(event)" ondragover="allowDrop(event)" draggable="true"
         ondragstart="drag(event)">
        <input class="filecheckbox" type="checkbox" name="files[]" value="<?php echo "CLASS_" . substr($f, 0, -4); ?>"/>
        <a class='miniImg' href="<?= $actionurl ?>">
            <img src='images/alphabet.png' class="miniImg">
            <span class="filename"><?php echo $classeur; ?></span>
        </a>
    </div>
    <?php
}

function typeDB($filename, $content, $id, &$rowdoc = NULL)
{
    global $config;
    $urlaction = URL::to("note/list/$id/1");
    $mime = $rowdoc["mime"];
    ?>
    <div class='vue_fichier_vue_normale'>
        <div class="nom_fichier">
            <div id="<?php echo "data$id"; ?>" class="menu_icons">

                <img id="plus_button_<?php echo $id; ?>" onclick="showMenu('<?php echo "$id"; ?>');"
                     src="{{ }}images/plus.png" class="visible"/>
                <img id="moins_button_<?php echo $id; ?>" onclick="hideMenu('<?php echo "$id"; ?>');"
                     src="{{ }}images/moins.png" class="invisible"/>
                <ul class="onfile_actions invisible" id="ul<?php echo "$id"; ?>">
                    <li><a href="<?php echo asset("note/view/" . $id) ?>">Voir</a></li>
                    <!-- note/view demande un login de plus!-->
                    <li><a href="<?php echo asset("note/edit/" . $id); ?>">Modifier</a></li>
                    <li><a href="<?php echo asset("file/download/" . $id); ?>">T&eacute;l&eacute;charger</a></li>
                    <li><a href="<?php echo asset("note/delete/" . $id); ?>">Supprimer</a></li>
                </ul>
                <label class="nom_fichier" title="<?php echo $filename ?>"
                       onclick="go('<?php echo asset("note/view/" . $id) ?>')"><?php echo $filename ?></label>
            </div>
        <span class="nom_fichier"><input class="menu_icons" type="checkbox" id="<?php echo $rowdoc['id']; ?>"
                                         title="Select for action"/><?php
            echo $rowdoc["filename"] . "|" . $rowdoc["id"];
            ?></span>
        </div>
        <div class="texte">
            <?php
            echo \Illuminate\Support\Facades\Config::get('plus_config')['thumb_size'];
            if (isImage(getExtension($filename), $mime)) { ?>
                <img class="type_img" src="<?php echo URL::to(
                    asset("icone/$id/" .
                        (\Illuminate\Support\Facades\Config::get('app.plus_config')['thumb_size'])
                    )
                ); ?>"
                     alt="<?= $filename ?>"/>
                <?php
            } else
                if (isVideo(getExtension($filename), $mime)) { ?>
                    <img class="type_icon" src="<?php
                    echo URL::to(
                        asset("images/mime-types/videoFlow.png")); ?>"
                         alt="<?= $filename ?>"/>
                    <?php
                } else
                    if (isTexte(getExtension($filename), $mime)) {
                        ?><span class='typeTextBlock'><?= htmlspecialchars(substr($content, 0, 500)) ?></span> <?php
                    } else if ($rowdoc['isDirectory'] == 1 || $mime == "directory") {
                        ?><a href="<?= $urlaction ?>"><img
                            src='<?php echo asset("images/dossier.png"); ?>' class="miniImg"
                            title="Dossier: <?php echo $filename; ?>"></a><?php
                    } else {
                        ?>
                        <img src='http://www.stdicon.com/humility/<?= $mime ?>'/>
                        <?php
                    }
            ?>
        </div>
    </div>
<?php }

function typeDB_type_image($filename, $content, $id, &$rowdoc = NULL)
{
    $mime = $rowdoc["mime"];
    if (isImage(getExtension($filename), $mime)) { ?>

        <img src="<?php echo asset("icone/$id/60") ?>"
             alt="<?= $filename ?>" style="width; 30px; height: 30px;" onclick="insertIntoEditor(<?php echo $id ?>);"/>
        <?php
    }
}
function echoImgBase64($content, $filename)
{
    // A few settings

// Read image path, convert to base64 encoding
    $imgData = base64_encode($content);

// Format the image SRC:  data:{mime};base64,{data};
    $src = 'data: image/' . getExtension($filename) . ';base64,' . $imgData;

// Echo out a sample image($filename)
    echo '<images src="' . $src . '">';

}

function getExtension($filename)
{
    return $ext = strtolower(substr($filename, strpos($filename, '.', 0)));

}

function isImage($ext, $mime = "")
{
    return in_array($ext, array("jpg", "jpeg", "png", "gif", "bmp", "ico", "tif", "tiff")) or (($mime != "") && (strpos($mime, 'image') !== FALSE));

}

function isDocument($ext, $mime = "")
{
    return in_array($ext, array("doc", "docx", "odt", "ods", "txt")) or (($mime != "") && (strpos($mime, 'image') !== FALSE));

}

function isTexte($ext, $mime = "")
{
    return in_array($ext, array("txt")) or ($mime == "text/plain");

}

function isVideo($ext, $mime = "")
{
    return in_array($ext, array("avi", "ogv", "mp4", "4g", "ogg", "mpg")) or (($mime != "") && (strpos($mime, 'videoFlow') !== FALSE));

}

function isAudio($ext, $mime = "")
{
    return in_array($ext, array("mp3", "ogg", "aac", "flac")) or (($mime != "") && (strpos($mime, 'audio') !== FALSE));

}

/**
 * @param $filtre "" => pas de recherche textuelle. Recherche texte "filtre" dans nom et/ou contenu.
 * @param $composedOnly false
 * @param $pathId id du path. Path = -1 => Recherche dans tous les dossiers
 * @param $user
 * @return bool|mysqli_result
 */


function getLastestSQLStmt()
{
    global $sqlStmt;
    return isset($sqlStmt) ? $sqlStmt : "";
}

function simpleQ($mysqli, $q)
{


    global $mysqli;
    global $date;
    $date = date("Y-m-d-H-i-s");

    if ($mysqli == NULL) {
        connect();
    }


    $result = mysqli_query($mysqli, $q);
    return (!$result) ? NULL : $result;

}

function connect() {
    global $mysqli;

    global $date;
    if ($date == "") {
        $date = date("Y-m-d-H-i-s");
    }
$hostname = env('DB_HOST', 'localhost');
$username = env('DB_USER', 'root');
$password = env('DB_PASSWORD', '');
$dbname = env('DB_NAME', 'notes');


    //conection:
    $mysqli = new mysqli
    (
                    $hostname, $username, $password, $dbname
    ) or die("Error " . mysqli_error($mysqli));

    if ($mysqli->connect_error) {
        die('Erreur de connexion (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
    }


    //echo 'Successs... ' . $mysqli->host_info . "\n";
}
function deleteNote($noteId)
{

}
function getRootForUser($user=NULL) {
    global $mysqli;
    if($user==NULL)
    {
        global $monutilisateur;

    }
    $sql = "select id from filesdata where username like '" .
        mysqli_real_escape_string($mysqli, $user)
        . "' and isRoot=1";

    $result = simpleQ($mysqli, $sql);
    if ($result) {
        if (($arr = $result->fetch_assoc())!=NULL) {
            $id = $arr['id'];
        } else {
            $id = 0;
        }
    } else {
        $id = -1;
        echo "No root for user";
    }//echo "ID;; $id";
    return $id;
}

function createRootForUser() {
    global $mysqli;
    connect();
    $sql = "insert into filesdata (filename, folder_id, isDirectory) values ('Dossier racine', -1, TRUE)";
    if (mysqli_query($mysqli, $sql)) {
        echo "Root file created";
    }
}

function deleteDBDoc($dbdoc) {
    global $mysqli;
    $sql = "update filesdata set isDeleted=1 where id=" . mysqli_real_escape_string($mysqli, $dbdoc) . " and username like '" . mysqli_real_escape_string($mysqli, Auth::user()->email) . "'";
    return simpleQ($mysqli, $sql);
}

connect();

function getParentNoteId($noteId)
{
    global $mysqli;

    $doc = getDocRow($noteId);

    return $doc['folder_id'];
}

function redimAndDisplay($data, $mimeType, $T = NULL)
{

    if ($T == NULL) {
        $T = \Illuminate\Support\Facades\Config::get("app.plus_config")["thumb_size"];
    }
    $image = imagecreatefromstring($data);

    $size = getimagesizefromstring($data);

    $dst_im = imagecreatetruecolor($T, $T);

    //imagecolortransparent($dst_im, imagecolorallocate($dst_im, 0, 0, 0));
    $X1 = $size[0];
    $Y1 = $size[1];

    if ($X1 >= $Y1) {
        $X2 = $T;
        $Y2 = $T * $Y1 / $X1;
        $blank_top = ($T - $Y2) / 2;
        imagecopyresampled($dst_im, $image, 0, $blank_top, 0, 0, $T, $T - $blank_top * 2, $X1, $Y1);
    } else {
        $X2 = $T * $X1 / $Y1;
        $Y2 = $T;
        $blank_left = ($T - $X2) / 2;
        imagecopyresampled($dst_im, $image, $blank_left, 0, 0, 0, $T - $blank_left * 2, $T, $X1, $Y1);
    }
    $mimeType = "image/png";

    header("Content-Type: $mimeType");
    $mimeType = strtolower($mimeType);

    if ($mimeType == "image/jpg" || $mimeType == "image/jpeg") {
        imagejpeg($dst_im);
    } else if ($mimeType == "image/png") {
        imagepng($dst_im);

    } else if ($mimeType == "image/gif") {
        imagegif($dst_im);
    }
    imagedestroy($dst_im);
    imagedestroy($image);


}

function search($expresion, $user, $folderId = NULL)
{
    global $mysqli;
    $terms = explode(' ', $expresion);
    $sql = 'select * from filesdata where ';
    $first = true;
    foreach ($terms as $term) {
        if (!$first) {
            $add = " and ";
        } else {
            $add = " ";
        }
        $sql .= $add . "content_file like '%" . $term . "%'";

        $sql .= " and username like '" . (Auth::user()->email) . "';";

    }
    $result = simpleQ($mysqli, $sql);
    return $result;
}


function getSharedWithMe()
{
    global $mysqli;
    $sql = "select * from filesdata INNER JOIN share on filesdata.id=share.note_id where givee='".mysqli_real_escape_string($mysqli, Auth::user()->email)."' or type='PUBLIC'";
    //echo $sql;
    return simpleQ($mysqli, $sql);
}

function getSharedFromMe()
{
    global $mysqli;
    $sql = "select * from filesdata inner join share  on share.note_id=filesdata.id".
    " where filesdata.username='".mysqli_real_escape_string($mysqli, Auth::user()->email)." or type='PUBLIC'";
    //echo $sql;
    return simpleQ($mysqli, $sql);
}

/*
id
* int(11)   No None AUTO_INCREMENT Change Change  Drop Drop  Browse distinct values Browse distinct values  Show more actions More
* 2
* user_owner_id
* int(11)   No None  Change Change  Drop Drop  Browse distinct values Browse distinct values  Show more actions More
* 3
* user_guest_id
* int(11)   No None  Change Change  Drop Drop  Browse distinct values Browse distinct values  Show more actions More
* 4
* confirmed_email
*/

function unzip_file($file, $destination) {
    // Créer l'objet (PHP 5 >= 5.2)
    $zip = new ZipArchive() ;
    // Ouvrir l'archive
    if ($zip->open($file) !== true) {
        return "Impossible d'ouvrir l'archive";
	}
    // Extraire le contenu dans le dossier de destination
    $zip->extractTo($destination);
    // Fermer l'archive
    $zip->close();
    // Afficher un message de fin
    echo 'Archive extrait';
}

// Exemple d'utilisation
unzip_file('archive.zip', '/archive-destination/');
