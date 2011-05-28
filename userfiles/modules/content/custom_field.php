<?  

//p( $params); 




$cf_cfg = array ();
								
								
								if($params['name']){
								$cf_cfg ['name'] =  $params['name'];
								$cf_cfg = CI::model('core')->getCustomFieldsConfig ( $cf_cfg );
								}
								
								if($params['cf_id']){
							 $cf_from_id =  CI::model('core')->getCustomFieldById ( $params['cf_id'] );
							 if(!empty( $cf_from_id )){
									   
									   
									   
									   $cf_cfg1 = array ();
									   $cf_cfg1 ['post_id'] =  $cf_from_id['to_table_id'];
									    $cf_cfg1 ['param'] =  $cf_from_id['custom_field_name'];
										 //    p( $cf_cfg1);
									   $cf_cfg1 = CI::model('core')->getCustomFieldsConfig ( $cf_cfg1 );
										   if(!empty( $cf_cfg1 )){
											 
											   $cf_cfg = ( $cf_cfg1);
											   $cf_cfg['default'] = $cf_from_id['custom_field_value'];
										   } else {
											   
											     $cf_cfg1 = array ();
												 $page_for_post = get_page_for_post( $cf_from_id['to_table_id']);
									   $cf_cfg1 ['page_id'] =  $page_for_post['id'];
									    $cf_cfg1 ['param'] =  $cf_from_id['custom_field_name'];
										 //    p( $cf_cfg1);
									   $cf_cfg1 = CI::model('core')->getCustomFieldsConfig ( $cf_cfg1 );
									    if(!empty( $cf_cfg1 )){
											 
											   $cf_cfg = ( $cf_cfg1);
											    $cf_cfg['default'] = $cf_from_id['custom_field_value'];
										   }
											   
										   }
									   
									   }
									   
									 
							 
								} else {
									
								}
								
								
								$cf_cfgc = array ();
									$cf_cfgc ['id'] =  $params['cf_id'];
									//p($cf_cfgc);
								$cf_cfgc = CI::model('core')->getCustomFieldsConfig ( $cf_cfgc );
								 if(!empty( $cf_cfgc )){
											 
											   $cf_cfg = ( $cf_cfgc);
											   
										   }
								
								
								
								
								
								
								
								
							
								
								if (! empty ( $cf_cfg )) {
									$cf_cfg = $cf_cfg [0];
									
									
										if($params['value'] == false){
											
											$params['value'] = $cf_cfg['param_default'];
									
								}
									
			$this->template ['data'] = $cf_cfg;
			$this->template ['params'] = $params;
			$this->load->vars ( $this->template );
			$dir =  dirname(__FILE__).'/views/custom_fields/';
			$dir = normalize_path($dir);
			 $is_file = $dir.$cf_cfg['type'].'.php';
			 if(is_file($is_file)){
				 $is_file1 = $this->load->file ( $is_file, true );
				 print $is_file1;
			 } else {
				 
				 ?>

<span><? print $cf_cfg['help'] ?>: 
<input name="custom_field_<? print $cf_cfg['param'] ?>" value="<? print  $params['value']   ?>" type="hidden">
</span> <? print  $params['value']   ?>
<?
			 }
		//	$content_filename = $CI->load->file ( $try_file1, true );
			//
									
									
									
									
									// p($cf_cfg);
								}
								
								
								

?>
