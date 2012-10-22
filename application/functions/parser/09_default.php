<?php
require_once (APPPATH . 'functions' . DIRECTORY_SEPARATOR . 'parser' . DIRECTORY_SEPARATOR . 'ganon.php');

$html = str_get_dom($layout);

foreach ($html('.edit') as $element) {
	$attrs = array();
	foreach ($element->attributes as $attribute => $value) {
		//echo $attribute, ' = ', $value, "<br>\n";
		$attrs[$attribute] = $value;
	}

	if (isset($attrs['id']) or isset($attrs['field'])) {

		if (isset($attrs['module'])) {
			$attrs['data-module'] = $attrs['module'];
		}

		if (isset($attrs['option_group'])) {
			$attrs['data-option_group'] = $attrs['option_group'];
		}

		if (isset($attrs['type'])) {
			$attrs['data-type'] = $attrs['type'];
		}

		if (isset($attrs['field'])) {
			$attrs['data-field'] = $attrs['field'];
		}

		if (!isset($attrs['data-option_group'])) {
			$attrs['data-option_group'] = false;
		}

		if (!isset($attrs['data-id'])) {
			$attrs['data-id'] = false;
		}

		if (!isset($attrs['data-module'])) {
			$attrs['data-module'] = false;
		}

		if (!isset($attrs['data-type'])) {
			$attrs['data-type'] = false;
		}
		if (!isset($attrs['type'])) {
			$attrs['type'] = false;
		}

		$name = $attrs['field'];

		if (strval($name) == '') {
			$name = $attrs['id'];
		}

		if (strval($name) == '') {
			$name = $attrs['data-field'];
		}
		$rel = false;
		if (isset($attrs['rel'])) {
			$rel = $attrs['rel'];
		}

		if ($rel == false) {
			$rel = 'page';
		}

		$option_group = $attrs['data-option_group'];
		if ($option_group == false) {
			$option_group = 'editable_region';
		}
		$data_id = $attrs['data-id'];

		$option_mod = $attrs['data-module'];
		if ($option_mod == false) {
			$option_mod = $attrs['data-type'];
		}
		if ($option_mod == false) {
			$option_mod = $attrs['type'];
		}

		$get_global = false;
		//  $rel = 'page';
		$field = $name;
		$use_id_as_field = $name;

		if ($rel == 'global') {
			$get_global = true;
		} else {
			$get_global = false;
		}

		if ($rel == 'module') {
			$get_global = true;
		}
		if ($get_global == false) {
			//  $rel = 'page';
		}
		if ($rel == 'content') {
			if ($data_id != false) {
				$data_id = intval($data_id);
				$data = get_content_by_id($data_id);
				$data['custom_fields'] = get_custom_fields_for_content($data_id, 0);
			}
		} else if ($rel == 'page') {
			$data = get_page(PAGE_ID);
			$data['custom_fields'] = get_custom_fields_for_content($data['id'], 0);
		} else if (isset($attr['post'])) {
			$data = get_post($attr['post']);
			if ($data == false) {
				$data = get_page($attr['post']);
				$data['custom_fields'] = get_custom_fields_for_content($data['id'], 0);
			}
		} else if (isset($attr['category'])) {
			$data = get_category($attr['category']);
		} else if (isset($attr['global'])) {
			$get_global = true;
		}
		$cf = false;
		$field_content = false;

		if ($get_global == true) {

			if ($option_mod != false) {
				//   d($field);

				$field_content = get_option($field, $option_group, $return_full = false, $orderby = false, $option_mod);
				//
			} else {
				$field_content = get_option($field, $option_group, $return_full = false, $orderby = false);
			}
		} else {

			if ($use_id_as_field != false) {
				if (isset($data[$use_id_as_field])) {
					$field_content = $data[$use_id_as_field];
				}
				if ($field_content == false) {
					if (isset($data['custom_fields'][$use_id_as_field])) {
						$field_content = $data['custom_fields'][$use_id_as_field];
					}
					// d($field_content);
				}
			}

			//  if ($field_content == false) {
			if (isset($data[$field])) {

				$field_content = $data[$field];
			}
			//}
		}

		if ($field_content == false and isset($data['custom_fields']) and !empty($data['custom_fields'])) {
			foreach ($data ['custom_fields'] as $kf => $vf) {

				if ($kf == $field) {

					$field_content = ($vf);
				}
			}
		}
		//d($field_content);

		//d($value1_tag_pos_last);
		//$start = $value1_tag_pos - strlen($value1_tag1);
		//$field_content1 = $value1_tag1 . '>' . $field_content . '</div>';
		//$layout = str_replace($value1, $field_content1, $layout);
		//$old = $element -> html();
		 $element -> setInnerText($field_content);

		//$layout = substr_replace($layout, $field_content1, $start, $value1_tag_pos_last);

		//$layout = str_replace($old, $field_content, $layout);

	}
	 $layout = $html;
	//echo $element -> class, "<br>\n";
}
$html = null;