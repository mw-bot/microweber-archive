/*
 * Microweber Edit - Javascript Framework
 *  
 * Copyright (c) Mass Media Group (www.ooyes.net) 
 * Licensed under the Microweber license http://microweber.com/license 
 *
 */


if (window.console != undefined) {
	console.log('Microweber Javascript Edit Page Framework Loaded');
}

 
window.onscroll = function () {
    //alert("scrolling");
	 $is_dragged = window.mw_dragging;
	 if($is_dragged == undefined || $is_dragged == false  ){
		 $('#module_temp_holder').hide();
	 }
}
 

$.dataFind = function(data, findwhat){
       var div = document.createElement('div');
       div.innerHTML = data;
       div.className = 'xhidden';
       document.body.appendChild(div);
       setTimeout(function(){$(div).destroy()}, 5);
       return $(div).find(findwhat)
    }



function mw_insertTextAtCursor(text) {
    var sel, range, html;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.insertNode( document.createTextNode(text) );
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.pasteHTML(text);
    }
}
// here

function mw_insert_module_at_cursor($module, $full_tag){
	
	 $mod_id = "module_"+Math.floor(Math.random()*9999)+Math.floor(Math.random()*9999);

	 
	 
	 
     mw1 =unescape($module);
 
 
		if(mw1 == undefined){
		
		} else {
			if($full_tag == undefined){
		mw1 = "<div><microweber module_id='" + $mod_id + "'  module='" + mw1 + "' /></div><div><br/></div>";       
			} else {
				mw1 =unescape($full_tag);
				//mw1 =$full_tag;       
			}
		      
		  //  $(".edit").addClass("mw_edited");
		     
		      
		     
		     var range = rangy.getSelection();
		     range= range.rangeCount ? range.getRangeAt(0) : null;
		     if (range != null && range != '') {
		
		    	// alert(range);
		     	  var newdiv = document.createElement('div');
		
		
		
		     
		
		     	  newdiv.innerHTML =mw1;
		
		
		
		         range.insertNode(newdiv);
		         rangy.getSelection().setSingleRange(range);
		        
		         mw.saveALL();
		     } else {
		    	 
		    	 if ( $.browser.msie ) {
		    		 $(".to_here_click:first").prepend(mw1); 
		    		 } else {
		    		//	 alert(mw1);
				    	 mw_insertHtmlAtCursor(mw1);
				    	 
				    	 
				    	 
		    		 }
		    	 
		    	 
		    	 
		    	
		    	
		    	 mw.saveALL();
		    	 
		    	 
		     
		     }
		}
}

function mw_make_editables(){
  $('.edit').attr('contentEditable', true);	
	// $('.module').attr('contentEditable', false);	
	 $('.edit').onmousedown = function() {
       //  this.focus();
     }; 
	
/*	$('.edit')
    .attr('contenteditable','true')
    .focus(function() {
        $(this).addClass("selected");
    })
    .click(function() {
        $(this).removeClass("selected");
    })
    .blur(function() {
        $(this).removeClass("selected");
    })
    .keypress(function(e) {
        var k=new String(e.which);
        if (!k.match(/^(0|13)$/)) {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
                $(this).text("");
            }
        }
    });
$('.edit:first').focus();*/


}
 window.mw_sortables_created = false;
function mw_remove_editables(){
/*
 * try { $('.edit').removeAttr('contentEditable'); } catch (e) {
 * $('.edit').attr('contentEditable', false); }
 */
	$('.edit').attr('contentEditable', false);
}

 
$('.edit .module').live('hover',function() {
//	mw_make_editables()
	$('.edit .module').attr('contentEditable', false);
	$('.edit .module *').attr('contentEditable', false);
	
	
	
	
	
	//mw_remove_inner_sortables()
	init_edits()
});
$('.edit div.module').live('mouseenter',function() {
//	mw_make_editables()

 	//$('.mw_module_overlay').remove();
 	
 //$(this).prepend('<div class="mw_module_overlay"></div>')

	 
	// $('.edit .mw_module_overlay').css('height',20);
	// $('.edit .mw_module_overlay').css('width',20);
	// $('.edit .mw_module_overlay').css('background-color','green');
	 	init_edits()
 	
/*	
	$('.edit .module').attr('contentEditable', false);
	$('.edit .module').attr('contentEditable', false);
	
	
	
	
	$h = $(this).innerHeight();
	$w = $(this).innerWidth();
	
	 $('#mw_module_param_to_copy').val($h)
	  $('#module_focus_holder_id').val($w)
	  
	//   $(this).children().not(':hidden').addClass('.mw_show');
	  $(this).children('.mw_show').hide();
	  $(this).children().not('.mw_module_overlay').show();

	 $(this).prepend('<div class="mw_module_overlay"></div>')

	 
	 $('.edit .mw_module_overlay').css('height',$h);
	 $('.edit .mw_module_overlay').css('width',$w);
	 $('.edit .mw_module_overlay').css('background-color','green');
	*/
	 
   //  $(this).children().not('.mw_module_overlay').hide();
	 

	//mw_remove_inner_sortables()

});

$('.edit .module').live('mouseleave',function() {
//	mw_make_editables()
	
 
	$('.mw_module_overlay').remove();
//	$(this).children('.mw_show').show();
 
});


$('.edit .module *').live('click',function(event) {
//	mw_make_editables()
	$('.edit .module').attr('contentEditable', false);
	$('.edit .module *').attr('contentEditable', false);
	
	$('.edit .module a').attr('href', '#');
	$('.edit .module a').attr('onclick', '');
	//init_edits()
	//event.preventDefault();
});

$('#admin_sidebar').live('mouseenter',function() {
//	mw_make_editables()
	init_edits()
});


 

//$('.edit').live('click',function() {
//$("img:not(a>img)")
$('.edit *:not(.module)').live('click',function() {
	mw_make_editables()
	remove_sortables()
	
//	mw_remove_inner_sortables()
});
 



function mw_resize_admin_sidebar(){
	 var h1 = $(window).height();
	 var h2 = $('#mw_toolbar').height();
	 $('#admin_sidebar').height(h1-h2-20);	
	//
}

$(function(){
    $(window).resize(function(){
    	mw_resize_admin_sidebar()
    });
});

function mw_make_draggables(){
	
 
	
	 }
function remove_sortables(){
	//if(window.mw_sortables_created == true){
	$( ".edit" ).sortable('destroy');
	// window.mw_sortables_created = false;
	//}
}
function init_edits(){
	//mw_remove_editables()
	//mw_make_editables()
//	mw_make_draggables();
	
	$('.edit .module').attr('contentEditable', false);
	$('.edit .module *').attr('contentEditable', false);

	$( "edit .module" ).disableSelection();
	bind_module_edit_iframe_click()
	window.mw_sortables_created = false;
	if( window.mw_sortables_created == false){
	
	 window.mw_sortables_created = false;
	
	 start =  window.mw_last_hover;
	  if(start == undefined){
		  var start = new Date().getTime();
		  window.mw_last_hover = start;
	  }
	  window.mw_last_hover++;
	
	  $(".mw_put_module_ids").each(function (i) {
			$(this).attr('module_id', 'module_'+window.mw_last_hover);
	      });
	 
	 
	// $( ".edit .module > *" ).disableSelection();
	 
	 
	 var sort_opts = {
				forcePlaceholderSize: true,
			//	forceHelperSize : true ,
				//tolerance: 'pointer',
				tolerance: 'intersect',
			   //cancel: '.module > * :not(:has(.module)) ',
			  // cancel: '.mw_mod_wrap',
				placeholder: "to_here_drop",
			//	items: '.module',
				//items: '*',
				items: '*:not(.mw_mod_wrap)',
				//items: '*:not(:has(.module))',
				zIndex: 5000,
			//	opacity: 0.6,
				distance: 1,
				
				update: function(event, ui) {
		            if(this.id == 'sortable-delete') {
		                // Remove the ele ment dropped on #sortable-delete
		                $('#'+ui.item.attr('id')).remove();
		            } else {
		                // Update code for the actual sortable lists
		            	// window.mw_sortables_created = false;
		            //	 init_edits()
		            }
		          //  $( ".edit .module > *" ).disableSelection()
		       	 window.mw_sortables_created = false;
					
		     //  	 init_edits()
					
		            //init_edits();
		       
		        } ,
		        stop: function(event, ui) { 
		     //   $('#'+ui.item[0].id).addClass("ui-state-highlight");
		        $( ".edit .module > *" ).disableSelection()
		        
		        nic_save_all(mw_load_history_module, true);
		    	bind_module_edit_iframe_click()
		        },
				  start: function(event, ui) { 
				//mw_remove_inner_sortables()
				
				

				
				
				
				//
				
				//mw_remove_editables();
			//	$( ".edit *" ).sortable( "option", "disabled", true );
				//$( ".edit .module" ).sortable( "option", "disabled", true );
			},
			

			
				receive: function(event, ui) {
				//copyHelper= null;
				
				
		 
				$( ".edit .module_draggable" ).css("display","");

				$( ".edit .module_draggable" ).removeClass('module_draggable');
				$( ".edit .mw_put_module_ids" ).removeClass('mw_put_module_ids');
				$( ".edit .mw_no_module_mask" ).removeClass('mw_no_module_mask');
				$( ".edit .mw_mod_wrap" ).removeClass('mw_mod_wrap');
				//$( ".edit .mw_mod_wrap" ).remove();
				
				 
				$( ".edit .mw_show" ).show();
				$( ".edit .mw_show" ).removeClass('mw_show');
			//	$( ".edit .module" ).empty();
				
				

				
				$( ".edit .js_mod_remove" ).remove();
				
				mw.saveALL();
				 window.mw_sortables_created = false;
				init_edits()
				bind_module_edit_iframe_click()
				
			}
			
			
		//	,connectWith: ".edit:not(.mw_mod_wrap)"
			};
	
	$( ".edit" ).sortable('destroy');
	
	$('.edit .module').children().addClass('mw_mod_wrap');
	$('.edit .module *').addClass('mw_mod_wrap');
	//$('.edit .module').addClass('mw_mod_wrap');
	$('.edit .module').addClass('mw_mod_wrap_main');
	$( ".edit" ).sortable(sort_opts).sortable( "option", "connectWith", ".edit" );
	sort_opts_sidebar = sort_opts;
//	sort_opts_sidebar.items = "*"
	//$( ".sortable_modules" ).sortable(sort_opts_sidebar);
	$('.edit .module .mw_module_overlay').removeClass('mw_mod_wrap');
	
	
	
	$( ".edit .module > *" ).disableSelection()
	//$( ".edit .module > *" ).disableSelection()
	//$('.edit .module *').addClass('mw_mod_wrap');
	
	
//	$('.edit .module').css('opacity','0.5').css('z-index','90000');
	
	
 //$('.edit .module > *').addClass('mw_mod_wrap');

//	$( ".edit .module" ).sortable( "option", "handle",  '.module' );
	//$( ".edit .module" ).sortable( "option", "items",  '.module' );
	//$( ".edit" ).sortable( "option", "cancel", '.mw_mod_wrap');
	
	
//	$( ".edit .module" ).sortable('destroy');
//	$( ".edit .module > *" ).sortable('destroy');
	sort_opts2 = sort_opts;
 
	sort_opts2.items = '.module';
	sort_opts2.handle = '.mw_module_overlay';
	//sort_opts2.connectWith = ".edit"
 	sort_opts2.cancel = '.mw_mod_wrap';

 	$( ".edit .mw_mod_wrap_main" ).sortable('destroy');
		$( ".edit .mw_mod_wrap_main" ).sortable(sort_opts2).sortable( "option", "connectWith", ".edit" );;	
	
	//	$( ".edit .module" ).children().sortable( "disable" );
	//$( ".edit .module" ).children().sortable( "destroy" );
	
		
	//	$('.edit .module *').hasAncestor('.module').css('opacity','0.5').css('z-index','-10');
		//$('.edit .module *').css('opacity','0.5').css('z-index','-10');
	

		
		
	//$('.edit div.module').addClass('mw_mod_wrap');
	
//	$( ".edit" ).sortable( "option", "items", '*:not(.module)' );
//	$( ".edit .module >*" ).sortable( "option", "disabled", true);
//	$( ".edit" ).sortable( "option", "cancel", '.mw_mod_wrap');
//	$( ".edit .module *" ).sortable( "disable" )
	//$( ".mw_mod_wrap" ).sortable( "destroy" )
	//$( ".edit .module" ).sortable( "option", "handle",  '.module' );
	//$( ".edit .module > *" ).sortable( "option", "handle",  'div.module' );
//	$( ".edit .module > *" ).sortable( "option", "containment", 'parent' );
	//$( ".edit .module > *" ).sortable( "option", "handle",  '.module' );
	
	//var handle = $( ".edit .module" ).sortable( "option", "handle" );
	
//	$( "#admin_sidebar" ).prepend(handle);
	
	//$( ".edit .module > *" ).sortable('destroy');
	//$( ".edit .module > *" ).sortable( "option", "disabled", true );
	//$( ".edit .module > *" ).disableSelection();
	
 
	
	
 
//	$( ".edit .module > *" ).sortable( "option", "helper",  '.mw_mod_wrap' );
	
	//$( ".edit .module *" ).sortable( "option", "disabled", true );
	//$( ".edit .module > " ).sortable( "option", "handle",  '.module' );
	//$( ".edit .module > *" ).sortable('destroy');
//	$( ".edit .module *" ).sortable( "option", "handle",  '.module' );
	//$( ".sortable_modules" ).sortable( "option", "items", '.module_draggable' );
	//$( ".sortable_modules" ).sortable( "option", "helper", 'clone' );
//	$( ".sortable_modules" ).sortable( "option", "handle", '.mw_sidebar_module_insert' );
    
	
	
 
//	mw_remove_inner_sortables()
	
	}
	
	
	bind_module_edit_iframe_click()
	
	
	
	
	
 }

function bind_module_edit_iframe_click(){
	
	$(".edit .module, .edit .module *").die("mouseup");
	$('.edit .module, .edit .module *').live('mouseup', function(event) {
	// mw.outline.remove('.module');
	if(window.saving ==false){
	// return false;	
	}
		//event.preventDefault();

		       mod_id112= $(this).attr('module_id');    
		     mod_name= $(this).attr('mw_params_module');    
		      
		    if(mod_id112 == undefined   ){
		    	    mod_id112= $(this).parents('.module').attr('module_id');    
				     mod_name= $(this).parents('.module').attr('mw_params_module');    
					 // alert(mod_id112);
		    }

		  //    if(mod_name != 'content/text'){
		    //$(this).disableSelection();
		   //   } 
		    //  alert(mod_id112);
			if(mod_id112 != undefined  ){
		    load_edit_module_by_module_id(mod_id112);
			}
			//event.preventDefault();

			// return false;	
		  
		});
}

function mw_sidebar_make_sortables(){
	var copyHelper= null;
	$(".sortable_modules").sortable({
	//connectWith: '.edit',
	items: '.module_draggable',
	forcePlaceholderSize: true,
	tolerance: 'pointer',
	zIndex: 50000,
	forcePlaceholderSize: true,
	forceHelperSize : true ,
	tolerance: 'pointer',
  
	placeholder: "to_here_drop",
 
	
	
	helper: function(e,li) {
	copyHelper= li.clone().insertAfter(li);
	return li.clone();
	},
	//placeholder: "ui-state-highlight",
	stop: function() {
	copyHelper && copyHelper.remove();
	}
	}).sortable( "option", "connectWith", ".edit:not(.mw_mod_wrap)" ).disableSelection();
}
function mw_remove_inner_sortables(){
	
//	$( ".module" ).disableSelection();
	//$( ".edit .module *" ).disableSelection();
	//$( ".edit .module > *" ).disableSelection();
//	$( ".mw_mod_wrap" ).sortable( "destroy" )
//	$( ".edit input" ).disableSelection();
	//$( ".edit .module > *" ).sortable('destroy');
	//$( ".edit .module *" ).sortable('destroy');
	//$( ".edit .module > *" ).sortable( "option", "disabled", true );
//	$( ".edit .module *" ).dropable( "option", "disabled", true );
}






var mw_click_on_history = function(){
	$which =  $('.mw_history_file_active:last').attr('rel');

   replace_content_from_history($which)
   
 $is_last = $('.mw_history_file_active').next().length ;
 $is_first = $('.mw_history_file_active').prev().length;
  // alert($is_last);
   if($is_last ==0){
	   $('.mw_history_next').fadeOut();
	   $('.mw_history_prev').fadeIn();
	   
   } 
   
     if($is_first ==0){
	   $('.mw_history_next').fadeIn();
	   $('.mw_history_prev').fadeOut();
	   
   } 
   
   
}
var mw_click_on_history_next= function($direction){
	
  // var $toHighlight = $('.mw_history_file_active').prev().length > 0 ? $('.mw_history_file_active').prev() : $('#mw_history_files li').last();
   var $toHighlight = $('.mw_history_file_active').prev().length > 0 ? $('.mw_history_file_active').prev() : $('#mw_history_files li').first();
            
			if($toHighlight != false){
			$('.mw_history_file_active').removeClass('mw_history_file_active');
            $toHighlight.addClass('mw_history_file_active');
   
   mw_click_on_history();
			}
   
}

var  mw_click_on_history_prev  = function($direction){
	
  // var $toHighlight = $('.mw_history_file_active').next().length > 0 ? $('.mw_history_file_active').next() : $('#mw_history_files li').first();
    var $toHighlight = $('.mw_history_file_active').next().length > 0 ? $('.mw_history_file_active').next() : $('#mw_history_files li').last();
          
		if($toHighlight != false){  
		  $('.mw_history_file_active').removeClass('mw_history_file_active');
            $toHighlight.addClass('mw_history_file_active');
			
			
   
    mw_click_on_history();
	}
}




$(document).ready(function() {
	init_edits()
	 
	
	$(document).bind('keydown', 'ctrl+z', mw_click_on_history_prev);
	$(document).bind('keydown', 'ctrl+y', mw_click_on_history_next);
	$(document).bind('keydown', 'ctrl+s', mw.saveALL);
	
	
	mw_resize_admin_sidebar();
 
	if(typeof window.parent.mw_edit_init == 'function'){
	window.parent.mw_edit_init(window.location.href);
	}

	
	$("[module]").each(function(){
		var val = $(this).attr("module");
		var rel = $(this).attr("rel");
		
		 v1 = encodeURIComponent(val);
			   $url = '<? print site_url("api/module") ?>/admin:true/no_config:true/rel:'+rel+'/?module_name:'+v1;
			// alert(v1+$url);
			   // callIframe
		// $(this).append("<input type='button' value='aaa' name='aaa'
		// onclick='javascript:call_edit_module_iframe(\""+$url+"\") ;' />");

			   
 
		
		
		
		
		
		
	});
	
	
	

  
                 


 

	


 

$(window).load(function(){
	 // init_edits()


});


       /*
		 * $(".editblock").sortable({ connectWith:".editblock", items:".module",
		 * receive:function(){ $(".editblock").each(function(){ var id =
		 * $(this).attr("id"); save_editblock(id); }) } // handle:".mwedit"
		 * }).disableSelection();
		 */
	}); // end doc ready

var $curent_edit_element_id

function mw_delete_module_by_id($id){
	
	  var $module_by_id  =   $id;
      //alert($module_by_id); 
       $module_by_id  =$("div[module_id='"+$module_by_id+"']"); 
      $module_by_id.remove();
}
window.mw_modules_info_cache = new Array();

function load_edit_module_by_module_id($the_module_id) {
	// mw_remove_editables();
	// mw_make_draggables();
	if($the_module_id == undefined){
		
	} else {
	var $module_by_id  =$("div[module_id='"+$the_module_id+"']"); 
	
	
	
	
	

	var edit = $module_by_id.attr("edit");
	 var rel = $module_by_id.attr("rel");
	 
	  
	// if(edit ==undefined){
		  
	// } else {

// if($("#enable_browse").is(":checked")){
     
	   if ($('.mw_live_edit_on_off').hasClass('mw_live_edit_on_off_state_on')) {
		   
		   $('#module_focus_holder_id').val($the_module_id);
	 
		   
		   
	   if (load_editblock_history !=undefined ) {
		  var parent_rel = $module_by_id.parents(".editblock:first").attr("rel");
		  var parent_id = $module_by_id.parents(".editblock:first").attr("id"); 
		   
		   $page_json = get_page_json();
		   
		 // load_editblock_history(parent_id, parent_rel, $page_json.page.id,
			// 'editblock') ;
		   
		   

		   } 
	  

	  // 

	   var id = $module_by_id.attr("module_id");
	   if((id == undefined) || (id == '')){
		   id =     $module_by_id.parents(".module:first").attr("module_id"); 
	//	 
	   }
	   
	// $the_mod_container_id =
	   
	   var no_admin = $module_by_id.attr("no_admin");
	   var module_name = ($module_by_id.attr("mw_params_module"));
	   if(module_name != undefined){
		   module_name_original = module_name;
	   module_name =   module_name.replace("/", "_mw_slash_replace_")
	   }
	   
	   
	   
	   
	   
	   
	//   $m_info = $('#module_focus_holder_id')
	   
 
		 // alert(window.mw_modules_info_cache[id] );

	   
		 
		 if (edit ==undefined ) {
		 var edit = $module_by_id.parents(".module:first").attr("edit");
		 }
		 
		// alert(edit);
		 if (edit !=undefined ) {
			 
			
			// .. $("#mw_edit_module_iframe").show();
			// $("#module_bar_resp").hide();
			 
		 	 page_id = $("#mw_edit_page_id").val();
			 post_id = $("#mw_edit_post_id").val();
			 category_id = $("#mw_edit_category_id").val();
		 
			 
	   $url = '<? print site_url("api/module") ?>/admin:true/base64:'+edit+'/page_id:'+page_id+'/post_id:'+post_id+'/category_id:'+category_id+'/'+'module_to_edit:'+module_name+'/';
	  // alert(id);
	   if(id != undefined){
	// alert(id);
		   
		//   $(".mw_outline").remove();
		   
		   
	 
		//	mw.outline.init("div[module_id='"+$the_module_id+"']", '#DCCC01');
		 

			  
		// $("div[module_id='"+$the_module_id+"']").disableSelection();
		   
		   $('#mw_edit_module_iframe_'+id).show();
		   call_edit_module_iframe($url, id, module_name_original);
	   }  
	  


			 }
	   }
	}
}


function load_editblock_history($id,$rel, $page_id, $tag, $field) {
	
	 data1 = {}
	   data1.module = 'admin/mics/edit_block_history';
	    data1.id = $id;
	    if($rel != undefined){
	    data1.rel = $rel;
	    }
	    if($page_id != undefined){
	    data1.page_id = $page_id;
	    }
	    
	    if($tag != undefined){
		    data1.tag = $tag;
		    }
	    
	    if($field != undefined){
		    data1.field = $field;
		    }
	    
	   $.ajax({
	  url: '<? print site_url('api/module') ?>',
	   type: "POST",
	      data: data1,

	      async:true,

	  success: function(resp) {

	   $('#mw_block_history').html(resp);

	 

	  }
	    });
		
	
	
	
	
	
}

function load_field_from_history_file($id, $base64fle){

 
	$.ajax({
		  type: 'POST',
		  url: '<? print site_url("api/content/load_history_file") ?>',
		  data: { history_file: $base64fle },
		  dataType: "json",
		  success: function(data) {
			 //  $("#"+$id).html(data);
			 // var item = jQuery.parseJSON(data)
			    $.each(data, function(i, d) {
			       // alert(this.country);
			    	$("#"+this.page_element_id).html(this.page_element_content);
			       // debugger;
			    });
			  
			  
			  
		//	  alert(2);
			/*   $.each(data, function(i, item) {
				   alert(("#"+data[i].page_element_id)+(data[i].page_element_content))
					$("#"+data[i].page_element_id).html(data[i].page_element_content);
					
					$("#"+data[i].page_element_id).fadeOut();
					
					$("#"+data[i].page_element_id).fadeIn();
					
//	alert(item.page_element_id+item.page_element_content);
//$("#"+data[i].page_element_id).html(data[i].page_element_content);
 
});*/

 
//mw_make_draggables();
init_edits()




		  }
		})
	
	
}

function load_editblock($id, $history_file) {
	$page_json = get_page_json();
	
	$rel = $(".editblock#"+$id).attr('rel');
	
	 if ( typeof $history_file != 'undefined' ) {
		 $history_file = $history_file;
	 } else {
		 $history_file = false; 
	 }
	
	
	$.ajax({
		  type: 'POST',
		  url: '<? print site_url("api/content/load_block") ?>',
		  data: { id: $id, rel:$rel , page_id: $page_json.page.id, history_file:$history_file },
		  success: function(data) {
			  // alert(data);
			   $(".editblock#"+$id).html(data);
			   
			 
			   
			   if ( typeof load_editblock_history != 'undefined' ) {
			   load_editblock_history($id, $rel, $page_json.page.id) ;
			   }
			   
			   
			   
			   
               $(".module").each(function(){
                 $(this).attr("id", "module_id_" + mw.id());
               })
       // init_edits();


		  }
		})
		
		
		
}

function get_page_json() {
	if ( typeof get_page_json.page == 'undefined' ) {
    	$page_data = window.location.href ;
    	$.ajax({
  		  type: 'POST',
  		  url: $page_data,
  		  data: { format: 'json'},
           async:false,
           dataType: "json", 
  		  success: function(data) {
    		get_page_json.page = data;

  		  }
  		})
    }

    
return get_page_json.page;
	
}	
function save_editblock($id) {
	// alert($id);
    $(".module_edit_bar").remove();
	$page_json = get_page_json();
	// alert($page_json);




	

	
	var clone =  $(".editblock#"+$id).find(".mw_save").clone(true);
	$(".editblock#"+$id).find(".mw_save").remove();
	$test = $(".editblock#"+$id).html();
	
	$rel = $(".editblock#"+$id).attr('rel');
	
	$(".editblock#"+$id).append(clone)
	
	
	
	

	$.ajax({
		  type: 'POST',
		  url: '<? print site_url("api/content/save_block") ?>',
		  data: { id: $id, html:$test , rel:$rel ,page_id: $page_json.page.id},
          async:false,
		  success: function(data) {
			 // alert(data);
			  load_editblock($id);

		  }
		})
// init_edits();
}




function call_edit_module_iframe(url, id, module_name_original) {
 if(id != undefined){
	url = url + 'element_id:'+id;
	$curent_edit_element_id=id;
 }
 // alert(url);
/*
 * $("#mw_edit_module_iframe").attr('src', url);
 * $("#mw_edit_module_iframe").attr("src") =url;
 * $("#mw_edit_module_iframe").load();
 */
 
 
// $fr = window.frames['mw_edit_module_iframe'];
// $fr.clone().attr('id', 'mw_edit_module_iframe_' + id);
	
 
 
 $el = document.getElementById('mw_edit_module_iframe_'+id);
 mw_sidebar_nav('#mw_sidebar_module_edit_holder');
 $(".mw_edit_module_iframe").hide();
 if ( $el == undefined){
	 
	// module_name_original
	 $('<div>', {
		 className: 'mw_edit_module_iframe',
		    id:   'mw_edit_module_settings_'+id 
		     
		   
		}).appendTo('#mw_sidebar_module_edit_holder');
	 
	 

	 
	 
	 $('<div>', {
		  
		  className: 'mw_edit_module_settings_header',
		    id:   'mw_edit_module_info_'+id
		   
		   
		}).appendTo('#mw_edit_module_settings_'+id);
	 
	 
	 $('<iframe />', {
		    name:  'mw_edit_module_iframe_'+id,
		 // className: 'mw_edit_module_iframe',
		    className: 'mw_edit_module_settings_iframe',
		    id:   'mw_edit_module_iframe_'+id,
		    borderWidth :0,
		    src:  url
		   
		}).appendTo('#mw_edit_module_settings_'+id);
	 document.getElementById('mw_edit_module_iframe_'+id).style.borderWidth = 0;
	 document.getElementById('mw_edit_module_iframe_'+id).setAttribute('frameborder', 0);
	 
	 
	 data1 = {}
	   data1.module = 'admin/mics/module_info';
	    data1.module_info = module_name_original;
	   $.ajax({
	  url: '<? print site_url('api/module') ?>',
	   type: "POST",
	      data: data1,

	      async:true,

	  success: function(resp) {

	   $('#mw_edit_module_settings_'+id).prepend(resp);

	 

	  }
	    });
	 
	 
	   $('#mw_edit_module_settings_'+id ).show();
	 
	 $('#mw_edit_module_settings_'+id).addClass('mw_edit_module_iframe');
	} else {
		// $('#mw_edit_module_iframe_'+id).attr("src") =url;
		 //$('#mw_edit_module_iframe_'+id).show();
		$('#mw_edit_module_settings_'+id ).show();
		
	}

 
/*
 * var height=window.innerWidth;//Firefox if (document.body.clientHeight) {
 * height=document.body.clientHeight;//IE } //resize the iframe according to the
 * size of the //window (all these should be on the same line)
 * document.getElementById('mw_edit_module_iframe_'+id).style.height=parseInt(height-document.getElementById('admin_sidebar').offsetTop-8)+"px";
 */
 
 //$('#mw_edit_module_iframe_'+id).height($("#admin_sidebar").height());
	
 $('#mw_edit_module_iframe_'+id).show();
 

 
 
 
 
 
 
 
/*
 * if(window.frames['mw_edit_module_iframe'].location != url){ if
 * (navigator.appName == 'Microsoft Internet Explorer') {
 * window.frames['mw_edit_module_iframe'].document.execCommand('Stop'); } else {
 * window.frames['mw_edit_module_iframe'].stop(); }
 * 
 * window.frames['mw_edit_module_iframe'].location = url;
 *  }
 */

 
// window.frames['mw_edit_module_iframe_' + id].location = url;
		// var call_iframe = mw.modal.iframe({src:url, width:700, overlay:true,
		// height:500, id:"module_edit_iframe"});

}


function update_module_element($new_value) {
	
	$temp = $('#'+$curent_edit_element_id).parents(".editblock") .attr("id")
	// alert($temp);
	  $('#'+$curent_edit_element_id).attr("mw_params_encoded", $new_value);
	// save_editblock($temp);

	  // mw.modal.close();
	mw.saveALL();
	  
}

mw.saveALL = function(){
 //	$( ".edit .module" ).children().remove();
	
	nic_save_all(function(){
		
		$(".editblock").each(function(){
	        var id = $(this).attr("id");
	       // save_editblock(id);
	    });
		
	//	
		 
			// window.saving =false;
	 
		
		
		
		init_edits();
	
		  try {
			 // $(".module").removeAttr('contentEditable');
			 } catch (e) {
				// $(".module").attr('contentEditable', false);
			 }
		
		
	});
	

    




}



function saveSelection() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

function restoreSelection(range) {
    if (range) {
        if (window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.selection && range.select) {
            range.select();
        }
    }
}

function insertTextAtCursor(text) {
    var sel, range, html;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            // $t1 = ""
            range.insertNode( document.createTextNode(text) );
           // range.pasteHTML(text);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.pasteHTML(text);
    }
}


function rangy_getFirstRange() {
    var sel = rangy.getSelection();
    return sel.rangeCount ? sel.getRangeAt(0) : null;
}