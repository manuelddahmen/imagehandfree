<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 23-03-16
 * Time: 03:26
 *
 * function typeDB($filename, $content_file, $id, &$rowdoc = NULL)
 * * $filename
 * $content_file
 * $id
 * $rowdoc
 * Variable prédifinies
 */
$urlaction = URL::to("note/list/$id/1");
?>
<!-- Vue Fichier -->
<div class='vue_fichier_vue_normale'>
    <div class="nom_fichier" id="idFichier<?php echo "data$id"; ?>">
        <div id="<?php echo "data$id"; ?>" class="menu_icons">

            <img id="plus_button_<?php echo $id; ?>" onclick="showMenu('<?php echo "$id"; ?>');"
                 src="{{asset("images/plus.png")}}" class="visible"/>
            <img id="moins_button_<?php echo $id; ?>" onclick="hideMenu('<?php echo "$id"; ?>');"
                 src="{{asset("images/moins.png")}}" class="invisible"/>
            <ul class="onfile_actions invisible" id="ul<?php echo "$id"; ?>">
                <li><a href="<?php echo asset("note/view/" . $id) ?>">Voir</a></li>
                <!-- note/view demande un login de plus!-->
                <li><a href="<?php echo asset("note/edit/" . $id); ?>">Modifier</a></li>
                <li><a href="<?php echo asset("file/download/" . $id); ?>">T&eacute;l&eacute;charger</a></li>
                <li><a href="<?php echo asset("note/delete/" . $id); ?>">Supprimer</a></li>
            </ul>
        <!--<label class="owner"><?php isset($username) ? $username : ""?></label>-->
            <label class="nom_fichier" title="<?php echo $filename ?>"
                   onclick="go('<?php echo asset("note/view/" . $id) ?>')"><?php echo $filename ?></label>
        </div>
        <span class="nom_fichier"><input class="menu_icons" type="checkbox" id="<?php echo $id; ?>"
                                         title="Select for action"><?php
            echo $filename . "|" . $id;
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
             alt="<?= $filename ?>" {{"title='Fichier: $filename;'"}} />
        <?php
        } else
        if (isVideo(getExtension($filename), $mime)) { ?>
        <img class="type_icon" src="<?php echo URL::to(
                asset("images/mime-types/videoFlow.png")); ?>"
             alt="<?= $filename ?>" {{"title='Fichier: $filename;'"}} />
        <?php
        } else
        if (isTexte(getExtension($filename), $mime)) {
        ?>
        <span class='typeTextBlock'
              title='Fichier: {{$filename}}'><?= htmlspecialchars(substr($content_file, 0, 500)) ?></span> <?php
        } else if ($isDirectory == 1 || $mime == "directory") {
        ?><a href="<?= $urlaction ?>"><img
                    src='<?php echo asset("images/dossier.png") ?>' class="miniImg"
                    alt="Dossier: <?php echo $filename; ?> {{"title='Fichier: $filename;'"}} "
            ></a><?php
        } else {
        ?>
        <img src='http://www.stdicon.com/humility/<?= $mime ?>' {{"title='Fichier: $filename;'"}} />
        <?php
        }
        ?>
    </div>
</div>