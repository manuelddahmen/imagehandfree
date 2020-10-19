@extends("master")
@section('title', 'Statistiques personnelle de l\'utilisateur')
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
$sql = "select count(*) as total from bn2_users where email='" . Auth::user()->email . "'";
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
$sql = "select count(*) as total from bn2_filesdata where username='" . Auth::user()->email . "' ";
$result = mysqli_query($mysqli, $sql);
if ($result == null) {
    $f = 0;
} else {
    $arr = mysqli_fetch_assoc($result);
    $f = $arr[('total')];
}

?>
@section('master_begin_headers')
@show



@section('header')
    <script language="JavaScript">
        mixpanel.track("Statistiques totale de la webapp.{'User': '{{  Auth::user()->email }}'});
    </script>

@show


@section("master_begin_body")
@show

@section('sidebar')


@show


@section('master_finish_sidebar')
@show


@section("master_begin_content")
@show



@section('content')

    <h2>Nombre total d'utilisateurs</h2>
    <?php echo $N; ?>


    <h2>Nombre total d'objets en base de données (attention il y en a aussi @TODO sur le DD)</h2>
    <?php echo $f; ?>

@show


@section("master_finish_body")
@show
