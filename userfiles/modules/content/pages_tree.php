<? 
/*
//

example params - all are optional: 
ul_class="features_nav_big"
thumbnail="true"

*/

?>

<div class="pages-tree">
  <?php




 $from  =option_get('from', $params['module_id']);



if(intval( $from) == 0){
	$par =  CI::model('content')->getParentPagesIdsForPageIdAndCache($page['id']);
$last =  end($par); // last

if($last == 0){
$from = 	$page['id'];
} else {
	$from = 	$last;
}

}





	?>
  <ul class="<? print $params['ul_class'] ?> first_item">
    <li><a href="<? print page_link($from);?>"><? print page_title($from);?></a></li>
    <?
	if($params['thumbnail']){
 CI::model('content')->content_helpers_getPagesAsUlTree($from , "<a href='{link}'   {removed_ids_code}  {active_code}  value='{id}' ><img src='{tn}' >{content_title}</a>", array($form_values['content_parent']), 'class="active"', array($form_values['id']) , 'class="hidden"' , false, false, $params['ul_class'] );
 
	} else {
		
		 CI::model('content')->content_helpers_getPagesAsUlTree($from , "<a href='{link}'   {removed_ids_code}  {active_code}  value='{id}' >{content_title}</a>", array($form_values['content_parent']), 'class="active"', array($form_values['id']) , 'class="hidden"' , false, false, $params['ul_class'] );
	}

 ?>
  </ul>
</div>
