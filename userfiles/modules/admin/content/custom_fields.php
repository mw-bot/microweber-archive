<?
// p($params);

if(isset($params['post_id'])){
$params['post_id'] = intval($params['post_id']);

}
$rand = rand();

$assign_custom_fields = date("ymdhis").$rand.md5(url());
 
?>
<?  if(intval($params['page_id']) == 0 or intval($params['post_id']) == 0):  ?>
<?  ?>

<input id="cf_temp" type="hidden"  name="cf_temp" value="<? print $assign_custom_fields ; ?>" />
<? endif; ?>
<?
$cf_temp = false;

if(intval($params['page_id']) == 0){
	//$params['page_id'] = $assign_custom_fields ;
	$cf_temp = "/temp:". $assign_custom_fields;
	
} else {
 
if(isset ($params['post_id'] ) and intval($params['post_id']) == 0){
//	$params['post_id'] = $assign_custom_fields ;
	$cf_temp = "/temp:". $assign_custom_fields;
} 
}


//p($params);
$js_params = false;
$cf_edit_params= false;
if(isset($params['post_id']) and strval($params['post_id'])!= ''){

$js_params = "&post_id=". $params['post_id'];
$cf_edit_params = "/post_id:". $params['post_id'];
}

if(intval($params['page_id']) != 0){
	$page = get_page($params['page_id']);
	if($page["content_layout_file"] != ""){
	$cf_files = TEMPLATE_DIR.DS.'layouts'.DS.$page["content_layout_file"];
	} else {
		$cf_files = TEMPLATE_DIR; 
	}
	$cf_files = normalize_path($cf_files);
	$cf_files = dirname($cf_files);
	$cf_files = $cf_files .DS;
	$cf_files  .= 'custom_fields.php';
	 
}

?>
 
 <button onclick="make_new_field()" value="make_new_field()">make_new_field()</button>
<div  class="custom-fields-form-wrap custom-fields-form-wrap-<? print $rand ?>" id="custom-fields-form-wrap-<? print $rand ?>">
   
  <? 
  
if(is_file($cf_files )){
include($cf_files);
}
	 ?>
     
     
     
     
</div>






<script type="text/javascript">


function make_new_field(){
					$('#custom-fields-form-wrap-<? print $rand ?>').load('<? print site_url('api/forms/make_field/settings:y/for_module_id:') ?><? print $params['for_module_id']; ?>');

	
}

			$(document).ready(function(){
				
				
			make_new_field()
		 
			});
</script>
