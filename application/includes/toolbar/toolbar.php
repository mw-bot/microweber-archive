<script type="text/javascript">

    window.onerror = function(err, file, row){alert(err + "\nFile: " + file + "\nRow: " + row)}



    window.mw = window.mw ? window.mw : {};

    mw.settings = {
        site_url:'<?php print site_url(); ?>', //mw.settings.site_url

        page_id : '<?php print intval(PAGE_ID) ?>',
        post_id : '<?php print intval(POST_ID) ?>',
        category_id : '<?php print intval(CATEGORY_ID) ?>',
        content_id : '<?php print intval(CONTENT_ID) ?>',
    	editables_created : false,
    	element_id : false,
    	text_edit_started : false,
    	sortables_created : false,
    	drag_started : false,
    	sorthandle_hover : false,
		resize_started:false,
		sorthandle_click : false,

    	row_id : false,
    //	empty_column_placeholder : '<div class="ui-state-highlight ui-sortable-placeholder"><span>Please drag items here 1</span></div>',
		
		edit_area_placeholder : '<div class="empty-element-edit-area empty-element ui-state-highlight ui-sortable-placeholder"><span>Please drag items here</span></div>',
		
		empty_column_placeholder : '<div id="_ID_" class="empty-element empty-element-column">Please drag items here</div>',
		
    	//handles
    	sorthandle_row : "<div class='mw-sorthandle mw-sorthandle-row'>\
	    	    <div class='columns_set'></div>\
	    	    <div class='mw-sorthandle mw-sorthandle-row'>\
	    	    <div class='mw_row_delete mw.edit.delete_element'>&nbsp;</div>\
    	    </div>",
    	sorthandle_row_columns_controlls :
         '<a  href="javascript:mw.edit.create_columns(ROW_ID,1)" class="mw-make-cols mw-make-cols-1" >1</a> \
          <a  href="javascript:mw.edit.create_columns(ROW_ID,2)" class="mw-make-cols mw-make-cols-2" >2</a> \
          <a  href="javascript:mw.edit.create_columns(ROW_ID,3)" class="mw-make-cols mw-make-cols-3" >3</a> \
          <a  href="javascript:mw.edit.create_columns(ROW_ID,4)" class="mw-make-cols mw-make-cols-4" >4</a> \
          <a  href="javascript:mw.edit.create_columns(ROW_ID,5)" class="mw-make-cols mw-make-cols-5" >5</a> ',
    	sorthandle_row_delete : '<a class=\"mw_edit_delete_element\" href="javascript:mw.edit.delete_element(ROW_ID)"><span>&nbsp;</span></a> ',
    	sorthandle_delete_confirmation_text : "Are you sure you want to delete this element?",
    	sorthandle_col:
        "<div class='mw-sorthandle mw-sorthandle-col mw-sorthandle-element'>\
            <div class='mw_col_delete mw_edit_delete_element'>\
                <a class='mw_edit_btn mw_edit_delete' onclick=\"mw.edit.delete_element(ELEMENT_ID)\"><span>&nbsp;</span></a>\
            </div>\
            <span class='mw-sorthandle-moveit'>Move</span>\
        </div>",
    	sorthandle_module:
            "<div class='mw-sorthandle mw-sorthandle-col mw-sorthandle-module'>\
                <div class='mw-element-name-handle'>MODULE_NAME</div>\
                <div class='mw_col_delete mw_edit_delete_element'>\
                    <a class='mw_edit_btn mw_edit_delete right' href=\"javascript:mw.edit.delete_element(ELEMENT_ID)\"><span>&nbsp;</span></a>\
                    <a class='mw_edit_btn mw_edit_settings right' href=\"javascript:mw.edit.module_settings(MODULE_ID)\">Settings</a>\
                </div>\
                <span class='mw-sorthandle-moveit'>Move</span>\
            </div>"
    }

</script>
<script src="<?php   print( INCLUDES_URL);  ?>js/jquery-1.7.2.js" type="text/javascript"></script>
<script src="<?php   print( INCLUDES_URL);  ?>js/jquery-ui-1.8.20.custom.js" type="text/javascript"></script>
<?php /* <script src="http://code.jquery.com/ui/jquery-ui-git.js" type="text/javascript"></script> */ ?>
<script src="<?php   print( INCLUDES_URL);  ?>js/edit_libs.js" type="text/javascript"></script>

<link href="<?php   print( INCLUDES_URL);  ?>css/mw_framework.css" rel="stylesheet" type="text/css" />
<link href="<?php   print( INCLUDES_URL);  ?>css/toolbar.css" rel="stylesheet" type="text/css" />
<script src="<?php   print( INCLUDES_URL);  ?>js/api.js" type="text/javascript"></script>
<script src="<?php   print( INCLUDES_URL);  ?>js/edit.js" type="text/javascript"></script>
<script src="<?php   print( INCLUDES_URL);  ?>js/sortable.js" type="text/javascript"></script>
<?php /* <script src="http://c9.io/ooyes/mw/workspace/sortable.js" type="text/javascript"></script>  */ ?>
<script src="<?php   print( INCLUDES_URL);  ?>js/toolbar.js?v=<?php echo uniqid(); ?>" type="text/javascript"></script>
<script type="text/javascript">


	
        $(document).ready(function () {
           /* $('.edit').freshereditor({
                toolbar_selector: "#mw-text-editor"
            }); */
            mw.edit.init_sortables();

            mw.history.init();
            mw.tools.module_slider.init();
            mw.tools.dropdown();
            mw.tools.toolbar_tabs.init();
            mw.tools.toolbar_slider.init();
        });
        (function () {
            function async_load() {
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = '<? print INCLUDES_URL; ?>js/api.js';
                var x = document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
            }

            if (window.mw == undefined) {
				if (window.attachEvent) window.attachEvent('onload', async_load);
                else window.addEventListener('load', async_load, false);
            }

        })();
		
		
		
		
		
		
		
		
		
		
		
		
		    $(document).ready(function () {
		
		
		


 $(".mw_option_field").live("change blur", function () {
                var refresh_modules11 = $(this).attr('data-refresh');
				
				if(refresh_modules11 == undefined){
					                var refresh_modules11 = $(this).attr('data-reload');

				}
				
				og = $(this).attr('data-module-id');
				if(og == undefined){
					og = $(this).parents('.mw_modal_container:first').attr('data-settings-for-module') 
				}
                $.ajax({

                    type: "POST",
                    url: "<? print site_url('api/content/save_option') ?>",
                    data: ({

                        option_key: $(this).attr('name'),
                        option_group: og,
                        option_value: $(this).val()


                    }),


                    success: function () {

  
                        if (refresh_modules11 != undefined && refresh_modules11 != '') {
                            refresh_modules11 = refresh_modules11.toString()

                            if (window.mw != undefined) {
                                if (window.mw.reload_module != undefined) {
                                    window.mw.reload_module(refresh_modules11);
                                }
                            }
  
                        }

                        //  $(this).addClass("done");
                    }
                });



            });
		
		
		
		
		
		
		
		
		
		
		
		
		
		    });
		
		
		
		
		
		

		
		
		
		
		
		
		
		

		
		
		
    </script>
<div class="mw" id="live_edit_toolbar_holder">
  <div class="mw" id="live_edit_toolbar">
    <div id="mw_toolbar_nav"> <a href="<?php print site_url(); ?>" id="mw_toolbar_logo">Microweber - Live Edit</a>



    <?php /* <a href="javascript:;" style="position: absolute;top: 10px;right: 10px;" onclick="mw.extras.fullscreen(document.body);">Fullscreen</a> */  ?>


   <span id="show_hide_sub_panel" onclick="mw.toggle_subpanel();"><span id="show_hide_sub_panel_slider"></span><span id="show_hide_sub_panel_info">Hide</span></span>


      <ul id="mw_tabs">
        <li> <a href="#mw_tab_modules">Modules</a> </li>
        <li> <a href="#mw_tab_layouts">Layouts</a> </li>
        <li> <a href="#mw_tab_design">Design</a> </li>
        <li> <a href="#mw_tab_help">Help</a> </li>
        <li> <a href="#mw_tab_style_editor">Style editor</a> </li>
      </ul>
    </div>
    <div id="tab_modules" class="mw_toolbar_tab">
      <div class="mw_dropdown left" id="module_category_selector"> <span class="mw_dropdown_val">Recommended</span>
        <div class="mw_dropdown_fields">
          <ul>
            <li><a href="#">Recommended</a></li>
            <li><a href="#">Forms</a></li>
            <li><a href="#">Media</a></li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Navigation</a></li>
            <li><a href="#">Content</a></li>
            <li><a href="#">Online Shop</a></li>
            <li><a href="#">Social Networks</a></li>
            <li><a href="#">Others</a></li>
          </ul>
        </div>
      </div>
      <div class="modules_bar_slider bar_slider">
        <div class="modules_bar">
          <microweber module="admin/modules/list" />
        </div>
        <span class="modules_bar_slide_left">&nbsp;</span> <span class="modules_bar_slide_right">&nbsp;</span> </div>
      <div class="mw_clear">&nbsp;</div>
    </div>
    <div id="tab_layouts" class="mw_toolbar_tab">
      <div class="mw_dropdown left" id="module_layout_selector"> <span class="mw_dropdown_val">Recommended</span>
        <div class="mw_dropdown_fields">
          <ul>
            <li><a href="#">Recommended</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Online Shop</a></li>
            <li><a href="#">Simple</a></li>
            <li><a href="#">Custom</a></li>
          </ul>
        </div>
      </div>
      <div class="modules_bar_slider bar_slider">
        <div class="modules_bar">
          <microweber module="admin/modules/list_elements" />
        </div>
        <span class="modules_bar_slide_left">&nbsp;</span> <span class="modules_bar_slide_right">&nbsp;</span> </div>
    </div>
    <div id="tab_design" class="mw_toolbar_tab">
      <div class="mw_module_settings row">
        <div class="span5">
          <microweber module="admin/pages/layout_and_category" />
        </div>
        <div class="span5">
          <microweber module="admin/pages/choose_category" />
        </div>
        <div class="span5"> </div>
      </div>
    </div>
    <div id="tab_help" class="mw_toolbar_tab">Help</div>
    <div id="tab_style_editor" class="mw_toolbar_tab">
      <? //include( 'toolbar_tag_editor.php') ; ?>
    </div>
    <div id="mw-text-editor" class="mw_editor" style="display: block">

        <span class="mw_editor_btn" data-command="bold">asdasdsa</span>


    </div>
    <div id="mw-history-panel"></div>
    <div id="mw-saving-loader"></div>
  </div>
  <!-- /end .mw --> 
</div>
<!-- /end mw_holder --> 
