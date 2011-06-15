<? if (!empty($data)) : ?>
<? $val = $params['value']; 


if( $val == false){
	$val = $data['param_default']; 
	
}


if( $vals == false){
	$vals = $data['param_values']; 
	
	
}
if( $vals != false){
	$vals = explode(',',$vals);
}
?>
<? //p($vals); ?>
<? //p($data); ?>

 
  <select  <?  if( $data['help']) : ?> title="<?  print addslashes($data['help']);  ?>"   <? endif; ?> name="custom_field_<?  print $data['param'];  ?>" class="custom_field_<?  print $data['param'];  ?>">
    <? if(!empty($vals)) :?>
    <? foreach($vals as $val): ?>
    <option value="<? print $val  ?>"     <?  if( $data['param_default'] == $val) : ?> selected="selected"   <? endif; ?>      ><? print $val  ?></option>
    <? endforeach; ?>
    <? endif; ?>
  </select>
 
<?  endif; ?>
