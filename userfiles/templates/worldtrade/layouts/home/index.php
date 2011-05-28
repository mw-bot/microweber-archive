<?php

/*

type: layout

name: Home layout

description: Home site layout









*/



?>
<? include TEMPLATE_DIR. "header.php"; ?>
<? $products = get_posts();
 
	 
	 ?>

<div id="middle">
  <div class="right_col right">
    <div class="rounded_box transparent home_slide">
      <div id="related_products">
        <? 
	  
	  $i = 0;
	  
	  foreach($products["posts"] as $product): ?>
        <? if($i < 3): ?>
        <? $media =   get_media($product['id'], $for = 'post');  ; ?>
        <? // p($media ); ?>
        <? if(!empty($media["pictures"])): ?>
        <a href="<? print post_link($product['id']);?>"><img src="<? print $media["pictures"][0] ["urls"]['original'] ?>" alt="<? print addslashes($product['content_title']);?>" border="0" width="620" /></a>
        <? $i++; ?>
        <? unset($products["posts"][$i]); ?>
        <? endif; ?>
        <? endif; ?>
        <? endforeach ; ?>
        <!--  <img src="<? print TEMPLATE_URL ?>images/other/home-slide/img2.jpg" alt="" />
      
      
       <img src="<? print TEMPLATE_URL ?>images/other/home-slide/img3.jpg" alt="" />-->
      </div>
      <div class="lt"></div>
      <div class="rt"></div>
      <div class="lb"></div>
      <div class="rb"></div>
      <div id="pager"></div>
      <div class="slide-btn_box" id="next"></div>
      <div class="slide-btn_box" id="prev"></div>
    </div>
    <div class="clener"></div>
    <div class="rounded_box small_preview">
      <ul class="content">
        <?   $i = 0;  foreach($products["posts"] as $product): ?>
        <? $media =   get_media($product['id'], $for = 'post');  ; ?>
        <? if(!empty($media["pictures"])): ?>
        <li class="rounded_box left"><a href="<? print post_link($product['id']);?>"> <img border="0" src="<? print get_media_thumbnail( $media["pictures"][0]['id'] , 120)  ?>" alt="<? print addslashes($product['content_title']);?>" /></a> </li>
        <? $i++; ?>
        <? unset($products["posts"][$i]); ?>
        <? endif; ?>
        <? endforeach ; ?>
        <!--   <li class="rounded_box left"> <img src="<? print TEMPLATE_URL ?>images/other/small_preview/small_preview_05.jpg" alt="" /> </li>
        <li class="rounded_box left"> <img src="<? print TEMPLATE_URL ?>images/other/small_preview/small_preview_07.jpg" alt="" /> </li>
        <li class="rounded_box left"> <img src="<? print TEMPLATE_URL ?>images/other/small_preview/small_preview_09.jpg" alt="" /> </li>-->
      </ul>
      <div class="lt"></div>
      <div class="rt"></div>
      <div class="lb"></div>
      <div class="rb"></div>
      <div class="clener h10"></div>
    </div>
    <img src="<? print TEMPLATE_URL ?>images/img1.jpg" alt="" />
    <h1 class="pink_color font_size_18 home_products_list_title">Bikini Style</h1>
    <ul class="home_products_list slide_box">
      <li>
        <div class="left"> <img src="<? print TEMPLATE_URL ?>images/other/home-list-products/Home_03.jpg" alt="" /> </div>
        <div class="clener"></div>
        <h3>Bikini Model 38</h3>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          <span class="pink_color font_size_18"><span class="font_size_14">Цена:</span> 38.00</span> </p>
      </li>
      <li>
        <div class="left"> <img src="<? print TEMPLATE_URL ?>images/other/home-list-products/Home_07.jpg" alt="" /> </div>
        <div class="clener"></div>
        <h3>Bikini Model 38</h3>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          <span class="pink_color font_size_18"><span class="font_size_14">Цена:</span> 38.00</span> </p>
      </li>
      <li>
        <div class="left"> <img src="<? print TEMPLATE_URL ?>images/other/home-list-products/Home_09.jpg" alt="" /> </div>
        <div class="clener"></div>
        <h3>Bikini Model 38</h3>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          <span class="pink_color font_size_18"><span class="font_size_14">Цена:</span> 38.00</span> </p>
      </li>
      <li>
        <div class="left"> <img src="<? print TEMPLATE_URL ?>images/other/home-list-products/home-list-products_05.jpg" alt="" /> </div>
        <div class="clener"></div>
        <h3>Bikini Model 38</h3>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          <span class="pink_color font_size_18"><span class="font_size_14">Цена:</span> 38.00</span> </p>
      </li>
    </ul>
  </div>
  <? include   TEMPLATE_DIR.  "sidebar.php"; ?>
  <div class="clener"></div>
</div>
<? include   TEMPLATE_DIR.  "footer.php"; ?>
