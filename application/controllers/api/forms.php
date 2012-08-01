<?php

class Forms extends CI_Controller {

	function __construct() {

		parent::__construct();

		require_once (APPPATH . 'controllers/default_constructor.php');
		//  require_once (APPPATH . 'controllers/api/default_constructor.php');

	}

	function index() {
		print 'forms api';
	}

	function make_field() {

		$settings = url_param('settings', true);

		$field = make_field($field_type = 'text', $field_id, $settings);
		print $field;
		exit ;
	}

	function save_field() {
		$id = user_id();
		if ($id == 0) {
			exit('Error: not logged in.');
		}
		$id = is_admin();
		if ($id == false) {
			exit('Error: not logged in as admin.');
		}

		$data = $_POST;
		$data =       	get_instance() -> core_model -> saveCustomField($data);

		print($data);
		exit ;
	}

}
