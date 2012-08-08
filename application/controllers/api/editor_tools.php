<?php

class editor_tools extends CI_Controller {

	function __construct() {

		parent::__construct();

		require_once (APPPATH . 'controllers/default_constructor.php');
		//p($user_session);
		//	require_once (APPPATH . 'controllers/api/default_constructor.php');

	}

	function index() {
		$tool = $this -> uri -> segment(2);
		$tool = str_replace('..', '', $tool);

		$p_index = INCLUDES_PATH . 'toolbar/editor_tools/index.php';
		$p_index = normalize_path($p_index, false);

		$p = INCLUDES_PATH . 'toolbar/editor_tools/' . $tool . '/index.php';
		$p = normalize_path($p, false);

		$layout = $this -> load -> file($p_index, true);

		if (is_file($p)) {
			$layout_tool = $this -> load -> file($p, true);
		} else {
			$layout_tool = 'Error: tool not found!';
		}

		$layout = str_replace('{content}', $layout_tool, $layout);

		$this -> output -> set_output($layout);

	}

	//var_dump ($content_filename_pre, $files );

}
