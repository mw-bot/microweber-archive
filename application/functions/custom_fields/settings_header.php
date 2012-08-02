<? $rand = rand(); 

$rand = round($rand);


$is_for_module = url_param('for_module_id',1);

 // var_dump($is_for_module);


   ?>
<script type="text/javascript">


function save_cf_<? print $rand ?>(){
 	var serializedForm = serializedForm = $("#custom_fields_edit<? print $rand ?> :input").serialize();
	$.post("<? print site_url('api/forms/save_field') ?>",    serializedForm, function(data)         {
        });
}

		 
</script>

<div class="form-horizontal" id="custom_fields_edit<? print $rand ?>"  >
<fieldset>
<? if($is_for_module != false): ?>
<input type="text" name="to_table" value="table_modules" />
<input type="text" name="to_table_id" value="<? print strval($is_for_module) ?>" />
<? endif; ?>
<div class="control-group">
  <label class="control-label" for="input_field_label<? print $rand ?>">Field label</label>
  <div class="controls">
    <input type="text" class="input-xlarge" name="custom_field_name" id="input_field_label<? print $rand ?>">
  </div>
</div>
<div class="control-group">
  <label class="control-label" for="select_custom_field_type<? print $rand ?>">Field type</label>
  <div class="controls">
    <select id="select_custom_field_type<? print $rand ?>" name="custom_field_type">
      <option value="text">text</option>
      <option value="dropdown">dropdown</option>
    </select>
  </div>
</div>


 