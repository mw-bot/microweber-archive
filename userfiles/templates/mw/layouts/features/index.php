<?php

/*

type: layout

name: features layout

description: features site layout









*/

 

?>
<? include TEMPLATE_DIR. "header.php"; ?>

<div class="content_wide_holder_white2 features_page">
  <div class="content_center" style="margin-top:60px; margin-bottom:30px;">
   
    
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr valign="top">
    <td>
     <h1>Features</h1>
    
    
    <br />
    <h2>Microweber is free and accesible to all.</h2>
    <p>
    <br /> 
We think this is of great importance for the evolution of internet. 
    <br /> <br />
We believe in that everybody should use the web as their advantage.
    <br /> <br />
Many people are  not sure how to use the power of the Internet      <br />
and they think its complicated and expensive, but they are not right!
     <br /> <br />
    <h3>We are here to make creation of webites easier</h3>
    </p>
    </td>
    <td><a href="http://demo.microweber.com"  target="_blank"><img src="<? print TEMPLATE_URL ?>img/microweber_banner_1.png" border="0" /></a></td>
  </tr>
</table>

    <microweber module="content/pages_tree"  ul_class="features_nav_big" thumbnail="true" />

    
  </div>
</div>
<? include   TEMPLATE_DIR.  "footer.php"; ?>
