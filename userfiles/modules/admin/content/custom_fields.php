<?



//p($params);

$temp = $params['base64'];
if($temp){
$base64_val_for_insert = decode_var($temp)	;
} else {
	$base64_val_for_insert = false;
}

$temp = $params['parent_base64_params'];
if($temp){
$parent_params = decode_var($temp)	;

if(!empty($parent_params)){
if($params['page_id'] == false){
	$params['page_id'] = $parent_params['page_id'];
}

if($params['post_id'] == false){
	$params['post_id'] = $parent_params['post_id'];
	
	

	
}
}



} else {
	$parent_params = false;
}




if(($params['post_id'] != false)){
		$page_data = get_page_for_post($params['post_id']);
		//$params['page_id'] = $page_data['id'];
		
			$cf_post =  CI::model ( 'core' )->getCustomFields('table_content', $params['post_id'], $return_full = false);
			
			$cf_post_config = array();
				$cf_post_config['post_id'] = $params['post_id'];
				//$cf_post_config =  CI::model('core')->getCustomFieldsConfig($cf_post_config);
				$cf_post_config =get_custom_fields_config_for_content($params['post_id'], $params['page_id']);

	// p($cf_post_config );
		
		}

 
if(($params['page_id'])) :  ?>
<?

 



?>
<? $page_data = get_page($params['page_id']);  ?>
<? 


$cf_cfg = array ();
 if($page_data != false){
		
$cf_cfg ['page_id'] = $page_data['id'];
								 
		} 




$data =  CI::model('core')->getCustomFieldsConfig($cf_cfg);
if(empty($data)){
	
	if(intval($page_data['content_parent']) > 0){
	$cf_cfg = array ();
	
	$cf_cfg ['page_id'] = $page_data['content_parent'];
	$data =  CI::model('core')->getCustomFieldsConfig($cf_cfg);
	
	}
	
	$temp_p = $page_data['content_parent'];
	if(empty($data)){
		
		
		$page_data_par = get_page($temp_p );
		if(!empty($page_data_par)){
		$cf_cfg = array ();
		$cf_cfg ['page_id'] = $page_data_par['content_parent'];
		$data =  CI::model('core')->getCustomFieldsConfig($cf_cfg);
		
			
		}
		
	}
	
	
}
 //p($cf_cfg);
 // p($page_data);

if(!empty($cf_post_config)){
	foreach($cf_post_config as $cf_post_conf){
		$j1 = 0;
		
		foreach($data as $d){
			
			
		
		
		
		
		 if($d["name"] == $cf_post_conf["name"]){
			 
			 if($d["id"] != $cf_post_conf["id"]){
			
			//  p($d);
			//  p($cf_post_conf);
			unset($data[$j1]);
				if(($params['post_id'] != false)){
				if(($d["content_type"] == 'post')){
				 $data[] = $cf_post_conf;
				}
			} else {
				$data[] = $cf_post_conf;
			}
		
		
		
			
			
			 }
			 
		 }

		$j1++;
		
		}
	}
	
	
	
	
	foreach($cf_post_config as $cf_post_conf){
		$f = false;
		foreach($data as $d){
		 if($d["name"] == $cf_post_conf["name"]){
			 $f = true;
			 
		 }
		 
		  if($d["id"] == $cf_post_conf["id"]){
			 $f = true;
			 
		 }
		 
		 if(($params['post_id'] != false)){
				if(($d["content_type"] != 'post')){
				//  $f = true;
				}
		 }
		
		 
		}
		 if($f == false){
			 
			 
			 $data[] = $cf_post_conf;
			 
		 }
	}
	
	
	
	
}
 
 


if($base64_val_for_insert != false){
//	$data[] = $base64_val_for_insert;
} else {
	//$data[] = array();
	
}


 

//p( $cf_post_conf);
?>
<script type="text/javascript">
function edit_cf_config($id, $post_id){
	data1 = {}
	data1.module = 'admin/content/custom_fields_editor';
	data1.id =$id;
	data1.cf_id =$id;
	data1.page_id = '<? print $params['page_id'] ?>';
	 
	
	<? if(intval($params['post_id']) > 0): ?>
	data1.post_id = '<? print $params['post_id'] ?>';
	<? endif;  ?>
		data1.for_post = $post_id;

	
//	$('#edit_cf_config_resp').load('<? print site_url('api/module') ?>',data1);
	
	$('.cf_edit_resp').html('');
	
	
	
	
	$('#cf_edit_btn_id_'+$id).fadeOut();
	
	$('#cf_edit_resp_id_'+$id).load('<? print site_url('api/module') ?>',data1);
	$('#cf_edit_resp_id_'+$id).show();
}



function click_on_cf_config($id){
	 $($id).click();
}
 
 
 









$(document).ready(function() {
		$(".cf_order_table<?  print $params['element_id'] ; ?>").sortable({
																		  
																		  
																	items: '.cf_item_sotable',	  
																		  
																		  stop:function(i) {
			$.ajax({
			type: "post",
			url: "<? print site_url('api/content/cf_reorder'); ?>",
			data: $(".cf_order_table<?  print $params['element_id'] ; ?>").sortable("serialize"),
			 success: function(){
					mw.reload_module('admin/content/custom_field');
			  mw.reload_module('content/custom_fields');
				  }
			
			
			
			
			
			
			
			});
			
		}});

});
</script>
<? //p($cf_post); ?>
<?  //  p($params); ?>
<? if($params['element_id']) : ?>

<span class="mw_sidebar_module_box_title">Edit custom fields</span>
<div class="mw_admin_rounded_box">
  <div class="mw_admin_box_padding">
    <? else: ?>
    <h2>Custom fields</h2>
    <? endif; ?>
    <a class="btn" href="javascript:edit_cf_config('new')">Add new custom field</a> <br />
    <br />
    <div id="cf_edit_resp_id_new"></div>
    <? $data_for_table = array(); ?>
    <? foreach($data as $cf): ?>
    <?
   
   if((intval($cf['post_id']) > 0)  and (intval($cf['page_id']) == 0)){
$data_for_table['local'][] = $cf;

   } else {
	   
   }
   
   
   
   
   ?>
    <? endforeach; ?>
    <? foreach($data as $cf): ?>
    <?
   
   if((intval($cf['post_id']) == 0)  and (intval($cf['page_id']) != 0)){





	   $skip = false;
	    foreach($data_for_table['local'] as $check){
			
			
			if($check['custom_field_name'] ==  $cf['param']  ){
				
				 $skip = true;
			}
			
			if($check['param'] ==  $cf['custom_field_name']  ){
				
				 $skip = true;
			}
			
			
			if($check['param'] ==  $cf['param']  ){
				
				 $skip = true;
			}
			
			
		}
	   
	   if($skip  == false){
		   // p($cf);
			// p($check);
			
 
	$data_for_table['global'][] = $cf;   
	   }











   } else {
	   
   }
   
   
   
   
   ?>
    <? endforeach; ?>
    <? 









//p($data_for_table);



$i = 0;
  foreach($data_for_table['local'] as $check){
	  
		 
			 $j = 0;
			   foreach($data_for_table['global'] as $check2){
				   
				   
				  
				   if($check['custom_field_name'] != false  and $check2['param'] != false  ){
					   if($check['custom_field_name'] ==$check2['param']){
						 //  $data_for_table['global'][$j] = false;
						  
						  //p($check2['param']);
						   
					   }
				   }
				   
				      if($check['custom_field_name'] != false  and $check2['custom_field_name'] != false  ){
							   if($check['custom_field_name'] ==$check2['custom_field_name']){
							//  $data_for_table['global'][$j] = false;
								  //  p($check['custom_field_name']);
								//   p($check['param']);
								//   p($check2['param']);
							//	  p($check);
							//   p($check2);
							 //  p(  $data_for_table['global'][$j]);
							///	   
							   }
					  }
				     if($check['param'] != false  and $check2['custom_field_name'] != false  ){
				   if($check['param'] ==$check2['custom_field_name']){
					 // $data_for_table['global'][$j] = false;
					   // p($check['custom_field_name']);
				
					   
				   }
					 }
				    if($check['param'] != false  and $check2['param'] != false  ){
				   if($check['param'] ==$check2['param']){
				// $data_for_table['global'][$j] = false;
					 //  p($check);
					  // p($check2);
					   
				   }
					}
				    $j++;
			   }
			 
			$i++; 
		 }















?>
    <? foreach($data_for_table as $k => $data): ?>
    <? if( is_array($data) and !empty($data) and !empty($data[0])): ?>
    <table width="100%" border="0" class="custom_fields_table cf_order_table<?  print $params['element_id'] ; ?>"      cellpadding="0" cellspacing="0">
       <tr style="display:none">
        <th width="200">Name</th>
        <th width="200">Value</th>
        <th width="200">Group</th>
        <th> </th>
      </tr>
      <? foreach($data as $cf): ?>
      <? if($cf['name'] != ''): ?>
      <tr class="cf_item_sotable" id="cf_id_<? print $cf['id'] ?>" >
        <td><?  // p($cf); ?>
          <strong class="blue"><? print $cf['name'] ?></strong>
          <? if(trim($cf['help']) != ''): ?>
          <br />
          <? print $cf['help'] ?>
          <? endif; ?>
          <br />
          <!--    <span class="gray" title="group"><? print $cf['param_group'] ?></span> <br />-->
          <span class="gray" title="content type"><? print $cf['content_type'] ?></span></td>
        <td ><? 
	
	
	//p($data);
	
	
	/*	<? if(!empty($cf_post)): ?>
          <? $check_vals =  $cf_post[$cf['name']] ; 
	if(trim($check_vals) == ''){
	$check_vals  = 	$cf['param_default'];
		
	}
	
	
	?>
    
    
    
        
        
        
          <microweber module="forms/field"  name="custom_field_<? print $cf['name'] ?>" type="<? print $cf['type'] ?>" values="<? print $cf['param_values'] ?>" cf_id="<? print $cf['id']; ?>"  value="<? print $check_vals ?>" >
          <? else: ?>
          <microweber module="forms/field"  name="custom_field_<? print $cf['name'] ?>" type="<? print $cf['type'] ?>" values="<? print $cf['param_values'] ?>"  cf_id="<? print $cf['id']; ?>"  value="<? print $cf['param_default'] ?>" >
          <? endif; ?>*/
	
	?>
          <microweber module="content/custom_field"  name="custom_field_<? print $cf['name'] ?>" cf_id="<? print $cf['id'] ?>" ></td>
        <td><span class="gray" title="group"><? print $cf['param_group'] ?></span></td>
        <td><? if($params['post_id']): ?>
          <? if(intval($item['post_id'])): ?>
          <a class="xbtn"  id="cf_edit_btn_id_<? print $cf['id'] ?>" href="javascript:edit_cf_config('<? print $cf['id']; ?>', '<? print $params['post_id'] ?>')">Edit</a>
          <? else : ?>
          <a class="xbtn"  id="cf_edit_btn_id_<? print $cf['id'] ?>" href="javascript:edit_cf_config('<? print $cf['id']; ?>', '<? print $params['post_id'] ?>')">Edit</a>
          <? endif; ?>
          <? else : ?>
          <a class="xbtn"  id="cf_edit_btn_id_<? print $cf['id'] ?>" href="javascript:edit_cf_config('<? print $cf['id']; ?>', '')">Edit</a>
          <? endif; ?>
          <div id="cf_edit_resp_id_<? print $cf['id'] ?>"  class="cf_edit_resp"></div></td>
      </tr>
      <? endif; ?>
      <? endforeach; ?>
    </table>
    <? endif; ?>
    <? endforeach; ?>
    <? if($params['element_id']) : ?>
  </div>
</div>
<? endif; ?>
<? endif; ?>
