<?php
/**
 * Created by PhpStorm.
 * User: manue_001
 * Date: 20-08-15
 * Time: 13:42
 */
?>
<div class="container">
    <label for="noteView"></label>
            <textarea id="noteView">
            @yield('note/noteContent', $noteId)
            </textarea>
</div>
