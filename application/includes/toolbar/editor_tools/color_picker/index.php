<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<link rel="stylesheet" href="css/colorpicker.css" type="text/css" />
    <link rel="stylesheet" media="screen" type="text/css" href="css/layout.css" />
    <title>ColorPicker - jQuery plugin</title>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/colorpicker.js"></script>
    <script type="text/javascript">
        var command = window.location.hash.replace("#", "");
        $(document).ready(function(){

          $(document.body).mouseenter(function(){
            parent.mw.wysiwyg.save_selected_element();
          });
          $(document.body).mouseleave(function(){
            parent.mw.wysiwyg.deselect_selected_element();
          });
          $('#colorpicker').ColorPicker({
            flat: true,
            onChange:function(hsb, hex){
              parent.mw.wysiwyg[command](hex);
            }
          });
        });
    </script>
</head>
<body>
    <div id="colorpicker"></div>
</body>
</html>
