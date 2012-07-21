/**
 * Starts the drag and drop functionality
 *
 * @method mw.edit.init_sortables()
 */ 
mw.edit.init_sortables = function () {
     
	mw.drag.create()

}; 
   
  
 

 
 

mw.isDrag = false;
mw.resizable_row_width = false;
mw.mouse_over_handle = false;
mw.dragCurrent = null;
mw.dragOriginal = null;
mw.drag = {

	create: function () {
		mw.edit.remove_content_editable();

		mw.drag.fix_placeholders()
		mw.drag.fixes()
		// mw.edit.equal_height();

		mw.drag.init(".element,.row");
		mw.drag.init(".module-item");
		mw.drag.sort(".element > *,.edit,.column > *");
		//mw.drag.edit("");
		mw.drag.edit(".element > *");
		
		mw.drag.fix_handles();
		mw.resizable_columns();



    $(".row").mouseleave(function(event){
    mw.drag.destroy_dropables();
        if(mw.isDrag){
            var el = $(this);
            var offset = el.offset();
            if(event.pageY<offset.top){
              var dropa = mw.drag.display_dropables(this, true);
              mw.drag.the_drop(dropa);
            }
        }
    });



    $(document.body).mouseup(function(){
	if(mw.isDrag && document.getElementsByClassName("mw_dropable").length==0){
		$(".ui-draggable-dragging").animate({top:0,left:0});
	}

    });


	},


	init: function (selector, callback) {
		$(selector).not(".ui-draggable").draggable({
			handle: ".mw-sorthandle",
			cursorAt: {
				top: -20,
				left: -20
			},
			// containment: "#typography",
			helper: 'original',
			start: function () {
				mw.isDrag = true;
				mw.dragCurrent = this;
				mw.drag.edit_remove();
				$(this).addClass("mw_drag_started");
mw.dragOriginal = $(this);
				//mw.drag.fixes();
 

			},
			stop: function (event, ui) {
				mw.isDrag = false;
				$(this).removeClass("mw_drag_started");
				if (typeof callback === 'function') {
					callback.call(this);
				}

				if ($(mw.dragCurrent).hasClass("module-item")) {
					setTimeout(function () {
						mw.drag.load_new_modules();
						//mw.drag.edit_remove();
						//     mw.drag.fix_placeholders()
					}, 50);
				}


				setTimeout(function () {

					mw.drag.edit_remove();
					mw.drag.fixes();
					mw.drag.fix_placeholders()
				}, 500);

			}
		});
	},

	sort_handles_events: function (selector) {

		if (selector == undefined) {
			selector = '.mw-sorthandle';
		}


		$(selector).unbind('mousedown');
		$(selector).bind("mousedown", function (event) {

			if (!mw.isDrag) {
				mw.drag.sort(".element > *");
				mw.drag.edit_remove();
			}
		});












	},

	sort: function (selector) {


		$(selector).unbind('mouseenter mouseleave');
 

		$(selector).bind("mouseenter", function (event) {
			mw.drag.destroy_dropables();
			if (mw.isDrag) {
				
				mw.drag.display_dropables(this);

				if (window.console != undefined) {
					console.log('mouseenter while dragging ');
				}
			}
			else {

				var el = $(this);

				if (el.hasClass("mw-sorthandle")) {
					mw.mouse_over_handle = true;
					el.css("visibility", "visible");
				}
				else {
					$(".mw-sorthandle").css("visibility", "hidden");
					setTimeout(function () {

						mw.mouse_over_handle = false;
					}, 200);



				}


				if (el.hasClass("element")) {

					el.children(".mw-sorthandle").css("visibility", "visible");
				}
				else {
					el.parents(".element:first").children(".mw-sorthandle").css("visibility", "visible");

				}

				el.parents(".row:first").children(".mw-sorthandle-row").css("visibility", "visible");



			}
			event.stopPropagation();
		});
		$(selector).bind("mouseleave", function (event) {

			if (mw.isDrag) {
				setTimeout(function () {
					if ($(".mw_dropable_hover").length == 0) {
						mw.drag.destroy_dropables();
					}


				//mw.drag.display_dropables(mw.dragOriginal);
				}, 37); //must have setTimeout cause of the droppable hover


 
         


				if (window.console != undefined) {
					console.log('mouseleave while dragging');
				}
			}
			else {


				if (mw.mouse_over_handle == false) {
					var el = $(this);


					if (el.hasClass("element")) {

						//$(".mw-sorthandle").css("visibility", "hidden");					
					}
					else {
						//$(".mw-sorthandle").css("visibility", "hidden");

					}
				}
			}

			event.stopPropagation();
		});








		mw.drag.the_drop(selector);



		return $(selector);


	},
	the_drop: function (selector) {
		$(selector).unbind("mouseup");
		$(selector).bind("mouseup", function (event) {
			if (mw.isDrag) {
				var el = this;
				setTimeout(function () {
					$(mw.dragCurrent).hide();

					var dropable = $(".mw_dropable");

					if(dropable.hasClass("absolute-dropable")){
						var rel = dropable.data("dropable-rel");
						$("#"+rel).before(mw.dragCurrent);
						
						mw.drag.destroy_dropables();
					}
					else{
						if (dropable.parents('.element:first').children().last().hasClass('mw_dropable')) {
							dropable.parents('.element:last').before(mw.dragCurrent);



							
							mw.drag.destroy_dropables();
						}
						else if (dropable.parents('.element:first').children().not('.mw-sorthandle').first().hasClass('mw_dropable')) {
							dropable.parents('.element:last').after(mw.dragCurrent);
							mw.drag.destroy_dropables();




							
						}
						else {
						//console.log('replaceWith')
							dropable.replaceWith(mw.dragCurrent);
						}
					}

					$(mw.dragCurrent).fadeIn('slow');

					
					mw.drag.fixes();
					mw.drag.fix_placeholders();
					mw.resizable_columns()
					event.stopPropagation();
				}, 37);
			}
		});
	},
    dropable_object : function(){
		var dropable = document.createElement('div');
		dropable.className = 'mw_dropable';
		dropable.innerHTML = 'Drop your module here';
        return dropable;
    },
	create_dropable: function (elem) {
	    var dropable =  mw.drag.dropable_object();
		$(dropable).hover(function () {
			$(this).addClass("mw_dropable_hover")
		}, function () {
			$(this).removeClass("mw_dropable_hover")
		});
		var w = $(elem).width();
		$(dropable).width(w);
		$(dropable).addClass('mw_dropable_hover');
		return dropable;
	},
	destroy_dropables: function () {
		$(".mw_dropable").remove();
	},
	display_dropables: function (selector, isAbsolute) {
		var drop = mw.drag.create_dropable(selector);
		drop.style.display = 'none';
		$(drop).addClass("drop_bottom");
		if(isAbsolute){
			var offset = $(selector).offset();
			document.body.appendChild(drop);
			$(drop).css({
				position:'absolute',
				top:offset.top-50,
				left:offset.left,
				zIndex:10000
			}).addClass("absolute-dropable").data("dropable-rel", $(selector).attr("id"));		  
		}
		else{
		  $(selector).after(drop);
		}
		$(drop).fadeIn(200);

        	return drop;
	},




	/**
	 * Various fixes
	 *
	 * @method mw.drag.fixes()
	 */
	fixes: function () {


		$("img[data-module-name]", '.edit').remove();

		$(".column, .element, .row", '.edit').height('auto');

		//$('.row', '.edit').equalWidths();
		$(mw.dragCurrent).removeAttr('style');
		$(".element", '.edit').removeAttr('style');

		$(".column", '.edit').each(function () {
			var el = $(this);
			if (el.children().length == 0 || (el.children('.empty-element').length > 0) || el.children('.ui-draggable-dragging').length > 0) {
				if (el.height() < el.parent().height()) {
					el.height(el.parent().height());
				}
				else {
					el.height('auto');
				}
			}
			else {
				el.children('.empty-element').height('auto');
				el.height('auto');
				el.parents('.row:first').height('auto')
			}
		});
	},


	/**
	 * fix_placeholders in the layout
	 *
	 * @method mw.drag.fix_placeholders()
	 */
	fix_placeholders: function (selector) {

 
		$(".empty-element", '.edit').remove();
		$(".column, .element, .row", '.edit').height('auto');



		if(selector == undefined){
		selector = '.column';
		}


		$('.column', '.edit').each(function () {
			$this = el = $(this);
			el.height(el.parent('.row').height());
			if ($("div.element", this).size() == 0) {


				text = mw.settings.empty_column_placeholder.toString();


				$some_el_id = 'mw-placeholder-' + mw.random();
				text = text.replace(/_ID_/g, $some_el_id);


				$(this).html(text);
				mw.drag.sort('#' + $some_el_id);


				$('#' + $some_el_id).height($('#' + $some_el_id).parents(".column:first").height());



			}
			else {
 

				chHeight = 0;
				colHeight = $(this).height();;
				col = $(this);
				//$(this).children(":first")

				$check = $(this).children().last().hasClass('empty-element');
$some_el_id = false;
				 if($check == false){

text = mw.settings.empty_column_placeholder.toString();


					$some_el_id = 'mw-placeholder-' + mw.random();
					text = text.replace(/_ID_/g, $some_el_id);
 

					col.append(text);
					mw.drag.sort('#' + $some_el_id);








				 }
emptyHeight = 0;
	 			$(this).children().each(function () {
					if ($(this).hasClass('empty-element') == false) {
						var h = $(this).outerHeight();
						chHeight += h;
					}
				});

 
//chHeight = $(this).children().not('.empty-element').height();;
	if (chHeight > 0) {


				emptyHeight = colHeight - chHeight;

				col.children(".empty-element").height(emptyHeight) ; 
				if($some_el_id != false){
				$('#' + $some_el_id).height(emptyHeight) ; 


if (window.console != undefined) {
					console.log('fix_placeholders : ' + '#' + $some_el_id);
				}
				

				}






				

					
					//emptyHeight > 20 ? col.children(".empty-element").height(emptyHeight) : col.children(".empty-element").remove();

				}

			


/*

				chHeight = 0;
				colHeight = $(this).height();;
				col = $(this);
				//$(this).children(":first")

				$(this).children(".empty-element:first").remove();
				 

				$(this).children().each(function () {
					if (!$(this).hasClass('empty-element')) {
						var h = $(this).height();
						chHeight += h;
					}
				});

				if (chHeight > 0) {

					text = mw.settings.empty_column_placeholder.toString();


					$some_el_id = 'mw-placeholder-' + mw.random();
					text = text.replace(/_ID_/g, $some_el_id);


					$(this).append(text);
					mw.drag.sort('#' + $some_el_id);
					emptyHeight = colHeight - chHeight;
					emptyHeight > 20 ? $this.children(".empty-element:last").height(emptyHeight) : $this.children(".empty-element:last").remove();

				}






*/

			}




			
		});





	},





	/**
	 * Makes handles for all elements
	 *
	 * @method mw.drag.fix_handles()
	 */
	fix_handles: function () {




		if (mw.isDrag == false) {
			$('.row', '.edit').each(function (index) {
				$has = $(this).children("div:first").hasClass("mw-sorthandle-row");
				if ($has == false) {
					$(this).prepend(mw.settings.sorthandle_row);
				}
				$el_id = $(this).attr('id');
				if ($el_id == undefined || $el_id == 'undefined') {
					$el_id = 'mw-row-' + new Date().getTime() + Math.floor(Math.random() * 101);
					$(this).attr('id', $el_id);
				}
				mw.edit.init_row_handles($el_id);
			});

			$('.element:not(.empty-element)', '.edit').each(function (index) {
				$el_id = $(this).attr('id');
				if ($el_id == undefined || $el_id == 'undefined') {
					$el_id = 'mw-element-' + new Date().getTime() + Math.floor(Math.random() * 101);
					$(this).attr('id', $el_id);
				}
				$has = $(this).children(":first").hasClass("mw-sorthandle-col");
				if ($has == false) {
					$has_module = $(this).children(".module").size();
					if ($has_module == false) {
						text = mw.settings.sorthandle_col
					}
					else {
						$m_name = $(this).children(".module").attr('data-module-title');

						$m_id = $(this).children(".module").attr('module_id');
						text = mw.settings.sorthandle_module
						text = text.replace(/MODULE_NAME/g, "" + '' + $m_name + "");
						text = text.replace(/MODULE_ID/g, "'" + $m_id + "'");
					}
					text = text.replace(/ELEMENT_ID/g, "'" + '' + $el_id + "'");
					$(this).prepend(text);
				}
			})


			$('.mw-sorthandle-main-level', '.edit').removeClass('mw-sorthandle-main-level');
			$('.mw-sorthandle-row-in-column', '.edit').removeClass('mw-sorthandle-row-in-column');
			$('.mw-sorthandle-row-in-element', '.edit').removeClass('mw-sorthandle-row-in-element');
			$('.mw-sorthandle-img-in-element', '.edit').removeClass('mw-sorthandle-img-in-element');
			$('.edit>.row').children('.mw-sorthandle').addClass('mw-sorthandle-main-level');
			$('.element').find('.row').children('.mw-sorthandle').addClass('mw-sorthandle-row-in-element');
			$('.element').find('img').addClass('mw-sorthandle-img-in-element');
			$('.column').find('.row').children('.mw-sorthandle').addClass('mw-sorthandle-row-in-column');



			mw.drag.sort_handles_events();
			mw.edit.fix_zindex();
		}
	},








	/**
	 * Makes contentEditable events on selector
	 *
	 * @method mw.drag.edit(".element > *");
	 */
	edit: function (selector) {




		$(selector).unbind('mousedown');
		$(selector).bind("mousedown", function (e) {

 
				if (window.console != undefined) {
					console.log('mousedown on element : ' + this.tagName);
			 }
		
					if (!mw.isDrag) {



						$is_this_module = ($(this).hasClass('mw-module-wrap') && $(this).parents(".element:first").hasClass('mw-module-wrap'));
						$is_freshereditor = $(this).hasClass('freshereditor');
						$is_this_row = $(this).hasClass('row');
						$is_this_handle = $(this).hasClass('mw-sorthandle');
						$is_mw_delete_element = $(this).hasClass('mw.edit.delete_element');
						$columns_set = $(this).hasClass('columns_set');

						is_image = this.tagName == 'IMG' ? true : false;
						 
		 
							 if (!$is_freshereditor && !$is_this_module) {
						$(this).closest('.mw-sorthandle').show();

						$el_id = $(this).attr('id');
						if ($el_id == undefined || $el_id == 'undefined') {
							$el_id = 'mw-element-' + mw.random();
							$(this).attr('id', $el_id);
						}
						mw.settings.element_id = $el_id;
						mw.settings.sortables_created = true;
	 
			 

					  
						mw.settings.text_edit_started = true;

						$is_this_element = $(this).hasClass('.element');
						$(this).addClass('freshereditor');
						is_in_el = $(this).parent('.element').size();
				 
						$(this).parent('.element').freshereditor("edit", true);
						$(this).parent('.element').children('.mw-sorthandle').freshereditor("edit", false);
						$(this).parent('.element').children().removeAttr("contenteditable");

						if ($.browser.msie) {
							$("img, .element p").each(function () {
								this.oncontrolselect = function () {
									return false
								}
							});
						}





						$('img').attr("contenteditable", false);

						$('.element.mw-module-wrap').attr("contenteditable", false);
						//$(this).parent('.element').children('.mw-sorthandle').freshereditor("edit", false);
						setTimeout("mw.settings.sorthandle_hover=false", 300);
						e.stopPropagation();
				
					}
			
				} 
		}); 
	},

	/**
	 * Removes contentEditable for ALL elements
	 *
	 * @method mw.drag.edit_remove();
	 */
	edit_remove: function () {



		$('.freshereditor', '.edit').freshereditor("edit", false);
		$('.freshereditor', '.edit').removeClass("freshereditor");
		$('*[contenteditable]', '.edit').removeAttr("contenteditable");




	},





	/**
	 * Loads new dropped modules
	 *
	 * @method mw.drag.load_new_modules()
	 */
	load_new_modules: function () {
		$(".edit .module-item img").each(function () {
			var clone = $(this).clone(true);
			$(this).parent().replaceWith(clone);
		});
		$need_re_init = false;
		$(".module_draggable", '.edit').each(function (c) {
			//$(this).unwrap(".module-item");
			$name = $(this).attr("data-module-name");
			if ($name && $name != 'undefined' && $name != false && $name != '') {
				$el_id_new = 'mw-module-' + mw.random();
				$(this).after("<div class='element mw-module-wrap' id='" + $el_id_new + "'></div>");
				mw.drag.load_module($name, '#' + $el_id_new);
				$(this).remove();

			}
			$name = $(this).attr("data-element-name");
			if ($name && $name != 'undefined' && $name != false && $name != '') {
				$el_id_new = 'mw-layout-element-' + new Date().getTime() + Math.floor(Math.random() * 101);
				$(this).after("<div class='mw-layout-holder' id='" + $el_id_new + "'></div>");
				mw.drag.load_layout_element($name, '#' + $el_id_new);
				$(this).remove();


			}
			$need_re_init = true;
		});

		//

		if ($need_re_init == true) {
			if (!mw.isDrag) {

				setTimeout(function () {
					mw.drag.fix_handles();
					mw.drag.fixes();


				}, 100);

				setTimeout("mw.drag.create()", 300);




			}
		}
	},

	/**
	 * Loads new dropped layouts
	 *
	 * @method mw.edit.load_layout_element()
	 */
	load_layout_element: function ($layout_element_name, $update_element) {

		var attributes = {};
		attributes.element = $layout_element_name;

		url1 = mw.settings.site_url + 'api/content/load_layout_element';
		$($update_element).load(url1, attributes, function () {
			window.mw_sortables_created = false;
		});
		//	mw.edit.unwrap_layout_holder()
	},





	/**
	 * Loads module is element id
	 *
	 * @method mw.edit.load_layout_element()
	 */
	load_module: function ($module_name, $update_element) {
		var attributes = {};
		attributes.module = $module_name;

		url1 = mw.settings.site_url + 'api/module';
		$($update_element).load(url1, attributes, function () {
			window.mw_sortables_created = false;
		});

	}


}








/**
 * Makes resizable columns
 *
 * @method mw.resizable_columns()
 */
mw.resizable_columns = function () {



	$('.edit').find('.column').not('.ui-resizable').each(function () {


		$el_id_column = $(this).attr('id');
		if ($el_id_column == undefined || $el_id_column == 'undefined') {
			$el_id_column = 'mw-column-' + new Date().getTime() + Math.floor(Math.random() * 101);
			$(this).attr('id', $el_id_column);
		}
		this_col_id = $el_id_column;
		var parent1 = $(this).parent('.row');
		$(this).css({
			width: $(this).width() / parent1.width() * 100 + "%"
		});
		$is_done = $(this).hasClass('ui-resizable')
		$ds = mw.settings.drag_started;
		$is_done = false;
		if ($is_done == false) {



			$inner_column = $(this).children(".column:first");
			$prow = $(this).parent('.row').attr('id');
			$no_next = false;


			$also = $(this).next(".column");
			$also_check_exist = $also.size();
			if ($also_check_exist == 0) {
				$no_next = true;
				$also = $(this).prev(".column");
			}



			$also_el_id_column = $also.attr('id');
			if ($also_el_id_column == undefined || $also_el_id_column == 'undefined' || $also_el_id_column == '') {
				$also_el_id_column = 'mw-column-' + new Date().getTime() + Math.floor(Math.random() * 101);
				$also.attr('id', $also_el_id_column);
			}
			$also_reverse_id = $also_el_id_column;

			$also_inner_items = $inner_column.attr('id');

			//   $inner_column.addClass('also-resize-inner');
			$(this).parent(".column").resizable("destroy")
			$(this).children(".column").resizable("destroy")

			if ($no_next == false) {
				$handles = 'e'
			}
			else {
				$handles = 'none'
			}


			if (!$no_next /* || !$no_next */ ) {


				$last_c_w = $(this).parent('.row').children('.column').last().width();
				$row_max_w = $(this).parent('.row').width();


				$(this).attr("data-also-rezise-item", $also_reverse_id);


                mw.global_resizes = {
                  next:'',
                  sum:0
                }

				$(this).resizable({
					
					handles: $handles,
					ghost:false,
					containment: "parent",

					cancel: ".mw-sorthandle",
					minWidth: 150,
					//maxWidth: $row_max_w - $last_c_w,
					
					alsoResize: '#' + $also_inner_items,
					 
					resize: function (event, ui) {

						mw.global_resizes.next.width(Math.floor(mw.global_resizes.sum-ui.size.width));

						mw.settings.resize_started = true;
						var el = $(this);
						el.css('height', 'auto');


						var w = (100 * parseFloat($(this).css("width")) / parseFloat($(this).parent().css("width")));
						var wRight = 100 - w;
						w += "%";
						wRight += "%";
						var h = (100 * parseFloat($(this).css("height")) / parseFloat($(this).parent().css("height")));
						h += "%";
						$(this).css("width", w);

					},
					create: function (event, ui) {
						//$(".row", '.edit').equalWidths();
						mw.edit.equal_height();


						var el = $(this);

						el.find(".ui-resizable-e:first").append('<span class="resize_arrows"></span>');

						el.mousemove(function (event) {
							el.children(".ui-resizable-e").find(".resize_arrows:first").css({
								"top": (event.pageY - el.offset().top) + "px"
							});

						});


					},
					start: function (event, ui) {
						$(".column", '.edit').each(function () {
							$(this).removeClass('selected');
						});

						mw.global_resizes.next = $(this).next().length>0?$(this).next():$(this).prev();

						mw.global_resizes.sum = ui.size.width + mw.global_resizes.next.width();

						$r = $(this).parent('.row');

						$row_w = $r.width();
						mw.resizable_row_width = $row_w;


						ui.element.addClass('selected');
						mw.settings.resize_started = true;
					},
					stop: function (event, ui) {
						var parent = ui.element.parent('.row');
						ui.element.css({
							width: ((ui.element.width() / parent.width()) - 1) * 100 + "%"
							//      height: ui.element.height()/parent.height()*100+"%"
						});


						mw.edit.fix_zindex();
						mw.settings.resize_started = false;
						mw.drag.fixes()
						mw.drag.fix_placeholders()
					}
				});
			}
		}
	});





























}