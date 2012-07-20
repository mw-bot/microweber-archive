mw.Dragging = false;
Dragging_over_id = false;

Global = {}

DragOld = {

    init: function (selector) {
        if (!mw.Dragging) {
            $(selector).each(function () {
                $is_dr = $(this).hasClass("ui-draggable");
                if ($is_dr == false) {
                  $.removeData(this);
                    $el_id_drag_el = $(this).attr('id');
                    if ($el_id_drag_el == undefined || $el_id_drag_el == 'undefined') {
                        $el_id_drag_el = 'mw-element-' + mw.random();
                        $(this).attr('id', $el_id_drag_el);

                    }
                    if (window.console != undefined) {
                        console.log('making dragable on id ' + $el_id_drag_el);
                    }
                    $(this).children().disableSelection();

                    $('.hl2').removeClass('hl2');
                    $(this).addClass('hl2');
                    $(this).addClass('ui-draggable');
                    $(this).draggable({
                       // handle: "#" + $el_id_drag_el + ">.mw-sorthandle-col:first," + "#" + $el_id_drag_el + ">.mw-sorthandle-row:first",
                       handle: ".mw-sorthandle" ,

                        cursorAt: {
                            top: -5,
                            left: -5
                        },
                        addClasses: false,
                        helper:'clone',
                        start: function (event, ui) {
                            mw.Dragging = true;
                            Global.curr_clone = ui.helper.clone(true);
                            Global.curr_item = ui.helper;
                        },

                        drag: function (event, ui) {

                            mw.Dragging = true;

                        },
                        refreshPositions: true,
                        stop: function (event, ui) {
                            $(Global.curr_clone).hide();

                            $('#' + Dragging_over_id).after(Global.curr_clone);



                            $new_el_id = "mw-element-" + mw.random();
                            $(Global.curr_clone).fadeIn().attr("id", $new_el_id).removeClass("ui-dravbvvggable");

                            Global.curr_item.remove();

                            $('.ui-draggable-dragging').removeClass("ui-draggable-dragging");

                            mw.Dragging = false;
                            $('.column', '.edit').height('auto');
                            $(".element").css({
                                width: "auto"
                            });
                            $('.row').height('auto');
                            setTimeout(function () {
                                Drag.init("#" + $new_el_id);
                                mw.Dragging = false;
                            }, 50);

                            setTimeout(function(){alert(mw.Dragging)}, 1500);
                        }
                    });
                }
            });
        }
    },

    init_events: function (selector) {
        $(selector).not('.ui-draggable').bind("ho74747ver");
        $(selector).not('.ui-draggable').bind("h5525over", function (e) {

            if (mw.Dragging == false) {



                $el_id = $(this).attr('id');
                if ($el_id == undefined || $el_id == 'undefined') {
                    $el_id = 'mw-element-id-' + mw.random();
                    $(this).attr('id', $el_id);

                }
                if (window.console != undefined) {
                    console.log('mouseenter on element   ' + $el_id);
                }

                Drag.init("#" + $el_id);

                e.preventDefault();
                e.stopPropagation();


            }

        });

    },

    sort: function (selector) {
        $(selector).unbind("mosuseup");
        $(selector).bind("mousseup", function (e) {

            if (mw.Dragging == true) {



                $el_id_column = $(this).attr('id');
                if ($el_id_column == undefined || $el_id_column == 'undefined') {
                    $el_id_column = 'mw-id-' + mw.random();
                    $(this).attr('id', $el_id_column);

                }
                Dragging_over_id = $el_id_column;
                if (window.console != undefined) {
                    console.log('mousseup on ' + Dragging_over_id);
                }


                mw.Dragging = false;
                e.preventDefault();
                e.stopPropagation();


            }

        });




        $(selector).unbind("click");
        $(selector).bind("click", function (e) {

            if (mw.Dragging == true) {

                mw.Dragging = false;
                e.preventDefault();
                e.stopPropagation();

            }

        });




        $(selector).unbind("hover");
        $(selector).die("hover");
        $(selector).not('.element').bind("hover", function (e) {

            if (mw.Dragging == true) {

                $el_id_mouseover = $(this).attr('id');
                if ($el_id_mouseover == undefined || $el_id_mouseover == 'undefined') {
                    $el_id_mouseover = 'mw-id-' + mw.random();
                    $(this).attr('id', $el_id_mouseover);

                }
                Dragging_over_id = $el_id_mouseover;
                if (window.console != undefined) {
                    console.log('hover while dragging ' + Dragging_over_id);
                }
                e.preventDefault();
                e.stopPropagation();

            }

        });


    }

}






/**
 * Starts the drag and drop functionality
 *
 * @method mw.edit.init_sortables()
 */




mw.edit.init_sortables = function () {
    mw.edit.remove_content_editable();
    $(".mw-sorthandle").show();
     mw.edit.put_placeholders()
     mw.edit.equal_height();

    mw.edit.init_element_handles();
    Drag.init(".element,.row");
    Drag.sort(".element>*,.edit,.column>*");
};




















































mw.edit.init_sortssables = function () {
    mw.edit.remove_content_editable();
    if (mw.settings.sortables_created == false) {


        var place1 = mw.settings.empty_column_placeholder;
        var place2 = mw.settings.empty_column_placeholder;
        $('.edit').sortable('destroy');
        $('.element').sortable('destroy');
        $('.column').sortable('destroy');
        $('.row').sortable('destroy');
        $('.modules-list').sortable('destroy');

        $('.element', '.edit').sortable('destroy');
        mw.edit.unwrap_layout_holder()
        //	mw.edit.put_placeholders()

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
            //	forcePlaceholderSize: true,
            //	forceHeplerSize: true,
            greedy: true,
            tolerance: 'pointer',
            //	cancel: '.mw-non-sortable',
            cursorAt: {
                top: -2,
                left: -2
            },

            //containment: 'body',



            //	distance : 5,
            //	scrollSensitivity : 50,
            //	delay : 2,
            //	cancel: "*:not("+$drop_areas+")",

            cancel: ".empty-element>*,.ui-resizable-handle",
            scroll: true,
            //	handasdle: '.mw-sorthandle-row:first,.edit>.element>.mw-sorthandle',

            revert: true,
            placeholder: "ui-sortable-placeholder",
            //connectWith : '.element,.edit,.row>.column,.element>.row>.column,.column,.element,.element>*,.element>.row>.column>.element>*' + $drop_areas,
            //	connectWith: '.element,.edit,.column,.edit .element>*',
            connectWith: '.element,.edit,.column,.element>.row>.column,.element>*',
            start: function (event, ui) {
                mw.settings.text_edit_started = false;
                //	$(".column").addClass('mw-outline-column');
                mw.settings.drag_started = true;

                //$(".edit").append(mw.settings.edit_area_placeholder);
                //	mw.edit.put_placeholders()
                //$(".mw-sorthandle-row").show();
                //	$(".empty-element-column").show();

                mw.edit.remove_content_editable();

                //	$(ui.item).children('.empty-element').remove();

            },
            change: function (e, ui) {
                //	$(ui.placeholder).show();
                $(ui.helper).css({
                    "width": $(ui.placeholder).width()
                });
                $(ui.item).css({
                    "width": $(ui.placeholder).width()
                });







            },
            stop: function (event, ui) {
                /*
					if ($(this).parents('.row').length === 0) {
						if ($(this).parents('.edit').length === 0) {
							if ($(this).hasClass('.edit') == false) {
								$(ui.sender).sortable('cancel');
							}
						}
					} */
                mw.edit.remove_content_editable();

                mw.settings.sorthandle_click = false;




                mw.edit.make_events_for_content_editable()

                mw.settings.drag_started = false;
                $(".column").removeClass('mw-outline-column');
                $('.column').removeClass('column-outline');
                $('.ui-state-highlight').remove();
                $('.ui-sortable-placeholder').remove();
                //	$('.empty-element').remove();
                $('.column', '.edit').height('auto');
                //$('.row').height('auto');
                $(".element").css({
                    width: "auto"
                });
                mw.edit.load_new_modules();
                //	$('.row').equalWidths();


                mw.edit.put_placeholders()
                mw.edit.init_element_handles();
                mw.edit.equal_height()
                //	$(this).sortable('refreshPositions')
                //$('.row:not(.ui-sortable)','.edit').addClass("ui-sortable").sortable(mw.edit.sortable_options).sortable( "refreshPositions" );
                //
                //	$('.edit').children('.row:not(.ui-sortable)').addClass("ui-sortable").sortable(mw.edit.sortable_options)
                $(this).sortable("refreshPositions");
                // $('.edit').sortable("refresh");
                //	$('.edit').sortable("enable");

                $('.edit').sortable(mw.edit.sortable_options);


                //       mw.edit.image_settings.image_resize(".edit img");


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
                //	mw.edit.make_events_for_content_editable()
                $(".edit").parents().addClass('mw-non-sortable');
                $("body").children().not('edit').addClass('mw-non-sortable');
                $(".edit").find('.mw-non-sortable').removeClass('mw-non-sortable');


                //	mw.edit.put_placeholders()
                $('.column').height('auto');
                $(this).sortable('refreshPositions');
                ///mw.edit.image_settings.image_resize(".edit img");
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
        $sort_opts_elements.handle = '.mw-sorthandle-col,.mw-sorthandle-row-in-element,.mw-sorthandle-img-in-element'
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

        $sort_opts_toolbar.items = '.module_draggable';
        delete $sort_opts_toolbar.items;
        //
        //
        $sort_opts_toolbar.handle = '.module_draggable'
        $sort_opts_toolbar.remove = function (event, ui) {
            $(ui.item).clone().appendTo(event.target);
        }

        $('.modules-list', '.modules_bar').sortable('destroy');
        $('.modules-list', '.modules_bar').sortable($sort_opts_toolbar);

        $('.modules-list', '.modules_bar').disableSelection();


        //$('.modules-list', '#mw_tab_layouts').sortable($sort_opts_toolbar);

        $(".mw-sorthandle", '.edit').disableSelection();
        mw.edit.make_events();
        mw.settings.sortables_created = true;
    }
}