<?php

/*

type: layout

name: shop layout

description: shop site layout









*/



?>
<? include TEMPLATE_DIR. "header.php"; ?>
<? 
 
 
?>

<div id="middle">
  <div class="right_col right">
    <? if(!empty($post)) : ?>
    <? include   "inner.php"; ?>
    <? else : ?>
    <h1 class="title_product pink_color font_size_18">
      <? //breadcrumbs('/')  ?>
      <?  if(intval(CATEGORY_ID) > 0):  ?>
      <? $c = get_category(CATEGORY_ID); ?>
      <?
	
	 print  $c['taxonomy_value'];
	?>
      <? endif;  ?>
    </h1>
    <br />
    <!--<div class="products_list slide_box"> <a href="#" class="rounded_box_hover"> <span class="rounded_box transparent left"> <img src="<? print TEMPLATE_URL ?>images/other/products/Products_inner_03.jpg" width="177" height="190" alt="" /> <span class="lt"></span> <span class="rt"></span> <span class="lb"></span> <span class="rb"></span> </span> <span class="clener"></span> <strong>016 Tania</strong> <span class="text"> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
      <span class="pink_color font_size_18"><span class="font_size_14">Цена:</span> 38.00</span> </span> </a> <a href="#" class="rounded_box_hover star"> <span class="rounded_box transparent left"> <img src="<? print TEMPLATE_URL ?>images/other/products/Products_inner_07.jpg" width="177" height="190" alt="" /> <span class="lt"></span> <span class="rt"></span> <span class="lb"></span> <span class="rb"></span> </span> <span class="clener"></span> <strong>016 Tania</strong> <span class="text"> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
      <span class="pink_color font_size_18"><span class="font_size_14">Цена:</span> 38.00</span> </span> </a>
      <div class="clener"></div>
    </div>-->
    <ul class="products_list slide_box">
      <? foreach($posts  as $item) :?>
      <li>
        <div class="rounded_box transparent left"  onclick="location.href='<? print post_link($item['id']);?>'" >
          <? $media =   get_media($item['id']);  ; ?>
          <? if(!empty($media["pictures"])): ?>
          <img   border="0"    src="<? print get_media_thumbnail( $media["pictures"][0]['id'] , 177)  ?>" width="177"  alt="<? print addslashes($item['content_title']);?>" />
          <? endif; ?>
          <div class="lt"></div>
          <div class="rt"></div>
          <div class="lb"></div>
          <div class="rb"></div>
        </div>
        <div class="clener"></div>
        <h3><? print ($item['content_title']);?></h3>
        <p><? print character_limiter($item['content_description'], 200);?><br />
          <span class="pink_color font_size_18"><span class="font_size_14">Цена:</span> 38.00</span> </p>
      </li>
      <? endforeach; ?>
      <!--<li class="star">
        <div class="rounded_box transparent left"> <img src="<? print TEMPLATE_URL ?>images/other/products/Products_inner_05.jpg" width="177" height="190" alt="" />
          <div class="lt"></div>
          <div class="rt"></div>
          <div class="lb"></div>
          <div class="rb"></div>
        </div>
        <div class="clener"></div>
        <h3>016 Tania</h3>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          <span class="pink_color font_size_18"><span class="font_size_14">Цена:</span> 38.00</span> </p>
      </li>
      <li>
        <div class="rounded_box transparent left"> <img src="<? print TEMPLATE_URL ?>images/other/products/Products_inner_07.jpg" width="177" height="190" alt="" />
          <div class="lt"></div>
          <div class="rt"></div>
          <div class="lb"></div>
          <div class="rb"></div>
        </div>
        <div class="clener"></div>
        <h3>016 Tania</h3>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          <span class="pink_color font_size_18"><span class="font_size_14">Цена:</span> 38.00</span> </p>
      </li>
      <li>
        <div class="rounded_box transparent left"> <img src="<? print TEMPLATE_URL ?>images/other/products/Products_inner_05.jpg" width="177" height="190" alt="" />
          <div class="lt"></div>
          <div class="rt"></div>
          <div class="lb"></div>
          <div class="rb"></div>
        </div>
        <div class="clener"></div>
        <h3>016 Tania</h3>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          <span class="pink_color font_size_18"><span class="font_size_14">Цена:</span> 38.00</span> </p>
      </li>
      <li>
        <div class="rounded_box transparent left"> <img src="<? print TEMPLATE_URL ?>images/other/products/Products_inner_03.jpg" width="177" height="190" alt="" />
          <div class="lt"></div>
          <div class="rt"></div>
          <div class="lb"></div>
          <div class="rb"></div>
        </div>
        <div class="clener"></div>
        <h3>016 Tania</h3>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          <span class="pink_color font_size_18"><span class="font_size_14">Цена:</span> 38.00</span> </p>
      </li>
      <li>
        <div class="rounded_box transparent left"> <img src="<? print TEMPLATE_URL ?>images/other/products/Products_inner_07.jpg" width="177" height="190" alt="" />
          <div class="lt"></div>
          <div class="rt"></div>
          <div class="lb"></div>
          <div class="rb"></div>
        </div>
        <div class="clener"></div>
        <h3>016 Tania</h3>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          <span class="pink_color font_size_18"><span class="font_size_14">Цена:</span> 38.00</span> </p>
      </li>-->
    </ul>
    <microweber module="content/paging">
    <? endif; ?>
    <div class="clener h10"></div>
  </div>
  <? include   TEMPLATE_DIR.  "sidebar.php"; ?>
  <div class="clener"></div>
</div>
<? include   TEMPLATE_DIR.  "footer.php"; ?>
