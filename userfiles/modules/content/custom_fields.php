<? if(POST_ID): ?>

<editable  post="<? print PAGE_ID ?>" field="custom_field_product_inner_custom_fields_title">
  <h4>Item properties</h4>
</editable>
<?  // p( $params); ?>
<? 
 $fields = get_custom_fields_for_content(POST_ID);
 $fields2 = get_custom_fields_for_content(PAGE_ID);
  $fields3 =get_custom_fields_config_for_content(POST_ID);
 
 //$fields = array_merge($fields,$fields2);
// p($fields3);
 if(!empty($fields3)){
		 $fields =  $fields3;
		   }
  //p($fields3);
 if(!empty($fields)){
	 
	 ?><div class="custom_fields_holder"><?
	 
	foreach($fields as $field){
		 //p($field);
		?><div class="custom_field"><?
		//if($field['config'] != false){ ?>
<? /*<mw module="content/custom_field" name="<? print $field['custom_field_name']  ?>" value="<? print $field['custom_field_value']  ?>" />*/ ?>


<?  if(intval(POST_ID) > 0 ): ?>

	<?
	
	
	if(($field["content_type"] == 'post')) :
	
	
	//p($field);
	?>
    <microweber module="content/custom_field" cf_id="<? print $field['id'] ?>" module_id="custom_field_<? print PAGE_ID ?><? print POST_ID ?><? print $field['id'] ?>" />

    
    <? endif; ?>

<? else: ?>

<microweber module="content/custom_field" cf_id="<? print $field['id'] ?>" module_id="custom_field_<? print PAGE_ID ?><? print POST_ID ?><? print $field['id'] ?>" />


<? endif; ?>






<?	//}
	?></div><?
	}
?></div><?
 }
 
 
 

 ?>
<? endif; ?>
