<?php

/*

type: layout

name: Home layout

description: Home site layout









*/



?>
<? include TEMPLATE_DIR. "header.php"; ?>
<editable rel="page" field="content_body">
<div class="content_wide_holder">
  <div class="content_center">
    <h1 class="headers_home">Make websites and online shops by drag and drop</h1>
    <h4 class="headers_home">Expressing yourself in internet is easy as never before!</h4>
  </div>
  <div class="content_center content_center_home"> </div>
</div>
<div class="content_wide_holder content_wide_holder_color">
  <div class="content_center content_center_home_second">
    <div class="content_center_center">
      <table border="0" cellspacing="0" cellpadding="0" align="center" width="350">
        <tr>
          <td><a class="btn_big_dark" title="View demo" href="#">Try the demo</a></td>
          <td><a class="btn_big_green" href="#">Support us</a></td>
        </tr>
      </table>
    </div>
    <div class="content_center_center"> <a class="help_us_on_ks" title="Support us" href="#"></a> </div>
  </div>
</div>
<div class="content_wide_holder_white content_center_home_2">
  
  <div class="content_center">
    <h1 class="headers_home">Inspired by your needs we are creating the easiest open source system 
      for publishing content online </h1>
  </div>
  <div class="content_center content_center_features">
    <table width="100%" border="0" cellspacing="10" cellpadding="10">
      <tr>
        <td><img src="<? print TEMPLATE_URL ?>img/home_features_1.png" />
          <h2>Drag and drop features</h2>
          <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
          <a class="btn_dark right">Read more</a></td>
        <td><img src="<? print TEMPLATE_URL ?>img/home_features_2.png" />
          <h2>Drag and drop features</h2>
          <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
          <a class="btn_dark right">Read more</a></td>
        <td><img src="<? print TEMPLATE_URL ?>img/home_features_3.png" />
          <h2>Drag and drop features</h2>
          <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
          <a class="btn_dark right">Read more</a></td>
      </tr>
    </table>
    
  </div>
</div></editable>
<? include   TEMPLATE_DIR.  "footer.php"; ?>
