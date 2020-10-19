<?php

use Corcel\Model\Post;

// All published posts
$post = Post::all()->find($id);

$post_content = str_replace("\n", "<br/ >", $post->post_content);
?>
<a href="{{ asset("wordpress/page/1") }}"><?php echo $post->title; ?></a><br>

<?php

echo $post_content;
