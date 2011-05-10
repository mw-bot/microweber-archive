
<? 

$elements = CI::model('template')->getDesignElements();

$showed_element_groups = array(); ?>
<div class="module_bar">
  <div class="sortable_modules">
    <? if(intval($params['page_id']) != 0): ?>
    <? endif ?>
    <? foreach($elements as $element): ?>
    <?
//	p($element);
	
 $element_group = explode(DIRECTORY_SEPARATOR ,$element['module']);
 $element_group = $element_group[0];

?>
    <? if(!in_array($element_group, $showed_module_groups))  : ?>
    <span class="mw_sidebar_module_group_title"><a href="#" class="mw_sidebar_module_group_title"><? print ($element_group); ?></a></span>
    <div class="mw_sidebar_module_group_div">
      <div class="mw_sidebar_module_group_div_roundtop"></div>
      <table  border="0" cellspacing="0" cellpadding="0" class="mw_sidebar_module_group_table">
        <? foreach($elements as $element2): ?>
        <?
		 $element_group2 = explode(DIRECTORY_SEPARATOR ,$element2['module']);
		 $element_group2 = $element_group2[0];
		?>
        <? if($element_group2 == $element_group)  : ?>
        <tr valign="middle">
          <td><? if($element_group2 == $element_group)  : ?>
            <div class="module_draggable mw_no_module_mask"  title="<? print addslashes($element2['description']); ?>">
              <div class="js_mod_remove">
                <? if($element2['icon']): ?>
                <div class="mw_sidebar_module_icon"> <img src="<? print $element2['icon'] ?>" height="24" style="float:left" /> </div>
                <? endif; ?>
                <div class="mw_sidebar_module_insert"></div>
                <? print $element2['name'] ?>
                <textarea id="md5_module_<? print md5($element2['module']) ?>" style="display: none"><? print $element2['module'] ?></textarea>
              </div> 
              <tag_to_remove_add_module_string element="<? print $element2['module'] ?>" />
            </div>
            <? endif; ?></td>
        </tr>
        <? endif; ?>
        <? endforeach; ?>
      </table>
      <div class="mw_sidebar_module_group_div_roundbottom"></div>
    </div>
    <br />
    <br />
    <? endif; ?>
    <?  $showed_element_groups[] = $element_group; ?>
    <? endforeach; ?>
  </div>
</div>
