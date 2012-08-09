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
		$field_id = url_param('id', true);
		$field_type = url_param('type', true);

		if (trim($field_type) == '') {
			$field_type = 'text';
		}

		$field = make_field($field_id, $field_type, $settings);
		print $field;
		exit ;
	}

	function save_field() {

		$data = save_field($_POST);
		print($data);
		exit ;

	}

	function remove_field() {

		$data = remove_field($_POST['id']);
		//print($data);
		exit ;

	}

	function post_form() {

		save_form_data($_POST);

	}

}
