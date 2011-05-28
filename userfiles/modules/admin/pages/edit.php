<?
$id = intval( $params['id']);


if($id != 0){

$form_values = get_page($id);
} else {
	$form_values = array();
}
//p($form_values);

if(intval($id) == 0){
	$try_parent = $params['content_parent'];
	if(intval($try_parent) == 0){
		$try_parent = url_param('content_parent');;
	}
	if(intval($try_parent) != 0){
	$form_values['content_parent'] = $try_parent;
	}


}
//p($form_values);

?>
<script type="text/javascript">
// prepare the form when the DOM is ready
$(document).ready(function() {
    var save_page_options = {
        type:      'post',
		dataType: 'json',
		url:       '<? print site_url('api/content/save_page') ?>' ,
        beforeSubmit:  save_page_showRequest,  // pre-submit callback
        success:       save_page_showResponse  // post-submit callback
    };

    $('#save_page_form').submit(function() {
        $(this).ajaxSubmit(save_page_options);
        return false;
    });

	//call_layout_config_module();
});

// pre-submit callback
function save_page_showRequest(formData, jqForm, options) {
    var queryString = $.param(formData);
	
	//alert(queryString); 
	 
	
	
			  
		
		  
		  
	
    return true;
}

// post-submit callback
function save_page_showResponse(responseText, statusText, xhr, $form)  {
	
	
	 //alert(responseText); 
//	. responseText = eval(responseText);
	$('.post_saved').fadeOut();
	$('#save_page_form').fadeOut();
	$('#save_page_done').fadeIn();
	
	 if(responseText.id != undefined){
	
	  $.get('<? print site_url('api/content/get_url');?>/id:'+responseText.id , function(data) {
   
   
   
  data123 = data + '/editmode:y';
  
  
   $('.saved_content_url').attr('href', data123);
    $('.saved_content_url').html(data);
  
  $('.saved_content_url_edit_again').attr('href', '<? print ADMIN_URL ?>/action:page_edit/id:'+responseText.id);
 
   
 
		});
		  
	 }
	
	
	
	
//document.getElementById('edit_frame').contentWindow.location.reload();


   // alert('status: ' + statusText + '\n\nresponseText: \n' + responseText +    '\n\nThe output div should have already been updated with the responseText.');
}
</script>

<div class="box radius">
  <div class="box_header radius_t">
    <input type="submit" value="Save changes" onclick="$('#save_page_form').submit()" class="sbm right post_saved" name="save">
    <? if(intval($form_values['id']) != 0): ?>
    <? endif; ?>
    <h2>Edit Page <em><? print $form_values['content_title'] ?></em></h2>
  </div>
  <div class="box_content">
    <div id="save_page_done" style="display:none"><br />
      <br />
      <br />
      <table width="100%" border="0" cellspacing="5" cellpadding="5" align="center">
        <tr>
          <td colspan="2"><h1>Your page is saved</h1>
            <br />
            <br />
            <br /></td>
        </tr>
        <tr>
          <td><strong>Click on the link to see the page</strong></td>
          <td><a class="sbm saved_content_url"  href=""><? print $form_values['content_title'] ?></a></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td><a  class="btn saved_content_url_edit_again" href="#">Edit again</a></td>
          <td><a class="btn" href="<? print ADMIN_URL ?>/action:pages">Back to pages</a></td>
        </tr>
      </table>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
    <form action="" method="post" id="save_page_form">
      <input name="id" id="id" type="hidden" value="<? print $form_values['id'] ?>" />
      <input name="page_id" id="page_id" type="hidden" value="<? print $form_values['id'] ?>" />
      <input name="content_type" type="hidden" value="page" />
      <mw module="admin/content/title_and_body" id="<? print $form_values['id'] ?>" />
      <br />
      <br />
      <br />
      <div id="orders_tabs" class="mw_box">
        <div class="mw_box_tab_content">
          <div class="shop_nav_main">
            <h2 class="box_title">Options</h2>
            <ul class="shop_nav">
              <li><a href="#tab=fragment-1"><img src="<? print $url_to_module_static ; ?>page_white_stack.png"  height="16" align="bottom" /><span>Layout and category</span></a></li>
              <li><a href="#tab=fragment-2"><img src="<? print $url_to_module_static ; ?>images.png"  height="16" align="bottom" /><span>Media</span></a></li>
              <li><a href="#tab=fragment-3"><img src="<? print $url_to_module_static ; ?>pencil.png"  height="16" align="bottom" /><span>Custom Fields</span></a></li>
              <li><a href="#tab=fragment-4"><img src="<? print $url_to_module_static ; ?>world.png"  height="16" align="bottom" /><span>Meta tags</span></a></li>
              <li><a href="#tab=fragment-5"><img src="<? print $url_to_module_static ; ?>link.png"  height="16" align="bottom" /><span>Menus</span></a></li>
              <li><a href="#tab=fragment-6"><img src="<? print $url_to_module_static ; ?>cog.png"  height="16" align="bottom" /><span>Advanced options</span></a></li>
            </ul>
          </div>
          <div id="tabs">
            <div id="fragment-1" class="tab">
              <table width="100%" border="0" cellspacing="0"  >
                <tr>
                  <td style="padding:15px;" width="50%"><mw module="admin/pages/page_template" id="<? print $form_values['id'] ?>"   /></td>
                  <td style="border-left:1px dotted #CCC; padding:15px;"><mw module="admin/pages/choose_category" id="<? print $form_values['id'] ?>"   /></td>
                </tr>
              </table>
            </div>
            <div id="fragment-2" class="tab">
              <mw module="admin/media/gallery" page_id="<? print $form_values['id'] ?>" for="page"  />
            </div>
            <div id="fragment-3" class="tab">
              <mw module="admin/content/custom_fields" page_id="<? print $form_values['id'] ?>" />
                
              <div id="post_custom_fields"></div>
            </div>
            <div id="fragment-4" class="tab">
              <mw module="admin/content/meta_tags" id="<? print $form_values['id'] ?>" />
            </div>
            <div id="fragment-5" class="tab">
              <mw module="admin/content/content_to_menus" id="<? print $form_values['id'] ?>" />
            </div>
            <div id="fragment-6" class="tab">
              <mw module="admin/content/advanced_options" id="<? print $form_values['id'] ?>" />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div class="box_footer radius_b">
    <input type="submit" value="Save changes" onclick="$('#save_page_form').submit()" class="sbm right post_saved" name="save">
    <h2>Edit Page <em><? print $form_values['content_title'] ?></em></h2>
  </div>
</div>
