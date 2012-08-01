<?
// p($params);
 $module_id = $params['id'];
$rand = rand();

  
?>
 
 
 <button onclick="make_new_field()" value="make_new_field()">make_new_field()</button>
<div  class="custom-fields-form-wrap custom-fields-form-wrap-<? print $rand ?>" id="custom-fields-form-wrap-<? print $rand ?>"></div>






<script type="text/javascript">


function make_new_field(){
					$('#custom-fields-form-wrap-<? print $rand ?>').load('<? print site_url('api/forms/make_field/settings:y/for_module_id:') ?><? print $params['module_id']; ?>');

	
}

			$(document).ready(function(){
				
				
			//make_new_field()
		 
			});
</script>










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