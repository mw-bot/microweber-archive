<?php

/**
 * make_field
 *
 * @desc make_field
 * @access      public
 * @category    forms
 * @author      Microweber
 * @link        http://microweber.com
 * @param string $field_type
 * @param string $field_id
 * @param array $settings
 */

function make_field($field_id = 0, $field_type = 'text', $settings = false) {
	$CI = get_instance();
	if (is_array($field_id)) {
		if (!empty($field_id)) {
			$data = $field_id;
		}

	} else {
		if ($field_id != 0) {

			print $field_id;

			$data = $CI -> core_model -> getById('table_custom_fields', $id = $field_id, $is_this_field = false);
			//p($data);
			//getById($table, $id = 0, $is_this_field = false)
			//exit('$field_id' . $field_id);
		}

	}

	if (is_array($data)) {
		if (!empty($data)) {

			$CI -> load -> vars(array('data' => $data));
			$field_type = $data['custom_field_type'];
		}

	}

	$dir = dirname(__FILE__);
	$dir = $dir . DS . 'custom_fields' . DS;
	$field_type = str_replace('..', '', $field_type);
	if ($settings == true) {
		$file = $dir . $field_type . '_settings.php';

	} else {
		$file = $dir . $field_type . '.php';

	}
	$CI -> load -> vars(array('data' => $data));

	$CI -> load -> vars($CI -> template);

	$layout = $CI -> load -> file($file, true);

	return $layout;

}

function save_field($data) {
	$id = user_id();
	if ($id == 0) {
		exit('Error: not logged in.');
	}
	$id = is_admin();
	if ($id == false) {
		exit('Error: not logged in as admin.');
	}

 
	$data =         	get_instance() -> core_model -> saveCustomField($data);

	return ($data);
	//exit
}




function remove_field($id) {
	$uid = user_id();
	if ($uid == 0) {
		exit('Error: not logged in.');
	}
	$uid = is_admin();
	if ($uid == false) {
		exit('Error: not logged in as admin.');
	}
$id = intval($id);
 $data =         	get_instance() -> core_model -> deleteCustomFieldById($id);

	return ($data);
 
 
  
 
	 
}
