 <? $edit = url_param('edit'); ?>
<nav id="secondary">
  <ul>
    <li class="current"><a href="#maintab">Active ads</a></li>
    <li><a href="#secondtab">Post new</a></li>
  </ul>
</nav>
<!-- The content -->
<section id="content_tabs">
  <div class="tab" id="maintab">
    
    
    
    
    <? if($edit == false): ?>
    
    
    <h2>My job ads</h2>
    <? $posts = get_posts('items_per_page=5000&created_by='.user_id());
	
	// p( $posts);
	
	?>
    <? if(!empty($posts)): ?>
    <table class="datatable">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <? foreach($posts['posts'] as $post): ?>
        <tr>
          <td><? //p( $post); ?>
            <?  print $post['content_title_nohtml'] ?></td>
          <td><?  print character_limiter($post['content_body_nohtml'], 300) ?></td>
          <td><span class="button-group"> <a href="<? print site_url('members/view:posts/edit:') ?><?  print $post['id'] ?>" class="button icon edit">Edit</a> <a href="#" class="button icon remove danger">Remove</a> </span></td>
        </tr>
        <? endforeach; ?>
      </tbody>
    </table>
    <? else: ?>
    Create your first ad
    <? endif; ?>
    <? else: ?>
    <? include('post_edit.php'); ?>
    
    <? endif; ?>
    
    
    
    
    
    
    
    
    
    <div class="clear"></div>
  </div>
</section>
