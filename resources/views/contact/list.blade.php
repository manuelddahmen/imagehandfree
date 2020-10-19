@extends("master")
@section("title", "Listes des contacts")
<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 18-02-16
 * Time: 06:53
 */
?>

<?php
/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 13-09-16
 * Time: 13:27
 */

$N = 0;

?>
<?php
global $mysqli;
$sql = "select count(*) as total from bn2_users";
$result = mysqli_query($mysqli, $sql);
if ($result == null) {
    $N = 0;
} else {
    $arr = mysqli_fetch_assoc($result);
    $N = $arr[('total')];
}
?>

<?php
global $mysqli;
$sql = "select count(*) as total from bn2_filesdata";
$result = mysqli_query($mysqli, $sql);
if ($result == null) {
    $f = 0;
} else {
    $arr = mysqli_fetch_assoc($result);
    $f = $arr[('total')];
}

?>

@section('master_begin_headers')
    @parent
@show



@section('header')
    @parent
@show


@section("master_begin_body")
    @parent
@show

@section('sidebar')
    @parent


@show


@section('master_finish_sidebar')
    @parent
@show


@section("master_begin_content")
    @parent
@show

@section("content")
    @parent
    <?php



    $email = (Auth::user()->email);

    global $mysqli;
    $sql = "select guest_id as contacts from bn2_guest_filesdata where
guest_id='" . (Auth::user()->email) . "'";
    $result = mysqli_query($mysqli, $sql);
    echo "<h2>Fichers partagés (~copiés)</h2>";
    echo "<table>";
    $i = 0;
    while(($row = mysqli_fetch_assoc($result)) !== NULL)
    {
    $contact = $row["contacts"];
    $i++;
    ?>

    <tr>
        <td><?php echo $contacts?></td>
    </tr>

    <?php

    }
    echo "</table>";
    if ($i == 0) {
        echo "Cette liste est vide";
    }


    echo "<h2>Fichiers partagés avec droits d'accès</h2>";
    $sql = "select share_id as contacts from bn2_share inner join bn2_filesdata on bn2_filesdata.username= givee='" . $email . "'";
    $result = mysqli_query($mysqli, $sql);
    echo "<table>";
    $i = 0;
    while(($row = mysqli_fetch_assoc($result)) !== NULL)
    {
    $contact = $row["contacts"];
    $i++;
    ?>
    <tr>
        <td><?php echo $contacts; ?></td>
    </tr>

    <?php
    }
    if ($i == 0) {
        echo "Cette liste est vide";
        echo "</table>";

    }
    ?>
@show

@section("master_finish_body")
    @parent
@show
