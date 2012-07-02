<?php

class Forms extends CI_Controller {

	function __construct() {

		parent::__construct();

		require_once (APPPATH . 'controllers/default_constructor.php');
		//  require_once (APPPATH . 'controllers/api/default_constructor.php');

	}

	function index() {
		phpinfo();
	}

	function make_field() {

		$settings = url_param('settings', true);

		$field = make_field($field_type = 'text', $field_id, $settings);
		print $field;
		exit ;
	}




	function save_field() {

 
		p($_REQUEST);
		exit ;
	}


	function load_custom_fields() {

		$Form = new Form();
		echo $Form -> init('test.php', 'post', array('class' => 'form-horizontal well')) -> head('Test') -> group('Test', new Text( array('name' => 'username', 'id' => 'username', 'placeholder' => 'username')), new Password( array('placeholder' => 'password', 'class' => 'span2')), new Help('test')) -> group('Hello', new Text( array('append' => '@')), new Help('blah')) -> group('Goodbye', new Password( array('prepend' => '$'))) -> group('Checkboxes!', new Checkbox('hi!'), new Checkbox('another!'), new Checkbox('last')) -> group('Radios', new Radio('1', array('name' => 'r1', 'checked' => true)), new Radio('2', array('name' => 'r1'))) -> group('Inline Checkboxes', new Checkbox('1', array(), true), new Checkbox('2', array(), true), new Checkbox('3', array(), true)) -> group('Inline Radios', new Radio('1', array('name' => 'r2'), true), new Radio('2', array('name' => 'r2'), true), new Radio('3', array('name' => 'r2'), true)) -> group('Dropdown', new Dropdown( array('1' => 1, '2' => 2), '2', array('autocomplete' => false)), new Help('help')) -> group('File', new File()) -> actions(new Submit(), new Reset()) -> render();

		$BD = new ButtonDropdown('User', array( array('id1', 'pencil', 'Edit'), array('id2', 'headphones', 'Listen')));
		echo $BD -> render();

		$BG = new ButtonGroup(new BGButton('signal', array('id' => 'test')), new BGButton('repeat'));

		echo $BG -> render();

	}

}
