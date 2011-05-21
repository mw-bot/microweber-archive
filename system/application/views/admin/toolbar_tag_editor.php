<script type="text/javascript">


function mw_html_tag_delete(){
	
	
	var r=confirm("Are you sure?");
if (r==true)
  {


	$element = $('#mw_css_editor_element_id').val();
	
	//alert($element);
	

	$element_obj = $('*[mw_tag_edit="'+$element+'"]');
	$element_obj.fadeOut()
	$element_obj.remove()

  }
else
  {
 
  }
}

function mw_html_tag_editor($mw_tag_edit_value){
	//tag_($jquery_this.get(0).tagName);
	
	
	
	
//	if($mw_tag_edit_value != undefined){
//		$mw_tag_edit_value11 = $('#mw_css_editor_element_id').val();
//		if($mw_tag_edit_value == $mw_tag_edit_value11){
//			//alert(1);
//			return false;
//		}
//		
//	}
	
	
//	alert(123);
	
	mw_sidebar_nav('#mw_sidebar_css_editor_holder');
	if($mw_tag_edit_value == undefined){
		
		$mw_tag_edit_value = $('#mw_css_editor_element_id').val();
		$('#mw_css_editor_element_id').val($mw_tag_edit_value);
		
		
	} else {
		$('#mw_css_editor_element_id').val($mw_tag_edit_value);
	}
	
	
	
	
	
	
	
	mw_html_tag_editor_show_styles_for_tag();
	 $('*[mw_tag_edit="'+$mw_tag_edit_value+'"]', '.edit').each(function(index) {
			//$(this).hide('aaa'); 	
			
		//	$(this).hide('aaa'); 
											 
	 });
	 
	  $('#mw_html_css_editor .css_property').die('change')
	 $('#mw_html_css_editor .css_property').live('change',function(){
	  mw_html_tag_editor_apply_styles()
	});
	 
	 	 
	 
	 $( ".mw_slider_generated" ).slider( "destroy" );
	 $( ".mw_slider_generated" ).remove();
$( "#mw_html_css_editor .mw_slider" ).each(function() {
		var $input = $(this);
		var $slider = $('<div class="mw_slider_generated" for="' + $input.attr('name') + '"></div>');
		//var step = $input.attr('step');

		//$input.after($slider).hide();
		$input.after($slider);
		
		var $inputv = $(this).val();
		if($inputv == undefined || $inputv == ''){
			
		$min = 1;
		$max = 250;
		 $value1 = 0;
		
		
		} else {
		
		$min = 1;
		$max = 250 + parseInt($inputv);
		$value1 =  parseInt($inputv);
		
		}

		$slider.slider({
			//min: $input.attr('min'),
			//max: $input.attr('max'),

			
			min: $min,
			//max:100,
			max:  $max,
			value: $value1,
			step: 1,
			change: function(e, ui) {
				//alert(ui.value);
				//alert($(this).attr('for'));
				 $('*[name="'+$input.attr('name')+'"]').val(ui.value);
				 $('*[name="'+$input.attr('name')+'"]').change();
				//alert($(this).val());
				//$(this).val(ui.value);
			}
		});
	});
		
	 
	 
	   
//	  
//	   $('#mw_html_css_editor .mw_color_picker').ColorPicker({
//	onSubmit: function(hsb, hex, rgb, el) {
//		$(el).val(''+hex);
//		$(el).ColorPickerHide();
//		mw_html_tag_editor_apply_styles()
//	},
//	onBeforeShow: function () {
//		$v1vv= this.value;
//		  $v1vv = $v1vv.replace("#", "");
//		
//		$(this).ColorPickerSetColor($v1vv);
//	},
//	
//	
//	
//	//color: $(this).val().replace("#", ""),
//	onShow: function (colpkr) {
//		$(colpkr).fadeIn(500);
//		return false;
//	},
//	onHide: function (colpkr) {
//		$(colpkr).fadeOut(500);
//		return false;
//	},
//	onChange: function (hsb, hex, rgb) {
//		$(this).css('backgroundColor', '#' + hex);
//	}
//	
//	
//	
//	
//	
//	
//	
//	
//	
//	
//	
//	
//	
//})
//.bind('keyup', function(){
//	$(this).ColorPickerSetColor(''+this.value);
//});
	 
	 
	 
 
	 
	 
	 
	 
//	 $('.mw_color').colorpicker({
//                size: 20,
//                label: 'Color: ',
//                hide: false
//            });
	 
	 

	 
	 
	 var availableTags_fonts = [
			"Arial",
			"Verdana, Geneva, sans-serif",
			"Tahoma",
			
			"Helvetica",
			 
			"Times"
		];
		$( ".mw_ac_fonts" ).autocomplete({
			minLength: 0,
			close: function(event, ui) {
				mw_html_tag_editor_apply_styles()
				},
			source: availableTags_fonts
		});
		
		
 
		  
		   $('.mw_ac_fonts').live('click',function(){ 
												  
       $(this).autocomplete("search", "")
	    //$(this).trigger('keydown.autocomplete');
    });
		   
		   
 
	 
		   
		    
		  
		  
	 
	 
	  /*$( "#mw_html_css_editor .mw_slider" ).slider( "destroy" );
	 $( "#mw_html_css_editor .mw_slider" ).slider({
			
			range: "max",
			min: 1,
			max: 1000,
			slide: function( event, ui ) {
				//$( "#amount" ).val( "$" + ui.value );
				mw_html_tag_editor_apply_styles()
			}
		});*/
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
}

function mw_html_tag_editor_show_styles_for_tag(){
	$element = $('#mw_css_editor_element_id').val();
	
	//alert($element);
	
	$tag_name = $('*[mw_tag_edit="'+$element+'"]:first' ,'.edit').get(0).nodeName;
	$element_obj = $('*[mw_tag_edit="'+$element+'"]:first' ,'.edit');
	//$styles = $('*[mw_tag_edit="'+$element+'"]').css2();
	//$('#module_info').html('');
	var attr = ['font-family','font-size','font-weight','font-style','color',
	        'text-transform','text-decoration','letter-spacing','word-spacing',
	        'line-height','text-align','vertical-align','direction','background-color',
	        'background-image','background-repeat','background-position',
	        'background-attachment','opacity','width','height','top','right','bottom',
	        'left','margin-top','margin-right','margin-bottom','margin-left',
	        'padding-top','padding-right','padding-bottom','padding-left',
	        'border-top-width','border-right-width','border-bottom-width',
	        'border-left-width','border-top-color','border-right-color',
	        'border-bottom-color','border-left-color','border-top-style',
	        'border-right-style','border-bottom-style','border-left-style','position',
	        'display','visibility','z-index','overflow-x','overflow-y','white-space',
	        'clip','float','clear','cursor','list-style-image','list-style-position',
	        'list-style-type','marker-offset'];
	
	
	
	
	 
	 
	 var len=attr.length;
for(var i=0; i<len; i++) {
	var value1 = attr[i];
	$('input[name="'+value1+'"]', '#mw_html_css_editor').val('');
	 $('select[name="'+value1+'"] option', '#mw_html_css_editor').removeAttr('selected');
	 
	 
	 
	 
	  $check_is_color = value1.indexOf("color") ;
								  if($check_is_color != -1){
									//   $dim = '#' ;
									
									$('input[name="'+value1+'"]', '#mw_html_css_editor').css('background-color','' );
									
								  }
	 
	 
	 
	 
	 
}



	
	
	
	var styles={};
	    $element_obj.each(function(index)
    {
				   var styletag=$element_obj.attr('style');
				   
				   
				   
				//   alert(styletag);
					  if (window.console != undefined) {
							console.log('element styles ' +styletag  );	
							
						}
				   
				   
				   if(styletag != undefined && styletag != ''){
					   
							  styletag =   styletag.replace("http:", "http_");
							   styletag =   styletag.replace("https:", "https_");
							   
							   
						   
						   var stylestemp=styletag.split(';');
						   var styles={};
						   var c='';
						   for (var x in stylestemp) {
									 c=stylestemp[x].split(':');
									 styles[$.trim(c[0])]=$.trim(c[1]);
									 
									 
									 
									 $old_val = $.trim(c[1]);
									  $old_key =$.trim(c[0]);
									  
									 if($old_key != undefined && $old_key != NaN && $old_key != ''&& $old_key != '_mw_dirty'){ 
											   if (window.console != undefined) {
												//	console.log('element get style ' +$old_key + $old_val  );	
													
												}
									  
									   $old_key = $old_key.toLowerCase();
							 
								   
								   if($old_val != undefined && $old_val != NaN && $old_val != ''){
									   
									   
									   
									   
									   
								  //  $old_val_split =  $old_val.split(" ");
								  $dim = false;
								  $dim_before = false;
								  
								  
									
							   $check_px = $old_val.indexOf("px") ;
								  if($check_px > 0){
									 $dim = 'px;' 
								  }
								  
								  $check_px = $old_val.indexOf("PX") ;
								  if($check_px > 0){
									 $dim = 'px;' 
								  }
								  
								  $check_px = $old_val.indexOf("%") ;
								  if($check_px > 0){
									 $dim = '%;' 
								  }
								  
									$check_px = $old_val.indexOf("em") ;
								  if($check_px > 0){
									 $dim = 'em;' 
								  }
								  
								  $check_px = $old_val.indexOf("pt") ;
								  if($check_px > 0){
									 $dim = 'pt;' 
								  }
								  
								  
								  
								  
								  
								  $check_rgb = $old_val.indexOf("rgb") ;
								  
							 
								   if($check_rgb != -1){
								 
									 $check_rgb_val = $old_val.replace("rgb(", "");
									  $check_rgb_val = $check_rgb_val.replace(")", "");
									
									
									//alert( $check_rgb_val);
									 if (window.console != undefined) {
									 console.log('rgb '+$check_rgb_val );
									 }
									
									check_rgb_val1 =	$check_rgb_val.split() + ","
								//	 $old_val = '#'+RGBtoHex(check_rgb_val1[0],check_rgb_val1[1],check_rgb_val1[2]);
									// $dim = '#' 
							//
								  }
								  
								    $check_is_bg = $old_key.indexOf("background-image") ;
								  if($check_is_bg != -1){
									//   $dim = '#' ;
									
									 
								   $old_val =   $old_val.replace( "http_","http:");
							   $old_val =   $old_val.replace( "https_","https:");
								  
								  
									  $old_val = "url('"+ $old_val +"')";
									
								  }
								  
								  
								   $check_is_color = $old_key.indexOf("color") ;
								  if($check_is_color != -1){
									//   $dim = '#' ;
									
									$('input[name="'+$old_key+'"]', '#mw_html_css_editor').css('background-color',$old_val );
									
								  }
								  
								 
							
								  
								 $('select[name="'+$old_key+'"] option[value=""]', '#mw_html_css_editor').removeAttr('selected');
								  
								  
								  
								  
								  
								  
								  if($dim != false){
									  $vvvvv = parseInt($old_val);
									  $('input[name="'+$old_key+'"]', '#mw_html_css_editor').val($vvvvv);
									  
								   $('input[name="'+$old_key+'"]', '#mw_html_css_editor').attr('dimensions',$dim);
									} else {
										$vvvvv = ($old_val);
									  $('input[name="'+$old_key+'"]', '#mw_html_css_editor').val($vvvvv);
									   $('input[name="'+$old_key+'"]', '#mw_html_css_editor').attr('dimensions','');
								  // $('input[name="'+attr[i]+'"]').attr('dimensions',$dim);
									}
							 if($dim != false){
								 
								 
								 
							 }
							
							$('input[name="'+$old_key+'"]', '#mw_html_css_editor').attr('value_from_document',$vvvvv);
							
							$('select[name="'+$old_key+'"] option[value="'+$vvvvv+'"]', '#mw_html_css_editor').attr('selected', 'selected');
							
							
							
							
								   }
						   
						   }
						   } //if old key
			   } else {
				   $('input.css_property', '#mw_html_css_editor').val('');
	 $('option.css_property', '#mw_html_css_editor select').removeAttr('selected');
	 $('option:first', '#mw_html_css_editor select.css_property').attr('selected', 'selected');
				   
				   
			   }
     //  alert(styles.width);
    });
	
	
	
	
	
	
	
	
	
	 
 
	
	
	
	$tag_name = $tag_name.toLowerCase();
	$c = '.mw_edit_tag_'+$tag_name;
	
	//alert();
	
	//$('.mw_edit_tag_table tr', '#mw_html_css_editor').hide();
	//$($c).show();
	//$('.mw_edit_tag_table *').hasClass($c).html('asdsadasd');
	
 
	
	
	
	//alert($tag_name);
	
	
	 
	
}

function mw_html_tag_editor_apply_styles(){
	$element = $('#mw_css_editor_element_id').val();
	var $inputs = $('#mw_html_css_editor .css_property');
    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    var values = {};
	 var cssObj = {
     
    }
	
	var cssstr = '';
	
	
    $inputs.each(function() {
       // values[this.name] = $(this).val();
	   //$css_attr = $(this).attr('css_attr');
	  
					  
					  if ( $(this).is(':visible')){
							 $css_attr = this.name;
								   $dims = $(this).attr('dimensions');
								   if( $dims != undefined &&  $dims != ''){
									 //alert( $dims);   
									 $vvv =  $(this).val();
									 
									 $val1234 = $(this).val();
									if($val1234 != undefined && $val1234 != ''){
										
										 $vvv = $vvv + $dims;
									$vvv = $vvv.replace(";", "");
									 //alert( $vvv);
									// $('*[mw_tag_edit="'+$element+'"]').css($css_attr,  $vvv );
									cssstr= cssstr+ ' "'+$css_attr+'":"'+$vvv+ '",';
									 if($css_attr == 'font-size'){
										// $('*[mw_tag_edit="'+$element+'"]').css('line-height',  $vvv );
										cssstr= cssstr+ ' '+'"line-height"'+':"'+$vvv+ '",';
									 }
									}
									 
									 
									 
									
									 
									 
									 
									 
								   } else {
									//	$('*[mw_tag_edit="'+$element+'"]').css($css_attr, $(this).val());
									$val1234 = $(this).val();
									if($val1234 != undefined && $val1234 != ''){
										
									$val1234 =	$.trim($val1234)
										if($val1234 != ''){
									
									cssstr= cssstr+ '"'+$css_attr+'":"'+$val1234+ '",';
										}
									}
									
									
									
								   }
								  // cssObj.$css_attr = $(this).val();
								   //alert( $css_attr);
								  
					  
					   
				}
	  
    });



	 
									
							 //cssstr = cssstr.replace(/(^,)|(,$)/g, "")
		
				//cssstr= ''+cssstr+  ' "border" : "1px"';	
				//var cssstr=cssstr.split(',').join(',');
			//	var cssstr = cssstr.substring(0, cssstr.length - 1);
				
				
			 
//var strLen = cssstr.length;
//cssstr = cssstr.slice(0,strLen-1);
 





				  if (window.console != undefined) {
									 console.log('apply css '+cssstr );
									 }
									 
									 
				var cssstr = eval("({" + cssstr + " ' _mw_dirty':'1' })");
				
				
				
				 $('*[mw_tag_edit="'+$element+'"]').children('.rangyTemp').css('');
				 $('*[mw_tag_edit="'+$element+'"]').children('.rangyTemp').removeClass('rangyTemp');
				
				
				
				 //$('*[mw_tag_edit="'+$element+'"]').css(cssstr);
	  $('*[mw_tag_edit="'+$element+'"]').css(cssstr);
	  $('*[mw_tag_edit="'+$element+'"]').children().css(cssstr);
	  
	 
	
	
	
	/* var cssObj = {
      'background-color' : '#ddd',
      'font-weight' : '',
      'color' : 'rgb(0,40,244)'
    }*/
    // $('*[mw_tag_edit="'+$element+'"]').css(cssObj);
	
}
</script>
<? $text_block_classes = "mw_edit_tag_p mw_edit_tag_h1 mw_edit_tag_h2 mw_edit_tag_h3 mw_edit_tag_h4 mw_edit_tag_h5 mw_edit_tag_h6 mw_edit_tag_span  mw_edit_tag_ul  mw_edit_tag_li  mw_edit_tag_div mw_edit_tag_strong mw_edit_tag_code";  ?>

<div class="mw_iframe_header">
  <div class="mw_iframe_header_title"> <img src="<?php   print( ADMIN_STATIC_FILES_URL);  ?>img/1306242104_design.png" align="left" height="25"  class="mw_iframe_header_icon" />Style element</div>
  <a href="javascript:mw_html_tag_delete()" class="mw_nav_button_delete">&nbsp</a> <a href="javascript:mw_sidebar_nav('#mw_sidebar_modules_holder')" class="mw_nav_button_blue_small"> <span> Back </span> </a> </div>
  
  
  
  
  

  
  
<script>
 
 
 
 
  $(document).ready(function() {
							 
							 
							 
		$("#mw_html_css_editor").accordion({
				autoHeight: false,
				icons: true,
				animated: false,
				navigation: true
										   
									   
		})
		
		 
		
		$("#mw_html_css_editor").live("mouseenter", function(event) {
		//	$element = $('#mw_css_editor_element_id').val();
		//	$(".mw_outline").remove();
		//	mw.outline.init('*[mw_tag_edit="'+$element+'"]', '#DCCC01');		   
	 
			
			
			
		})
		
		
		   
		
		
		$(".ui-accordion-header", "#mw_html_css_editor" ).click(function(){
          $(this).blur();
        });
		
		
		$( ".mColorPickerTrigger" ).remove();
	 $('.mw_color').mColorPicker({
               imageFolder: '<?php   print( ADMIN_STATIC_FILES_URL);  ?>jquery/color_picker/images/'
           });
	 
		
		
			 
  });
  </script>
<style>

.ui-accordion-header.css_editor_tab_text .ui-icon {
    background: url('<?php   print( ADMIN_STATIC_FILES_URL);  ?>img/css_editor/1306317754_text_letter_t_1.png');
}
.ui-accordion-header.css_editor_tab_size .ui-icon {
    background: url('<?php   print( ADMIN_STATIC_FILES_URL);  ?>img/css_editor/1306318564_align_left_1.png');
}
.ui-accordion-header.s3 .ui-icon {
    background: url(http://p.yusukekamiyamane.com/icons/search/fugue/icons/store-medium.png);
}
.ui-accordion-header.s4 .ui-icon {
    background: url(http://p.yusukekamiyamane.com/icons/search/fugue/icons/balloon-facebook-left.png);
}

</style>
<div class="mw_admin_box_padding">



  <div class="mw_iframe_sub_header" >
  <table width="95%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td>Edit the styles of the selected element
        <!--<a target="_blank" href="http://microweber.com">(see how)</a>--></td>
      <td><a target="_blank" href="<? print $config['help_link']; ?>"><img  src="<?php   print( ADMIN_STATIC_FILES_URL);  ?>img/toolbar/help.png" hspace="5" /></a></td>
    </tr>
  </table>
</div>








<div id="mw_html_css_editor">
  <h3 class="css_editor_tab_text"><a href="#">Text properties</a></h3>
  <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mw_edit_tag_table">
      <tr class="<? print $text_block_classes ?>">
        <td> font-family
          <!--'font-family','font-size','font-weight','font-style','color',
	        'text-transform','text-decoration','letter-spacing','word-spacing',
	        'line-height','text-align'--></td>
        <td><input   name="font-family" class="mw_ac_fonts css_property"  type="text" />
          <!-- <select name="font-family"   class="css_property" type="text">
          <option value="">Default</option>
          <option value="Arial">Arial</option>
          <option value="Verdana, Geneva, sans-serif">Verdana, Geneva, sans-serif</option>
            <option value="Times">Times</option>
        </select>
      --></td>
      </tr>
      <tr class="<? print $text_block_classes ?>">
        <td> font-size </td>
        <td><!--<input   name="font-size" dimensions="px" class="mw_ac_sizes" type="text" />-->
          <select name="font-size" dimensions="px" class="mw_ac_sizes css_property" type="text">
            <option value="">Default</option>
            <? for ($i = 1; $i <= 100 ; $i++) : ?>
            <option value="<? print $i ?>"><? print $i ?></option>
            <? endfor; ?>
          </select></td>
      </tr>
      <tr class="<? print $text_block_classes ?>">
        <td>color</td>
        <td><input  class="mw_color css_property color"  name="color"   type="color"  data-hex="true" style="height:20px;width:20px;"   /></td>
      </tr>
      <tr class="<? print $text_block_classes ?>">
        <td> font-weight </td>
        <td><select name="font-weight"   class="css_property" type="text">
            <option value="">Default</option>
            <option value="normal">normal</option>
            <option value="bold">bold</option>
            <option value="bolder">bolder</option>
            <option value="lighter">lighter</option>
          </select></td>
      </tr>
      <tr class="<? print $text_block_classes ?>">
        <td>font-style</td>
        <td><select name="font-style"   class="css_property" type="text">
            <option value="normal">normal</option>
            <option value="italic">italic</option>
            <option value="oblique">oblique</option>
          </select></td>
      </tr>
      <tr class="<? print $text_block_classes ?>">
        <td>text-transform</td>
        <td><select name="text-transform"   class="css_property" type="text">
            <option value="">Default</option>
            <option value="none">none</option>
            <option value="capitalize">capitalize</option>
            <option value="capitalize">capitalize</option>
            <option value="lowercase">lowercase</option>
          </select></td>
      </tr>
      <tr class="<? print $text_block_classes ?>">
        <td>text-decoration</td>
        <td><select name="text-decoration"   class="css_property" type="text">
            <option value="">Default</option>
            <option value="none">none</option>
            <option value="underline">underline</option>
            <option value="overline">overline</option>
            <option value="line-through">line-through</option>
            <option value="blink">blink</option>
          </select></td>
      </tr>
      <tr class="<? print $text_block_classes ?>">
        <td>text-align</td>
        <td><select name="text-align"   class="css_property" type="text">
            <option value="">Default</option>
            <option value="left">center</option>
            <option value="right">center</option>
            <option value="center">center</option>
            <option value="justify">justify</option>
          </select></td>
      </tr>
      <tr class="<? print $text_block_classes ?>">
        <td>letter-spacing</td>
        <td><select name="letter-spacing" dimensions="px" class="mw_ac_sizes css_property" type="text">
            <option value="">Default</option>
            <? for ($i = 1; $i <= 100 ; $i++) : ?>
            <option value="<? print $i ?>"><? print $i ?></option>
            <? endfor; ?>
          </select></td>
      </tr>
      <tr class="<? print $text_block_classes ?>">
        <td>word-spacing</td>
        <td><select name="word-spacing" dimensions="px" class="mw_ac_sizes css_property" type="text">
            <option value="">Default</option>
            <? for ($i = 1; $i <= 100 ; $i++) : ?>
            <option value="<? print $i ?>"><? print $i ?></option>
            <? endfor; ?>
          </select></td>
      </tr>
    </table>
  </div>
  <h3 class="css_editor_tab_size"><a href="#">Align and size</a></h3>
  <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mw_edit_tag_table">
      <tr class="mw_edit_tag_img">
        <td>Float</td>
        <td><select class="css_property" name="float">
            <option value="none">None</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select></td>
      </tr>
      <tr class="mw_edit_tag_img">
        <td>Display</td>
        <td><select class="css_property" name="display">
            <option value="">Default</option>
            <option value="block">block</option>
            <option value="inline">inline</option>
            <option value="inline-block">inline-block</option>
            <option value="list-item">list-item</option>
            <option value="inline-table">inline-table</option>
            <option value="table">table</option>
            <option value="run-in">run-in</option>
            <option value="inherit">inherit</option>
            <option value="none">none</option>
          </select></td>
      </tr>
      <tr class="mw_edit_tag_img">
        <td>Width</td>
        <td><input name="width" class="mw_slider css_property" type="text" /></td>
      </tr>
      <tr class="mw_edit_tag_img">
        <td>Height</td>
        <td><input name="height" class="mw_slider css_property" type="text" /></td>
      </tr>
      <tr class="mw_edit_tag_img">
        <td>Padding</td>
        <td><input name="padding" class="mw_slider css_property" dimensions="px" type="text" /></td>
      </tr>
      <tr class="mw_edit_tag_img">
        <td>Margin</td>
        <td><input name="margin" class="mw_slider css_property" dimensions="px" type="text" /></td>
      </tr>
    </table>
  </div>
  <h3 class="css_editor_tab_size"><a href="#">Border</a></h3>
  <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mw_edit_tag_table">
      <tr class="mw_edit_tag_img">
        <td>Border style</td>
        <td><select class="css_property" name="border-style">
            <option value="none">None</option>
            <option value="solid">solid</option>
            <option value="dotted">dotted</option>
            <option value="dashed">dashed</option>
            <option value="double">double</option>
            <option value="groove">groove</option>
            <option value="ridge">ridge</option>
            <option value="inset">inset</option>
            <option value="outset">outset</option>
            <option value="inherit">inherit</option>
          </select></td>
      </tr>
      <tr class="mw_edit_tag_img">
        <td>border-width</td>
        <td><input name="border-width"  dimensions="px" class="mw_slider css_property" type="text" /></td>
      </tr>
      <tr class="mw_edit_tag_img">
        <td>border-color</td>
        <td><input  class="mw_color css_property"  name="border-color"   type="color"  data-hex="true" style="height:20px;width:20px;"   /></td>
      </tr>
    </table>
  </div>
  <h3 class="css_editor_tab_size"><a href="#">Background</a></h3>
  <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mw_edit_tag_table">
      <tr class="mw_edit_tag_img">
        <td>background-color</td>
        <td><input  class="mw_color css_property"  name="background-color"   type="color"  data-hex="true" style="height:20px;width:20px;"   /></td>
      </tr>
      <tr class="mw_edit_tag_img">
        <td>background-image</td>
        <td><input  class="css_property"  name="background-image"     /></td>
      </tr>
      <tr class="mw_edit_tag_img">
        <td>background-repeat</td>
        <td><select class="css_property" name="background-repeat">
            <option value="">Default</option>
            <option value="no-repeat">no-repeat</option>
            <option value="repeat-x">repeat-x</option>
            <option value="repeat-y">repeat-y</option>
            <option value="inherit">inherit</option>
          </select></td>
      </tr>
      <tr class="mw_edit_tag_img">
        <td>background-attachment</td>
        <td><select class="css_property" name="background-attachment">
            <option value="">Default</option>
            <option value="scroll">scroll</option>
            <option value="fixed">fixed</option>
            <option value="inherit">inherit</option>
          </select></td>
      </tr>
      <tr class="mw_edit_tag_img">
        <td>background-position</td>
        <td><select class="css_property" name="background-position">
            <option value="">Default</option>
            <option value="left top">left top</option>
            <option value="left center">left center</option>
            <option value="left bottom">left bottom</option>
            <option value="right top">right top</option>
            <option value="right center">right center</option>
            <option value="right bottom">right bottom</option>
            <option value="center top">center top</option>
            <option value="center center">center center</option>
            <option value="center bottom">center bottom</option>
          </select></td>
      </tr>
    </table>
    <input name="mw_css_editor_element_id" id="mw_css_editor_element_id" value="" type="text" />
  </div>
  </div>
</div>
