<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>{content_meta_title}</title>
<meta NAME="Description" CONTENT="{content_meta_description}">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script type="text/javascript" src="<? print TEMPLATE_URL ?>src/js/jquery-1.4.2.min.js"></script>
<!--<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js"></script>
--><link rel="stylesheet" href="<? print TEMPLATE_URL ?>src/css/jquery.treeview.css" />
<script src="<? print TEMPLATE_URL ?>src/js/jquery.cookie.js" type="text/javascript"></script>
<script src="<? print TEMPLATE_URL ?>src/js/jquery.treeview.js" type="text/javascript"></script>
<link type="text/css" rel="stylesheet" href="<? print TEMPLATE_URL ?>src/css/common.css">
</link>
<link type="text/css" rel="stylesheet" href="<? print TEMPLATE_URL ?>src/css/docs.css">
</link>
<script type="text/javascript">
		$(document).ready(function(){
			$("#tree").treeview({
				animated: "fast",
				control:"#sidetreecontrol",
				persist: "cookie",
				cookieId: "treeview-black",
				collapsed: true
			
			});
		})
		
	</script>
<style type="text/css">
<!--

body {
	font: normal 13px Arial, Helvetica, sans-serif;
 background-image: url(<? print TEMPLATE_URL ?>img/left_content_bg.jpg);
	background-repeat: repeat-x;
	margin-left: 30px;
	margin-top: 0px;
	margin-right: 30px;
	margin-bottom: 0px;
}

a:link, a:visited {
	color: #4183C4;
	text-decoration:none;
}

a:hover {
 
	text-decoration: none;
	color:#006;
}

a.logo:hover  {
	background-color: #000;
 
 
}



a, .treeview li.collapsable span {
	padding-left: 3px;
	padding-right: 3px;
}

a:active, a:focus {
	color: #FFF;
	background-color:#C00;
	outline:0;
	text-decoration:none;
}

#sidetreecontrol {
	margin-bottom:10px;
}


#sidetreecontrol a{
	color:#000;
}

#sidetree {
	float:left;
	margin:10px;
	margin-right:15px;
	width:15%;
}

#content {
	float:right;
	width:80%;
	
	 
	   
	 
}

#content_title {
 
 font-size:31px;
}

#content h1:first {
	 
	color:#FFF;
}

#content_title_space {
 padding-bottom:15px;
 clear:both;
  padding-top:15px;
}
.first_li {
 display:none;	
}
-->
</style>
<script type="text/javascript">

//var img_url = '<? print TEMPLATE_URL ?>/img/'

</script>
<link rel="shortcut icon" href="<?  print site_url('favicon.ico'); ?>">
<link rel="apple-touch-icon" href="<?  print site_url('favicon.ico'); ?>">
<script type="text/javascript">

  $(document).ready(function(){
   
  });

  </script>
</head>
<body>
<div id="logo"><a class="logo" href="<? print site_url(); ?>" ><img src="http://microweber.com/userfiles/templates/mw/img/logo.png"  border="0"/></a></div>
</div>


<div id="sidetree" style="margin-top:10px;">
<p>Documentation for Microweber <br />
<br />

<small><a href="#">Documentation home</a></small><br />
<small><a href="#">Main site</a></small></p>
  <div class="treeheader">&nbsp;</div>
  <div id="sidetreecontrol"> <a href="#">Collapse All</a> | <a href="#">Expand All</a> </div>
  <?php

 

if($params['from'] != false){
	$from  =$params['from'];
	
} else {
 $from  =option_get('from', $params['module_id']);
}


if(intval( $from) == 0){
	$par =  CI::model('content')->getParentPagesIdsForPageIdAndCache($page['id']);
$last =  end($par); // last

if($last == 0){
$from = 	$page['id'];
} else {
	
}

}

$from = 	0;



	?>
  <ul class="<? print $params['ul_class'] ?> first_item treeview" id="tree">
    <?
	if($params['thumbnail']): ?>
    <!--<li class="first_li"><a  <? if($from == PAGE_ID): ?> class="active" <? endif; ?>  href="<? print page_link($from);?>"><img src='<? print thumbnail($from, 'original');?>' ><? print page_title($from);?></a></li>-->
    <? else :  ?>
    <li class="first_li"><a href="<? print page_link($from);?>"><? print page_title($from);?></a></li>
    <? endif; ?>
    <?
	if($params['thumbnail']){
 CI::model('content')->content_helpers_getPagesAsUlTree($from , "<a href='{link}'   {removed_ids_code}  {active_code}  value='{id}' ><img src='{tn}' ><span>{content_title}</span></a>", array(PAGE_ID), 'class="active"', array($form_values['id']) , 'class="hidden"' , false, false, $params['ul_class'], 1 );
 
	} else {
		
		 CI::model('content')->content_helpers_getPagesAsUlTree($from , "<a href='{link}'   {removed_ids_code}  {active_code}  value='{id}' ><span>{content_title}</span></a>", array(PAGE_ID), 'class="active"', array($form_values['id']) , 'class="hidden"' , false, false, $params['ul_class'],1 );
	}

 ?>
  </ul>
</div>
