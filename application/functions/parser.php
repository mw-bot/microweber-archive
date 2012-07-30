<?php
include_once ('parser/phpQuery.php');
$mw_replace_script_num = 1;

function mw_replace_script_back($match) {
	var_dump($mw_replace_script_num);

	p($mw_replace_script_num);
	$m = $match[0];
	$m = str_replace('<mwscript ', '<script ', $m);
	//$layout = str_replace('</mw-script', '</script', $layout);

	$content = $mw_script_matches[$mw_replace_script_num];
	$mw_replace_script_num = $mw_replace_script_num++;

	p($content);
	return $match[0];

	if (stripos($match[0], 'example.org/') !== false) {

		///return $match[0];
	} else {
		//return 'http://proxy.com/?u=' . urlencode($match[0]);
	}

}

/**
 * Parses the microweber tags from the $layout back to html content.
 *
 * @param string $layout
 * @param array $options $options['no_doctype_strip']  = false //if true will not remove the doctype
 * @return string $layout
 */
/**
 * parse_micrwober_tags()
 *
 * @param string $layout
 * @param array $options
 * @return
 */
function parse_micrwober_tags($layout, $options = false) {

	$layout = str_replace('<mw ', '<module ', $layout);
	$layout = str_replace('<editable ', '<div class="edit" ', $layout);
	$layout = str_replace('</editable>', '</div>', $layout);

	$layout = str_replace('<microweber module=', '<module data-type=', $layout);
	$layout = str_replace('</microweber>', '', $layout);

	//$layout = preg_match_all('#<script(.*?)>(.*?)</script>#is', '', $layout);
	$script_pattern = "/<script[^>]*>(.*)<\/script>/Uis";

	$replaced_scripts = array();
	//$layout = preg_replace('/<script(?:(?!<\/script>).)*<\/script>/s','',$layout);

	preg_match_all($script_pattern, $layout, $mw_script_matches);

	if (!empty($mw_script_matches)) {
		foreach ($mw_script_matches[0] as $key => $value) {
			if ($value != '') {
				$v1 = md5($value);
				 $layout = str_replace($value, $v1, $layout);
				//$layout = str_replace_count($value, $v1, $layout,1);
				$replaced_scripts[$v1] = $value;
				//	p($value);

			}
		}
	}

	//  var_dump($mw_script_matches);

	//$layout = str_replace('<script ', '<TEXTAREA ', $layout);
	// $layout = str_replace('</script', '</TEXTAREA', $layout);

	$pq = phpQuery::newDocument($layout);
 

	$els = $pq['.edit'];
	//$els = pq('body')->find('.edit')->filter(':not(script)');

	foreach ($els as $elem) {
		// iteration returns PLAIN dom nodes, NOT phpQuery objects
		$tagName = $elem -> tagName;
		$name = pq($elem) -> attr('field');

		if (strval($name) == '') {
			$name = pq($elem) -> attr('id');
		}

		if (strval($name) == '') {
			$name = pq($elem) -> attr('data-field');
		}

		$rel = pq($elem) -> attr('rel');
		if ($rel == false) {
			$rel = 'page';
		}

		$get_global = false;
		$rel = 'page';
		$field = $name;
		$use_id_as_field = $name;

		if ($rel == 'global') {
			$get_global = true;
		} else {
			$get_global = false;
		}

		if ($rel == 'page') {
			$data = get_page(PAGE_ID);
		} else if ($attr['post']) {
			$data = get_post($attr['post']);
			if ($data == false) {
				$data = get_page($attr['post']);
			}
		} else if ($attr['category']) {
			$data = get_category($attr['category']);
		} else if ($attr['global']) {
			$get_global = true;
		}

		$cf = false;
		$field_content = false;

		if ($get_global == true) {
			$field_content = $CI -> core_model -> optionsGetByKey($field, $return_full = false, $orderby = false);
		} else {
			if ($use_id_as_field != false) {
				$field_content = $data[$use_id_as_field];

				if ($field_content == false) {
					$field_content = $data['custom_fields'][$use_id_as_field];
				}
			}

			if ($field_content == false) {
				$field_content = $data[$field];
			}

			if ($field_content == false) {
				$field_content = $data['custom_fields'][$field];
			}
		}

		if ($field_content != false and $field_content != '') {
			$field_content = html_entity_decode($field_content, ENT_COMPAT, "UTF-8");

			$field_content = parse_micrwober_tags($field_content);
			pq($elem) -> html($field_content);

		} else {
		}
	}

	/*
	 foreach($pq['mw'] as $elem) {
	 $name = pq($elem)->attr('module');

	 $attributes = array();
	 $ats = $elem->attributes;
	 $module_html = "<module ";
	 if (!empty($ats)) {
	 foreach($ats as $attribute_name => $attribute_node) {
	 $v = $attribute_node->nodeValue;
	 $module_html .= " {$attribute_name}='{$v}'  ";
	 }
	 }
	 $module_html. ' />';
	 pq($elem)->replaceWith($module_html) ;
	 }
	 */
	$els = $pq['module'];
	//$els = pq('module')->filter(':not(script)');

	foreach ($els as $elem) {
		$name = pq($elem) -> attr('module');

		$attrs = $elem -> attributes;

		$z = 0;
		foreach ($attrs as $attribute_node) {
			$nn = $attribute_node -> nodeName;
			$v = $nv = $attribute_node -> nodeValue;

			if ($z == 0) {
				$module_name = $nn;
			} else {
			}
			$mod_attributes[$nn] = $nv;
			if ($nn == 'module') {
				$module_name = $nv;
			}

			if ($nn == 'type') {
				$module_name = $nv;
			}

			if ($nn == 'data-type') {
				$module_name = $nv;
			}

			if ($nn == 'data-module') {
				$module_name = $nv;
			}

			$z++;
		}

		//
		$mod_content = load_module($module_name, $attrs);
		$mod_content = parse_micrwober_tags($mod_content);
		if ($mod_content != false) {

			$module_html = "<div class='module' ";
			if (!empty($attrs)) {
				foreach ($attrs as $attribute_name => $attribute_node) {
					$v = $attribute_node -> nodeValue;
					$module_html .= " {$attribute_name}='{$v}'  ";
				}
			}
			$module_html .= '>' . $mod_content . '</div>';
			pq($elem) -> replaceWith($module_html);

		}

	}

	if ($options['mw_embed']) {
		$em = trim($options['mw_embed']);
		if ($em != '') {
			foreach ($pq['#'.$em] as $elem) {
				pq($elem) -> parents('body') -> replaceWith($elem);

			}
		}

	}
	//$layout = $pq;
	//$layout = str_replace('<mw-script ', '<script ', $layout);
	//$layout = str_replace('</mw-script', '</script', $layout);
	//.$layout = html_entity_decode($layout, ENT_NOQUOTES, "UTF-8");

	// if (!empty($scripts)) {
	// if(!empty($mw_script_matches)){
	// $mw_script_matches = $mw_script_matches[0];
	// }
	//
	//

	$layout = $pq -> htmlOuter();

	if (!empty($replaced_scripts)) {
		foreach ($replaced_scripts as $key => $value) {
			if ($value != '') {

				$layout = str_replace($key, $value, $layout);

			}
		}
	}

	return $layout;
	exit ;

}

function make_microweber_tags($layout) {
	if ($layout == '') {
		return $layout;

	}

	$pq = phpQuery::newDocument($layout);
	// print first list outer HTML
	// $edit_fields =  $pq['.edit'];
	foreach ($pq['.module'] as $elem) {
		$name = pq($elem) -> attr('module');

		$attrs = $elem -> attributes;

		$module_html = "<module ";
		if (!empty($attrs)) {
			foreach ($attrs as $attribute_name => $attribute_node) {
				$v = $attribute_node -> nodeValue;
				$module_html .= " {$attribute_name}='{$v}'  ";
			}
		}
		$module_html .= ' />';
		pq($elem) -> replaceWith($module_html);

	}

	return $pq -> htmlOuter();

	 
}

 

function replace_in_long_text($sRegExpPattern, $sRegExpReplacement, $sVeryLongText, $normal_replace = false) {
	$function_cache_id = false;

	$test_for_long = strlen($sVeryLongText);
	if ($test_for_long > 1000) {
		$args = func_get_args();
		$i = 0;
		foreach ($args as $k => $v) {
			if ($i != 2) {
				$function_cache_id = $function_cache_id . serialize($k) . serialize($v);
			} else {
			}
			$i++;
		}

		$function_cache_id = __FUNCTION__ . md5($sVeryLongText) . md5($function_cache_id);

		$cache_group = 'extract_tags';
		// $cache_content = $this->cacheGetContent ( $function_cache_id, $cache_group );
		if (($cache_content) != false) {
			// return $cache_content;
		}
	}

	if ($normal_replace == false) {
		$iSet = 0;
		// Count how many times we increase the limit
		while ($iSet < 10) {// If the default limit is 100'000 characters
			// the highest new limit will be 250'000
			// characters
			$sNewText = preg_replace($sRegExpPattern, $sRegExpReplacement, $sVeryLongText);
			// Try
			// to
			// use
			// PREG
			if (preg_last_error() == PREG_BACKTRACK_LIMIT_ERROR) {// Only
				// check on
				// backtrack
				// limit
				// failure
				ini_set('pcre.backtrack_limit', ( int ) ini_get('pcre.backtrack_limit') + 15000);
				// Get
				// current
				// limit
				// and
				// increase
				$iSet++;
				// Do not overkill the server
			} else {// No fail
				$sVeryLongText = $sNewText;
				// On failure $sNewText would be NULL
				break;
				// Exit loop
			}
		}
	} else {
		$sNewText = str_replace($sRegExpPattern, $sRegExpReplacement, $sVeryLongText);
		// $sNewText = preg_replace($sRegExpPattern,$sRegExpReplacement,
		// $sVeryLongText);
	}

	return $sNewText;
}

function parse_memory_storage($id = false, $content = false) {
	static $parse_mem = array();
	$path_md = ($id);
	// p($parse_mem);
	if ($parse_mem[$path_md] != false) {
		return $parse_mem[$path_md];
	}

	if ($content != false) {
		$parse_mem[$path_md] = $content;
		return $content;
	}
}
 
