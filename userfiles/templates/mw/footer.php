</div>
<!-- /#content -->











<div class="footer_sub">
  <div class="content_center">
  <script type="text/javascript">
// <![CDATA[




			function CheckMultiple1(frm, name) {
				for (var i=0; i < frm.length; i++)
				{
					fldObj = frm.elements[i];
					fldId = fldObj.id;
					if (fldId) {
						var fieldnamecheck=fldObj.id.indexOf(name);
						if (fieldnamecheck != -1) {
							if (fldObj.checked) {
								return true;
							}
						}
					}
				}
				return false;
			}
			
			
			
		function subForm(fform) {
			var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
			f = eval("document."+fform);
	if(f.email.value.match(emailExp)){
		f.submit();
		//return true;
	}else{
		helperMsg = "Please enter valid email"
		alert(helperMsg);
		f.email.focus();
	//	return false;
	}
			}
		
// ]]>
</script>
 
    <table width="98%" border="0" cellspacing="2" cellpadding="2" height="67">
      <tr valign="middle">
        <td><img src="<? print TEMPLATE_URL ?>img/mail.png" height="32" /></td>
        <td><h2 class="sub_h">Subscribe for updates</h2></td>
        <td> <form id="sub_form" name="sub_form" method="post" action="http://newsletter.microweber.com/form.php?form=1"  >
   <input type="hidden" name="format" value="h" /><input type="text"  name="email" id="email"  class="sub_input" /></form></td>
        <td><a class="btn_small_dark" href="javascript:subForm('sub_form')">Subscribe</a></td>
        <td><h2 class="sub_h">Join us now</h2></td>
        <td><div class="footer__h"></div></td>
        <td></td>
        <td><div class="foot_share">
            <div id="fb-root"></div>
            <script src="http://connect.facebook.net/en_US/all.js#appId=225342984166233&amp;xfbml=1"></script>
            <fb:like href="https://www.facebook.com/Microweber" send="true" layout="button_count" width="50" show_faces="true" font=""></fb:like>
            
            <!--<a href="http://www.facebook.com/pages/Microweber/155325201170631" target="_blank"><img src="http://microweber.com/NotifyMe%20one%20page%20HTML%20template_files/SocialMediaBookmarkIcon/16/facebook.png" alt="facebook" border="0" /></a>--><br />
<br />
            <a href="http://twitter.com/Microweber" class="twitter-follow-button">Follow @Microweber</a>
            <script src="http://platform.twitter.com/widgets.js" type="text/javascript"></script>
          </div></td>
      </tr>
    </table>
    
  </div>
</div>
<div class="content_wide_holder_white" style="background-color:#FFF">
   
  <div class="content_center" style="background-color:#FFF">
    <table width="100%" border="0" cellspacing="10" cellpadding="10">
      <tr>
        <td><a href="<? print site_url(); ?>" title="Microweber"><img src="<? print TEMPLATE_URL ?>img/logo.png" height="27" /></a></td>
        <td> See also: <span class="grey_small"><a href="http://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" title="Creative Commons Share-Alike">License</a>    |    <a href="http://www.facebook.com/pages/Microweber/" title="Microweber">Microweber of Facebook</a> | <a href="<? print site_url('sub.php') ?>" title="Microweber"><strong>Subscribe for updates</strong></a></span></td>
        <td><span class="grey_small">&copy; All rights reserved 2010-<? print date("Y") ?> Microweber.com</span></td>
      </tr>
    </table>
  </div>
</div>



<!-- /#footer -->
</div>
<!-- /#container -->
</body></html>