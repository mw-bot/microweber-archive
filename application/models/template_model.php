<?php

class Template_model extends CI_Model {
	public static $parse_memory = array();
	function __construct() {
		parent::__construct();

		//	$this->content_model->define_vars ();

	}

	function addTransparentBackgroudToFlash($layout) {
		if (strstr($layout, '<object') == true) {

			$relations = array();
			$tags = $this -> core_model -> extractTags($layout, 'object', $selfclosing = false, $return_the_entire_tag = true, $charset = 'UTF-8');
			// p($tags);
			$matches = $tags;
			if (!empty($matches)) {
				//
				foreach ($matches as $m) {
					$full = $m['full_tag'];

					if (strstr($full, 'wmode') == false) {

						$tag = '<param name="wmode" value="transparent"></object>';

						$full = str_ireplace('</object>', $tag, $full);

						$layout = str_replace_count($m['full_tag'], $full, $layout, 1);
					}

				}
			}

		}

		if (strstr($layout, '<embed') == true) {

			$relations = array();
			$tags = $this -> core_model -> extractTags($layout, 'embed', $selfclosing = true, $return_the_entire_tag = true, $charset = 'UTF-8');

			$matches = $tags;
			if (!empty($matches)) {
				//
				foreach ($matches as $m) {
					$full = $m['full_tag'];

					if (strstr($full, 'wmode') == false) {

						$tag = '<embed wmode="transparent" ';

						$full = str_ireplace('<embed', $tag, $full);

						$layout = str_replace_count($m['full_tag'], $full, $layout, 1);
					}

				}
			}

			$tags = $this -> core_model -> extractTags($layout, 'embed', $selfclosing = false, $return_the_entire_tag = true, $charset = 'UTF-8');

			$matches = $tags;
			if (!empty($matches)) {
				//
				foreach ($matches as $m) {
					$full = $m['full_tag'];

					if (strstr($full, 'wmode') == false) {

						$tag = '<embed wmode="transparent" ';

						$full = str_ireplace('<embed', $tag, $full);

						$layout = str_replace_count($m['full_tag'], $full, $layout, 1);
					}

				}
			}

		}

		return $layout;
	}

	function replaceTemplateTags($layout) {
		// moved to content model
		// @todo cleaup here

		$html = $this -> content_model -> applyGlobalTemplateReplaceables($layout);

		return $html;
	}

	function layoutGet($filename) {
		$the_active_site_template = $this -> core_model -> optionsGetByKey('curent_template');
		$path = TEMPLATEFILES . '' . $the_active_site_template . '/layouts/';
		$layout_path = $path;
		//$file = @file_get_contents ( $layout_path. $filename );
		$file = $this -> load -> file($layout_path . $filename, true);
		return $file;
	}

	function layoutGetConfig($filename, $template = false) {
		if (trim($template) == '' or strtolower($template) == 'default') {
			$the_active_site_template = $this -> core_model -> optionsGetByKey('curent_template');
		} else {

			$the_active_site_template = $template;
		}
		$path = TEMPLATEFILES . '' . $the_active_site_template . '/layouts/';
		$layout_path = $path;
		//$file = @file_get_contents ( $layout_path. $filename );

		$try = $layout_path . $filename;
		$try1 = str_ireplace('.php', '.png', $try);
		$screensshot_file = $try1;
		$screensshot_file = normalize_path($screensshot_file, false);
		//p($screensshot_file);

		$try = str_ireplace('.php', '_config.php', $try);
		if (is_file($try)) {
			include ($try);

			//$file = $this->load->file ( $try, true );
		} else {
			$try = $layout_path . $filename;
			$try = dirname($try);
			$try = $try . DIRECTORY_SEPARATOR . 'config.php';
			if (is_file($try)) {
				include ($try);

				//$file = $this->load->file ( $try, true );
			}
		}
		//p ( $try );
		//	p($screensshot_file);
		if (is_file($screensshot_file)) {
			$config['screenshot'] = pathToURL($screensshot_file);
		}

		return $config;
	}

	/**
	 * @desc  Get the template layouts info under the layouts subdir on your active template
	 * @param $options
	 * $options ['type'] - 'layout' is the default type if you dont define any. You can define your own types as post/form, etc in the layout.txt file
	 * @return array
	 * @author	Microweber Dev Team
	 * @since Version 1.0
	 */
	function templatesList($options = false) {

		$args = func_get_args();

		foreach ($args as $k => $v) {

			$function_cache_id = $function_cache_id . serialize($k) . serialize($v);

		}

		$cache_id = $function_cache_id = __FUNCTION__ . crc32($function_cache_id);

		$cache_group = 'templates';

		$cache_content = cache_get_content($cache_id, $cache_group);

		if (($cache_content) != false) {

			return $cache_content;

		}

		$this -> load -> helper('directory');
		//$path = BASEPATH . 'content/templates/';

		$path = TEMPLATEFILES;
		$path_to_layouts = $path;
		$layout_path = $path;
		//	print $path;
		//exit;

		//$map = directory_map ( $path, TRUE );
		$map = directory_map($path, TRUE, TRUE);
		//var_dump ( $map );
		$to_return = array();

		foreach ($map as $dir) {

			//$filename = $path . $dir . DIRECTORY_SEPARATOR . 'layout.php';
			$filename = $path . DIRECTORY_SEPARATOR . $dir;
			$filename_location = false;
			$filename_dir = false;
			$filename = normalize_path($filename);
			$filename = rtrim($filename, '\\');
			//p ( $filename );
			if (is_dir($filename)) {
				//
				$fn1 = normalize_path($filename, true) . 'config.php';
				$fn2 = normalize_path($filename);

				//  p ( $fn1 );

				if (is_file($fn1)) {
					$config = false;

					include ($fn1);
					if (!empty($config)) {
						$c = $config;
						$c['dir_name'] = $dir;

						$screensshot_file = $fn2 . '/screenshot.png';
						$screensshot_file = normalize_path($screensshot_file, false);
						//p($screensshot_file);
						if (is_file($screensshot_file)) {
							$c['screenshot'] = pathToURL($screensshot_file);
						}

						$to_return[] = $c;
					}

				} else {
					$filename_dir = false;
				}

				//	$path = $filename;
			}

			//p($filename);

		}
		$this -> core_model -> cacheWriteAndEncode($to_return, $function_cache_id, $cache_group);

		return $to_return;
	}

	/**
	 * @desc  Get the template layouts info under the layouts subdir on your active template
	 * @param $options
	 * $options ['type'] - 'layout' is the default type if you dont define any. You can define your own types as post/form, etc in the layout.txt file
	 * @return array
	 * @author	Microweber Dev Team
	 * @since Version 1.0
	 */
	function layoutsList($options = false) {

		$args = func_get_args();

		foreach ($args as $k => $v) {

			$function_cache_id = $function_cache_id . serialize($k) . serialize($v);

		}

		$cache_id = $function_cache_id = __FUNCTION__ . crc32($function_cache_id);

		$cache_group = 'templates';

		$cache_content = cache_get_content($cache_id, $cache_group);

		if (($cache_content) != false) {

			return $cache_content;

		}

		$this -> load -> helper('directory');
		//$path = BASEPATH . 'content/templates/';

		if ($options['site_template'] and (strtolower($options['site_template']) != 'default')) {
			$tmpl = trim($options['site_template']);
			$check_dir = TEMPLATEFILES . '' . $tmpl . '/layouts/';
			if (is_dir($check_dir)) {
				$the_active_site_template = $tmpl;
			} else {
				$the_active_site_template = $this -> core_model -> optionsGetByKey('curent_template');

			}

		} else {
			$the_active_site_template = $this -> core_model -> optionsGetByKey('curent_template');

		}

		$path = TEMPLATEFILES . '' . $the_active_site_template . '/layouts/';
		$path_to_layouts = $path;
		$layout_path = $path;
		//	print $path;
		//exit;

		//$map = directory_map ( $path, TRUE );
		$map = directory_map($path, TRUE, TRUE);
		//var_dump($map);
		$to_return = array();

		foreach ($map as $dir) {

			//$filename = $path . $dir . DIRECTORY_SEPARATOR . 'layout.php';
			$filename = $path . $dir;
			$filename_location = false;
			$filename_dir = false;
			$filename = normalize_path($filename);
			$filename = rtrim($filename, '\\');
			//p ( $filename );
			if (is_dir($filename)) {
				//
				$fn1 = normalize_path($filename) . 'index.php';
				$fn2 = normalize_path($filename);

				//  p ( $fn1 );

				$default_config_location = false;
				$default_config_location_full_path = false;
				if (is_file($fn1)) {
					$filename = $fn1;
					$filename_dir = $dir;
					$filename_location = $dir . '/index.php';

					$default_config_location = normalize_path($fn2);
					$default_config_location2 = $default_config_location;
					//$default_config_location = rtrim ( $default_config_location, '\\' );

					$default_config_location_full_path = $default_config_location . 'config.php';
					if (is_file($default_config_location_full_path)) {
						$default_config_location = $dir . '/config.php';
					}

					$default_custom_fields = $default_config_location2 . 'custom_fields.php';
					//p($default_custom_fields);
					if (is_file($default_custom_fields)) {
						$default_custom_fields = $default_custom_fields;
					} else {
						$default_custom_fields = false;
					}

				} else {
					$filename_dir = false;
				}

				//	$path = $filename;
			}
			//p($filename);
			if (is_file($filename)) {

				$ext = file_extension($filename);
				if ($ext == 'php') {

					$filename_no_ext = $file = basename($filename, "." . $ext);
					//	$txt_file = $path . $dir . DIRECTORY_SEPARATOR . $filename_no_ext . '.txt';
					//	$the_file = str_replace($path_to_layouts, '',$filename );;

					//if (is_file ( $txt_file )) {
					$fin = cache_file_memory_storage($filename);
					if (preg_match('/type:.+/', $fin, $regs)) {
						$result = $regs[0];
						$result = str_ireplace('type:', '', $result);
						$to_return_temp['type'] = trim($result);
					}

					if ($options['type'] == '') {
						$options['type'] = 'layout';
					}
					if (strtolower($to_return_temp['type']) == strtolower($options['type'])) {
						$to_return_temp = array();

						//$to_return_temp ['dir'] = trim ( $dir );
						if (preg_match('/description:.+/', $fin, $regs)) {
							$result = $regs[0];
							$result = str_ireplace('description:', '', $result);
							$to_return_temp['description'] = trim($result);
						}
						if (preg_match('/name:.+/', $fin, $regs)) {
							$result = $regs[0];
							$result = str_ireplace('name:', '', $result);
							$to_return_temp['name'] = trim($result);
						}

						if (preg_match('/content_type:.+/', $fin, $regs)) {
							$result = $regs[0];
							$result = str_ireplace('content_type:', '', $result);
							$to_return_temp['content_type'] = trim($result);
						}
						$screensshot_file = $path . $filename_dir . DIRECTORY_SEPARATOR . $filename_no_ext . '.png';
						$screensshot_file = normalize_path($screensshot_file, false);
						//p($screensshot_file);
						if (is_file($screensshot_file)) {
							$to_return_temp['screenshot'] = pathToURL($screensshot_file);
						}
						if ($filename_dir != false) {
							$to_return_temp['layout_name'] = $filename_dir;
						}
						if ($filename_location == false) {

							$to_return_temp['filename'] = $dir;
						} else {
							$to_return_temp['filename'] = $filename_location;

							if ($default_config_location_full_path != false) {
								if (is_file($default_config_location_full_path)) {
									include ($default_config_location_full_path);
									$to_return_temp['config'] = ($config);
									$to_return_temp['params'] = ($config['params']);

								}

								if ($default_custom_fields != false) {

									include ($default_custom_fields);
									$to_return_temp['custom_fields'] = ($custom_fields);

									//p($custom_fields);
								}
							}

						}

						//$screens_dir = $path . $dir . DIRECTORY_SEPARATOR . 'screenshots' . DIRECTORY_SEPARATOR;
						//p($screens_dir);
						/*if (is_dir ( $screens_dir )) {
						 $screens_dir = array_filter ( glob ( $screens_dir . '*.jpg' ), 'is_file' );
						 //$screens_dir = readDirIntoArray($screens_dir, 'files');
						 //var_dump($screens_dir);
						 if (! empty ( $screens_dir )) {
						 $screenshots = array ();
						 foreach ( $screens_dir as $screens_file ) {
						 $screens_file = pathToURL ( $screens_file );
						 $screenshots [] = ($screens_file);
						 }
						 $to_return_temp ['screenshots'] = $screenshots;
						 }
						 }*/
						//p ( $to_return_temp );
						$to_return[] = $to_return_temp;
					}

					//}
				}
			}

		}
		$this -> core_model -> cacheWriteAndEncode($to_return, $function_cache_id, $cache_group);

		return $to_return;
	}

	/**
	 * @desc  Get the template layouts html by dir name
	 * @param string dir name under the layouts subdir on your active template
	 * @return string
	 * @author	Microweber Dev Team
	 * @version 1.0
	 * @since Version 1.0
	 */
	function layoutGetHTMLByDirName($layout_name) {
		$this -> load -> helper('directory');
		//$path = BASEPATH . 'content/templates/';
		$the_active_site_template = $this -> core_model -> optionsGetByKey('curent_template');
		$path = TEMPLATEFILES . '' . $the_active_site_template . '/layouts/';
		//	print $path;
		//exit;

		$filename = $path . $layout_name . DIRECTORY_SEPARATOR . 'layout.php';
		if (is_file($filename)) {
			$html = cache_file_memory_storage($filename);
			if ($html != '') {
				require_once 'htmlsql-v0.5/htmlsql.class.php';
				require_once ("htmlsql-v0.5/snoopy.class.php");

				$wsql = new htmlsql();

				// connect to a string
				if (!$wsql -> connect('string', $html)) {
					print 'Error while connecting: ' . $wsql -> error;
					exit();
				}

				if (!$wsql -> query('SELECT * FROM img')) {
					print "Query error: " . $wsql -> error;
					exit();
				}
				$path_styles = TEMPLATEFILES . '' . $the_active_site_template . '/layouts/' . $layout_name . '/styles/';
				if (is_dir($path_styles) == false) {
					$path_styles = TEMPLATEFILES . '' . $the_active_site_template . '/layouts/' . $layout_name . '/';
				}

				if (is_dir($path_styles) == false) {
					$path_styles = TEMPLATEFILES . '' . $the_active_site_template . '/layouts/';
				}
				// fetch results as array and output them:
				$arr = $wsql -> fetch_array();
				if (!empty($arr)) {
					foreach ($arr as $row) {
						if ((stristr($row['src'], 'http://') == false) or (stristr($row['src'], 'https://') == false) or (stristr($row['src'], 'ftp://') == false)) {
							$url = pathToURL($path_styles . $row['src']);
							$html = str_ireplace($row['src'], $url, $html);
						}
					}
				}
			}
		}
		return $html;
	}

	/**
	 * @desc  Get the template layouts styles fom the $layout_name/styles dir
	 * @param string dir name under the layouts subdir on your active template
	 * @return string
	 * @author	Microweber Dev Team
	 * @version 1.0
	 * @since Version 1.0
	 */
	function stylesList($layout_name) {

		$this -> load -> helper('directory');
		//$path = BASEPATH . 'content/templates/';
		$the_active_site_template = $this -> core_model -> optionsGetByKey('curent_template');
		$path = TEMPLATEFILES . '' . $the_active_site_template . DIRECTORY_SEPARATOR . 'layouts' . DIRECTORY_SEPARATOR . $layout_name . DIRECTORY_SEPARATOR . 'styles' . DIRECTORY_SEPARATOR;
		//int $path;
		//exit;

		//	$map = directory_map ( $path, TRUE );
		//r_dump($map);
		$map = directory_map($path, TRUE, TRUE);
		//var_dump($map);
		$to_return = array();

		foreach ($map as $file) {
			$filename = $path . $file;
			//var_dump($filename);
			if (is_file($filename)) {
				$ext = file_extension($filename);
				$filename_no_ext = basename($filename, "." . $ext);
				$txt_file = $path . $dir . DIRECTORY_SEPARATOR . $filename_no_ext . '.txt';
				$img_file = $path . $dir . DIRECTORY_SEPARATOR . $filename_no_ext . '.jpg';
				$ext = end(explode(".", $filename));
				//var_dump($filename_no_ext);
				if ($ext == 'css') {
					$filename2 = $txt_file;
					if (is_file($filename2)) {
						$fin = cache_file_memory_storage($filename2);
						$to_return_temp = array();
						$to_return_temp['filename'] = $file;

						if (is_file($img_file)) {
							$screens_file = pathToURL($img_file);
							$to_return_temp['screenshot'] = trim($screens_file);
						}

						if (preg_match('/description:.+/', $fin, $regs)) {
							$result = $regs[0];
							$result = str_ireplace('description:', '', $result);
							$to_return_temp['description'] = trim($result);
						}
						if (preg_match('/name:.+/', $fin, $regs)) {
							$result = $regs[0];
							$result = str_ireplace('name:', '', $result);
							$to_return_temp['name'] = trim($result);
						}

						if (preg_match('/type:.+/', $fin, $regs)) {
							$result = $regs[0];
							$result = str_ireplace('type:', '', $result);
							$to_return_temp['type'] = trim($result);
						}

						//if ($to_return_temp ['type'] == 'layout') {
						if ($to_return_temp['name'] != false) {
							$to_return[] = $to_return_temp;
						}

						//}
					}
				}

			}

		}
		return $to_return;

	}

	/**
	 * @desc  Get the laoyts style CSS's in TinyMCE format http://wiki.moxiecode.com/index.php/TinyMCE:Configuration/content_css
	 * @param string $layout_name
	 * @param string $style_css
	 * @return string
	 * @author	Microweber Dev Team
	 * @version 1.0
	 * @since Version 1.0
	 */
	function styleGetCSSURLsAsString($layout_name, $style_css = false) {
		$the_active_site_template = $this -> core_model -> optionsGetByKey('curent_template');
		$path_layout_css = TEMPLATEFILES . '' . $the_active_site_template . DIRECTORY_SEPARATOR . 'layouts' . DIRECTORY_SEPARATOR . $layout_name . DIRECTORY_SEPARATOR . 'layout.css';
		$path_style_css = TEMPLATEFILES . '' . $the_active_site_template . DIRECTORY_SEPARATOR . 'layouts' . DIRECTORY_SEPARATOR . $layout_name . DIRECTORY_SEPARATOR . 'styles' . DIRECTORY_SEPARATOR . $style_css;
		$defalt_style_css = TEMPLATEFILES . '' . $the_active_site_template . DIRECTORY_SEPARATOR . 'layouts' . DIRECTORY_SEPARATOR . $layout_name . DIRECTORY_SEPARATOR . 'styles' . DIRECTORY_SEPARATOR . 'default.css';
		$styles = array();
		if (is_file($path_layout_css)) {
			$styles[] = pathToURL($path_layout_css);
		}
		if (is_file($path_style_css)) {
			$styles[] = pathToURL($path_style_css);
		} else {
			if (is_file($defalt_style_css)) {
				$styles[] = pathToURL($defalt_style_css);
			}
		}
		$styles = implode(',', $styles);
		return $styles;
	}

	/**
	 * @desc  Generate Microweber tags to use in tinymce editor
	 * @param $data
	 * @param $options
	 * $options ['no_microwber_tags'] - default: false - removes the <microweber> tags
	 * $options ['no_remove_div'] - default: false - removes the <div class="remove-on-submit"> tags
	 * $options ['get_only_stylesheets_as_csv'] - default: false - return the CSS files urls as csv string
	 * @return string
	 * @author	Microweber Dev Team
	 * @version 1.0
	 * @since Version 1.0
	 */
	function microweberTagsGenerate($data, $options = false) {
		//var_dump ( $data );
		if (empty($data)) {
			return false;
		}

		if ($data['to_table'] == false) {
			return false;
		}

		if ($data['to_table'] == 'table_users') {
			return false;
			exit('Sorry you cant access the users table due privacy protection for your website.');
		}

		if ($data['type'] == false) {
			return false;
		}

		if ($data['to_table_id'] == false) {
			return false;
		}
		//"type":"content","to_table":"table_content","to_table_id":"'+$content_id+'","to_table_field":"content_body"

		if ($data['to_table_field'] != '') {
			//$res = $this->core_model->fetchDbData ( $data ['to_table'], array (array ('is_active', 'y' ), array ('id', $data ['to_table_id'] ) ), array ('debug' => false, 'cache_group' => false, 'order' => array (array ('id', 'DESC' ) ) ) );

		}
		$res = $this -> parseDynamicRelations($data);

		if ($options['get_only_stylesheets_as_csv'] == false) {
			$mwtag = json_encode($data);
			if ($options['no_microwber_tags'] == false) {
				$mwtag = '<microweber>' . $mwtag . '</microweber>';
			} else {
				$mwtag = false;
			}

			if ($options['no_remove_div'] == false) {
				$field = '<div class="remove-on-submit">' . $res["{$data ['to_table_field']}"] . '</div>';
			} else {
				$field = $res["{$data ['to_table_field']}"];
			}
			//$prepend_to_head = '<link href="http://img.abv.bg/dHome/dragcss/styles_09.css" type="text/css" />';
			return ($prepend_to_head . $mwtag . $field);
		} else {
			$relation = $res;

			$file1 = LAYOUTS_DIR . $relation['content_layout_name'] . '/layout.css';
			$file1_url = LAYOUTS_URL . $relation['content_layout_name'] . '/layout.css';

			$file2 = LAYOUTS_DIR . $relation['content_layout_name'] . '/styles/' . $parsed['content_layout_style'];
			$file2_url = LAYOUTS_URL . $relation['content_layout_name'] . '/styles/' . $parsed['content_layout_style'];

			$file3 = LAYOUTS_DIR . $relation['content_layout_name'] . '/styles/default.css';
			$file3_url = LAYOUTS_URL . $relation['content_layout_name'] . '/styles/default.css';

			//print $file1;
			$return = array();
			if (is_file($file1) == true) {
				$return[] = $file1_url;
			}
			if (is_file($file2) == true) {
				$return[] = $file2_url;
			} else {
				if (is_file($file3) == true) {
					$return[] = $file3_url;
				}
			}
			//	p($return);
			if (!empty($return)) {
				return implode(',', $return);
			} else {
				return false;
			}

			//p ( $options );
		}
	}

	function parseToTags($content) {

		//require_once (LIBSPATH . "simplehtmldom/simple_html_dom.php");

		$html = str_get_html($content);
		foreach ($html->find ( 'div[field]' ) as $checkbox) {
			//var_Dump($checkbox);
			$re1 = $checkbox -> rel;
			$style = $checkbox -> field;

			if ($checkbox -> page) {
				$checkbox -> page = "{PAGE_ID}";
			}

			if ($checkbox -> post) {
				$checkbox -> post = "{POST_ID}";
			}

			$re2 = $checkbox -> mw_params_module;

			$inner = $checkbox -> innertext;

			$tag1 = "<editable ";
			$tag1 = $tag1 . "rel=\"{$re1}\" ";

			$tag1 = $tag1 . "field=\"{$style}\" ";
			$tag1 .= ">" . $inner . "</editable>";
			//p($tag1);
			$checkbox -> outertext = $tag1;
			$html -> save();

		}

		$content = $html -> save();

		return $content;

		p($content, 1);
		$relations = array();
		$tags = $this -> core_model -> extractTags($content, 'div', $selfclosing = false, $return_the_entire_tag = true, $charset = 'UTF-8');
		//
		$matches = $tags;
		if (!empty($matches)) {
			//

			foreach ($matches as $m) {

				$cl = $m["attributes"][0];
				$cl2 = $m["attributes"]["type"];
				$cl3 = $m["attributes"]["data-type"];
				p($cl2);
				p($m["attributes"]);
				//	if (strstr ( $cl, 'edit' ) != false) {
				if (strstr($cl2, 'editable') != false) {
					//if (strstr ( $cl2, 'editable' ) != false) {
					$QueryString = '';
					foreach ($m ["attributes"] as $Key => $Value) {
						$Value = str_replace('mercury-region', '', $Value);
						$Value = str_replace('-handle', '', $Value);
						$Value = str_replace('-e', '', $Value);

						$Value = trim($Value);
						$Key = trim($Key);
						if ($Key != 'page' and ($Key != 'post')) {

							$QueryString .= " " . $Key . '="' . $Value . '"';
						}
					}

					$rep = "<editable " . $QueryString . "></editable>";

					//$replaced = false;
					$attr = $m['attributes'];
					$tag = $m['full_tag'];

					$content = str_replace($tag, $rep, $content);

					if (strstr($content, 'div data-type="editable"') == true) {

						$content = $this -> parseToTags($content);

					}

					//	p ( $tag );
				}

			}

		}
		// exit ($content);
		return $content;
	}

	/**
	 * @desc  Parses the relations array and returns the aprropriate data. Define your custom parser with the 'type' option
	 * @param $data
	 * @param $options
	 * $options ['to_table'] - give the table name
	 * $options ['to_table_id'] - give the id
	 * $options ['type'] 	- if 'content' - get data from the database
	 * - no other types defined for now
	 * @return string
	 * @author	Microweber Dev Team
	 * @version 1.0
	 * @since Version 1.0
	 */
	function parseDynamicRelations($options) {
		$data = $options;
		if (empty($data)) {
			return false;
		}

		if ($data['to_table'] == false) {
			return false;
		}

		if ($data['to_table'] == 'table_users') {
			exit('Sorry you cant access the users table due privacy protection for your website.');
		}

		if ($data['type'] == false) {
			return false;
		}
		if ($data['type'] == 'content') {
			if (strval($data['to_table']) != '') {
				if (strval($data['to_table_id']) != '') {
					$res = $this -> core_model -> fetchDbData($data['to_table'], array( array('is_active', 'y'), array('id', $data['to_table_id'])), array('debug' => false, 'cache_group' => false, 'order' => array( array('id', 'DESC'))));
					$res = $res[0];
				} else {

					print __FUNCTION__ . ' is not yet finished at line:  ' . __LINE__;

					/*$res = $this->core_model->fetchDbData ( $data ['to_table'],
					 array (
					 array ('is_active', 'y' ),
					 //array ('id', $data ['to_table_id'] ) ),
					 array ('debug' => false,
					 'cache_group' => false,
					 'order' => array (array ('id', 'DESC' ) ) ) );*/

				}
			}
		}

		return $res;
	}

	function loadEditBlock($id, $page_id = false, $history_file = false) {

		if ($history_file == false) {

			if ($page_id == false) {
				$try_file = TEMPLATE_DIR . 'blocks/' . $id . '.php';
			} else {
				$try_file = TEMPLATE_DIR . 'blocks/' . $page_id;
				$try_file = normalize_path($try_file);
				$try_file .= $id . '.php';

				if (is_file($try_file) == false) {
					$try_file = TEMPLATE_DIR . 'blocks/' . $id . '.php';

				}
			}
		} else {
			$try_file = $history_file;
		}
		//p($try_file);
		$module_file = $this -> load -> file($try_file, true);
		//$module_file = html_entity_decode ( $module_file );

		$module_file = $this -> parseMicrwoberTags($module_file);
		return $module_file;
	}

	function saveEditBlock($id, $content, $page_id = false) {

		$content = html_entity_decode($content);

		$content = str_ireplace('</mw>', '', $content);
		$content = str_ireplace(' style=""', '', $content);
		$content = str_ireplace(' class="create_module"', '', $content);

		if ($page_id == true) {
			$the_dir = TEMPLATE_DIR . 'blocks/' . $page_id;
			$the_dir = normalize_path($the_dir);
			$try_file = $the_dir . $id . '.php';
			if (is_dir($the_dir) == false) {
				mkdir_recursive($the_dir);
			}

			if (is_file($try_file)) {

			} else {

				touch($try_file);
			}
		} else {
			$try_file = TEMPLATE_DIR . 'blocks/' . $id . '.php';
			$the_dir = normalize_path(TEMPLATE_DIR . 'blocks/');
		}
		//p($try_file);
		$to_save = array();

		//p($try_file);

		if (is_file($try_file)) {

			if (strstr($content, '<microweber') == true) {

				$relations = array();
				$tags = $this -> core_model -> extractTags($content, 'microweber', $selfclosing = true, $return_the_entire_tag = true, $charset = 'UTF-8');
				//	p($tags);
				$matches = $tags;
				if (!empty($matches)) {
					//
					foreach ($matches as $m) {

						//

						if ($m['tag_name'] == 'microweber') {
							$replaced = false;
							$attr = $m['attributes'];
							$tag = $m['full_tag'];
							$to_save[] = $tag;
							if ($tag != false) {
								$content = str_ireplace($m['full_tag'], '', $content);
							}

						}

					}

				}

			}

			if (strstr($content, '<div') == true) {

				$relations = array();
				$tags = $this -> core_model -> extractTags($content, 'div', $selfclosing = false, $return_the_entire_tag = true, $charset = 'UTF-8');
				//	p($tags);
				$matches = $tags;
				if (!empty($matches)) {
					//
					foreach ($matches as $m) {

						//

						if ($m['tag_name'] == 'div') {
							$replaced = false;
							$attr = $m['attributes'];

							if ($attr['class'] == 'module') {
								if ($attr['base64_array'] != '') {

									$base64_array = base64_decode($attr['base64_array']);
									$base64_array = unserialize($base64_array);
									if (!empty($base64_array)) {
										$tag1 = "<microweber ";

										foreach ($base64_array as $k => $v) {
											if ((strtolower(trim($k)) != 'save') and (strtolower(trim($k)) != 'submit')) {
												$tag1 = $tag1 . "{$k}=\"{$v}\" ";
											}
										}
										$tag1 .= " />";
										$to_save[] = $tag1;

										$content = str_ireplace($m['full_tag'], $tag1, $content);
										$replaced = true;

										//p($base64_array);
									}
								}
								if ($replaced == false) {
									if ($attr['edit'] != '') {
										$tag = ($attr['edit']);
										//$tag = base64_decode ( $tag );
										$tag = 'edit_tag';

										//p ( $tag );

										if (strstr($tag, 'module_id=') == false) {

											$tag = str_replace('/>', ' module_id="module_' . date('Ymdhis') . rand() . '" />', $tag);

										}

										$to_save[] = $tag;
										if ($tag != false) {
											$content = str_ireplace($m['full_tag'], $tag, $content);
										}
									}
								}
							}

						}

					}

				}

			}

			if (!empty($to_save)) {
				$to_save_text = implode("\n", $to_save);
			}

			//	p ( $try_file );

			if ($to_save_text != '') {

				$to_save_text = str_replace('\\', '/', $to_save_text);
				print($to_save_text);
				//copy for hiustory
				$today = date('Y-m-d H-i-s');
				$history_f = crc32($try_file);
				//$history_dir = $the_dir . '/history/' . $id . '/';

				$history_dir = APPPATH . '/history/blocks/' . $id . '/';

				$history_dir = normalize_path($history_dir);

				if (is_dir($history_dir) == false) {
					mkdir_recursive($history_dir);
				}
				$history_file = $history_dir . $today . '.php';
				$saveh = array();
				$saveh['value'] = $to_save_text;
				$saveh['full_path'] = $history_file;
				$this -> core_model -> saveHistory($saveh);

				//copy ( $try_file, $history_file );

				file_put_contents($try_file, $to_save_text);
				$this -> core_model -> cleanCacheGroup('global/blocks');
			}
		}

	}

	function getDesignStyles($options = false) {
		//p($options);
		if (!$options['dir_name']) {
			$dir_name = normalize_path(STYLES_DIR);
		} else {
			$dir_name = normalize_path(STYLES_DIR . '/' . $options['dir_name']);
		}
		$dir = rglob('bootstrap.css', 0, $dir_name);

		if (!empty($dir)) {
			$configs = array();
			foreach ($dir as $key => $value) {

				$config = array();
				$value = normalize_path($value, false);
				$value_fn = $mod_name = str_replace('bootstrap.css', '', $value);
				$value_fn = str_replace($dir_name, '', $value_fn);

				$value_fn = reduce_double_slashes($value_fn);
				//p($value);
				$try_icon = $mod_name . 'thumbnail.png';
				$def_icon = STYLES_DIR . 'default.png';
				//include ($value);

				$value_fn = rtrim($value_fn, '\\');

				$config['style_name'] = $value_fn . '';
				$config['style_dirname'] = $mod_name;
				$config['style_path'] = $mod_name . 'bootstrap.css';
				$config['style_url'] = pathToURL($mod_name . 'bootstrap.min.css');

				if (is_file($try_icon)) {
					//p($try_icon);
					$config['icon'] = $config['thumbnail'] = pathToURL($try_icon);

					$mmd5 = crc32($value_fn);
					$check_if_uninstalled = STYLES_DIR . '_system/' . $mmd5 . '.php';
					if (is_file($check_if_uninstalled)) {
						$config['uninstalled'] = true;
						$config['installed'] = false;
					} else {
						$config['uninstalled'] = false;
						$config['installed'] = true;
						//$config['file'] = $value_fn;

						//$config ['content'] = file_get_contents();

					}

					if ($options['ui'] == true) {
						if ($config['ui'] == false) {
							//	$skip_module = true;
						}
					}

					if ($skip_module == false) {
						$configs[] = $config;
					}
				}
				//p ( $value );
			}

			return $configs;
		}

	}

	 
	function getDesignElementsDirs($options = false) {

		$dir_name = normalize_path(ELEMENTS_DIR);
		$a1 = array();
		$dirs = array_filter(glob($dir_name . '*'), 'is_dir');
		foreach ($dirs as $dir) {
			$a1[] = basename($dir);

		}

		return $a1;
	}

	function getDesignElements($options = false) {
		//p($options);
		if (!$options['dir_name']) {
			$dir_name = normalize_path(ELEMENTS_DIR);
		} else {
			$dir_name = normalize_path(ELEMENTS_DIR . '/' . $options['dir_name']);
		}
		$dir = rglob('*_config.php', 0, $dir_name);

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
					$check_if_uninstalled = ELEMENTS_DIR . '_system/' . $mmd5 . '.php';
					if (is_file($check_if_uninstalled)) {
						$config['uninstalled'] = true;
						$config['installed'] = false;
					} else {
						$config['uninstalled'] = false;
						$config['installed'] = true;
						$config['file'] = $value_fn;

						//$config ['content'] = file_get_contents();

					}

					if ($options['ui'] == true) {
						if ($config['ui'] == false) {
							//	$skip_module = true;
						}
					}

					if ($skip_module == false) {
						$configs[] = $config;
					}
				}

				//p ( $value );
			}

			return $configs;
		}

	}

	function getModuleTemplates($module_name) {
		if (trim($module_name) == '') {
			return false;
		}

		$args = func_get_args();

		foreach ($args as $k => $v) {

			$function_cache_id = $function_cache_id . serialize($k) . serialize($v);

		}

		$cache_id = $function_cache_id = __FUNCTION__ . crc32($function_cache_id);

		$cache_group = 'templates';

		$cache_content = cache_get_content($cache_id, $cache_group);

		if (($cache_content) != false) {

			return $cache_content;

		}

		$d = MODULES_DIR . '' . $module_name . DS . 'templates' . DS;
		$d = normalize_path($d, true);
		$dir = rglob('*.php', 0, $d);
		$termplates = array();
		if (!empty($dir)) {
			$configs = array();
			foreach ($dir as $key => $value) {
				$filename = $value = normalize_path($value, false);
				$fin = cache_file_memory_storage($filename);

				$template_file = str_ireplace($d, '', $filename);
				$icon_file = str_ireplace('.php', '', $template_file);
				$icon_file_path = $d . $icon_file . '.png';
				$icon_file_path_jpg = $d . $icon_file . '.jpg';

				//	p($icon_file_path);
				$opts = array();

				if (preg_match('/type:.+/', $fin, $regs)) {
					$result = $regs[0];
					$result = str_ireplace('type:', '', $result);
					$type = trim($result);
					$opts['type'] = $type;
				}

				if (is_file($icon_file_path)) {
					$opts['thumbnail'] = pathToURL($icon_file_path);
				} else {
					if (is_file($icon_file_path_jpg)) {
						$opts['thumbnail'] = pathToURL($icon_file_path_jpg);
					}
				}

				if ($type == 'template') {
					if (preg_match('/name:.+/', $fin, $regs)) {
						$result = $regs[0];
						$result = str_ireplace('name:', '', $result);
						$name = trim($result);
						$opts['name'] = $name;
					}

					if (preg_match('/description:.+/', $fin, $regs)) {
						$result = $regs[0];
						$result = str_ireplace('description:', '', $result);
						$description = trim($result);
						$opts['description'] = $description;
					}
					$opts['template'] = $template_file;
					$termplates[] = $opts;
				}

			}
		}
		$this -> core_model -> cacheWriteAndEncode($termplates, $function_cache_id, $cache_group);

		return $termplates;
	}

	function getModuleConfig($module_name) {

		$config = false;
		$params['module_info'] = $module_name;
		if ($params['module_info']) {
			$params['module_info'] = str_replace('..', '', $params['module_info']);
			$try_config_file = MODULES_DIR . '' . $params['module_info'] . '_config.php';
			if (is_file($try_config_file)) {
				include ($try_config_file);
				if ($config['icon'] == false) {
					$config['icon'] = MODULES_DIR . '' . $params['module_info'] . '.png';

					$config['icon'] = pathToURL($config['icon']);
				}

			}
			return $config;
		}

	}

	function getModules($options = false) {
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

	/**
	 * @desc  parses the mw tags
	 * @param $layout - string
	 * @param $options
	 * $options ['admin'] - loads the module admin
	 * @return string
	 * @author	Microweber Dev Team
	 * @version 1.0
	 * @since Version 1.0
	 */
	function parseMicrwoberTags($layout, $options = false) {
		return parse_micrwober_tags($layout, $options);

	}

	function setup_module_options($options_array_from_config) {
		$function_cache_id = false;

		$args = func_get_args();

		foreach ($args as $k => $v) {

			$function_cache_id = $function_cache_id . serialize($k) . serialize($v);

		}

		$function_cache_id = __FUNCTION__ . crc32($function_cache_id);

		$cache_content = cache_get_content($function_cache_id, $cache_group = 'options');

		if (($cache_content) != false) {

			return $cache_content;

		} else {

			foreach ($options_array_from_config as $option) {
				//p ( $option );
				$get_option = array();
				$get_option['option_key'] = $option['param'];
				if ($option['group']) {
					$get_option['option_group'] = $option['group'];
				}
				if ($option['module']) {
					$get_option['module'] = $option['module'];
				}
				$get_option1 = $this -> core_model -> optionsGetByKey($get_option);
				if (empty($get_option1)) {
					$get_option['name'] = $option['name'];
					$get_option['help'] = $option['help'];
					$get_option['type'] = $option['type'];
					$get_option['name'] = $option['name'];
					$get_option['option_value'] = $option['default'];
					$get_option['option_value2'] = $option['values'];

					$save = $this -> core_model -> optionsSave($get_option);

					//p ( $save );

				}

			}
			$this -> core_model -> cacheWriteAndEncode('true', $function_cache_id, $cache_group = 'options');

			return true;

		}

	}

	//$bad_words = $this->core_model->optionsGetByKey ( 'bad_words' );

	function badWordsRemove($layout) {

		$bad_words = $this -> core_model -> optionsGetByKey('bad_words');

		if ($bad_words) {

			$bad_words_a = explode(',', $bad_words);
			foreach ($bad_words_a as $bad_word) {
				$rep = str_repeat("#", strlen($bad_word));
				$layout = str_ireplace(' ' . $bad_word . ' ', ' ' . $rep . ' ', $layout);
			}

		}
		return $layout;
	}

	function getAttributes($input) {
		$dom = new DomDocument();
		$dom -> loadHtml("<foo " . $input . "/>");
		$attributes = array();
		foreach ($dom->documentElement->attributes as $name => $attr) {
			$attributes[$name] = $node -> value;
		}
		return $attributes;
	}

	function getAttribute($attrib, $tag) {
		//get attribute from html tag
		$re = '/' . preg_quote($attrib) . '=([\'"])?((?(1).+?|[^\s>]+))(?(1)\1)/is';
		if (preg_match($re, $tag, $match)) {
			return urldecode($match[2]);
		}
		return false;
	}

}
