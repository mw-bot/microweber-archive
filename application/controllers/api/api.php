<?php

class js extends CI_Controller {

	function __construct() {

		parent::__construct();

		require_once (APPPATH . 'controllers/default_constructor.php');
		//p($user_session);
		//	require_once (APPPATH . 'controllers/api/default_constructor.php');

	}

	function index() {
	}
	
	
	
	function css() {
		
		
		
	}
	
	
		function external_tools() {
		$tool = $this -> uri -> segment(2);
		$tool = str_replace('..', '', $tool);

		$p_index = INCLUDES_PATH . 'toolbar/editor_tools/index.php';
		$p_index = normalize_path($p_index, false);

       $p = INCLUDES_PATH . 'toolbar/editor_tools/'.$tool.'/index.php';
		$p = normalize_path($p, false);


		$primarycontent = get_instance()->load->file($p);
        	$layout = get_instance()->load->file($p_index);
p($p_index);
               p($layout,1);



	   //	$layout = str_replace('{content}', $primarycontent, $layout);



              // // print $layout;
               // exit;
   require_once ($p);

	}
	
	
	
}

