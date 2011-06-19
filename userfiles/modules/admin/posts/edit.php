<?
$id = $params['id'];


if(intval($id) != 0){

$form_values = get_post($id);
} else {
	$form_values = array();
}

//$form_values = get_post($id);
//p($form_values);

?>
<script type="text/javascript">



$(document).ready(function () {
 
 

    
 
   

});

 

</script>
<?
//$id = $params['id'];



//$form_values = get_page($id);
//p($form_values);

?>
<script type="text/javascript">
// prepare the form when the DOM is ready 
$(document).ready(function() { 
    var save_post_options = { 
        type:      'POST',
		dataType: 'json',
		url:       '<? print site_url('api/content/save_post') ?>' ,
        beforeSubmit:  save_post_showRequest,  // pre-submit callback 
        success:       save_post_showResponse  // post-submit callback 
    }; 
 
    $('#save_post_form').submit(function() { 
        $(this).ajaxSubmit(save_post_options); 
	  //event.preventDefault(); 
	  
//  $f_data = ($(this).serialize());
//  
//  $.post("<? print site_url('api/content/save_post') ?>", { $f_data  },
//   function(data) {
//     alert("Data Loaded: " + data);
//   });
  
  
  
 
        return false; 
    }); 
	
	 
});



 
// pre-submit callback 
function save_post_showRequest(formData, jqForm, options) { 
    var queryString = $.param(formData); 
	
	
	
	
	var usernameValue = $('input[name=content_title]').fieldValue(); 
    var passwordValue = $('input[name=content_url]').fieldValue(); 
 
    // usernameValue and passwordValue are arrays but we can do simple 
    // "not" tests to see if the arrays are empty 
    if (!usernameValue[0] || !passwordValue[0]) { 
        alert('Please enter at least title and url'); 
		
		$('input[name=content_title]').css('border-color', "red"); 
		$('input[name=content_url]').css('border-color', "red"); 
	
		
 

		
        return false; 
    } 
	
	
	
    return true; 
} 
 
// post-submit callback 
function save_post_showResponse(responseText, statusText, xhr, $form)  { 
//document.getElementById('edit_frame').contentWindow.location.reload();

//responseText = eval(responseText);
//	alert(responseText); 
	$('.post_saved').fadeOut();
	$('#save_post_form').fadeOut();
	$('#save_page_done').fadeIn();
	
	
	$('.box_footer').fadeOut();
	
	 if(responseText.id != undefined){
		 
		 
		 $is_back_to_cf = $('#back_to_cf_edit').val(); 
		 
		 if($is_back_to_cf == 'yes'){
			 
			 window.location = '<? print ADMIN_URL ?>/action:post_edit/id:'+responseText.id+'#tab=fragment-4';
			 
		 } else {

			  $.get('<? print site_url('api/content/get_url');?>/id:'+responseText.id , function(data) {
		  data123 = data + '/editmode:y';
		  
		   $('.saved_content_url').attr('href', data123);
			$('.saved_content_url').html(data);
		  
		  $('.saved_content_url_edit_again').attr('href', '<? print ADMIN_URL ?>/action:post_edit/id:'+responseText.id);
		 
		   
		 
				});
		 }
	 }

   // alert('status: ' + statusText + '\n\nresponseText: \n' + responseText +    '\n\nThe output div should have already been updated with the responseText.'); 
} 
</script>
<script type="text/javascript">
 
 function save_post_and_edit_cf() { 

$('#back_to_cf_edit').val('yes');

$('#save_post_form').submit();

} 





</script>
<? $url_to_module = dirToURL(dirname(__FILE__));
$url_to_module_static = $url_to_module. '/static/icons/' ; ?>

<div id="save_page_done" style="display:none"><br />
  <br />
  <br />
  <table width="90%" border="0" cellspacing="5" cellpadding="5" align="center">
    <tr>
      <td colspan="2"><h1>Your post is saved</h1>
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
      <td><a  class="btn" href="<? print ADMIN_URL ?>/action:post_edit/id:0">Add new post</a> | <a  class="btn saved_content_url_edit_again" href="#">Edit again</a></td>
      <td><a class="btn" href="<? print ADMIN_URL ?>/action:posts">See all posts</a></td>
    </tr>
  </table>
  <br />
  <br />
  <br />
  <br />
  <br />
</div>
<form action="" method="post" id="save_post_form">
  <input id="back_to_cf_edit" type="hidden"  />
  <input name="id" id="post_id" type="hidden" value="<? print $form_values['id'] ?>" />
  <input name="content_type" type="hidden" value="post" />
  <mw module="admin/content/title_and_body" parent_page_select="true" id="<? print $form_values['id'] ?>" />
  <br />
  <br />
  <br />
  <script>
  $(document).ready(function() {
    $("#tabs").tabs();
	
	
	$("#content_parent").live("change", function(){
reload_cf_config()
reload_categories_form_page()
});

	
	
  });
  </script>
  <script>
  
  
 function reload_categories_form_page() { 
 content_parent = $("#content_parent").val();



	data1 = {}
						   data1.module = 'admin/content/custom_fields';
						   data1.page_id = content_parent;
						   data1.post_id = '<? print $form_values['id'] ?>';
						   
						 
							 
						  $('#cf_edit_resp_ajax').load('<? print site_url('api/module') ?>',data1);



} 




function reload_cf_config(){
	




 content_parent = $("#content_parent").val();
					 
				 
							data1 = {}
						   data1.module = 'admin/posts/select_categories_for_post';
						   data1.page_id = content_parent;
						    data1.post_id = '<? print $form_values['id'] ?>';
		
						  $('#select_categories_for_post').load('<? print site_url('api/module') ?>',data1);

	
	
}

</script>
  <div id="orders_tabs" class="mw_box">
    <div class="mw_box_tab_content">
      <div class="shop_nav_main">
        <h2 class="box_title">Options</h2>
        <ul class="shop_nav">
          <li><a href="#tab=fragment-2"><img src="<? print $url_to_module_static ; ?>images.png"  height="16" align="bottom" /><span>Media</span></a></li>
          <li><a href="#tab=fragment-4"><img src="<? print $url_to_module_static ; ?>pencil.png"  height="16" align="bottom" /><span>Custom Fields</span></a></li>
          <li><a href="#tab=fragment-5"><img src="<? print $url_to_module_static ; ?>world.png"  height="16" align="bottom" /><span>Meta tags</span></a></li>
          <li><a href="#tab=fragment-6"><img src="<? print $url_to_module_static ; ?>link.png"  height="16" align="bottom" /><span>Menus</span></a></li>
          <li><a href="#tab=fragment-3"><img src="<? print $url_to_module_static ; ?>cog.png"  height="16" align="bottom" /><span>Advanced options</span></a></li>
        </ul>
      </div>
      <div id="tabs">
        <div id="fragment-2" class="tab">
          <mw module="admin/media/gallery" for="post" post_id="<? print $form_values['id'] ?>" />
        </div>
        <div id="fragment-3" class="tab" style="display:none">
          <mw module="admin/content/advanced_options" id="<? print $form_values['id'] ?>" />
        </div>
        <div id="fragment-4" class="tab" style="display:none">
          <? if(intval($form_values['id']) == 0): ?>
          <p> <strong>You must save your post before you can edit the custom fields.</strong><br />
            <br />
            <input name="save" class="sbm" onclick="save_post_and_edit_cf()" type="button" value="Save post and edit custom fields" />
            <br />
          </p>
          <? else : ?>
          <div id="cf_edit_resp_ajax">
            <microweber module="admin/content/custom_fields" page_id="<? print $form_values['content_parent'] ?>" post_id="<? print $form_values['id'] ?>" />
          </div>
          <? endif; ?>
        </div>
        <div id="fragment-5" class="tab" style="display:none">
          <mw module="admin/content/meta_tags" id="<? print $form_values['id'] ?>" />
        </div>
        <div id="fragment-6" class="tab" style="display:none">
          <mw module="admin/content/content_to_menus" id="<? print $form_values['id'] ?>" />
        </div>
      </div>
    </div>
  </div>
</form>
