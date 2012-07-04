<script type="text/javascript">

        window.onerror = function(err){alert(err)}
        admin_panel = "<?php   print( ADMIN_URL);  ?>/";
        window.page_id = '<?php print intval(PAGE_ID) ?>';
        window.post_id = '<?php print intval(POST_ID) ?>';
        window.category_id = '<?php print intval(CATEGORY_ID) ?>';
		window.content_id = '<?php print intval(CONTENT_ID) ?>';
		
 
    </script>
<script src="<?php   print( INCLUDES_URL);  ?>js/jquery-1.7.2.js" type="text/javascript"></script>
<script src="<?php   print( INCLUDES_URL);  ?>js/jquery-ui-1.8.20.custom.js" type="text/javascript"></script>
<link href="<?php   print( INCLUDES_URL);  ?>css/jquery-ui-smoothness/jquery-ui-1.8.20.custom.css"  rel="stylesheet" type="text/css" />
<script src="<?php   print( INCLUDES_URL);  ?>js/edit_libs.js"    type="text/javascript"></script>
<script src="<?php   print( INCLUDES_URL);  ?>js/farbtastic/farbtastic.js"    type="text/javascript"></script>
<link href="<?php   print( INCLUDES_URL);  ?>js/farbtastic/farbtastic.css"    rel="stylesheet" type="text/css" />
<script src="<?php   print( INCLUDES_URL);  ?>js/freshereditor.js"    type="text/javascript"></script>
<link href="<?php   print( INCLUDES_URL);  ?>js/freshereditor.css"   rel="stylesheet" type="text/css" />
<link href="<?php   print( INCLUDES_URL);  ?>css/toolbar.css"    rel="stylesheet" type="text/css" />
<script src="<?php   print( INCLUDES_URL);  ?>js/edit.js"    type="text/javascript"></script>
<script type="text/javascript">
	
	
	
        $(document).ready(function () {
            $('.edit').freshereditor({
                toolbar_selector: "#mw-text-editor"
            });
   

            init_sortables()
			 $("#mw_toolbar_tabs").tabs();


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

<div id="mw_toolbar_tabs">
  <ul>
    <li> <a href="#mw_toolbar_tabs-2">Modules</a> </li>
    <li> <a href="#mw_toolbar_tabs-3">Layouts</a> </li>
    <li> <a href="#mw_toolbar_tabs-5">Page settings</a> </li>
    <li> <a href="#mw_toolbar_tabs-7">Help</a> </li>
    <li> <a href="#mw_css_editor">Style editor</a> </li>
  </ul>
  <div id="mw_toolbar_tabs-2">
    <microweber module="admin/modules/list" />
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
