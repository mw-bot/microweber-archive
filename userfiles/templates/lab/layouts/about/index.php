<?php

/*

type: layout

name: Home layout

description: Home site layout

*/

?>
<? include TEMPLATE_DIR. "header.php"; ?>

<!-- Typography
================================================== -->

<section id="typography">
  <div class="edit" id="footeasasssr" data-field='price'>
    <div class="row">
      <div class="column" style="width:33%" >
        <div class="element" > <img src="http://lorempixum.com/200/200/?<? print rand(); ?>" height="200"   />
          <h1>HTML Ipsum Presents</h1>
          <h1>HTML Ipsum Presents</h1>
          <p>Мъжът трябва да помни:<br>
            - Датата, когато се е запознал с жената<br>
            - Датата на първата среща<br>
            - Кога за първи път са отишли на ресторант<br>
            - Деня на първата целувка<br>
            - Деня, в който са правили секс за първи път<br>
            Мили дами, няма мъж, който да помни толкова дати. Затова не се чудете, че се стараем да направим всичко това на първата среща<br>
          </p>
        </div>
      </div>
      <div class="column" style="width:33%" >
        <div class="element" >
          <div class="video_embed">
            <object width="420" height="262.5">
              <param name="movie" value="http://www.youtube.com/v/3BP5ax1qs5o&amp;hl=en_US&amp;fs=1&amp;rel=0">
              <param name="allowFullScreen" value="true">
              <param name="allowscriptaccess" value="always">
              <embed src="http://www.youtube.com/v/3BP5ax1qs5o&amp;hl=en_US&amp;fs=1&amp;rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="420" height="262.5">
            </object>
          </div>
        </div>
      </div>
      <div class="column" style="width:32%" >
        <div class="element" > <img src="http://lorempixum.com/200/200/?<? print rand(); ?>" height="200"     />
          <h1>HTML Ipsum Presents</h1>
          <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
        </div>
        <div class="element video_description">
          <p class="meta date"> <strong>Jan 3</strong> 2011 </p>
          <h1>Thinning Text in Webkit&nbsp;(Safari)</h1>
          <div class="excerpt">
            <p>Safari has a not-so-lovely way of bulking up text using sub-pixel rendering. There have been several ways of dealing with this in the past, but the latest versions of Webkit have given us a much better&nbsp;solution.</p>
          </div>
          <p>On Safari on Leopard and previous versions of OS X, this was fixed with a <code>text-shadow</code> declaration, but since Snow Leopard that method no longer works. With Safari 4 and Snow Leopard, I suggested using <code>-webkit-text-stroke</code>. But now, with Safari 5 and Google Chrome, we actually have a dedicated <span class="caps">CSS</span> property we can use to render text the way we want.</p>
          <p>Here’s the solution, and it’s remarkably simple:</p>
          <div class="multiline_code">
            <div class="CodeRay">
              <div class="code">
                <pre><span class="ty">body</span> { <span class="ke">-webkit-font-smoothing</span>: <span class="vl">antialiased</span>; }</pre>
              </div>
            </div>
          </div>
          <p>There you go. Simply add that to your css file. Change the selector, if you need, and put your type on a diet.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<? include   TEMPLATE_DIR.  "footer.php"; ?>
