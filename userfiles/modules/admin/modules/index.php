modules admin
<?
 
$mod_params = array();
//$mod_params['debug']  = 1;
if(isset($params['reload_modules'])){
	
	 $mods = modules_list('skip_cache=1'); 
}
if(isset($params['category'])){
	
	 $mod_params['category'] = $params['category'];
}


 $mods = get_modules_from_db($mod_params); 
 if( $mods == false){
	  $mods = modules_list('skip_cache=1'); 
	  $mods = get_modules_from_db($mod_params); 
 }
//

 
?>
<ul>
  <? foreach($mods as $k=>$item): ?>
  <li>
  <module type="admin/modules/edit_module" data-module-id="<? print $item['id'] ?>" />
    <? // d($item); ?>
  </li>
  <? endforeach; ?>
</ul>