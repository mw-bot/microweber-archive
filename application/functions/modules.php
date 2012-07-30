<?php

function get_modules($options = false) {
	//p($options);
	$args = func_get_args();

	foreach ($args as $k => $v) {

		$function_cache_id = $function_cache_id . serialize($k) . serialize($v);

	}

	$cache_id = $function_cache_id = __FUNCTION__ . crc32($function_cache_id);

	$cache_group = 'modules/';

	$cache_content = cache_get_content($cache_id, $cache_group);

	if (($cache_content) != false) {

		return $cache_content;

	}

	$dir_name = normalize_path(MODULES_DIR);
	$dir = rglob('*config.php', 0, $dir_name);

	if (!empty($dir)) {
		$configs = array();
		foreach ($dir as $key => $value) {
			$skip_module = false;
			if ($options['skip_admin'] == true) {
				//p($value);
				if (strstr($value, 'admin')) {
					$skip_module = true;
				}
			}

			if ($skip_module == false) {

				$config = array();
				$value = normalize_path($value, false);
				$value_fn = $mod_name = str_replace('_config.php', '', $value);
				$value_fn = $mod_name = str_replace('config.php', '', $value_fn);
				$value_fn = $mod_name = str_replace('index.php', '', $value_fn);
				$value_fn = str_replace($dir_name, '', $value_fn);

				$value_fn = reduce_double_slashes($value_fn);
				//p($value);
				$try_icon = $mod_name . '.png';
				$def_icon = MODULES_DIR . 'default.png';
				include ($value);
				$config['module'] = $value_fn . '';
				$config['module_base'] = str_replace('admin/', '', $value_fn);

				if (is_file($try_icon)) {
					//p($try_icon);
					$config['icon'] = pathToURL($try_icon);
				} else {
					$config['icon'] = pathToURL($def_icon);

				}

				$mmd5 = crc32($config['module']);
				$check_if_uninstalled = MODULES_DIR . '_system/' . $mmd5 . '.php';
				if (is_file($check_if_uninstalled)) {
					$config['uninstalled'] = true;
					$config['installed'] = false;
				} else {
					$config['uninstalled'] = false;
					$config['installed'] = true;
				}

				if ($options['ui'] == true) {
					if ($config['ui'] == false) {
						$skip_module = true;
					}
				}

				if ($skip_module == false) {
					$configs[] = $config;
				}
			}

			//p ( $value );
		}
		$this -> core_model -> cacheWriteAndEncode($configs, $function_cache_id, $cache_group);

		return $configs;
	}

}

function load_module($module_name) {
	$function_cache_id = false;
	$args = func_get_args();
	foreach ($args as $k => $v) {
		$function_cache_id = $function_cache_id . serialize($k) . serialize($v);
	}
	$function_cache_id = __FUNCTION__ . crc32($function_cache_id);
	$cache_content = CACHE_LOAD_MODULE_ . $function_cache_id;

	if (!defined($cache_content)) {
	} else {

		//p((constant($cache_content)));
		return (constant($cache_content));

	}

	global $CI;
	// $CI = get_instance();
	$module_name = trim($module_name);
	$module_name = str_replace('\\', '/', $module_name);
	$module_name = str_replace('..', '', $module_name);
	// prevent hack of the directory
	$module_name = reduce_double_slashes($module_name);

	$module_in_template_dir = ACTIVE_TEMPLATE_DIR . 'modules/' . $module_name . '';
	$module_in_template_dir = normalize_path($module_in_template_dir, 1);
	$module_in_template_file = ACTIVE_TEMPLATE_DIR . 'modules/' . $module_name . '.php';
	$module_in_template_file = normalize_path($module_in_template_file, false);

	$try_file1 = false;
	if (is_dir($module_in_template_dir)) {
		$mod_d = $module_in_template_dir;
		$mod_d1 = normalize_path($mod_d, 1);
		$try_file1 = $mod_d1 . 'index.php';
	} elseif (is_file($module_in_template_file)) {
		$try_file1 = $module_in_template_file;
	} else {

		$module_in_default_dir = MODULES_DIR . $module_name . '';
		$module_in_default_dir = normalize_path($module_in_default_dir, 1);
		$module_in_default_file = MODULES_DIR . $module_name . '.php';
		$module_in_default_file = normalize_path($module_in_default_file, false);

		//	var_dump($module_in_default_file);

		if (is_dir($module_in_default_dir)) {
			$mod_d = $module_in_default_dir;
			$mod_d1 = normalize_path($mod_d, 1);
			$try_file1 = $mod_d1 . 'index.php';
		} elseif (is_file($module_in_default_file)) {
			$try_file1 = $module_in_default_file;
		}
	}
	//
	if ($try_file1 != false and is_file($try_file1)) {
		$config['url_to_module'] = $try_config_file;
		$config['path_to_module'] = normalize_path((dirname($config['url_to_module'])) . '/', true);
		$config['url_to_module'] = pathToURL(dirname($config['url_to_module'])) . '/';

		$config['path_to_module_front'] = normalize_path(str_ireplace('admin', '', $config['path_to_module']), true);
		$config['url_to_module_front'] = str_ireplace('admin', '', $config['url_to_module']);
		// p($config);
		// $CI-> template['config'] = $config;
		$CI -> load -> vars(array('config' => $config));
		//  p($module_file);
		// $module_file = $this->load->file ( $try_file1, true );

		$module_file = $CI -> load -> file($try_file1, true);

		if (!defined($cache_content)) {
			define($cache_content, $module_file);
		}

		// $try_file = MODULES_DIR . 'modules/' . $module_name . '.php';
		return $module_file;
	} else {
		define($cache_content, FALSE);

		return false;
	}
	// p($try_file);
}
