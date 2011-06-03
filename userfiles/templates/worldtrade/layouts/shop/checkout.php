
 
  <h1 class="font_size_18 pink_color">Завършване на поръчка</h1>
  <br />
  <div> <br />
    <br />
    <p> Имате <a href="<? print page_link($shop_page['id']); ?>/view:cart"><strong><span class="items cart_items_qty"><? print get_items_qty() ; ?></span> артикула</strong></a> във вашата кошница на стойност <b><span class="cart_items_total"><? print get_cart_total()  ?></span> <?php print option_get('shop_currency_sign') ; ?></b> <br />
      <br />
      <?php  print (option_get('shipping_price_text', $params['module_id'])) ? option_get('shipping_price_text', $params['module_id']) : "Shipping";  ?>
      : </strong></span> <?php print option_get('shipping') ; ?> <?php print option_get('shop_currency_sign') ; ?> </p>
  </div>
  <br />
 
<mw module="cart/checkout" />
<div class="clener"></div>
