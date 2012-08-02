
<h1>Custom fields module</h1>
<h2>


<?php print option_get('form_title', $params['id']) ?></h2>



<?
 
 //$more = 	$more =  get_instance()->core_model->getCustomFields ( false,  $params['id'], 1,0,1);

 

  $more = get_custom_fields($params['id']); 

// p( $more);
?>


<? if(!empty($more )): ?>
 <? foreach($more  as $field): ?>
 
 
 <?
 
 print  make_field($field);
  //make_field($field['id']);
 
 // p( $field); ?>
 
 
 <? endforeach; ?>
 <? endif; ?>
