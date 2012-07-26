window.mw = window.mw ? window.mw : {};

mw.edit = {
	/**
	 * Microweber live edit class
	 *
	 * @class mw.edit
	 */
   
	/**
	 * Deletes element by id or selector
	 *
	 * @method mw.edit.delete_element($el_id)
	 * @param Element id or selector
	 */
	delete_element: function ($el_id) {
		var r = confirm(mw.settings.sorthandle_delete_confirmation_text);
		if (r == true) {
			if ($el_id == undefined || $el_id == 'undefined') {
				$el_id = mw.settings.element_id;
			}
			//	alert($el_id);
			$($el_id).remove();
			$('#' + $el_id).remove();
			mw.edit.put_placeholders()
		}
	},



	/**
	 * Creates columns of given row id
	 *
	 * @method mw.edit.create_columns($row_id, $numcols)
	 * @param $row_id - the id of the row element
	 * @param $numcols - number of columns required
	 */
	create_columns: function ($row_id, $numcols) {


		if ($row_id != undefined && $row_id != false && $row_id != 'undefined') {
			$el_id = $row_id;

		}
		else {
			$el_id = mw.settings.row_id;
		}

        var column_set = $(document.getElementById($row_id)).find(".columns_set").eq(0);
        column_set.find("a").removeClass("active");
        column_set.find("a").eq($numcols-1).addClass("active");

		if ($el_id != undefined && $el_id != false && $el_id != 'undefined') {
			mw.settings.sortables_created = false;
			$exisintg_num = $('#' + $el_id).children(".column").size();

			if ($numcols == 0) {
				$numcols = 1;
			}
			$exisintg_num = parseInt($exisintg_num);
			$numcols = parseInt($numcols);
			if ($exisintg_num == 0) {
				$exisintg_num = 1;
			}
			if ($numcols != $exisintg_num) {
				if ($numcols > $exisintg_num) {  //more columns
					for (i = $exisintg_num; i < $numcols; i++) {
                        var new_col = document.createElement('div');
                        new_col.className = 'column';
                        $('#' + $el_id).append(new_col);
                        mw.drag.fix_placeholders(true, '#' + $el_id);
                        mw.drag.sort(new_col.getElementsByClassName('empty-element')[0]);
					}
                    mw.resizable_columns();
				}
				else {  //less columns
					$cols_to_remove = $exisintg_num - $numcols;
					if ($cols_to_remove > 0) {
                        var last_after_remove = $('#' + $el_id).children(".column").eq($numcols-1);
                        var elements_to_clone = $('#' + $el_id).children(".column:gt("+($numcols-1)+")");
                        $(elements_to_clone).each(function(){
                            var el = $(this).children(".element, .module, .row, .mw-layout-holder");
                            //last_after_remove.append(el);
                            last_after_remove.find(".empty-element").before(el);
                           $("#"+this.id).remove();
                        });
                        last_after_remove.resizable("destroy");
                        $('#' + $el_id).children(".empty-element").remove();
                        mw.drag.fix_placeholders(true, '#' + $el_id);
					}
				}

				$exisintg_num = $('#' + $el_id).children(".column").size();
				$eq_w = 100 / $exisintg_num;
				$eq_w1 = $eq_w;
				$('#' + $el_id).children(".column").width($eq_w1 + '%');
			}
		}
	},





	/**
	 * Makes handles for given row
	 *
	 * @method mw.edit.init_row_handles
	 * @param $el_id - the id of the row element
	 */
	init_row_handles: function ($el_id) {
		if ($el_id == undefined || $el_id == 'undefined') {
			$el_id = mw.settings.row_id;
		}
		else {
			mw.settings.row_id = $el_id;
		}
		$(".mw-layout-edit-curent-row-element").html($el_id);
		$exisintg_num = $('#' + $el_id).children(".column").size();
		text = mw.settings.sorthandle_row_columns_controlls
		if (text != undefined) {
			text = text.replace(/ROW_ID/g, "'" + '' + $el_id + "'");
			$('#' + $el_id).children("div:first").find(".columns_set").html(text);
		}
		text1 = mw.settings.sorthandle_row_delete
		if (text1 != undefined) {
			text1 = text1.replace(/ROW_ID/g, "'" + '' + $el_id + "'");
			$('#' + $el_id).children("div:first").find(".mw_row_delete").html(text1);

		}
		$(".mw-make-cols", '#' + $el_id).removeClass('active');
		$(".mw-make-cols-" + $exisintg_num, '#' + $el_id).addClass('active');
	},

	/**
	 * Makes handles for all elements
	 *
	 * @method mw.edit.init_element_handles()
	 */
	init_element_handles: function () {
		
	
			 
		
		if (mw.settings.drag_started == false) {
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

			$('.element:not(.empty-element)').each(function (index) {
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

		
		$('.edit>.row').children('.mw-sorthandle').addClass('.mw-sorthandle-main-level');
		$('.element').find('.row').children('.mw-sorthandle').addClass('mw-sorthandle-row-in-element');

        		$('.element').find('img').addClass('mw-sorthandle-img-in-element');





		$('.column').find('.row').children('.mw-sorthandle').addClass('mw-sorthandle-row-in-column');







			mw.edit.fix_zindex();
		}
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

	},

	/**
	 * Loads module settings in lightbox
	 *
	 * @method mw.edit.module_settings()
	 */
	module_settings: function ($module_id) {

		$module = $('div.module[module_id="' + $module_id + '"]:first', '.edit');
		//alert($module_id);
		$module_name = $module.attr('module');
		$module_title = $module.attr('data-module-title');

		data1 = {}
		data1.module = '' + $module_name;
		data1.view = 'settings';
		data1.module_id = $module_id;
		data1.page_id = window.page_id;
		data1.post_id = window.post_id;
		data1.category_id = window.category_id;

        mw.modal("", 600, 450, function(){
            $(this.container).load(mw.settings.site_url + "api/module", data1);
        });

	},



	
	unwrap_layout_holder: function () {

		   //	$('.mw-layout-holder', '.edit').children().unwrap();
	},
	



	/**
	 * Loads new dropped modules
	 *
	 * @method mw.edit.load_new_modules()
	 */
	load_new_modules: function () {
		$need_re_init = false;
		$(".module_draggable", '.edit').each(function (c) {
			//$(this).unwrap(".module-item");
			$name = $(this).attr("data-module-name");
			if ($name && $name != 'undefined' && $name != false && $name != '') {
				$el_id_new = 'mw-col-' + mw.random();
				$(this).after("<div class='element mw-module-wrap' id='" + $el_id_new + "'></div>");
                mw.edit.load_module($name, '#' + $el_id_new);

			}
			$name = $(this).attr("data-element-name");
			if ($name && $name != 'undefined' && $name != false && $name != '') {
				$el_id_new = 'mw-layout-element-' + new Date().getTime() + Math.floor(Math.random() * 101);
				$(this).after("<div class='mw-layout-holder' id='" + $el_id_new + "'></div>");
				mw.edit.load_layout_element($name, '#' + $el_id_new);
			}
			$need_re_init = true;
		});
		if ($need_re_init == true) {
				setTimeout("mw.edit.init_element_handles()", 600)
		}
		//
$need_re_init = false;
		if ($need_re_init == true) {
			if (mw.settings.drag_started == false) {
				$('.column', '.edit').resizable("destroy");
				$('.ui-resizable').resizable("destroy");

				$('.edit').sortable('destroy');
				$('.element').sortable('destroy');
				$('.column').sortable('destroy');
				$('.row').sortable('destroy');
				$('.modules-list').sortable('destroy');
               	$('.module-item','.edit').remove();



				mw.settings.sortables_created = false;
				setTimeout("mw.edit.init_sortables()", 300)
				setTimeout("mw.edit.fix_sizes()", 500)
				setTimeout("mw.edit.make_events()", 500)
				setTimeout("mw.edit.init_element_handles()", 600)

			}
		}
	},

	/**
	 * Makes the columns in the row to have equal height
	 *
	 * @method mw.edit.equal_height()
	 */
	equal_height: function (selector) {
	  return false;
		var selector = selector == undefined ? ".row" : selector;
		$(selector).each(function () { //each rows

			$h = $(this).height();

			$(this).children(".column").height($h);
		});
	},


	fix_sizes: function () {
		mw.edit.equal_height();
	},

	/**
	 * Fix z-Index for the sort handles
	 *
	 * @method mw.edit.fix_zindex()
	 */
	fix_zindex: function () {

	},

	/**
	 * makes contenteditable on the .edit class elements
	 *
	 * @method mw.edit.init_content_editable()
	 */
	init_content_editable: function () {
		if (mw.settings.drag_started == false && window.mw_handle_hover != true) {
			mw.settings.sortables_created = false;
			if (mw.settings.editables_created == false) {
				$(".edit [draggable='true']").unbind();
				$(".edit [draggable='true']").removeAttr('draggable');
				$('.mw-sorthandle').remove();
				$('.edit').sortable('destroy');
				$('.element').sortable('destroy');
				$('.column').sortable('destroy');
				$('.row').sortable('destroy');
				$(".row,.element", '.edit').enableSelection();
				$(".mw-sorthandle", '.edit').disableSelection();
				$(".edit").freshereditor("edit", true);
				mw.settings.editables_created = true
				$("#mw-layout-edit-site-top-bar-r").html("Text edit");
			}
		}
	},

	/**
	 * makes contenteditable from the .edit class elements
	 *
	 * @method mw.edit.remove_content_editable()
	 */
	remove_content_editable: function () {
		mw.settings.text_edit_started = false;
		mw.settings.editables_created = false;
		$('.freshereditor',".edit").freshereditor("edit", false);
		$('.freshereditor',".edit").removeClass('freshereditor');
		$('*[contenteditable]',".edit").removeAttr('contenteditable');
	},



	/**
	 * put_placeholders in the layout
	 *
	 * @method mw.edit.put_placeholders()
	 */
	put_placeholders: function () {



		$('.edit').each(function () {

				if ($(this).children('.empty-element').size() == 0) {
					if ($(this).children('.element').size() == 0) {
					    $(this).append(mw.settings.edit_area_placeholder);
                        //alert(this.id);
					}
				}else {
				  $(this).children('.empty-element').remove()
			}
		});
		
		$('.column').each(function () {
			 
				if ($(this).children('.empty-element').size() == 0) {
					if ($(this).children('.element').size() == 0) {
					$(this).append(mw.settings.empty_column_placeholder);
					}
				}else {
				  $(this).children('.empty-element').remove()
			}
		});
		
		
		
	},






	/**
	 * Binds the mouse events to rows, elements and modules
	 *
	 * @method mw.edit.make_events()
	 */
	make_events: function () {
	$(".mw-sorthandle").show();
return true;
		mw.edit.make_events_for_content_editable()
		$(".module", '.edit').die('mousedown');
		$(".row", '.edit').die('mousedown');
		$(".row", '.edit').live('mousedown', function (e) {

			$col_panels = [];
			$el_id = $(this).attr('id');
			if ($el_id == undefined || $el_id == 'undefined') {

				$el_id = 'mw-row-' + mw.random();
				$(this).attr('id', $el_id);

				mw.settings.row_id = $el_id;
				mw.edit.init_row_handles($el_id)
				$exisintg_num = $('#' + $el_id).children(".column").size();
				if ($exisintg_num > 0) {
					a = 0;
					$('#' + $el_id).children(".column").each(function () {
						$col_panels[a] = [{
							"size": $(this).width()
						}];
						$el_id_column = $(this).attr('id');
						if ($el_id_column == undefined || $el_id_column == 'undefined') {
							$el_id_column = 'mw-column-' + new Date().getTime() + Math.floor(Math.random() * 101);
							$(this).attr('id', $el_id_column);
						}
						a++;
					});
				}

			}
		});

		/**
		 * Events for the sortahndle only
		 */


		$(".mw-sorthandle", '.edit').die('mouseenter');
		$(".mw-sorthandle", '.edit').die('mouseleave');
		$(".mw-sorthandle", '.edit').die('mousedown');
		$(".mw-sorthandle").live('mouseenter', function (e) {
			mw.settings.sorthandle_hover = true;
			
			
			$(this).parent().parent().addClass('mw-sorthandle-parent-outline');
			$(this).show();
		})
		
		
		$(".mw-sorthandle").live('mousedown', function (e) {
		 mw.edit.remove_content_editable();
		})





		$(".mw-sorthandle").live('mouseleave', function (e) {
			mw.settings.sorthandle_hover = false;
			$(this).parent().parent().removeClass('mw-sorthandle-parent-outline');

		})

		$(".mw-sorthandle", '.edit').die('dblclick');
		$(".mw-sorthandle").live('dblclick', function (e) {
		mw.edit.remove_content_editable();
mw.settings.sorthandle_hover = false;
			mw.settings.sorthandle_click = true;
			e.preventDefault();
			e.stopPropagation();
			//	return false;

		})

		$(".mw-sorthandle, .mw-sorthandle>*", '.edit').die('click');
		$(".mw-sorthandle, .mw-sorthandle>*", '.edit').live('click', function (e) {
 			if (mw.settings.sorthandle_click == false) {
				mw.settings.sorthandle_click = true;

if (window.console != undefined) {
					console.log('.mw-sorthandle click ' );
				}
				
				
				
$is_this_handle = $(this).hasClass('mw-sorthandle');
			$is_mw_delete_element = $(this).hasClass('mw.edit.delete_element');
			$columns_set = $(this).hasClass('columns_set');
			
			
			if ($is_this_handle  == false && $is_mw_delete_element == false && $columns_set  == false && mw.settings.drag_started == false ) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
			
			

				
			}
		})



		/**
		 * End of the events for the sortahndle
		 */

		$(".row:not(.mw-sorthandle)", '.edit').die('mouseleave');
		$(".row:not(.mw-sorthandle)", '.edit').mouseleave(function () {
			if (mw.settings.drag_started == false) {
				$(this).find(".mw-outline-column").removeClass('mw-outline-column');
			}
		});
		
			$(".row", '.edit').die('mouseover');
		$(".row", '.edit').live('mouseover', function (e) {
			if (mw.settings.drag_started == false) {
				//	$(".element", '.edit').mouseover(function() {
				
				if (mw.settings.drag_started == false) {
					//$(".mw-sorthandle-row:visible", '.edit').hide();
					$(this).children(".mw-sorthandle-row:hidden").show();
					//e.stopPropagation();
				}
				
			}
		});
		
		
		

		$(".row", '.edit').die('hover');
		$(".row", '.edit').hover(function (e) {
			if (mw.settings.drag_started == false) {

				$has = $(this).children(":first").hasClass("mw-sorthandle-row");
				if ($has == false) {
					$(this).prepend(mw.settings.sorthandle_row);
				}

$(this).children(".mw-sorthandle-row:hidden").show();
				//	mw.edit.equal_height();

				//$(this).equalHeights();
				//$(this).children(".mw-sorthandle").show();
				//e.stopPropagation();
			}
		}, function () {
			if (mw.settings.drag_started == false) {
				//$(this).find(".mw-sorthandle-row").hide();
				$(this).find(".ui-resizable-handle:visible").hide();
			}
		});
		$(".element", '.edit').die('mouseover');
		$(".element", '.edit').live('mouseover', function (e) {
			if (mw.settings.drag_started == false) {
				//	$(".element", '.edit').mouseover(function() {
				
				if (mw.settings.drag_started == false) {
					
				 
					$(".mw-sorthandle-row:visible", '.edit').hide();
					$(this).parents('.row:first').children(".mw-sorthandle-row:hidden").show();
					//e.stopPropagation();
			 
					

					$(".mw-sorthandle-col:visible", '.edit').hide();
					$(this).children(".mw-sorthandle-col:hidden").show();
					e.stopPropagation();
				}
				
			}
		});

$('.column', '.edit').unbind('mouseover');
		$('.column', '.edit').die('mouseenter');

		$('.column', '.edit').live('mouseenter', function (e) {
			if (mw.settings.drag_started == false && mw.settings.resize_started == false) {
				$(this).parents(".column:first").parents(".row:first").children(".mw-sorthandle-row:first").show();
				$el_id_column = $(this).attr('id');
				if ($el_id_column == undefined || $el_id_column == 'undefined') {
					$el_id_column = 'mw-column-' + new Date().getTime() + Math.floor(Math.random() * 101);
					$(this).attr('id', $el_id_column);
					$(this).addClass($el_id_column);
				}
				var parent1 = $(this).parent('.row');
				$(this).css({
					width: $(this).width() / parent1.width() * 100 + "%"
				});
				$is_done = $(this).hasClass('ui-resizable')
				$ds = mw.settings.drag_started;
				$is_done = false;
				if ($is_done == false && $ds == false) {
				
				
				
				
				
				
				
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
 
 
	
  
					if ($no_next == false) {
						$(this).attr("data-also-rezise-item", $also_reverse_id)
						$(this).resizable({
							//grid: [1, 10000],
							handles: $handles,
							containment: "parent",
							//	 aspectRatio: true,
							autoHide: true,
							cancel: ".mw-sorthandle",
                            minWidth: 30 ,
							//alsoResizeReverse:'.also-resize' ,
							alsoResizeReverse: '#' + $also_reverse_id,
							//	alsoResizeReverse:'.column [data-also-resize-inner='+$also_reverse_id+']' ,
							alsoResize: '#' + $also_inner_items,

							// alsoResize:'.also-resize-inner'  ,
							resize: function (event, ui) {
								
									mw.settings.resize_started= true;
								
								
								$(this).css('height', 'auto');
							
							},
							create: function (event, ui) {
								$(".row").equalWidths();
								mw.edit.equal_height();
							},
							start: function (event, ui) {
								$(".column").each(function () {
									$(this).removeClass('selected');
								});
								mw.edit.remove_content_editable()
								ui.element.addClass('selected');
								
								mw.settings.resize_started= true;
								
 							},
							stop: function (event, ui) {
								var parent = ui.element.parent('.row');
								ui.element.css({
									width: ((ui.element.width() / parent.width()) - 1) * 100 + "%",
									//      height: ui.element.height()/parent.height()*100+"%"
								});
								$('.column').css('height', 'auto');
								$('.row').css('height', 'auto');
								mw.edit.equal_height();
								mw.edit.fix_zindex();
								mw.settings.resize_started= false;
							}
						});
					}
				}
				e.preventDefault();
				e.stopPropagation();
				// this prevents the click from triggering click events up the DOM from this element
			}
		});
		$('.module', '.edit').live('click', function (e) {

			mw.edit.init_sortables()

			window.mw_making_sortables = false;

			$clicked_on_module = $(this).attr('module_id');
			if ($clicked_on_module == undefined || $clicked_on_module == '') {
				$clicked_on_module = $(this).attr('module_id', 'default');
			}
			if (window.console != undefined) {
				console.log('click on module 1 ' + $clicked_on_module);
			}
			if ($clicked_on_module == undefined || $clicked_on_module == '') {
				$clicked_on_module = $(this).parents('.module').attr('module_id');
			}
			if ($clicked_on_module == undefined || $clicked_on_module == '') {
				$clicked_on_module = $(this).parents('.module').attr('module_id', 'default');
			}
			$('.mw_non_sortable').removeClass('mw_non_sortable');

			e.preventDefault();

			e.stopPropagation();
			// this prevents the click from triggering click events up the DOM from this element
			return false;
		});
	},

	/**
	 * Saves the page
	 *
	 * @method mw.edit.save()
	 */
	save: function () {
		
		$("#mw-saving-loader").fadeIn();
		
		
		$(".mw_non_sortable", '.edit').removeClass('mw_non_sortable');
		$(".mw-sorthandle-parent-outline", '.edit').removeClass('mw-sorthandle-parent-outline');

		$(".mw-sorthandle", '.edit').remove();
		$('.ui-resizable-handle', '.edit').remove();
		$('.ui-draggable', '.edit').removeClass("ui-draggable");
		$('.ui-resizable', '.edit').removeClass("ui-resizable");
		$('.column', '.edit').removeClass("selected");




		var custom_styles = new Array();
		var regEx = /^mw-style/;
		var elm = $(".mw-custom-style", '.edit');
		$save_custom_styles = false
		elm.each(function (j) {
			var classes = $(this).attr('class').split(/\s+/);
			//it will return  foo1, foo2, foo3, foo4

			for (var i = 0; i < classes.length; i++) {
				var className = classes[i];

				if (className.match(regEx)) {
					$save_custom_styles = true
					custom_styles.push(className);
					//elm.removeClass(className);
				}
			}
		});

		if ($save_custom_styles == true) {
			custom_styles.unique();
			$styles_join = custom_styles.join(',');
			$sav = {};
			$sav['content_id'] = window.content_id;
			$sav['save_field_content_layout_style'] = $styles_join;
			$.ajax({
				type: 'POST',
				url: mw.settings.site_url + 'api/content/save_field_simple',
				data: $sav,
				async: true
			});
		}

		var master = {};

		$('.edit').each(function (j) {
			j++;
			content = $(this).get(0).innerHTML;
			if (window.no_async == true) {
				$async_save = false;
				window.no_async = false;
			}
			else {
				$async_save = true;
			}
			var nic_obj = {};
			var attrs = $(this).get(0).attributes;
			for (var i = 0; i < attrs.length; i++) {
				temp1 = attrs[i].nodeName;
				temp2 = attrs[i].nodeValue;
				if ((temp2 != null) && (temp1 != null) && (temp1 != undefined) && (temp2 != undefined)) {
					if ((new String(temp2).indexOf("function(") == -1) && (temp2 != "") && (temp1 != "")) {
						nic_obj[temp1] = temp2;
					}
				}
			}
			var obj = {
				attributes: nic_obj,
				html: content
			}
			var objX = "field_data_" + j;
			var arr1 = [{
				"attributes": nic_obj
			}, {
				"html": (content)
			}];
			master[objX] = obj;
		});
		$emp = false;
		if (!$emp) {
			master_prev = master;
			$.ajax({
				type: 'POST',
				url: mw.settings.site_url + 'api/content/save_field',
				data: master,
				datatype: "json",
				async: true,
				beforeSend: function () {
					window.saving = true;
					$("#mw-saving-loader").fadeIn();
				},
				success: function (data) {
					mw.history.init();
					window.saving = false;
					window.mw_sortables_created = false;
					window.mw_drag_started = false;
					$("#mw-saving-loader").fadeOut();
				}
			});
		}
	}
}

mw.history = {

	/**
	 * Microweber history  class
	 *
	 * @class mw.history
	 */

	/**
	 * Loads the history module
	 *
	 * @method mw.history.init()
	 */
	init: function () {
		data = {}
		data.module = 'admin/mics/edit_block_history';
		data.page_id = mw.settings.page_id;
		data.post_id = mw.settings.post_id;
		data.category_id = mw.settings.category_id;
		data.for_url = document.location.href;
		$('#mw-history-panel').load(mw.settings.site_url + 'api/module', data);
	},

	/**
	 * Loads the history from file
	 *
	 * @method mw.history.load()
	 */
	load: function ($base64fle) {
		if ($base64fle != undefined) {
			$.ajax({
				type: 'POST',
				url: mw.settings.site_url + "api/content/load_history_file",
				data: {
					history_file: $base64fle
				},
				dataType: "json",
				success: function (data) {
					$.each(data, function (i, d) {
						if (window.console && window.console.log) {
							window.console.log('  Replacing from history - element id: ' + this.page_element_id + '  - Content: ' + this.page_element_content);
						}
						$("#" + this.page_element_id).html(this.page_element_content);
					});
				}
			})
		}
	}
}