<?
//p($params);
$cf_cfg = array ();

if(intval($params['id'] ) == 0){
	 $params ['id'] = ($params['cf_id'] ) ;	
	
}
 if($page_data != false){
$cf_cfg ['page_id'] = $page_data['id'];				 
		} 
		
		
		
		if(intval($params['post_id']) > 0){
			
			$cf_cfg ['post_id'] = $params['post_id'];
			
		}
		
		
		
		
	 if($params['id'] != false){
		 
		  if(intval($params['id'] ) == 0){
			 $new = true;
			
		 }

		 
		 
$cf_cfg ['id'] = ($params['id'] ) ;				 
		} 	
		if(intval($cf_cfg ['id'] )== 0){
			  $cf_cfg ['id'] = ($params['cf_id'] ) ;	
		}
		   
		 
//p($cf_cfg);		




$data =  CI::model('core')->getCustomFieldsConfig($cf_cfg);


if(empty($data )){
	if(intval($params['post_id']) > 0){
		if(intval($cf_cfg['id']) > 0){
			$cf_cfg2 = array ();
			unset($cf_cfg['post_id']);
			$data =  CI::model('core')->getCustomFieldsConfig($cf_cfg);
			$new_for_post = true;
		}		
	}
}

//p($data);
?>
<script type="text/javascript">
function save_cf($form_id){
	  data1 = ($('.'+$form_id).serialize());
	  $.ajax({
	  type: 'POST',
	  url: '<? print site_url('api/content/save_cf') ?>',
	  data: data1,
	   success: function(){
   mw.reload_module('admin/content/custom_fields');
   
   mw.reload_module('content/custom_fields');
   
   
  },
	 
	  dataType: 'html'
	});
	  

	
//	 $.ajax({
//  url: '<? print site_url('api/content/save_cf'); ?>',
//   type: "POST",
//      data: (data1),
//      
//      async:true,
//	  success: function(resp) {
//		  $("#cf_save_resp").html(resp);
//		  mw.reload_module('admin/content/custom_fields_editor');
//		
//	  }
//    });
	

}


function delete_cf($form){
	
$f = '#'+$form;
	 data1 = ($($f).serialize());
	 
//	 data1=data1+'&module=admin/content/custom_fields_creator';
//	  data1=data1+'&page_id=<? print $params['page_id'] ?>';
//	   data1=data1+'&delete=true';
//	 
//	//alert(data1);
//	
//	 $.ajax({
//  url: '<? print site_url('api/module'); ?>',
//   type: "POST",
//      data: (data1),
//      dataType: "html",
//      async:true,
//	  success: function(resp) {
//		  $("#cf_save_resp").html(resp);
//		    $($f).fadeOut();
//	  }
//    });
//	

	 
	 
	//alert(data1);
	
	 $.ajax({
  url: '<? print site_url('api/content/delete_cf'); ?>',
   type: "POST",
      data: (data1),
      dataType: "html",
      async:true,
	  success: function(resp) {
		  $("#cf_save_resp").html(resp);
		    $($f).fadeOut();
			 mw.reload_module('admin/content/custom_fields');
			  mw.reload_module('content/custom_fields');
	  }
    });
	
	
	
  

}
<? 
if($new == true){
	$data2 = array();
$data2[] = array();	
$data = $data2;
}
?>
</script>
<? foreach($data as $item): ?>

<form class="cf_form" action="" method="post" id="cf_form_<? print $item['id'] ?>">
  <? if($new_for_post == false): ?>
  <input name="id" type="hidden" class="cf_form_<? print $item['id'] ?>" value="<? print $item['id'] ?>" />
  <? endif;  ?>
  
  <input name="field_order" type="hidden" class="cf_form_<? print $item['id'] ?>" value="<? print $item['field_order'] ?>" />
  
  
  
  
  <? if(intval($params['post_id'])> 0 ): ?>
  <input name="post_id" type="text" class="cf_form_<? print $item['id'] ?>"  value="<? print $params['post_id'] ?>" />
  <?  else:  ?>
  <input name="page_id" type="text" class="cf_form_<? print $item['id'] ?>"  value="<? print $params['page_id'] ?>" />
  <? endif;  ?>
  <div class="formitem">
    <label>Name:</label>
    <span class="formfield">
    <input name="name" type="text" class="cf_form_<? print $item['id'] ?>" value="<? print $item['name'] ?>"  />
    </span> </div>
  <div class="formitem">
    <label>Group:</label>
    <span class="formfield">
    <input name="param_group" type="text" class="cf_form_<? print $item['id'] ?>" value="<? print $item['param_group'] ?>"  />
    </span> </div>
  <div class="formitem">
    <label>Help:</label>
    <span class="formfield">
    <input name="help" type="text" class="cf_form_<? print $item['id'] ?>" value="<? print $item['help'] ?>"  />
    </span> </div>
  <div class="formitem">
    <label>Content Type:</label>
    <span class="formfield">
    <select name="content_type" class="cf_form_<? print $item['id'] ?>">
      <option <? if(($item['content_type']) == 'page') :  ?>  selected="selected" <? endif; ?> value="page">page</option>
      <option  <? if(($item['content_type']) == 'post') :  ?>  selected="selected" <? endif; ?> value="post">post</option>
      <option  <? if(($item['content_type']) == 'category') :  ?>  selected="selected" <? endif; ?> value="category">category</option>
      <option  <? if(($item['content_type']) == 'media') :  ?>  selected="selected" <? endif; ?> value="media">media</option>
    </select>
    </span> </div>
  <div class="formitem">
    <label>Type: </label>
    <span class="formfield">
    <input name="type" type="text" class="cf_form_<? print $item['id'] ?>" value="<? print $item['type'] ?>"  />
    </span> </div>
  <div class="formitem">
    <label>Type:</label>
    <select name="type" class="cf_form_<? print $item['id'] ?>">
      <option <? if(($item['type']) == 'text') :  ?>  selected="selected" <? endif; ?> value="text">text</option>
      <option <? if(($item['type']) == 'textarea') :  ?>  selected="selected" <? endif; ?> value="textarea">textarea</option>
      <option  <? if(($item['type']) == 'richtext') :  ?>  selected="selected" <? endif; ?> value="richtext">richtext</option>
      <option  <? if(($item['type']) == 'dropdown') :  ?>  selected="selected" <? endif; ?> value="dropdown">dropdown</option>
      <option  <? if(($item['type']) == 'radio') :  ?>  selected="selected" <? endif; ?> value="radio">radio</option>
      <option  <? if(($item['type']) == 'checkbox') :  ?>  selected="selected" <? endif; ?> value="checkbox">checkbox</option>
      <option  <? if(($item['type']) == 'date') :  ?>  selected="selected" <? endif; ?> value="date">date</option>
      <option  <? if(($item['type']) == 'category_selector') :  ?>  selected="selected" <? endif; ?> value="category_selector">category_selector</option>
      <option  <? if(($item['type']) == 'image') :  ?>  selected="selected" <? endif; ?> value="image">image</option>
    </select>
  </div>
  <div class="formitem">
    <label>Param:</label>
    <span class="formfield">
    <input name="param" type="text" class="cf_form_<? print $item['id'] ?>" value="<? print $item['param'] ?>"  />
    </span> </div>
  <div class="formitem">
    <label>Param values:</label>
    <span class="formfield">
    <input name="param_values" class="cf_form_<? print $item['id'] ?>" type="text" value="<? print $item['param_values'] ?>"  />
    </span> </div>
  <div class="formitem">
    <label>Param default: </label>
    <span class="formfield">
    <input name="param_default" class="cf_form_<? print $item['id'] ?>" type="text" value="<? print $item['param_default'] ?>"  />
    </span> </div>
  <input class="btn" name="save"  value="save <? print $item['id'] ?>" type="button" onClick="save_cf('cf_form_<? print $item['id'] ?>')" />
  <? if(($item['id']) != false) :  ?>
  <input class="btn" name="delete" value="delete <? print $item['id'] ?>" type="button" onClick="delete_cf('cf_form_<? print $item['id'] ?>')" />
  <? endif; ?>
</form>
<? endforeach; ?>
