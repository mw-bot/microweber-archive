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

	sortable_options: {},

	/**
	 * Creates columns of given row id
	 *
	 * @method mw.edit.create_columns($row_id, $numcols)
	 * @param $row_id - the id of the row element
	 * @param $numcols - number of columns required
	 */
	create_columns: function ($row_id, $numcols) {
		$('.column').resizable("destroy");
		$('.ui-resizable').resizable("destroy");
		if ($row_id != undefined && $row_id != false && $row_id != 'undefined') {
			$el_id = $row_id;

		}
		else {
			$el_id = mw.settings.row_id;
		}

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
				if (window.console && window.console.log) {
					window.console.log('  $exisintg_num ' + $exisintg_num + '       $numcols ' + $numcols);
				}
				if ($numcols > $exisintg_num) {
					for (i = $exisintg_num; i < $numcols; i++) {
						$('<div class="column">' + mw.settings.empty_column_placeholder + '</div>').appendTo('#' + $el_id);
					}
				}
				else {
					$cols_to_remove = $exisintg_num - $numcols;
					if (window.console && window.console.log) {
						window.console.log('$cols_to_remove' + $cols_to_remove);
					}
					if ($cols_to_remove > 0) {

						for (i = $cols_to_remove; i > 0; i--) {
							//for (i=0;i<=$cols_to_remove;i++){
							$ch_n = parseInt($exisintg_num) - parseInt(i);
							if ($cols_to_remove >= 1) {
								if (window.console && window.console.log) {
									window.console.log('$removinc child col' + '#' + $el_id + ">div.column:nth-child(" + $ch_n + ")");
								}
								$('#' + $el_id).children(".column:eq(" + $ch_n + ")").fadeOut('slow').remove();
							}
						}
					}
				}

				$exisintg_num = $('#' + $el_id).children(".column").size();

				$eq_w = 100 / $exisintg_num;
				$pad = 1;
				$eq_w1 = $eq_w - $pad;
				$('#' + $el_id).children(".column").width($eq_w1 + '%');
				$('#' + $el_id).children(".column").css('float', 'left');
				$('#' + $el_id).children(".column").css('padding-right', $pad + '%');

				$('#' + $el_id).equalWidths();
				//	$('#' + $el_id).children('.column').height('auto');


				mw.edit.equal_height('#' + $el_id);
				mw.edit.init_sortables();
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
		
		
		$('.edit>.row').children('.mw-sorthandle').addClass('.mw-sorthandle-main-level');
		$('.element').find('.row').children('.mw-sorthandle').addClass('mw-sorthandle-row-in-element');
		
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

		// use juqery .load   - here mw.settings.site_url + "api/module"

		alert('Alex should load in the settings in lightbox ')

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
			mw.edit.unwrap_layout_holder()
	},
	
	
	unwrap_layout_holder: function () {

			$('.mw-layout-holder', '.edit').children().unwrap();
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
				$el_id_new = 'mw-col-' + new Date().getTime() + Math.floor(Math.random() * 101);
				$(this).after("<div class='element mw-module-wrap' id='" + $el_id_new + "'></div>");
				mw.edit.load_module($name, '#' + $el_id_new);
				//$(this).fadeOut().remove();
			}
			$name = $(this).attr("data-element-name");
			if ($name && $name != 'undefined' && $name != false && $name != '') {
				$el_id_new = 'mw-layout-element-' + new Date().getTime() + Math.floor(Math.random() * 101);
				$(this).after("<div class='mw-layout-holder' id='" + $el_id_new + "'></div>");
				mw.edit.load_layout_element($name, '#' + $el_id_new);
				//$('#' + $el_id_new).children().unwrap('.mw-layout-holder');
				//	$(this).fadeOut().remove();
			}
			$need_re_init = true;
		});
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
		var count = 100;
		$('.mw-sorthandle-row').each(function () {
			count += 10;
			$(this).css('z-index', count);
		});
		
	


		
		
		
		var count = 6000;
		$('.mw-sorthandle-col').each(function () {
			count += 10;
			$(this).css('z-index', count);
		});
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
		$(".edit").freshereditor("edit", false);
	},



	/**
	 * put_placeholders in the layout
	 *
	 * @method mw.edit.put_placeholders()
	 */
	put_placeholders: function () {


		$('.column', '.edit').each(function () {
			if ($(this).children('.element').size() == 0) {
				if ($(this).children('.empty-element').size() == 0) {
					$(this).append(mw.settings.empty_column_placeholder);
				}
			}
			else {
				// $(this).children('.empty-element').remove()
			}
		});
	},




 
	/**
	 * Binds the mouse events to .element elements 
	 *
	 * @method mw.edit.make_events_for_content_editable()
	 */
	make_events_for_content_editable: function () {

		$(".element", '.edit').die('mousedown');
		// $(".element").children().die('mousedown');
		//$(">*", '.element:not([contenteditable=true])').die('mousedown');
		$(".element>*", '.edit').die('mousedown');
		$(".element>*", '.edit').live('mousedown', function (e) {

			$('*[contenteditable]', '.edit').removeAttr("contenteditable");


			$el_id = $(this).attr('id');
			if ($el_id == undefined || $el_id == 'undefined') {
				$el_id = 'mw-element-' + new Date().getTime() + Math.floor(Math.random() * 101);
				$(this).attr('id', $el_id);
			}




			$is_this_module = $(this).hasClass('mw-module-wrap');
			$is_this_row = $(this).hasClass('row');
			$is_this_handle = $(this).hasClass('mw-sorthandle');
			$is_mw_delete_element = $(this).hasClass('mw.edit.delete_element');
			$columns_set = $(this).hasClass('columns_set');

			if ($is_this_handle == false && $columns_set == false && mw.settings.drag_started == false && mw.settings.sorthandle_hover == false && $is_this_module == false && $is_mw_delete_element == false && $is_this_row == false) {
				$(this).closest('.mw-sorthandle').show();

				mw.settings.element_id = $el_id;

				mw.settings.sortables_created = true;

				if (window.console != undefined) {
					console.log('contenteditable started on element id: ' + $el_id);
				}
				mw.settings.text_edit_started = true;

				$is_this_element = $(this).hasClass('.element');
				if ($is_this_element == true) {
					//$(this).freshereditor("edit", true);

				}
				else {
					//$(this).parent('.element:not([contenteditable=true])').freshereditor("edit", true);

				}
				//$('#'+$el_id).freshereditor("edit", true);
				$(this).freshereditor("edit", false);
				$(this).freshereditor("edit", true);

				$(this).attr("contenteditable", "true");

				//	$(this).parent('.element:not([contenteditable=true])').freshereditor("edit", true);
				$(this).parent('.element').children('.mw-sorthandle').freshereditor("edit", false);
				setTimeout("mw.settings.sorthandle_hover=false", 300);
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
			else {
				mw.settings.sorthandle_hover = true;
			}




		});




	},



	/**
	 * Binds the mouse events to rows, elements and modules
	 *
	 * @method mw.edit.make_events()
	 */
	make_events: function () {

		mw.edit.make_events_for_content_editable()
		$(".module", '.edit').die('mousedown');
		$(".row", '.edit').die('mousedown');
		$(".row", '.edit').live('mousedown', function (e) {

			$col_panels = [];
			$el_id = $(this).attr('id');
			if ($el_id == undefined || $el_id == 'undefined') {

				if (window.console != undefined) {
					console.log('.row mousedown on .row without id');
				}

				$el_id = 'mw-row-' + new Date().getTime() + Math.floor(Math.random() * 101);
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
		$(".mw-sorthandle").live('mouseenter', function (e) {
			$(this).parent().parent().addClass('mw-sorthandle-parent-outline');
			$(this).show();
		})

		$(".mw-sorthandle").live('mouseleave', function (e) {
			$(this).parent().parent().removeClass('mw-sorthandle-parent-outline');

		})

		$(".mw-sorthandle", '.edit').die('dblclick');
		$(".mw-sorthandle").live('dblclick', function (e) {
			$('*[contenteditable=true]', '.edit').attr("contenteditable", false);

			mw.settings.sorthandle_click = true;
			e.preventDefault();
			e.stopPropagation();
			//	return false;

		})

		$(".mw-sorthandle", '.edit').die('click');
		$(".mw-sorthandle").live('click', function (e) {
			//	$('*[contenteditable=true]','.edit').attr("contenteditable", false);			
			if (mw.settings.sorthandle_click == false) {
				mw.settings.sorthandle_click = true;

				e.preventDefault();
				e.stopPropagation();
				//	return false;
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

		$(".row", '.edit').die('hover');
		$(".row", '.edit').hover(function (e) {
			if (mw.settings.drag_started == false) {

				$has = $(this).children(":first").hasClass("mw-sorthandle-row");
				if ($has == false) {
					$(this).prepend(mw.settings.sorthandle_row);
				}


				//	mw.edit.equal_height();

				//$(this).equalHeights();
				$(this).children(".mw-sorthandle").show();
				e.stopPropagation();
			}
		}, function () {
			if (mw.settings.drag_started == false) {
				$(this).find(".mw-sorthandle-row").hide();
				$(this).find(".ui-resizable-handle:visible").hide();
			}
		});
		$(".element", '.edit').die('mouseenter');
		$(".element", '.edit').live('mouseenter', function (e) {
			if (mw.settings.drag_started == false) {
				//	$(".element", '.edit').mouseover(function() {
				$(".mw-sorthandle-col", '.edit').hide();
				if (mw.settings.drag_started == false) {
					$(this).children(".mw-sorthandle-col:hidden").show();
				}
			}
		});

		$('.column', '.edit').die('mouseenter');

		$('.column', '.edit').live('mouseenter', function (e) {
			if (mw.settings.drag_started == false) {
				$(this).parent(".column").parent(".row").children(".mw-sorthandle-row:first").show();
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
							grid: [1, 10000],
							handles: $handles,
							containment: "parent",
							//	 aspectRatio: true,
							autoHide: true,
							cancel: ".mw-sorthandle",

							//alsoResizeReverse:'.also-resize' ,
							alsoResizeReverse: '#' + $also_reverse_id,
							//	alsoResizeReverse:'.column [data-also-resize-inner='+$also_reverse_id+']' ,
							alsoResize: '#' + $also_inner_items,

							// alsoResize:'.also-resize-inner'  ,
							resize: function (event, ui) {
								$(this).css('height', 'auto');
								ui.element.next().children(".row").equalWidths();
								ui.element.children(".row").equalWidths();
								ui.element.parent(".row").equalWidths();

								//$(this).parent(".row").equalHeights();

							},
							create: function (event, ui) {
								$(".row").equalWidths();
								mw.edit.equal_height();


							},
							start: function (event, ui) {
								$(".column").each(function () {
									$(this).removeClass('selected');
								});
								ui.element.addClass('selected');
							},
							stop: function (event, ui) {
								var parent = ui.element.parent('.row');
								ui.element.css({
									width: ((ui.element.width() / parent.width()) - 1) * 100 + "%",
									//      height: ui.element.height()/parent.height()*100+"%"
								});
								//$('.column').css('height', 'auto');
								mw.edit.equal_height();
								mw.edit.fix_zindex();
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
		$(".mw_non_sortable", '.edit').removeClass('mw_non_sortable');
		$(".mw-sorthandle-parent-outline", '.edit').removeClass('mw-sorthandle-parent-outline');

		$(".mw-sorthandle", '.edit').remove();
		$('.column', '.row').height('auto')
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
				},
				success: function (data) {
					mw.history.init();
					window.saving = false;
					window.mw_sortables_created = false;
					window.mw_drag_started = false;
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