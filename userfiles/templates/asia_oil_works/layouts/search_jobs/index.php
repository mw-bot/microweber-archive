<?php

/*

type: layout

name: search layout

description: search layout









*/



?>
<? include TEMPLATE_DIR. "header.php"; ?>

<div id="content" class="TheContent">
  <div class="TheContent1 searchEngine">
    <div class="pad2 ishr" id="search_header">
      <h2 class="left">Categories</h2>
      <div class="right">
        <h2>Lates hot Jobs</h2>
        <div class="TheEngine">
          <label>Page</label>
          <ul class="paging">
            <li class="active"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
          </ul>
          <label style="margin-left:12px;">Search jobs</label>
          <form method="post" action="#" id="search_engine">
            <span class="search_field">
            <input type="text" value="Type keyword here" onfocus="this.value=='Type keyword here'?this.value='':''" onblur="this.value==''?this.value='Type keyword here':''" />
            </span>
            <input type="submit" class="xhidden" value="Search" />
            <a href="#" class="search_submit action-submit">Search</a>
          </form>
        </div>
      </div>
    </div>
    <!-- /#search_header -->
    <div id="side_in">
      <div id="themap"> <em>Search jobs by categories</em> </div>
      <ul class="cats">
        <li><a href="#">Jobs in Asia</a>
          <ul>
            <li><a href="#">Driling jobs</a></li>
            <li><a href="#">Engenerieng jobs</a></li>
            <li><a href="#">Project managament</a></li>
          </ul>
        </li>
        <li><a href="#">Jobs in Europe</a>
          <ul>
            <li><a href="#">Driling jobs</a></li>
            <li><a href="#">Engenerieng jobs</a></li>
            <li><a href="#">Project managament</a></li>
            <li><a href="#">CEO</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div id="cont_in">
      <div class="pad2">
        <table cellpadding="0" cellspacing="0" id="results">
          <colgroup>
          <col width="178" />
          <col width="305" />
          <col width="" />
          </colgroup>
          <thead>
            <tr>
              <th>Job title</th>
              <th>Company</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Featured Jobs title <span>London</span></td>
              <td>Company title here</td>
              <td>24.06.2011</td>
            </tr>
            <tr>
              <td> Featured Jobs title <span>London</span></td>
              <td>Company title here</td>
              <td>24.06.2011</td>
            </tr>
            <tr>
              <td> Featured Jobs title <span>London</span></td>
              <td>Company title here</td>
              <td>24.06.2011</td>
            </tr>
            <tr>
              <td> Featured Jobs title <span>London</span></td>
              <td>Company title here</td>
              <td>24.06.2011</td>
            </tr>
            <tr>
              <td> Featured Jobs title <span>London</span></td>
              <td>Company title here</td>
              <td>24.06.2011</td>
            </tr>
          </tbody>
        </table>
        <div class="c" style="padding-bottom: 15px;">&nbsp;</div>
        <div class="TheEngine">
          <label>Page</label>
          <ul class="paging">
            <li class="active"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
          </ul>
          <label style="margin-left:12px;">Search jobs</label>
          <form method="post" action="#" id="search_engine">
            <span class="search_field">
            <input type="text" value="Type keyword here" onfocus="this.value=='Type keyword here'?this.value='':''" onblur="this.value==''?this.value='Type keyword here':''" />
            </span>
            <input type="submit" class="xhidden" value="Search" />
            <a href="#" class="search_submit action-submit">Search</a>
          </form>
        </div>
      </div>
    </div>
    <!-- /#cont_in -->
    <div class="c">&nbsp;</div>
    <div id="footer">
      <address>
      <a href="#">Conditions of Use</a> | <a href="#">Privacy Notice</a> &copy; 1999-2011, <a href="http://asiaoilworks.com">AsiaOilWorks.com</a>, or its affiliates | Powered by <a href="http://microweber.com" title="Microweber">Microweber</a> | Design by <a href="http://ooyes.net" title="Web Design">OoYes.net</a>
      </address>
    </div>
  </div>
  <div class="TheContentTop">&nbsp;</div>
  <div class="TheContentBottom">&nbsp;</div>
</div>
<? include   TEMPLATE_DIR.  "footer.php"; ?>
