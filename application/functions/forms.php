<?php

/**
 * make_field
 *
 * @desc make_field
 * @access      public
 * @category    forms
 * @author      Microweber
 * @link        http://microweber.com
 * @param $for - use this patameter when you want to get votes for something else than posts.
 */

function make_field($field_type = 'text', $field_id = 0, $settings = false) {

	if ($field_id != 0) {
		exit('$field_id' . $field_id);
	}

	$dir = dirname(__FILE__);
	$dir = $dir . DS . 'custom_fields' . DS;
	$field_type = str_replace('..', '', $field_type);
	if ($settings == 'y') {
		  	$file = $dir . $field_type . '_settings.php';
		  
	} else {
			$file = $dir . $field_type . '.php';
		
	}



	$CI = get_instance();
	$CI -> load -> vars($CI -> template);

	$layout = $CI -> load -> file($file, true);

	return $layout;

}

function save_field($id, $data) {

}
