 


/**
	 * Starts the drag and drop functionality
	 *
	 * @method mw.edit.init_sortables()
	 */
	mw.edit.init_sortables =  function () {
		mw.edit.remove_content_editable();
		if (mw.settings.sortables_created == false) {

			$('.element:not([contenteditable=false])').freshereditor("edit", false);

			var place1 = mw.settings.empty_column_placeholder;
			var place2 = mw.settings.empty_column_placeholder;
			$('.edit').sortable('destroy');
			$('.element').sortable('destroy');
			$('.column').sortable('destroy');
			$('.row').sortable('destroy');
			$('.modules-list').sortable('destroy');

			$('.element', '.edit').sortable('destroy');
	mw.edit.unwrap_layout_holder()
			mw.edit.put_placeholders()

			mw.edit.equal_height();
			//	$spans = '.edit div.span1,.edit div.span1,.edit  div.span2,.edit div.span3,.edit div.span4,.edit div.span5,.edit div.span6,.edit div.span7,.edit div.span8,.edit div.span9,.edit div.span10,.edit div.span11,.edit div.span12,.edit div.column';
			//$($spans).addClass('column');

			$drop_areas = '.edit,.column,.element>.row>.column,.element>.row>.column>.element,.element>*';
			$sort_opts = {
				//	items : 'li.module-item,.row,.empty,.edit>.row,.element>.row,.column>.element>.row,.element>*,.element>.row,.column>.row,.column>.element>.row,.row,.row>.column>.row',

				//items : '.row,.edit>.element,.edit>.element>.row,.edit>.row,.element>.row,.element>.row',
				//items : '.row,.edit>.element',

			//	handle: '.mw-sorthandle-row,.mw-sorthandle',
			//	handle: '.mw-sorthandle-row,.mw-sorthandle-col',

			
			
				handle: '.mw-sorthandle:not(.mw-sorthandle-row-in-element)',
			//	appendTo: ".edit",

				dropOnEmpty: false,
				forcePlaceholderSize: true,
				greedy: true,
				tolerance: 'pointer',
				cancel: '.mw-non-sortable',
				cursorAt: {
					top: -2,
					left: -2
				},

				//containment: 'body',



				//	distance : 5,
				//	scrollSensitivity : 50,
				//	delay : 2,
				//	cancel: "*:not("+$drop_areas+")",

				cancel: ".empty-element,.empty-element>*,.ui-resizable-handle",
				scroll: true,
			//	handasdle: '.mw-sorthandle-row:first,.edit>.element>.mw-sorthandle',

				revert: true,
				placeholder: "ui-sortable-placeholder",
				//connectWith : '.element,.edit,.row>.column,.element>.row>.column,.column,.element,.element>*,.element>.row>.column>.element>*' + $drop_areas,
			//	connectWith: '.element,.edit,.column,.edit .element>*',
				connectWith: '.element,.edit,.column',
				start: function (event, ui) {
					mw.settings.text_edit_started = false;
					$('*[contenteditable=true]', '.edit').attr("contenteditable", false);
					//	$(".column").addClass('mw-outline-column');
					mw.settings.drag_started = true;

					//$(".edit").append(mw.settings.edit_area_placeholder);




					$(ui.item).children('.empty-element').remove();
  
				},
				change: function (e, ui) {
					$(ui.placeholder).show();
					$(ui.helper).css({
						"width": $(ui.placeholder).width()
					});
					$(ui.item).css({
						"width": $(ui.placeholder).width()
					});







				},
				stop: function (event, ui) {

					if ($(this).parents('.row').length === 0) {
						if ($(this).parents('.edit').length === 0) {
							if ($(this).hasClass('.edit') == false) {
								$(ui.sender).sortable('cancel');
							}
						}
					}


					mw.settings.sorthandle_click = false;

				

//	mw.edit.unwrap_layout_holder()
	mw.edit.make_events_for_content_editable()
			 		mw.edit.put_placeholders()

					mw.settings.drag_started = false;
					$(".column").removeClass('mw-outline-column');
					$('.column').removeClass('column-outline');
					$('.ui-state-highlight').remove();
					$('.ui-sortable-placeholder').remove();
					$('.empty-element').remove();
					$('.column', '.edit').height('auto');
					//$('.row').height('auto');
					$(".element").css({
						width: "auto"
					});
					mw.edit.load_new_modules();
					$('.row').equalWidths();

					mw.edit.init_element_handles();
				setTimeout("mw.edit.init_element_handles()", 100);					
					mw.edit.equal_height()
					$(this).sortable('refreshPositions')
					//$('.row:not(.ui-sortable)','.edit').addClass("ui-sortable").sortable(mw.edit.sortable_options).sortable( "refreshPositions" );	
					//
					//	$('.edit').children('.row:not(.ui-sortable)').addClass("ui-sortable").sortable(mw.edit.sortable_options)
					$('.edit').sortable("refreshPositions");
					$('.edit').sortable("refresh");
					$('.edit').sortable("enable");

					//	$('.edit').sortable(mw.edit.sortable_options);

					$('*[contenteditable=true]', '.edit').attr("contenteditable", false);
				},





				sort: function (event, ui) {
					mw.settings.drag_started = true;
					mw.settings.sorthandle_click = true;
				},




				over: function (event, ui) {
					$(this).children('.empty-element').show();
					mw.settings.drag_started = true;
				},
				create: function (en, ui) {
					mw.settings.sorthandle_click = false;
					mw.edit.init_element_handles();
					mw.edit.make_events_for_content_editable()
					$(".edit").parents().addClass('mw-non-sortable');
					$("body").children().not('edit').addClass('mw-non-sortable');
					$(".edit").find('.mw-non-sortable').removeClass('mw-non-sortable');


					mw.edit.put_placeholders()
					$('.column').height('auto');
					$(this).sortable('refreshPositions')
				},
				deactivate: function (en, ui) {
					mw.settings.drag_started = false;
					$('.empty-element').hide();
					//	$(this).css('min-height', '10px');
					mw.settings.sorthandle_click = false;
				}
			}
			$('.edit').sortable($sort_opts);
			$sort_opts_elements = $sort_opts;
			mw.edit.sortable_options = $sort_opts;
			//$sort_opts_elements.items = '.element';
			delete $sort_opts_elements.items;

		//	$sort_opts_elements.handle = '.mw-sorthandle-col:first,.mw-sorthandle-row:first'
			$sort_opts_elements.handle = '.mw-sorthandle-col,.mw-sorthandle-row-in-element'
			$sort_opts2 = $sort_opts;
			delete $sort_opts2.items;
			delete $sort_opts2.appendTo;


			//	$sort_opts2.cancel = '.edit';

$sort_opts_columns = $sort_opts_elements;
	$sort_opts_columns.handle = '.mw-sorthandle-col,.mw-sorthandle-row-in-column'


			$('.column', '.edit').sortable($sort_opts_columns);
			$('.element', '.edit').sortable($sort_opts_elements);
 







			$('.edit').sortable("refresh");

			$sort_opts_toolbar = $sort_opts;

			$sort_opts_toolbar.items = 'img';
			delete $sort_opts_toolbar.items;
			$sort_opts_toolbar.handle = '.module_draggable'
			$sort_opts_toolbar.remove = function (event, ui) {
				$(ui.item).clone().appendTo(event.target);
			}

			$('.modules-list', '.mw').sortable('destroy');
			$('.modules-list', '.mw').sortable($sort_opts_toolbar);
			//$('.modules-list', '#mw_tab_layouts').sortable($sort_opts_toolbar);
			$('.modules-list', '#modules_bar .modules-list').disableSelection();
			$(".mw-sorthandle", '.edit').disableSelection();
			mw.edit.make_events();
			mw.settings.sortables_created = true;
		}
	}


