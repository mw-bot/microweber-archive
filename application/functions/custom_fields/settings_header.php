<? $rand = rand(); 

$rand = round($rand);   ?>



 
<script type="text/javascript">


function save_cf_<? print $rand ?>(){
				 
	
	var serializedForm = serializedForm = $("#custom_fields_edit<? print $rand ?>").serializeArray();

$.post("<? print site_url('api/forms/save_field') ?>", 
   serializedForm, function(data) 
        {
            
        });
	
	
}

		 
</script>



<form class="form-horizontal" id="custom_fields_edit<? print $rand ?>" >
<fieldset>
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
