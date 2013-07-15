<?php

api_expose('mw/Notifications/delete');
api_expose('Notifications/save');
api_expose('Notifications/reset');


api_expose('CustomFields/remove_field');
api_expose('CustomFields/reorder_custom_fields');
api_expose('CustomFields/save_custom_field');
api_expose('CustomFields/make_custom_field');
class CustomFields
{

    static function get($table, $id = 0, $return_full = false, $field_for = false, $debug = false, $field_type = false, $for_session = false)
    {
        //defined in common.php
        return get_custom_fields($table, $id, $return_full, $field_for, $debug, $field_type, $for_session);
    }

    static function get_by_id($field_id)
    {

        if ($field_id != 0) {
            $data = db_get_id('table_custom_fields', $id = $field_id, $is_this_field = false);
            if (isset($data['options'])) {
                $data['options'] = decode_var($data['options']);
            }
            return $data;
        }
    }


    /*document_ready('test_document_ready_api');

     function test_document_ready_api($layout) {

     //   $layout = modify_html($layout, $selector = '.editor_wrapper', 'append', 'ivan');
     //$layout = modify_html2($layout, $selector = '<div class="editor_wrapper">', '');
     return $layout;
     }*/

    /**
     * make_custom_field
     *
     * @desc make_custom_field
     * @access      public
     * @category    forms
     * @author      Microweber
     * @link        http://microweber.com
     * @param string $field_type
     * @param string $field_id
     * @param array $settings
     */


    function custom_field_names_for_table($table)
    {
        $table = db_escape_string($table);
        $table1 = db_get_assoc_table_name($table);

        $table = MW_DB_TABLE_CUSTOM_FIELDS;
        $q = false;
        $results = false;

        $q = "SELECT *, count(id) as qty FROM $table where   custom_field_type IS NOT NULL and rel='{$table1}' and custom_field_name!='' group by custom_field_name, custom_field_type order by qty desc limit 100";
        //d($q);
        $crc = (crc32($q));

        $cache_id = __FUNCTION__ . '_' . $crc;

        $results = db_query($q, $cache_id, 'custom_fields/global');

        if (isarr($results)) {
            return $results;
        }

    }

    function make_default_custom_fields($rel, $rel_id, $fields_csv_str)
    {

        $id = is_admin();
        if ($id == false) {
            return false;
        }

        $function_cache_id = false;

        $args = func_get_args();

        foreach ($args as $k => $v) {

            $function_cache_id = $function_cache_id . serialize($k) . serialize($v);
        }

        $function_cache_id = __FUNCTION__ . crc32($function_cache_id);


        $is_made = get_option($function_cache_id, 'make_default_custom_fields');
        if ($is_made == 'yes') {
            return;
        }


        $table_custom_field = MW_TABLE_PREFIX . 'custom_fields';

        if (isset($rel)) {
            $rel = guess_table_name($rel);
            $rel_id = db_escape_string($rel_id);

            $fields_csv_str = explode(',', $fields_csv_str);
            $fields_csv_str = array_trim($fields_csv_str);
            //d($fields_csv_str);
            $pos = 0;
            if (isarr($fields_csv_str)) {
                foreach ($fields_csv_str as $field_type) {
                    $ex = get_custom_fields($rel, $rel_id, $return_full = 1, $field_for = false, $debug = 0, $field_type);

                    if (isarr($ex) == false) {
                        $make_field = array();
                        $make_field['rel'] = $rel;
                        $make_field['rel_id'] = $rel_id;
                        $make_field['position'] = $pos;
                        $make_field['custom_field_name'] = ucfirst($field_type);
                        $make_field['custom_field_type'] = $field_type;

                        save_custom_field($make_field);
                        $pos++;
                    }
                }


                $option = array();
                $option['option_value'] = 'yes';
                $option['option_key'] = $function_cache_id;
                $option['option_group'] = 'make_default_custom_fields';
                save_option($option);


            }

            //

        }


    }

    function make_custom_field($field_id = 0, $field_type = 'text', $settings = false)
    {
        $data = false;
        $form_data = array();
        if (is_array($field_id)) {

            if (!empty($field_id)) {
                $data = $field_id;
                return make_field($field_id, false, 'y');
            }
        } else {
            if ($field_id != 0) {

                return make_field($field_id);

                //
                // error('no permission to get data');
                //  $form_data = db_get_id('table_custom_fields', $id = $field_id, $is_this_field = false);
            }
        }
        //return make_field($field_id);
        /*
         if (isset($data) and is_array($data)) {
         if (!empty($data)) {
         if (isset($data['custom_field_type'])) {
         $field_type = $data['custom_field_type'];
         }
         if (isset($data['type'])) {
         $field_type = $data['type'];
         }
         }
         }

         if (isset($data['field_id'])) {
         $copy_from = $data['field_id'];
         if (is_admin() == true) {

         $table_custom_field = MW_TABLE_PREFIX . 'custom_fields';
         $form_data = db_get_id($table_custom_field, $id = $copy_from, $is_this_field = false);
         if (isset($form_data['custom_field_type'])) {
         $field_type = $data['type'] = $form_data['custom_field_type'];
         }
         //d($field_type);
         }
         // d($form_data);
         }

         if (isset($data['copy_from'])) {
         $copy_from = $data['copy_from'];
         if (is_admin() == true) {

         $table_custom_field = MW_TABLE_PREFIX . 'custom_fields';
         $form_data = db_get_id($table_custom_field, $id = $copy_from, $is_this_field = false);
         $field_type = $form_data['custom_field_type'];
         $form_data['id'] = 0;
         }
         //d($form_data);
         }
         $settings = false;
         if (isset($data['settings'])) {
         $settings = $data['settings'];
         }
         $dir = INCLUDES_DIR;
         $dir = $dir . DS . 'custom_fields' . DS;
         $field_type = str_replace('..', '', $field_type);
         // d($field_type);
         if ($settings == true) {
         $file = $dir . $field_type . '_settings.php';
         } else {
         $file = $dir . $field_type . '.php';
         }

         return make_field($form_data, false, $settings);

         define_constants();
         $l = new MwView($file);

         $l -> params = $data;
         $l -> data = $form_data;
         // var_dump($l);
         //$l->set($l);

         $l = $l -> __toString();
         // var_dump($l);
         $l = parse_micrwober_tags($l, $options = array('parse_only_vars' => 1));

         return $l;*/

    }

    function save_custom_field($data)
    {


        $id = user_id();
        if ($id == 0) {
            error('Error: not logged in.');
        }
        $id = is_admin();
        if ($id == false) {
            error('Error: not logged in as admin.' . __FILE__ . __LINE__);
        }
        $data_to_save = ($data);

        $table_custom_field = MW_TABLE_PREFIX . 'custom_fields';

        if (isset($data_to_save['for'])) {
            $data_to_save['rel'] = guess_table_name($data_to_save['for']);
        }
        if (isset($data_to_save['cf_id'])) {
            $data_to_save['id'] = intval($data_to_save['cf_id']);

            $table_custom_field = MW_TABLE_PREFIX . 'custom_fields';
            $form_data_from_id = db_get_id($table_custom_field, $data_to_save['id'], $is_this_field = false);
            if (isset($form_data_from_id['id'])) {
                if (!isset($data_to_save['rel'])) {
                    $data_to_save['rel'] = $form_data_from_id['rel'];
                }
                if (!isset($data_to_save['rel_id'])) {
                    $data_to_save['rel_id'] = $form_data_from_id['rel_id'];
                }

                if (isset($form_data_from_id['custom_field_type']) and $form_data_from_id['custom_field_type'] != '' and (!isset($data_to_save['custom_field_type']) or ($data_to_save['custom_field_type']) == '')) {
                    $data_to_save['custom_field_type'] = $form_data_from_id['custom_field_type'];
                }


            }


            if (isset($data_to_save['copy_rel_id'])) {

                $cp = db_copy_by_id($table_custom_field, $data_to_save['cf_id']);
                $data_to_save['id'] = $cp;
                $data_to_save['rel_id'] = $data_to_save['copy_rel_id'];
                //$data_to_save['id'] = intval($data_to_save['cf_id']);
            }

        }

        if (!isset($data_to_save['rel'])) {
            $data_to_save['rel'] = 'content';
        }
        $data_to_save['rel'] = db_get_assoc_table_name($data_to_save['rel']);
        if (!isset($data_to_save['rel_id'])) {
            $data_to_save['rel_id'] = '0';
        }
        if (isset($data['options'])) {
            $data_to_save['options'] = encode_var($data['options']);
        }

        $data_to_save['session_id'] = session_id();

// $data_to_save['debug'] = 1;
        if (!isset($data_to_save['custom_field_type']) or trim($data_to_save['custom_field_type']) == '') {

        } else {
            $save = save_data($table_custom_field, $data_to_save);
            cache_clean_group('custom_fields');

            return $save;
        }


        //exit
    }

    function reorder_custom_fields($data)
    {

        $adm = is_admin();
        if ($adm == false) {
            error('Error: not logged in as admin.' . __FILE__ . __LINE__);
        }

        $table = MW_TABLE_PREFIX . 'custom_fields';

        foreach ($data as $value) {
            if (is_arr($value)) {
                $indx = array();
                $i = 0;
                foreach ($value as $value2) {
                    $indx[$i] = $value2;
                    $i++;
                }

                db_update_position($table, $indx);
                return true;
                // d($indx);
            }
        }
    }

    function remove_field($id)
    {
        $uid = user_id();
        if ($uid == 0) {
            error('Error: not logged in.');
        }
        $uid = is_admin();
        if ($uid == false) {
            exit('Error: not logged in as admin.' . __FILE__ . __LINE__);
        }
        if (is_array($id)) {
            extract($id);
        } else {

        }

        $id = intval($id);
        if (isset($cf_id)) {
            $id = intval($cf_id);
        }

        if ($id == 0) {

            return false;
        }

        $custom_field_table = MW_TABLE_PREFIX . 'custom_fields';
        $q = "DELETE FROM $custom_field_table where id='$id'";

        db_q($q);

        cache_clean_group('custom_fields');

        return true;
    }

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
    function make_field($field_id = 0, $field_type = 'text', $settings = false)
    {

        if (is_array($field_id)) {
            if (!empty($field_id)) {
                $data = $field_id;
            }
        } else {
            if ($field_id != 0) {
                $data = db_get_id('table_custom_fields', $id = $field_id, $is_this_field = false);
            }
        }
        if (isset($data['settings']) or (isset($_REQUEST['settings']) and trim($_REQUEST['settings']) == 'y')) {

            $settings == true;
        }

        if (isset($data['copy_from'])) {
            $copy_from = intval($data['copy_from']);
            if (is_admin() == true) {

                $table_custom_field = MW_TABLE_PREFIX . 'custom_fields';
                $form_data = db_get_id($table_custom_field, $id = $copy_from, $is_this_field = false);
                if (is_arr($form_data)) {

                    $field_type = $form_data['custom_field_type'];
                    $data['id'] = 0;
                    if (isset($data['save_on_copy'])) {

                        $cp = $form_data;
                        $cp['id'] = 0;
                        $cp['copy_of_field'] = $copy_from;
                        if (isset($data['rel'])) {
                            $cp['rel'] = ($data['rel']);
                        }
                        if (isset($data['rel_id'])) {
                            $cp['rel_id'] = ($data['rel_id']);
                        }
                        save_custom_field($cp);
                        $data = $cp;
                    } else {
                        $data = $form_data;
                    }

                }

            }
            //d($form_data);
        } else if (isset($data['field_id'])) {

            $data = db_get_id('table_custom_fields', $id = $data['field_id'], $is_this_field = false);
        }

        if (isset($data['custom_field_type'])) {
            $field_type = $data['custom_field_type'];
        }

        if (!isset($data['custom_field_required'])) {
            $data['custom_field_required'] = 'n';
        }

        if (isset($data['type'])) {
            $field_type = $data['type'];
        }

        if (isset($data['field_type'])) {
            $field_type = $data['field_type'];
        }

        if (isset($data['field_values']) and !isset($data['custom_field_value'])) {
            $data['custom_field_values'] = $data['field_values'];
        }

        $data['custom_field_type'] = $field_type;

        if (isset($data['custom_field_value']) and strtolower($data['custom_field_value']) == 'array') {
            if (isset($data['custom_field_values']) and is_string($data['custom_field_values'])) {

                $try = base64_decode($data['custom_field_values']);

                if ($try != false and strlen($try) > 5) {
                    $data['custom_field_values'] = unserialize($try);
                }
            }
        }
        if (isset($data['options']) and is_string($data['options'])) {
            $data['options'] = decode_var($data['options']);

        }

        $data = replace_site_vars_back($data);


        $dir = INCLUDES_DIR;
        $dir = $dir . DS . 'custom_fields' . DS;
        $field_type = str_replace('..', '', $field_type);
        if ($settings == true or isset($data['settings'])) {
            $file = $dir . $field_type . '_settings.php';
        } else {
            $file = $dir . $field_type . '.php';
        }
        if (!is_file($file)) {
            $field_type = 'text';
            if ($settings == true or isset($data['settings'])) {
                $file = $dir . $field_type . '_settings.php';
            } else {
                $file = $dir . $field_type . '.php';
            }
        }

        if (is_file($file)) {
            $l = new MwView($file);
            //
            $l->settings = $settings;

            if (isset($data) and !empty($data)) {
                $l->data = $data;
            } else {
                $l->data = array();
            }

            $layout = $l->__toString();

            return $layout;
        }
    }
}