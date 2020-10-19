<?php

use Corcel\Model\Post;

// All published posts
$posts = Post::published()->get();

foreach ($posts->all() as $post)
	{
		?>
<a href="{{ asset("wordpress/id/". $post->ID) }}"><?php echo $post->title; ?></a><br>

<?php
        }
