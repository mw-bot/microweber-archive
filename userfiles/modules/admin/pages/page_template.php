<script type="text/javascript">

$(document).ready(function() {
set_template()

	//call_layout_config_module();
});

function set_template(){

	//mw.reload_module('admin/pages/layout_and_category');
	data1 = {}
						   data1.module = 'admin/'+'pages/layout_and_category';
						   data1.id ='<? print $params['id']; ?>';
						  
						   data1.active_site_template = $('#active_site_template').val();
						// data1.type =  $("#media_type").val();
							
						  $('#layout_and_category_holder').load('<? print site_url('api/module') ?>',data1);
						  
						  
						  
						  
						  
}

</script>

<h3>Choose template</h3>

<? $layouts = CI::model('template')->templatesList();  ?>
<? if(!empty($layouts)): ?>
<select name="active_site_template" id="active_site_template">
<option onclick="set_template()">Default</option>
<? foreach($layouts as $layout): ?>
<? if($layout['screenshot']): ?>
<!-- <a href="<? print $layout['screenshot'] ?>"> <img src="<? print $layout['screenshot'] ?>" height="100" /></a>-->
<? endif; ?>

<option onclick="set_template()" value="<? print $layout['dir_name'] ?>"><? print $layout['name'] ?></option>



<? print $layout['name'] ?> <? print $layout['description'] ?>
<? endforeach; ?>

</select>
<? endif; ?>

<div id="layout_and_category_holder"></div>
 