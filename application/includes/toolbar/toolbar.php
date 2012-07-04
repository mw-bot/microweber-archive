<script type="text/javascript">

    window.onerror = function(err){alert(err)}

    window.mw = window.mw ? window.mw : {};

    mw.settings = {
        site_url:'<?php print site_url(); ?>',
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
    	row_id : false,
    	empty_column_placeholder : '<div class="ui-state-highlight ui-sortable-placeholder"><span>Please drag items here 1</span></div>',
    	//handles
    	sorthandle_row : "<div class='mw-sorthandle mw-sorthandle-row'><div class='columns_set'></div><div class='mw_row_delete mw.edit.delete_element'>&nbsp;</div></div>",
    	sorthandle_row_columns_controlls : 'row <a  href="javascript:mw.edit.create_columns(ROW_ID,1)" class="mw-make-cols mw-make-cols-1" >1</a> <a  href="javascript:mw.edit.create_columns(ROW_ID,2)" class="mw-make-cols mw-make-cols-2" >2</a> <a  href="javascript:mw.edit.create_columns(ROW_ID,3)" class="mw-make-cols mw-make-cols-3" >3</a> <a  href="javascript:mw.edit.create_columns(ROW_ID,4)" class="mw-make-cols mw-make-cols-4" >4</a> <a  href="javascript:mw.edit.create_columns(ROW_ID,5)" class="mw-make-cols mw-make-cols-5" >5</a> ',
    	sorthandle_row_delete : '<a class=\"mw.edit.delete_element\" href="javascript:mw.edit.delete_element(ROW_ID)">x</a> ',
    	sorthandle_delete_confirmation_text : "Are you sure you want to delete this element?",
    	sorthandle_col:"<div class='mw-sorthandle mw-sorthandle-col'><div class='columns_set'>element</div><div class='mw_col_delete mw.edit.delete_element'><a class=\"mw.edit.delete_element\" href=\"javascript:mw.edit.delete_element(ELEMENT_ID)\">x</a></span></div>",
    	sorthandle_module:"<div class='mw-sorthandle mw-sorthandle-col'><div class='columns_set'>MODULE_NAME</div><div class='mw_col_delete mw.edit.delete_element'><a href=\"javascript:mw_module_settings(MODULE_ID)\">settings</a><a class=\"mw.edit.delete_element\" href=\"javascript:mw.edit.delete_element(ELEMENT_ID)\">x</a></span></div>"
    }

</script>
<script src="<?php   print( INCLUDES_URL);  ?>js/jquery-1.7.2.js" type="text/javascript"></script>
<script src="<?php   print( INCLUDES_URL);  ?>js/jquery-ui-1.8.20.custom.js" type="text/javascript"></script>
<link href="<?php   print( INCLUDES_URL);  ?>css/jquery-ui-smoothness/jquery-ui-1.8.20.custom.css"  rel="stylesheet" type="text/css" />
<script src="<?php   print( INCLUDES_URL);  ?>js/edit_libs.js" type="text/javascript"></script>
<script src="<?php   print( INCLUDES_URL);  ?>js/farbtastic/farbtastic.js" type="text/javascript"></script>
<link href="<?php   print( INCLUDES_URL);  ?>js/farbtastic/farbtastic.css"    rel="stylesheet" type="text/css" />
<script src="<?php   print( INCLUDES_URL);  ?>js/freshereditor.js" type="text/javascript"></script>
<link href="<?php   print( INCLUDES_URL);  ?>js/freshereditor.css" rel="stylesheet" type="text/css" />
<link href="<?php   print( INCLUDES_URL);  ?>css/mw_framework.css" rel="stylesheet" type="text/css" />



<script src="<?php   print( INCLUDES_URL);  ?>js/bootstrap.js" type="text/javascript"></script>



<link href="<?php   print( INCLUDES_URL);  ?>css/toolbar.css" rel="stylesheet" type="text/css" />
<script src="<?php   print( INCLUDES_URL);  ?>js/edit.js" type="text/javascript"></script>
<script src="<?php   print( INCLUDES_URL);  ?>js/toolbar.js" type="text/javascript"></script>
<script type="text/javascript">


	
        $(document).ready(function () {
            $('.edit').freshereditor({
                toolbar_selector: "#mw-text-editor"
            });
            mw.edit.init_sortables();
			$("#mw_toolbar_tabs").tabs();

            mw.history.init();
            mw.module_selector.init();
            mw.tools.dropdown();
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
    </script>
<div class="mw">
    <a href="javascript:;" onclick="mw.extras.fullscreen(document.body);">Fullscreen</a>
    <div id="mw_toolbar_tabs">
      <ul>
        <li> <a href="#mw_toolbar_tabs-2">Modules</a> </li>
        <li> <a href="#mw_toolbar_tabs-3">Layouts</a> </li>
        <li> <a href="#mw_toolbar_tabs-5">Design</a> </li>
        <li> <a href="#mw_toolbar_tabs-7">Help</a> </li>
        <li> <a href="#mw_css_editor">Style editor</a> </li>
      </ul>
      <div id="mw_toolbar_tabs-2">

         <div class="mw_dropdown left" id="module_category_selector">
            <span class="mw_dropdown_val">Recommended</span>
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

        <div id="modules_bar">
            <microweber module="admin/modules/list" />
        </div>
        <div class="mw_clear">&nbsp;</div>
      </div>
      <div id="mw_toolbar_tabs-3">
        <microweber module="admin/modules/list_elements" />
      </div>
      <div id="mw_toolbar_tabs-5">
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
      <div id="mw_toolbar_tabs-7">Help</div>
      <div id="mw_css_editor">
        <? include( 'toolbar_tag_editor.php') ; ?>
      </div>
    </div>
    <div id="mw-text-editor"></div>
    <div id="mw-history-panel"></div>

</div><!-- /end .mw -->
