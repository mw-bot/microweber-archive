<?php

class api extends CI_Controller {

	function __construct() {

		parent::__construct();

		require_once (APPPATH . 'controllers/default_constructor.php');
		//p($user_session);
		//	require_once (APPPATH . 'controllers/api/default_constructor.php');
		
		
		
		$url = url(true);
		$url_base = site_url('api');

		$try_file = str_replace($url_base, '', $url);
		$try_file = str_replace('..', '', $try_file);

		$f = INCLUDES_DIR . 'api' . DS . $try_file;
		$f = normalize_path($f, false);
		
		
		$ext = file_extension($f);
		if($ext == false){
			$ext = '.php';
			$f = $f.$ext;
		}
		
		include($f);
 

	}

	function index() {

		$url = url(true);
		$url_base = site_url('api');

		$try_file = str_replace($url_base, '', $url);
		$try_file = str_replace('..', '', $try_file);

		$f = INCLUDES_DIR . 'api' . DS . $try_file;
		$f = normalize_path($f, false);
		
		
		$ext = file_extension($f);
		if($ext == false){
			$ext = '.php';
			$f = $f.$ext;
		}
		
		//include($f);
 

		//$layout = $this -> load -> file($f, true);
		//$layout = $this -> content_model -> applyGlobalTemplateReplaceables($layout);

		//$this -> output -> set_output($layout);

	}

	function css() {

	}

}
