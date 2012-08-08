<?
 // p($params);
 $module_id = $params['id'];
$rand = rand();

  
?>

<h2>Tab 1 - Add field </h2>

<button onclick="mw_make_new_field('text')" value="mw_make_new_field('text')">mw_make_new_field('text')</button>
<div  class="custom-fields-form-wrap custom-fields-form-wrap-<? print $rand ?>" id="custom-fields-form-wrap-<? print $rand ?>"></div>









<script type="text/javascript">


function mw_make_new_field($type){
					$('#custom-fields-form-wrap-<? print $rand ?>').load('<? print site_url('api/forms/make_field/settings:y/for_module_id:') ?><? print $params['id']; ?>/type:'+$type);

	
}

			$(document).ready(function(){
				
				
			//make_new_field()
		 
			});
</script>




<module type="custom_fields" view="list" for_module_id="<? print  $module_id ?>" id="mw_custom_fields_list_<? print $params['id']; ?>" />

<h2>Tab 2 - settings</h2>
<fieldset>
  <legend>Field settings</legend>
  <div class="control-group">
    <label class="control-label">Form Title</label>
    <div class="controls">
      <input name="form_title" class="mw_option_field"   type="text" data-refresh="custom_fields"  value="<?php print option_get('form_title', $params['id']) ?>" />
      <p class="help-block">Supporting help text</p>
    </div>
  </div>
</fieldset>
