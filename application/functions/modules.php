<?php

function load_module($module_name)
{
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

        if (is_dir($module_in_default_dir)) {
            $mod_d = $module_in_default_dir;
            $mod_d1 = normalize_path($mod_d, 1);
            $try_file1 = $mod_d1 . 'index.php';
        } elseif (is_file($module_in_default_file)) {
            $try_file1 = $module_in_default_file;
        }
    }
 //	p($try_file1);
    if ($try_file1 != false and is_file($try_file1)) {
        $config['url_to_module'] = $try_config_file;
        $config['path_to_module'] = normalize_path((dirname($config['url_to_module'])) . '/', true);
        $config['url_to_module'] = pathToURL(dirname($config['url_to_module'])) . '/';

        $config['path_to_module_front'] = normalize_path(str_ireplace('admin', '', $config['path_to_module']), true);
        $config['url_to_module_front'] = str_ireplace('admin', '', $config['url_to_module']);
        // p($config);
        // $CI-> template['config'] = $config;
        $CI->load->vars(array('config' => $config));
      //  p($module_file);
        // $module_file = $this->load->file ( $try_file1, true );

        $module_file = $CI->load->file($try_file1, true);
        // $try_file = MODULES_DIR . 'modules/' . $module_name . '.php';
        return $module_file;
    } else {
        return false;
    }
    // p($try_file);
}