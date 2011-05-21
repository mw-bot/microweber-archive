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


window.mw_editables_created = false;
function mw_make_editables(){
	   window.mw_sortables_created = false;
	  

 if(window.mw_editables_created == false){
  $('.edit').attr('contentEditable', true);	
  


//document.execCommand("styleWithCSS",false,false);
 
  myNicEditor = window.myNicEditor;
  $('.module', '.edit').attr('contentEditable', false);	
  //$('.module *', '.edit').attr('contentEditable', false);	
 
  window.mw_editables_created = true
 }


}
 window.mw_sortables_created = false;
 window.mw_drag_started = false;
function mw_remove_editables(){
/*
 * try { $('.edit').removeAttr('contentEditable'); } catch (e) {
 * $('.edit').attr('contentEditable', false); }
 */
	window.mw_editables_created = false;
	$('.edit').attr('contentEditable', false);
//	$('.edit *').attr('contentEditable', false);
}

 
//$('.edit .module').live('hover',function() {
////	mw_make_editables()
//	//$('.edit .module').attr('contentEditable', false);
//	//$('.edit .module *').attr('contentEditable', false);
//	
//	
//	
//	
////	mw_remove_editables()
//	//mw_remove_inner_sortables()
// init_edits()
//});
//$('.edit div.module').live('click',function() {
//	
//
//});

//$('.edit .module').live('mouseleave',function() {
 
	
 
//	$('.mw_module_overlay').remove();
//	$(this).children('.mw_show').show();
 
//});


//$('.edit .module *:not(.mw_mod_wrap)').live('click',function(event) {
//$('.module').not($("#admin_sidebar .module *")).die("click");
//$('.module, .module *').live('click',function(event) {
//$('.module').not($("#admin_sidebar .module")).live('click',function(event) {
//
//
//// 
//	
//	
//	
//	
//	
//$is_sidebar =	$(this).parents('#admin_sidebar').size();
//$is_toolbarr =	$(this).parents('#mw_toolbar').size();
//
//
////	alert($is_sidebar);
//	
//	if($is_sidebar ==0 && $is_toolbarr ==0){
//	if(  $(this).hasClass('.module')){
//	alert("hasClass('.module') ??? ");	
//	}
//	
//	//alert($is_sidebar + $is_toolbarr);
//	//  $(this).attr('contentEditable', true);	
//
//	//$(this).focus();
//	//restoreCaretPos();
//	//setCaretPos(startNodeIndex, endNodeIndex, start, end)
//
//    mod_id112= $(this).attr('module_id');    
//  mod_name= $(this).attr('mw_params_module');    
//   
// if(mod_id112 == undefined   ){
// 	    mod_id112= $(this).parents('.module').attr('module_id');    
//		     mod_name= $(this).parents('.module').attr('mw_params_module');    
//			 // alert(mod_id112);
// }
//
////    if(mod_name != 'content/text'){
// //$(this).disableSelection();
////   } 
//// alert(mod_id112);
//	if(mod_id112 != undefined  ){
//load_edit_module_by_module_id(mod_id112);
//	}
//	// return false;  
//	 
//	 
//	
//	init_edits()
//	//items: '*:not(.mw_mod_wrap)',
//	 event.preventDefault(); // this prevents the original href of the link from being opened
//	// event.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element
//	return false;
//	//init_edits()
//	
//	
//	
//	
//	
//	}
//	
//	
//	
//});
//$('.module, .module *', '#admin_sidebar').die("click");


$('#mw_sidebar_modules_holder').die("mouseenter");
$('#mw_sidebar_modules_holder').live('mouseenter',function() {
 
	  window.mw_sortables_created = false;
	init_edits()
});
$('#mw_sidebar_module_edit_holder').die("mouseenter");
$('#mw_sidebar_module_edit_holder').live('mouseenter',function() {
 
	  window.mw_sortables_created = false;
	init_edits()
});


 

//$('.edit').live('click',function() {
//$("img:not(a>img)")
//$('.edit *:not(.mw_mod_wrap)').attr('contentEditable', '');	
//$('.edit *:not(.mw_mod_wrap)').live('hover',function() {
	//$(this).focus();
//	$(this).attr('contentEditable', true);	
	
//});

//$('.edit *:not(.mw_mod_wrap)').live('mouseenter',function(event) {
//	//$(this).attr('contentEditable', true);	
//	//is1 = $(this).attr('contentEditable');	
//	//if(is1  == false){
//		//$(this).attr('contentEditable', true);	
//		
//	//}
//})



//$('.edit .module').die("mousedown");
//$('.edit .module').live('mousedown', function(event) {
//
//
//	       mod_id112= $(this).attr('module_id');    
//	     mod_name= $(this).attr('mw_params_module');    
//	      
//	    if(mod_id112 == undefined   ){
//	    	    mod_id112= $(this).parents('.module').attr('module_id');    
//			     mod_name= $(this).parents('.module').attr('mw_params_module');    
//				 // alert(mod_id112);
//	    }
//
//	  //    if(mod_name != 'content/text'){
//	    //$(this).disableSelection();
//	   //   } 
//	    //  alert(mod_id112);
//		if(mod_id112 != undefined  ){
//	   load_edit_module_by_module_id(mod_id112);
//		}
////		 return false;  
//		//event.preventDefault();
//		init_edits()
//		// return false;	
//	  
//	});



//$('.edit .module').die("hover");

 


//
//$('.module *', '.edit' ).live('mouseup', function(event) {
//	//$(".module > a").attr('href');
//// mw.outline.remove('.module');
//if(window.saving ==false){
//// return false;	
//}
//	//event.preventDefault();
//
////if(window.mw_drag_started == false){
//	//window.mw_sortables_created = false;
//	
//	if (window.console != undefined) {
//		console.log('module hover making init_edits()');
//	}
//	//window.mw_editables_created = false;
//	mw_remove_editables();
//	 	init_edits()
//	 	
// 	event.preventDefault(); // this prevents the original href of the link from being opened
// 	event.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element
//		// 
//		// 
//	 return false;
//
//
////	       mod_id112= $(this).attr('module_id');    
////	     mod_name= $(this).attr('mw_params_module');    
////	      
////	    if(mod_id112 == undefined   ){
////	    	    mod_id112= $(this).parents('.module').attr('module_id');    
////			     mod_name= $(this).parents('.module').attr('mw_params_module');    
////				 // alert(mod_id112);
////	    }
////
////	  //    if(mod_name != 'content/text'){
////	    //$(this).disableSelection();
////	   //   } 
////	    //  alert(mod_id112);
////		if(mod_id112 != undefined  ){
////	   load_edit_module_by_module_id(mod_id112);
////		}
////		 return false;  
////		//event.preventDefault();
////
////		// return false;	
//	  
//	});




 

window.mw_making_sortables = false;

$('.edit a').live('click',function(e) {
	 if ($('.mw_live_edit_on_off').hasClass('mw_live_edit_on_off_state_on')) {
    e.preventDefault();
	 }
    //do other stuff when a click happens
});

$('.edit .module a').live('click',function(e) {
	 if ($('.mw_live_edit_on_off').hasClass('mw_live_edit_on_off_state_on')) {	
    e.preventDefault();
	 }
    //do other stuff when a click happens
});

 $('.mw .module *, .mw .module').live('click',function(e) {
	 if ($('.mw_live_edit_on_off').hasClass('mw_live_edit_on_off_state_on')) {
		 
		 
		 
		 
		 
		 
		 
		 if (window.console != undefined) {
				console.log('click on module 1 ' );	
			}
		  window.mw_making_sortables = false;
		  
		$clicked_on_module = 	$(this).attr('module_id');
		  if($clicked_on_module == undefined || $clicked_on_module == ''){
				$clicked_on_module = 	$(this).parents('.module:first').attr('module_id');
		  }
		  
		  $('.mw_non_sortable').removeClass('mw_non_sortable');
		  load_edit_module_by_module_id($clicked_on_module) 
		  
			//event.preventDefault(); // this prevents the original href of the link from being opened
		 	//event.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element
				// 
				// 
			// return false;
		  
		  window.mw_sortables_created = false;
		  init_edits()
		 
		 
		 
		 
		 
		 
		 
		 
		 
    e.preventDefault();
			//event.preventDefault(); // this prevents the original href of the link from being opened
			e.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element
			return false;
	 }
    //do other stuff when a click happens
});

$(".mw .module").live("mouseup mousedown click mouseenter", function(event) {
	 
	
	
	
	
	
	
	 if ($('.mw_live_edit_on_off').hasClass('mw_live_edit_on_off_state_on')) {
	
	if ( event.type == "mouseup" ) {


		  if (window.console != undefined) {
				console.log('mouseup on module '  );	
				
			}
		  
		  
		
			
		  
		  
		  window.mw_making_sortables = false;
		  
	  }  else if ( event.type == "mousedown" ) {

		  if (window.console != undefined) {
				console.log('mousedown on module ' );	
			}
		  
		  $('.edit .mw_non_sortable').removeClass('mw_non_sortable');
		 // window.mw_making_sortables = true;
			$( this).children().disableSelection();
		//  mw_remove_editables();
			
		 	init_edits()
		 	
		 		event.preventDefault(); // this prevents the original href of the link from being opened
		 	event.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element
				// 
				// 
			 return false;
		  
	  }  else if ( event.type == "click" ) {
		  if (window.console != undefined) {
				console.log('click on module ' );	
			}
		  window.mw_making_sortables = false;
		  
		$clicked_on_module = 	$(this).attr('module_id');
		  
		  
		  
		  load_edit_module_by_module_id($clicked_on_module) 
		  
			//event.preventDefault(); // this prevents the original href of the link from being opened
		 	//event.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element
				// 
				// 
			// return false;
		  
		  window.mw_sortables_created = false;
		  init_edits()
		  
		  
		  
	  } else if ( event.type == "mouseenter" ) {
		  if (window.console != undefined) {
				console.log('mouseenter on module ' );	
			}
		  
	//	  $( this ).disableSelection();
		//	$( this ).children().disableSelection();
			$(this).attr('contentEditable', false);
			$( this ).children().attr('contentEditable', false);
		  
			$( '.mw_non_sortable' ).removeClass('mw_non_sortable');
			//$( this ).children().removeClass('mw_non_sortable');
 
		  init_edits()
		  
	  }
	  
	  
	  else {
	    // do something on mouseout
		  window.mw_making_sortables = false;
	  }
	
	
	
	
	
	 }
	
	
	
	
	
	});


//$('a:not("a[href^=mailto]").live('click',function(){ });

$(".edit *").live("click mouseup mousedown", function(event) {
	

	 if ($('.mw_live_edit_on_off').hasClass('mw_live_edit_on_off_state_on')) {
	
	  if ( event.type == "mousedown" ) {
 
//		    cssApplier.toggleSelection();
	 rangy.init();
	 
	var sel = rangy.getSelection();
	//var sel1 = rangy.getRange();

		//  rangy.refresh(true);
	//sel.normalizeBoundaries();
	
	var el = this;
	var range = rangy.createRange();
	range.selectNodeContents(el);
	range.normalizeBoundaries();
	 
	
	
	sel.removeAllRanges();
		  
	  }  else if ( event.type == "click" ) {

		  
		  
		  
		  
	  }  else if ( event.type == "mouseup" ) {
		  
		  
			if($(this).hasClass('module')) {
				mw_remove_editables()
				$( this ).removeClass('mw_non_sortable');
				$( this ).children().removeClass('mw_non_sortable');
				window.mw_sortables_created = false;
				 init_edits();
					event.preventDefault(); // this prevents the original href of the link from being opened
					event.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element
				 
				return;
			}
			

			if($(this).parents().hasClass('module')) {
				$( this ).removeClass('mw_non_sortable');
				$( this ).children().removeClass('mw_non_sortable');
				mw_remove_editables()
				 if (window.console != undefined) {
						console.log('click inside module ');	
					}
				 window.mw_sortables_created = false;
				 init_edits();
					event.preventDefault(); // this prevents the original href of the link from being opened
					event.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element
				 
				return;
			}

		  
		  
			var randomCssClass = "rangyTemp_" + (+new Date());
		  rangy.init();
		  
		  
		   
		  var classApplier = rangy.createCssClassApplier(randomCssClass, true);
		//   cssApplier.toggleSelection();
		  
		  
		  
		  
		  
		  
		  
		  

			 if(window.mw_making_sortables == false){
			 
			 
			 
//			$('.to_here_click').removeClass('to_here_click')
			//$('.module *', '.edit' ).addClass('mw_mod_wrap');
			//$('.module', '.edit' ).addClass('mw_mod_wrap');
		
			 
			
			
			

			// event.target.setAttribute('mw_id', window.mw_last_hover);	
			 
			
			
			 
			 
//			 is_editable = event.target.getAttribute('contentEditable');
			
			 
			 //$is_in_module=	$(this).parents('.module').size();
			 
			 $is_ce_edit=	$(this).parent('.edit').attr('contentEditable');
			 
			 $is_in_module = 0;
			
			 
			 
			
			 
			 if($is_in_module == 0){
				 
					if (window.console != undefined) {
						console.log('not in module');	
					}
					//addClass(event.target, 'mw_non_sortable');
					
					//$('.edit .module *').removeClass('mw_non_sortable');
					$(this).addClass('mw_non_sortable');
				//	$('.edit').addClass('mw_non_sortable');
					
					
					if(window.mw_sortables_created == true){
					
					remove_sortables();
					}
				    

					
//				     var range = rangy.getSelection();
//				     range= range.rangeCount ? range.getRangeAt(0) : null;
//				     if (range != null && range != '') {
//					     	//  var newdiv = document.createElement('div');
//								     	  //newdiv.innerHTML ='ahaaa';
//								        // range.insertNode(newdiv);
//				         rangy.getSelection().setSingleRange(range);
//				         cssApplier.applyToSelection();
//				         
//				         
//				     }
//				    
					
					
					
					
					if(event.target.nodeName != undefined){
					
					
					$("#mw_sidebar_styler").html("clicked: " + event.target.nodeName).show();
					 window.mw_last_hover++;
					 event.target.setAttribute('mw_tag_edit', window.mw_last_hover);	
					 
					 
			//
			 
					 
					 
					 
					 
					 $("#style_mw_id").val( window.mw_last_hover);
					 $("#mw_css_editor_element_id").val( window.mw_last_hover);
					 $("#style_mw_tag").val( event.target.nodeName);
					 
					 
					 
					 
				    	// var randomCssClass = "rangyTemp";
						   
						   classApplier.applyToSelection();
					 
					//	   classApplier.toggleSelection();
					   
					   var range = rangy.getSelection();
	 
					     range= range.rangeCount ? range.getRangeAt(0) : null;
					     if (range != null && range != '') {
					    	 window.mw_last_hover++
							  
							  // classApplier.toggleSelection();
							   
							   $sel123 =   $("." + randomCssClass);
							   
//							   var el = $("." + randomCssClass);
//							   var range = rangy.createRange();
//							   range.selectNodeContents(el);
//							   var sel = rangy.getSelection();
//							   sel.setSingleRange(range);
							    //classApplier.applyToSelection();
							  
							    // Now use jQuery to add the CSS colour and remove the class
							   $sel123.attr( "mw_tag_edit",window.mw_last_hover );
							    
							   // rangy.refresh(true);
							    var sel = rangy.getSelection();
							    sel.refresh(true);
							   
							    
							    
							    $("#style_mw_id").val( window.mw_last_hover);
								 $("#mw_css_editor_element_id").val( window.mw_last_hover);
								 $("#style_mw_tag").val( event.target.nodeName);
						    
								 $sel123.removeClass( randomCssClass );
								 
								 mw_html_tag_editor(window.mw_last_hover)
						    
					     } else {
					    	
					    	// undoToRange
					    	 mw_html_tag_editor(window.mw_last_hover)
					     }
					    // classApplier.toggleSelection();
					   
		
					     var sel = rangy.getSelection();
						    sel.refresh(true);
					
					
				
					
					 if (window.console != undefined) {
							console.log('click on ' + event.target.nodeName );	
						}
					
					
					
					}
					
					
					
					
					
					
					
					
					
					
					
				 if(window.mw_editables_created == false){
					if( $is_ce_edit != 'true'){
				 
				 
				
				 
				 is_editable =  $is_ce_edit;
			
			 // $(this).sortable('destroy');
			 	 if(is_editable == undefined || is_editable != 'true'){
			 		 
			 		// event.target.setAttribute('contentEditable', true);	
			 		 
			 		 
			 		if (window.console != undefined) {
			 		//	console.log('Making CE   ' + event.target.nodeName);	
			 		}
			 		 
//				 $("#mw_sidebar_styler").html("clicked: " + event.target.nodeName).show();
					 if (window.console != undefined) {
				 			console.log('is_editable ' + is_editable);	
				 		}
					 
						if (window.console != undefined) {
							console.log('making editables - click on ' + event.target.nodeName + $is_ce_edit +$is_in_module);	
						}
				 
				 
				//	 remove_sortables()
				 	 mw_make_editables()
				 	window.mw_editables_created = true;
		 	// window.mw_sortables_created = false;
		 	// event.target.setAttribute('contentEditable', true);	
		 //	 $(this).parents('.edit').attr('contentEditable', true);
			 	 }
			 	 }
		 	 
		 	 
		 	 
		 	 
			// mw_html_tag_editor(window.mw_last_hover)
					}
 //		 $(this).focus();
				 
				 
				 
				 
				 
				 	
			event.preventDefault(); // this prevents the original href of the link from being opened
					event.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element
					 
					
		//	return false;
				 
				 
				 
				 
			 } else {
				// mw_remove_editables()
				 //$(this).parents('.module').attr('contentEditable', false);
				// init_edits();
				 
		//event.preventDefault(); // this prevents the original href of the link from being opened
				//event.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element
				// 
				// 
			//return false;
				 
				 
				 
				 
				 
				 
				 
					if (window.console != undefined) {
						console.log('module hover making init_edits()');
					}
					//window.mw_editables_created = false;
					
					 	
				 	event.preventDefault(); // this prevents the original href of the link from being opened
					event.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element
						// 
						// 
					 return false;
				 

			 }
			 
			
			 
			 
			 
			 
		 }
			
		  
		  
		  
		  
	  } else {
	    // do something on mouseout
		  //window.mw_making_sortables = false;
	  }
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	 }
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	});



//$(".edit .module *").live("mouseup", function(event){
//	if (window.console != undefined) {
//		console.log('hover on module ' + event.target.nodeName );	
//	}
//	
//	
//	
//	
//});



//$('.edit *:not(.mw_mod_wrap)').die('click') ;

 
 //$('.edit *').live('click',function(event) {
//$('.edit *').filter('.module)').live('click', function(event){ 
 

//
//$('.edit *').live('click',function(event) {
//	
//	
//	is = $(this).attr('contentEditable');	
//	
//	
//
//	//alert(is);
//	
//	//$(this).focus();
//	
////if(is == false){
////	setCaretAfter(this);
//	//}
////	 range = document.body.createTextRange();
////     range.moveToElementText(this);
////     range.collapse(false);
////     range.select();
//     
//	//	$(this).parentsUntil('.edit').attr('contentEditable', true);	
//	 	//$(this).parent().attr('contentEditable', true);	
//
//	
//	if (window.console != undefined) {
//	console.log('Making CE'+is+$(this).attr('class'));	
//	}
////	$ce =   $(this).attr('contentEditable');	
////	if($ce  == false){
////	//	$(this).attr('contentEditable', true);	
////		//$(this).parent().attr('contentEditable', true);	
////		
////		
////	
////	//	alert('ce 0');
////	//	$(this).attr('contentEditable', false);	
////	window.mw_drag_started = false;
////	 window.mw_sortables_created = false;
////	 remove_sortables()
////	
////	
////	//restoreCaretPos();
//////	mw_remove_inner_sortables()
//// // $(this).attr('contentEditable', true);	
////	 mw_make_editables()
////	// $(this).siblings().attr('contentEditable', true);	
////	// $(this).parentsUntil('.edit').attr('contentEditable', true);	
////	// $(this).focus();
////	} else {
////		//alert('ce 1');
////		//$(this).focus();
////		 
////		
////		
////		// $(this).attr('contentEditable', true);	
////		
////	//	 $(this).siblings().attr('contentEditable', true);	
////		//$(this).parentsUntil('.edit').attr('contentEditable', true);	
////		
////	}
//	
////	 remove_sortables()
////	 mw_make_editables()
////	 window.mw_sortables_created = false;
////	 $(this).sortable('destroy');
////	 $(this).parents().sortable('destroy');
////	 $(".edit").sortable('destroy');
////	$(this).attr('contentEditable', true);	
////	
//	
//	
//	//  event.preventDefault(); // this prevents the original href of the link from being opened
// //event.stopPropagation(); // this prevents the click from triggering click events up the DOM from this element
// 
// 
// //return false;
// 
////	 window.mw_sortables_created = false;
//	//init_edits()
//
//	
//});
 



function mw_resize_admin_sidebar(){
	 var h1 = $(window).height();
	 var h2 = $('#mw_toolbar').height();
	 $('#admin_sidebar').height(h1-45);	
	 
	 
	 var h3 = $('#admin_sidebar').height();
	// var h4 = $('#admin_sidebar').height(); 
	 $('.mw_edit_module_settings_iframe').height(h1-(145));	
	 
	 
	 var viewportwidth;
	 var viewportheight;
	 
	 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	 
	 if (typeof window.innerWidth != 'undefined')
	 {
	      viewportwidth = window.innerWidth,
	      viewportheight = window.innerHeight
	 }
	 
	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)

	 else if (typeof document.documentElement != 'undefined'
	     && typeof document.documentElement.clientWidth !=
	     'undefined' && document.documentElement.clientWidth != 0)
	 {
	       viewportwidth = document.documentElement.clientWidth,
	       viewportheight = document.documentElement.clientHeight
	 }
	 
	 // older versions of IE
	 
	 else
	 {
	       viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
	       viewportheight = document.getElementsByTagName('body')[0].clientHeight
	 }
	 
	 
	 
	 
	  $w1 =  viewportwidth;
	  $w2 = $('#wrapper').width();
	//  $w2 =  document.body.clientWidth;
	  if(($('#wrapper').size()) > 0){
	  $w2 = $('#wrapper').width();
	  }
	  
	  if(($('.wrapper').size()) > 0){
		  $w2 = $('.wrapper').width();
		  }

	  
	  if($w1 <  $w2+200){
		  if (window.console != undefined) {
	 			console.log('Body size '+$w2 );	
	 			console.log('Window size '+ $w1);	
	 		}
		  
		  $('body').width($w2+650+'px');
	  }
	  
	  
	
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
			
			
	 
	 
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
	if( window.mw_editables_on_page == undefined){
		window.mw_editables_on_page  = $( ".edit" );
	}
	
	if (window.console != undefined) {
 			console.log('remove_sortables   ');	
 		}
	
	
	
//	if(window.mw_sortables_created == true){
	
	try
	  {
		$('.edit').sortable('destroy');
	  }
	catch(err)
	  {
	  //Handle errors here
	  }
	
	
	
	
	
	//$('.edit *').sortable('destroy');
	 window.mw_sortables_created = false;
	//}
}
var wscrolltop = 0;

function init_edits(){
	//mw_remove_editables() 
	//mw_make_editables()
//	mw_make_draggables();
	
	
	
//	window.mw_sortables_created = false;
	if( window.mw_sortables_created == false && window.mw_drag_started == false){
		$('.module *', '.edit' ).addClass('mw_mod_wrap');
		
		
		if( window.mw_editables_on_page == undefined){
			window.mw_editables_on_page  = $( ".edit" );
		}
		
		 
		
		mw_sidebar_make_sortables();
		
		
		
		//$('.edit .module' ).attr('contentEditable', false);
		//$('".edit .module *' ).attr('contentEditable', false);

//		$( ".module" ,'.edit' ).disableSelection();
		bind_module_edit_iframe_click()
		
		
		
		
		
		
		
		
		
		
		
	 window.mw_sortables_created = true;
	
	 start =  window.mw_last_hover;
	  if(start == undefined){
		  var start = new Date().getTime();
		  window.mw_last_hover = start;
	  }
	  window.mw_last_hover++;
	
/*	  $(".mw_put_module_ids").each(function (i) {
			$(this).attr('module_id', 'module_'+window.mw_last_hover);
	      });*/
	  
		put_new_ids = $(".mw_put_module_ids");
		put_new_ids_length123 = put_new_ids.length;
		//length = $edit_fields.length();
	 
	tempArray=new Array(); 
		for (var ed=0;ed<put_new_ids_length123; ed++) {  
			put_new_id = put_new_ids[ed];
			put_new_id.setAttribute('module_id','module_'+window.mw_last_hover++);
		} 
		
		
		
	 
	 
	// $( ".edit .module > *" ).disableSelection();
	 
	 
	 var sort_opts = {
				forcePlaceholderSize: true,
				forceHelperSize : true ,
				//tolerance: 'pointer',
				tolerance: 'intersect',
			//	iframeFix: true,
			   //cancel: '.module > * :not(:has(.module)) ',
			    cancel: '.mw_non_sortable',
				placeholder: "to_here_drop",
				placeholderElement: 'div',
			//	placeholderElement: '.edit *',
				create:function(event, ui){
							      
		 if( $(ui.item).has('.close').length == 0 ) {
				$(ui.item).prepend('<a href="#" class="close" onclick="$(this).parent().remove();">x</a>');
			}   
							         
	 		},
	 		over: function(e, ui) {
           //     $(this).addClass('to_here_drop'); //Adding a class that will add a border
           //     ui.placeholder.css($.data(ui.sender[0], 'ui-sortable').placeholderElement.offset()); //So I have to relocate the placeholder by two pixels
        },
		     beforeStop: function (event, ui) {
						    	 if( ui.offset !== undefined )
						    	  ui.helper.css('margin-top', 0);
						    	 
						    	 
						    	 
						    	 $( ".edit .mw_non_sortable" ).removeClass('mw_non_sortable');
						    	 
						    	 
						    	 
						    	 
		    	},


			//	items: '.module',
				//items: '*',
				items: '*:not(.mw_mod_wrap)',
				//items: '*:not(:has(.module))',
				//revert: true,
				
				//zIndex: 5000,
			//	 grid: [5, 5],
		 	//opacity: 0.6,
		   	distance: 5,
				
							update: function(event, ui) {
		    		$( ".edit .mw_non_sortable" ).removeClass('mw_non_sortable');
		    		
		    		
		    		
		    		
							 		window.mw_drag_started = false;
							            if(this.id == 'sortable-delete') {
							                // Remove the ele ment dropped on #sortable-delete
							                $('#'+ui.item.attr('id')).remove();
							            } else {
							                // Update code for the actual sortable lists
							            	// window.mw_sortables_created = false;
							            //	 init_edits()
							            }
							          //  $( ".edit .module > *" ).disableSelection()
							     //  	 window.mw_sortables_created = false;
										
							     	// init_edits()
										
							            //init_edits();
							       window.mw_drag_started = false;
							     //   $('#'+ui.item[0].id).addClass("ui-state-highlight");
							        $( ".edit .module > *" ).disableSelection()
							       //  window.mw_sortables_created = false;
							        nic_save_all(mw_load_history_module, true);
							    	bind_module_edit_iframe_click()
							        } ,
							       
							        
							        
							        
							        start : function(event, ui) { 
							       	mw_remove_editables();
							        window.mw_drag_started = true;
							        
							  //      $(".edit").disableSelection()
							    //    ui.item.show().addClass('original-placeholder');

							        },
							        
							        
							        
							        
							        
							        
							        
							        
							        
							        stop: function(event, ui) { 
							        	if (ui.item.hasClass("mw_mod_wrap")) {
							                // This is a new item
							               // ui.item.remove();;
							            ui.item.html("<b>HI mw_mod_wrap bug in mw_edit.js see there.... ??? maybe threre is setting of - 	items: '*:not(.mw_mod_wrap)' -, in the init_edits</b>");
							            }
					
							        	$(".edit").enableSelection()
							        	if (ui.item.hasClass("mw_mod_wrap_main")) {
							        	ui.item.css('zoom', '');
							        	ui.item.css('filter', '');
							        	ui.item.css('margin-top', '');
							        	ui.item.css('opacity', ''); 
							        	}
				 
							        //	mw_make_editables();
							        	
		        	
							        	},
		        
			 
			

			
				receive: function(event, ui) {
				//copyHelper= null;
				
							window.mw_drag_started = false;
					 
							$( ".edit .module_draggable" ).css("display","");
			
							$( ".edit .module_draggable" ).removeClass('module_draggable');
							$( ".edit .mw_put_module_ids" ).removeClass('mw_put_module_ids');
							$( ".edit .mw_no_module_mask" ).removeClass('mw_no_module_mask');
					//		$( ".edit .mw_mod_wrap" ).removeClass('mw_mod_wrap');
							//$( ".edit .mw_mod_wrap" ).remove();
							
							 
							$( ".edit .mw_show" ).show();
							$( ".edit .mw_show" ).removeClass('mw_show');
						//	$( ".edit .module" ).empty();
							
							$( ".edit *" ).attr('sizcache', '');
							$( ".edit *" ).attr('sizset', '');
							
							
							$( ".edit .js_mod_remove" ).remove();
							
							mw.saveALL();
							 window.mw_sortables_created = false;
							// mw_make_editables()
							init_edits()
							bind_module_edit_iframe_click()
							
			}
			
			
		//	,connectWith: ".edit:not(.mw_mod_wrap)"
			};
	
	 window.mw_editables_on_page.sortable('destroy');
	
	$('.module', '.edit' ).children().addClass('mw_mod_wrap');
	$('.module *', '.edit' ).addClass('mw_mod_wrap');
	//$('.edit .module').addClass('mw_mod_wrap');
	$('.module', '.edit' ).addClass('mw_mod_wrap_main');
	
//	$( ".edit" ).selectable();
	$edit_fields = window.mw_editables_on_page;
	length123 = $edit_fields.length;
	//length = $edit_fields.length();
	 if ( $.browser.msie ) {
		 
	 } else {
		// sort_opts.revert = 300;
    	 
    	 
	 }
tempArray=new Array(); 
	for (var ed=0;ed<length123; ed++) {  
		$edit_field_id = $edit_fields[ed].id;
		if (window.console != undefined) {
		console.log($edit_field_id);
		}
	//	$selects1 = $selects1 +  ', #'+$edit_field_id 
		tempArray[ed]='#'+$edit_field_id;
		$( '#'+$edit_field_id+'').sortable(sort_opts).sortable( "option", "connectWith", ".edit" );
 
	} 
	
	
	$( "#draggable" ).draggable({
		connectToSortable: "#sortable",
		helper: "clone",
		revert: "invalid"
	});
	$( "ul, li" ).disableSelection();
	//tempArray_string = tempArray.join(', ') 
//	alert(tempArray_string);
 //	$( tempArray_string ).sortable(sort_opts).sortable( "option", "connectWith", ".edit" );
	//$( ".edit" ).sortable(sort_opts).sortable( "option", "connectWith", ".edit" );
	

	
	
	sort_opts_sidebar = sort_opts;
//	sort_opts_sidebar.items = "*"
	//$( ".sortable_modules" ).sortable(sort_opts_sidebar);
	$('.edit .module .mw_module_overlay').removeClass('mw_mod_wrap');
	
	
	
//	$( ".module > *" , '.edit' ).disableSelection()
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
	sort_opts2.containment = '.module'; 
	sort_opts2.handle = '.mw_mod_wrap_main';
	//sort_opts2.connectWith = ".edit"
 	sort_opts2.cancel = '.mw_mod_wrap';

 	$( ".mw_mod_wrap_main", '.edit' ).sortable('destroy');
		$( ".mw_mod_wrap_main", '.edit' ).sortable(sort_opts2).sortable( "option", "connectWith", ".edit" );;	
	//	$( ".mw_mod_wrap", '.module' ).disableSelection();
		$( ".mw_mod_wrap", '.module' ).sortable('destroy');
	//	$( ".edit .module" ).children().sortable( "disable" );
	//$( ".edit .module" ).children().sortable( "destroy" );
	
		
	//	$('.edit .module *').hasAncestor('.module').css('opacity','0.5').css('z-index','-10');
		//$('.edit .module *').css('opacity','0.5').css('z-index','-10');
	

		//$('.edit .module a').attr('href', '#');
	//	$('.edit .module a').attr('onclick', '');
		$('.edit .module').attr('contentEditable', false);
		$('.edit .module *').attr('contentEditable', false);
		
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
	
	//$(".module, .edit .module *", '.edit').die("mouseup");
	//$('.module, .edit .module *', '.edit').live('mouseup', function(event) {
	
	
	//$(".module").not($("#admin_sidebar .module")).die("mouseup");
//	$(".module").not($("#admin_sidebar .module")).live('mouseup', function(event) {
	
	
	
//	$('.edit .module *').die("click");
//	$('.edit .module *').live('click', function(event) {
//		
//		  mod_id112= $(this).attr('module_id');    
//		     mod_name= $(this).attr('mw_params_module');    
//		      
//		    if(mod_id112 == undefined   ){
//		    	    mod_id112= $(this).parents('.module').attr('module_id');    
//				     mod_name= $(this).parents('.module').attr('mw_params_module');    
//					 // alert(mod_id112);
//		    }
//
//		  //    if(mod_name != 'content/text'){
//		    //$(this).disableSelection();
//		   //   } 
//		    //  alert(mod_id112);
//			if(mod_id112 != undefined  ){
//		   load_edit_module_by_module_id(mod_id112);
//			}
//			 return false;  
//		
//		
//		event.stopPropagation();
//		 event.preventDefault(); // this prevents the original href of the link from being opened
//		 return false;	
//	});
	
//	$('.edit .module *').die("click");
//	$('.edit .module *').live('click', function(event) {
//		//$(".module > a").attr('href');
//	// mw.outline.remove('.module');
//	if(window.saving ==false){
//	// return false;	
//	}
//		//event.preventDefault();
//	
//	//if(window.mw_drag_started == false){
//		//window.mw_sortables_created = false;
//		
//		if (window.console != undefined) {
//			console.log('module mouse up making init_edits()');
//		}
//		
//		
//		
//		 	init_edits()
//	//}
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
//	
//	
//	
//	
//	
//	
//	
//	
//	//alert(31231);
//	
//	
//	
//	
//	
//	
//
//		       mod_id112= $(this).attr('module_id');    
//		     mod_name= $(this).attr('mw_params_module');    
//		      
//		    if(mod_id112 == undefined   ){
//		    	    mod_id112= $(this).parents('.module').attr('module_id');    
//				     mod_name= $(this).parents('.module').attr('mw_params_module');    
//					 // alert(mod_id112);
//		    }
//
//		  //    if(mod_name != 'content/text'){
//		    //$(this).disableSelection();
//		   //   } 
//		    //  alert(mod_id112);
//			if(mod_id112 != undefined  ){
//		   load_edit_module_by_module_id(mod_id112);
//			}
//			 return false;  
//			//event.preventDefault();
//
//			// return false;	
//		  
//		});
	
	
	 
	
	
	
}
var copyHelper= null;
function mw_sidebar_make_sortables(){
	var copyHelper= null;
	
	$(".sortable_modules").sortable('destroy');
	
	$(".sortable_modules").sortable({
	//connectWith: '.edit',
	items: '.module_draggable',
	forcePlaceholderSize: true,
	tolerance: 'pointer',
	zIndex: 50000,
	forcePlaceholderSize: true,
	forceHelperSize : true ,
	tolerance: 'intersect',
  //
	cancel: '.mw_mod_wrap',
	placeholder: "to_here_drop",
 
	
	
	helper: function(e,li) {
	copyHelper= li.clone().insertAfter(li);
	return li.clone();
	},
	//placeholder: "ui-state-highlight",
	stop: function() {
	copyHelper && copyHelper.remove();
	}
	}).sortable( "option", "connectWith", ".edit" ).disableSelection();
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


function gEBI(id) {
    return document.getElementById(id);
}

var italicYellowBgApplier, boldRedApplier;

function toggleItalicYellowBg() {
  //  italicYellowBgApplier.toggleSelection();
   // event.preventDefault(); // this prevents the original href of the link from being opened
 	// event.stopPropigation(); // this prevents the click from triggering click events up the DOM from this element
	document.execCommand("italic", false, null);
}

function toggleBoldRed() {
	
	document.execCommand("bold", false, null);
	
	
//	
//    boldRedApplier.toggleSelection();
//    event.preventDefault(); // this prevents the original href of the link from being opened
// 	 event.stopPropigation(); // this prevents the click from triggering click events up the DOM from this element
      	
}

//window.onload = function() {
//    rangy.init();
//
//    // Enable buttons
//    var cssClassApplierModule = rangy.modules.CssClassApplier;
//    if (rangy.supported && cssClassApplierModule && cssClassApplierModule.supported) {
//        boldRedApplier = rangy.createCssClassApplier("boldRed", true);
//        italicYellowBgApplier = rangy.createCssClassApplier("italicYellowBg", true, ["span", "a", "b"]);
//
//        var toggleBoldRedButton = gEBI("toggleBoldRedButton");
//        toggleBoldRedButton.disabled = false;
//        toggleBoldRedButton.onmousedown = function() {
//            toggleBoldRed();
//           event.preventDefault(); // this prevents the original href of the link from being opened
//  	 event.stopPropigation(); // this prevents the click from triggering click events up the DOM from this element
//       	
//            return false;
//        };
//
//        var toggleItalicYellowBgButton = gEBI("toggleItalicYellowBgButton");
//        toggleItalicYellowBgButton.disabled = false;
//        toggleItalicYellowBgButton.onmousedown = function() {
//            event.preventDefault(); // this prevents the original href of the link from being opened
//         	 event.stopPropigation(); // this prevents the click from triggering click events up the DOM from this element
//              	
//            toggleItalicYellowBg();
//            return false;
//        };
//    }
//};


var editing;
var c;
var guid;

function setup()
{
    c=$(".edit");
    var bbar = $("<div class='buttons'>Regular buttons<br></div>");
    $("#buttons").append(bbar);
    add_regular_button(bbar, "Clone", function(){clone()});
    add_regular_button(bbar, "toggle research", 
		       function(){toggle_class(".research")});
    add_regular_button(bbar, "toggle edit", 
		       function(){toggle_edit()});
    var editButtons = $("<div id='editButtons' class='buttons'>Edit buttons<br></div>");
    $("#buttons").append(editButtons);
    add_regular_button(editButtons, "save", function(){save_edit()});
    add_edit_button(editButtons, "Q",   "insertHTML", "&ldquo;quotes&rdquo;"); 
    add_edit_button(editButtons, "I",   "italic", null);
    add_edit_button(editButtons, "S",   "strikethrough", null);
    add_edit_button(editButtons, "B",   "bold", null);
    
    
    add_edit_button(editButtons, "ol",  "insertHTML", "<ol><li>one</ol>\n");
    add_edit_button(editButtons, "ul",  "insertHTML", "<ul><li>one</ul>\n");
    add_edit_button(editButtons, "pre", "insertHTML", "<pre></pre>");
    add_edit_button(editButtons, "h2",  "insertHTML", "<h2>H2</h2>");
    add_edit_button(editButtons, "h1",  "insertHTML", "<h1>H</h1>");
    add_edit_button(editButtons, "p",  "insertHTML", "<p>para</p>");
    
    
    
    
    add_edit_button(editButtons, "todo",  "insertHTML", 
		    "<h3>To Do</h3><ul><li>one</li>");

    add_edit_button(editButtons, "image",  "insertHTML", 
		    "<center><img onclick='cimage(1);' width='200' src='p2.jpg'/></center>");
    add_regular_button(editButtons, "add research", 
		       function(){add_div("research")});
    entry = $("<input id='#input'></input>");
    editButtons.append(entry);
    var versions = $("<div id='versions' class='buttons'>versions<br></div>");
    $("#buttons").append(versions);
    // load_versions("2009_06_25d");
    // Not yet ...
    set_edit_off();
}

function cimage(x)
{
    alert(x);
    alert($(this));
    $(this).hide();
}


function save_edit()
{
    // send data back to the server
    val = $("#content").html();
    $.get("save_content", 
	  {id:guid, value:val}, function(x){done_save(x)}, 'json'); 
}

function load_content(g)
{
    $.get("load_content", {id:g}, function(x){done_load(x)}, 'json'); 
}

function done_save(x)
{
    done_load(x);
    $("#versions").html(x.versions);
    
}

function done_load(x)
{
    $("#header").html("guid=" + x.guid + " last modified=" + x.mod
		      + " editable=" + x.edit);
    guid = x.guid;
    $("#content").html(x.val);
    switch(x.edit){
    case true:
	set_edit_on();
	break;
    case false:
	set_edit_off();
	break;
    };
}

function toggle_edit()
{
    switch(editing){
    case true:
	set_edit_off();
	break;
    case false:
	set_edit_on();
	break;
    };
}


function load_content_old(type, G)
{
    // alert("load content type=" + type + " guid=" + G);
    // $("#header").html("Guid=" + G);
    $("#content").load("load_content",{id:G});
    guid=G;
    switch(type){
    case "edit":
	set_edit_on();
	break;
    case "lock":
	set_edit_off();
	break;
    default:
	alert("????????");
    };}

function load_versions(Guid)
{
    // load the toolbar with versions ...
    $("#versions").load("get_versions", 
			{"id":Guid});
    
}

function toggle_class(x)
{
    $(x).toggle();
}

function set_edit_off()
{
   // c.get(0).contentEditable = false;
   // c.css({background:"white"});
    editing=false;
   // $("#header").html("<h2>This document cannot be edited</h2>");
    $("#editButtons").hide();
}

function set_edit_on()
{
   // c.get(0).contentEditable = true;
   // c.css({background:"#eeeeee"});
    editing=true;

    //$("#header").html("<h2>You can now edit this document - but you can't save the results</h2>");
    $("#editButtons").show();
}

function add_regular_button(x, text, callback)
{
    var button = $("<button>" + text + "</button>").
	click(callback);
    x.append(button);
}  

function add_div(x)
{
    var y = "." + x;
    $(x).show();
    document.execCommand("insertHTML",
			 false,
			 "<div class='" + x +"'>Add " + x + "here</div>");
}

function add_edit_button(x, text, cmd, val)
{
    var button = $("<button>" + text + "</button>").
	click(function(){
		
		if(cmd == "insertHTML"){
			if($.browser.msie){
				document.selection.createRange().pasteHTML(val)
			}else{
				document.execCommand(cmd, false, val);
			}
		} else {


		document.execCommand(cmd, false, val);
		}
		
	    });
    x.append(button);
}



var cssApplier;
$(document).ready(function() {

	 rangy.init();
	 //   cssApplier = rangy.createCssClassApplier("red", true);


	 
	       // rangy.init();
	      //  cssApplier = rangy.createCssClassApplier("blue", true);
	 
	
	//document.execCommand("styleWithCSS",false,false);
	if( window.mw_editables_on_page == undefined){
		window.mw_editables_on_page  = $( ".edit" );
	}
	
	if(window.myNicEditor == undefined){
	/*	  myNicEditor = new nicEditor({

		            fullPanel : true,
		            iconsPath : "<?php print( ADMIN_STATIC_FILES_URL);  ?>js/nicEditorIcons.gif",
		  		  uploadURI : "<? print site_url('api/media/nic_upload') ?>",
		            onSave:function(content, id, instance){

		  nic_save(content, id, instance);


		            }

		  });*/
		myNicEditor = false;
		  window.myNicEditor =myNicEditor;
		} else {
			myNicEditor = window.myNicEditor;	
		}
	
	
	//myNicEditor.setPanel('mw_editbar');
	
	
	 $('.edit[contenteditable=true]').keydown(function(e) {
		    // trap the return key being pressed
		    if (e.keyCode == 13) {
		      // insert 2 br tags (if only one br tag is inserted the cursor won't go to the second line)
		      document.execCommand('insertHTML', false, '<br><br>');
		      // prevent the default behaviour of return key pressed
		      return false;
		    }
		  });

	
	//init_edits()
	 
	
//	$(document).bind('keydown', 'ctrl+z', mw_click_on_history_prev);
	//$(document).bind('keydown', 'ctrl+y', mw_click_on_history_next);
	//$(document).bind('keydown', 'ctrl+s', mw.saveALL);
	
	
	mw_resize_admin_sidebar();
 
	if(typeof window.parent.mw_edit_init == 'function'){
	window.parent.mw_edit_init(window.location.href);
	}

	
	
	
 
	
	

	
	

  
                 


 

	


 

$(window).load(function(){
	 // init_edits()


});


  
	}); // end doc ready

var $curent_edit_element_id

function mw_delete_module_by_id($id, $ask){
	$del = true;
	if($ask != undefined){
	
	var r=confirm("Are you sure you want to delete this module?");
	if (r==true)
	  {
		$del = true;
	  }
	else
	  {
		$del = false;
	  }
	} else {
		$del = true;
	}
	
	
	
	
	if ($del==true){
	  var $module_by_id  =   $id;
      //alert($module_by_id); 
       $module_by_id  =$("div[module_id='"+$module_by_id+"']"); 
      $module_by_id.remove();
	}
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
		  // call_edit_module_ajax($url, id, module_name_original);
		   call_edit_module_ajax(id, module_name_original);
		   mw_resize_admin_sidebar()
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

			    	$("#"+this.page_element_id).html(this.page_element_content);

			    });

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



function dummy_request(){
	
	   http = new XMLHttpRequest();

	   http.open("GET", "<? print site_url('module/text') ; ?>");
	   http.onreadystatechange=function() {
	       if(http.readyState == 4) {
	        //    alert(http.responseText);
	       }
	   }
	   http.send(null);
}

function call_edit_module_ajax(id, module_name_original) {
				 if(id != undefined){
					//url = url + 'element_id:'+id;
					$curent_edit_element_id=id;
				 }
				 
				 
				 
				 
				 //$url = '<? print site_url("api/module") ?>/:'+edit+'/page_id:'+page_id+'/post_id:'+post_id+'/category_id:'+category_id+'/'+'module_to_edit:'+module_name+'/';
				
				 
				
				 
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
						 'class': 'mw_edit_module_iframe',
						    id:   'mw_edit_module_settings_'+id 
						     
						   
						}).appendTo('#mw_sidebar_module_edit_holder');
					 
					 
				
					 
					 
					 $('<div>', {
						  
						  'class': 'mw_edit_module_settings_header',
						    id:   'mw_edit_module_info_'+id
						   
						   
						}).appendTo('#mw_edit_module_settings_'+id);
					 
					 
					 $('<div />', {
						    name:  'mw_edit_module_iframe_'+id,
						 // className: 'mw_edit_module_iframe',
						    'class': 'mw_edit_module_settings_iframe',
						    id:   'mw_edit_module_iframe_'+id
						    //borderWidth :0,
						   // src:  url
						   
						}).appendTo('#mw_edit_module_settings_'+id);
					 document.getElementById('mw_edit_module_iframe_'+id).style.borderWidth = 0;
					 document.getElementById('mw_edit_module_iframe_'+id).setAttribute('frameborder', 0);
					 
					 
					 data1 = {}
					   data1.module = 'admin/mics/module_info';
					    data1.module_info = module_name_original;
					    data1.module_id = id;
					   $.ajax({
					  url: '<? print site_url('api/module') ?>',
					   type: "POST",
					      data: data1,
				
					      async:true,
				
					  success: function(resp) {
				
					   $('#mw_edit_module_settings_'+id).prepend(resp);
				
					 
				
					  }
					    });
					   
					 	 page_id = $("#mw_edit_page_id").val();
						 post_id = $("#mw_edit_post_id").val();
						 category_id = $("#mw_edit_category_id").val();
				 
							data1 = {}
						   data1.module = 'admin/'+module_name_original;
						   data1.page_id =page_id;
						   data1.post_id = post_id
						   
						   data1.category_id =category_id;
						   data1.element_id = id;
						   data1.module_id = id;
						// data1.type =  $("#media_type").val();
							
						  $('#mw_edit_module_iframe_'+id).load('<? print site_url('api/module') ?>',data1);
					   
				//		data1 = {}
				//		   data1.module = 'admin/'+module_name_original;
				//		   data1.page_id = '<? print intval(PAGE_ID) ?>';
				//		   data1.post_id = '<? print intval(POST_ID) ?>';
				//		   
				//		   data1.category_id = '<? print intval(CATEGORY_ID) ?>';
				//		   data1.element_id = id;
				//		   data1.module_id = id;
				//		  
				//		   $.ajax({
				//		  url: "<? print site_url('api/module') ?>",
				//		   type: "POST",
				//		      data: data1,
				//
				//		      async:false,
				//
				//		  success: function(resp) {
				//
				//			   $('#mw_edit_module_iframe_'+id).html(resp);
				//			   
				//			   
				//			   dummy_request()
				//		
				//			   
				//
				//		  }
				//		    }); 
					   
					   
					   
					 
					 
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


 

function call_edit_module_iframe(url, id, module_name_original) {
			 if(id != undefined){
				url = url + 'element_id:'+id;
				$curent_edit_element_id=id;
			 }
		
		 $el = document.getElementById('mw_edit_module_iframe_'+id);
		 mw_sidebar_nav('#mw_sidebar_module_edit_holder');
		 $(".mw_edit_module_iframe").hide();
		 if ( $el == undefined){
		
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
		
		 
			
		 $('#mw_edit_module_iframe_'+id).show();

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