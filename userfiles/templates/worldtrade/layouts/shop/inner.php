<script type="text/javascript">

function set_gallery_img($new_src){
	$('#set_gallery_img').attr('src', $new_src);
	
}
</script>
 

<div class="left gallery_box">
 
 
 <microweber module="media/gallery" display="mics/gallery.php" content_id="<? print $post['id']; ?>">
 
 <?
 
/* 
  <div class="rounded_box transparent"> <img id="set_gallery_img" src="<? print get_media_thumbnail( $media ['pictures'][0]['id'] , 250)  ?>" width="250" alt="" />
    <div class="lt"></div>
    <div class="rt"></div>
    <div class="lb"></div>
    <div class="rb"></div>
  </div>
  <br/>
  <div id="gallery">
    <? if(!empty($media["pictures"])): ?>
    <? foreach($media["pictures"] as $pic): ?>
    <a href="javascript:set_gallery_img('<? print get_media_thumbnail( $pic['id'] , 250)  ?>');"><img src="<? print get_media_thumbnail( $pic['id'] , 70)  ?>" alt="" /></a>
    <? endforeach ;  ?>
    <? endif; ?>
    
    */
    ?>
    
    <!--  
  <a href="#"><img src="<? print TEMPLATE_URL ?>images/other/gallery/Products_inner_03.jpg" alt="" /></a> <a href="#"><img src="<? print TEMPLATE_URL ?>images/other/gallery/Products_inner_05.jpg" alt="" /></a> <a href="#"><img src="<? print TEMPLATE_URL ?>images/other/gallery/Products_inner_07.jpg" alt="" /></a> <a href="#"><img src="<? print TEMPLATE_URL ?>images/other/gallery/Products_inner_13.jpg" alt="" /></a> <a href="#"><img src="<? print TEMPLATE_URL ?>images/other/gallery/Products_inner_14.jpg" alt="" /></a> <a href="#"><img src="<? print TEMPLATE_URL ?>images/other/gallery/Products_inner_15.jpg" alt="" /></a>
  
  -->
  </div>
</div>
<div class="left padding_L16 w350">
  <h1 class="title_product pink_color font_size_18"><? print $post['content_title']; ?></h1>
  <p class="products_description">
  
     <editable  rel="post" field="content_body">
   <? print $post['the_content_body']; ?>
  </editable>
  
   
   
   
   
    <br/>
  
  
  
  
  
  
   <!-- <span class="text_align_right pink_color"><i>Единична цена: <span class="font_size_18">38.00</span> лв.</i></span> --></p>
  <br />
    <editable  rel="post" field="custom_field_order_teaser">
    <p class="font_size_10"><i>* За да поръчате този продукт, трябва да изберете модел цвят и брой.</i></p>
  </editable>
 
 
 
 
 
 
 
 
 
 
  <form id="products_option_form" method="post" action="#">
    
    <microweber module="content/custom_fields" content_id="<? print $post['id'] ?>" module_id="custom_fields_for_products<? print $page['id'] ?>" /> 
    
    
    <? 	$cf_post =  CI::model ( 'core' )->getCustomFields('table_content', $post['id'], $return_full = true); 
	
	//p($cf_post);
	?>
    
    
    <!--<div class="left">
      <label>Избери Цвят:</label>
      <select>
        <option>цвят 1</option>
        <option>цвят 2</option>
      </select>
    </div>
    
    
    
    
    
    <div class="clener h10"></div>
    <div class="left">
      <label>Избери Размер:</label>
      <select>
        <option>цвят 1</option>
        <option>цвят 2</option>
      </select>
    </div>
    <div class="left">
      <label>Избери Брой:</label>
      <select>
        <option>цвят 1</option>
        <option>цвят 2</option>
      </select>
    </div>-->
    <? // p($cf_post); ?>
    <div class="clener"></div>
  </form>
  <div class="full_price">
    <p class="text_align_right pink_color"><i>Крайна цена: <span class="font_size_18"><? print 	$cf_post['price'] ["custom_field_value"]; ?></span> лв.</i></p>
  </div>
  <div id="buy_it_box"> <i>* Всички цени са в български лева</i> <a href="#" class="rounded right pink_btn"> <span class="in1"> <span class="in2 min_w_120">Купи сега</span> </span> </a> </div>
</div>
<div class="clener"></div>
<div class="pattern_line margin_30-0-18-0"></div>
<h2 class="title_h40 pr"> Подобни продукти <span id="pager"></span> <span class="slide-btn_box" id="next"></span> <span class="slide-btn_box" id="prev"></span> </h2>
<div id="related_products">
  <? $cats =CATEGORY_IDS;

$cats = explode(',',$cats);

$last_cat = end($cats);
?>
  <? if(!empty($cats )) : ?>
  <? $last_cat = end($cats);


$related_posts_params = array(); 
   //params for the output
   $related_posts_params['display'] = 'post_item.php';
   
   //params for the posts
     
  	$related_posts_params['selected_categories'] = array($last_cat); //if false will get the articles from the curent category. use 'all' to get all articles from evrywhere
  	$related_posts_params['items_per_page'] = 5; //limits the results by paging
	//$related_posts_params['curent_page'] = 1; //curent result page
	//$related_posts_params['without_custom_fields'] = true; //if true it will get only basic posts info. Use this parameter for large queries
    
$related_posts = get_posts($related_posts_params);
//p($related_posts );
?>
  <? endif;  ?>
  <ul class="slide_box">
    <? if(!empty($related_posts['posts'])) :  ?>
    <? foreach($related_posts["posts"] as $rel): ?>
    <li>
      <div class="rounded_box transparent left">
        <? $media =   get_media($rel['id']);  ; ?>
        <? if(!empty($media["pictures"])): ?>
        <img   border="0"    src="<? print get_media_thumbnail( $media["pictures"][0]['id'] , 177)  ?>" width="177"  alt="<? print addslashes($rel['content_title']);?>" />
        <? endif; ?>
        <div class="lt"></div>
        <div class="rt"></div>
        <div class="lb"></div>
        <div class="rb"></div>
      </div>
      <div class="clener"></div>
      <h3><? print character_limiter($rel['content_title'], 10);?> </h3>
      <p> <? print character_limiter($rel['content_description'], 100);?><br />
        <span class="pink_color font_size_18"><span class="font_size_14">Цена:</span> 38.00</span> </p>
    </li>
    <? endforeach ;  ?>
    <? endif; ?>
    <!--<li class="spacer"></li>
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
    <li class="spacer"></li>
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
  </ul>
  <ul class="slide_box">
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
    <li class="spacer"></li>
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
    <li class="spacer"></li>
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
  </ul>
  <ul class="slide_box">
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
    <li class="spacer"></li>
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
    <li class="spacer"></li>
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
</div>
