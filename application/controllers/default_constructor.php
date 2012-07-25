<?php

  

if (!defined("DS")) {
	define('DS', DIRECTORY_SEPARATOR);
}

$profiler = getParamFromURL('debug');
if (!$profiler) {
	$profiler = getParamFromURL('dbg');
}
if (!$profiler) {
	$profiler = getParamFromURL('deb');
}

if ($profiler) {

	$this -> output -> enable_profiler(true);

}

$this -> load -> model('Core_model', 'core_model');

$this -> load -> model('Content_model', 'content_model');

$this -> load -> library('session');
//must be in this order!
//$this->load->model ( 'Init_model', 'init_model' );
/*
 $this->load->model ( 'Taxonomy_model', 'taxonomy_model' );

 $this->load->model ( 'Comments_model', 'comments_model' );
 $this->load->model ( 'Reports_model', 'reports_model' );

 $this->load->model ( 'Users_model', 'users_model' );
 $this->load->model ( 'Statuses_model', 'statuses_model' );
 $this->load->model ( 'Messages_model', 'messages_model' );
 $this->load->model ( 'Notifications_model', 'notifications_model' );

 $this->load->model ( 'Votes_model', 'votes_model' );

 $this->load->model ( 'Cart_model', 'cart_model' );
 $this->load->model ( 'Template_model', 'template_model' );
 $this->load->model ( 'Mw_model', 'mw' );*/

require_once (APPPATH . 'functions' . '/mw_functions.php');

$db_setup = CACHEDIR_ROOT . '/db_tmp/index.php';
if (is_file($db_setup) == false) {
	$this -> load -> model('init_model');
	$this -> init_model -> db_setup();
	$this -> core_model -> options_setup_default();
}

//some random factor
$rand = rand(1, 30);
if ($rand < 4) {
	//	CI::model ( 'messages' )->cleanup ();
}

$edit = getParamFromURL('edit');
if ($edit) {
	$this -> template['edit'] = true;
}

$editmode = getParamFromURL('editmode');

if ($editmode == false) {
	$editmode = getParamFromURL('?editmode');

}

if ($editmode != false) {
	if ($editmode == 'y') {
		$adm = $this -> core_model -> is_admin();
		if ($adm == true) {
			$this -> session -> set_userdata('editmode', true);

		}
	}

	if ($editmode == 'n') {
		$this -> session -> set_userdata('editmode', false);
	}

	$url = getCurentURL();

	$site = site_url();

	$url = str_ireplace($site, '', $url);

	$segs = explode('/', $url);

	$segs_clean = array();

	foreach ($segs as $segment) {

		$origsegment = ($segment);

		$segment = explode(':', $segment);

		if ($segment[0] == 'editmode') {

			//return $segment [1];
		} elseif ($segment[0] == '?editmode') {

			//return $segment [1];
		} else {

			$segs_clean[] = $origsegment;

		}

	}

	$segs_clean = implode('/', $segs_clean);

	$site = site_url($segs_clean);

	safe_redirect($site);

	exit();

}

$debugmode = getParamFromURL('debugmode');
if ($debugmode != false) {

	$debugmode = $this -> session -> userdata('debugmode');
	if ($debugmode == true) {
		$this -> output -> enable_profiler(true);
	}

	if ($debugmode == 'y') {
		$adm = $this -> core_model -> is_admin();
		if ($adm == true) {
			$this -> session -> set_userdata('debugmode', true);

		}
	}

	if ($debugmode == 'n') {
		$this -> session -> set_userdata('debugmode', false);
	}

	$url = getCurentURL();

	$site = site_url();

	$url = str_ireplace($site, '', $url);

	$segs = explode('/', $url);

	$segs_clean = array();

	foreach ($segs as $segment) {

		$origsegment = ($segment);

		$segment = explode(':', $segment);

		if ($segment[0] == 'debugmode') {

			//return $segment [1];
		} else {

			$segs_clean[] = $origsegment;

		}

	}

	$segs_clean = implode('/', $segs_clean);

	$site = site_url($segs_clean);

	safe_redirect('Location: ' . $site);

	exit();

}

 
if (isset($_POST['search_by_keyword']) and $_POST['search_by_keyword'] != '') {

	if (($_POST['search_by_keyword_auto_append_params']) == false) {

		$url_params = array();

		$url_params['keyword'] = stripslashes($_POST['search_by_keyword']);

		$url = $this -> core_model -> urlConstruct(false, $url_params);

	}

	if (($_POST['search_by_keyword'])) {

		$url_params = array();

		$url_params['keyword'] = stripslashes($_POST['search_by_keyword']);

		$url = $this -> core_model -> urlConstruct(false, $url_params);

	}

}
 

/*
 * If there is referrer, store it in cookie and redirect to clean location
 */

$ref = $this -> core_model -> getParamFromURL('ref');

if ($ref != '') {

	setcookie("microweber_referrer_user_id", $ref, time() + 60 * 60 * 24 * 90, '/');
	// 90 days
	setcookie("referrer_id", $ref, time() + 60 * 60 * 24 * 90, '/');
	// 90 days

	$this -> session -> set_userdata('ref', $ref);
	$url = getCurentURL();

	$site = site_url();

	$url = str_ireplace($site, '', $url);

	$segs = explode('/', $url);

	$segs_clean = array();

	foreach ($segs as $segment) {

		$origsegment = ($segment);

		$segment = explode(':', $segment);

		if ($segment[0] == 'ref') {

			//return $segment [1];
		} else {

			$segs_clean[] = $origsegment;

		}

	}

	$segs_clean = implode('/', $segs_clean);

	$site = site_url($segs_clean);

	//	print $site;
	safe_redirect('Location: ' . $site);

	exit();

} else {

	// Set back_to url into session. Reset this session component when redirect.
	$back_to = $this -> core_model -> getParamFromURL('back_to');

	if ($back_to) {

		//		var_dump($back_to);
		$this -> session -> set_userdata('back_to', $back_to);

	}

	$url = getCurentURL();

	$segs = explode('.', $url);

	$segs = str_ireplace('http://', '', $segs);

	$segs = str_ireplace('https://', '', $segs);

	$segs = $segs[0];

	$test_if_user_subdomain = addslashes($segs);

	$subdomain_user = array();

	//$subdomain_user ['username'] = $test_if_user_subdomain;
	//$subdomain_user = $this->users_model->getUsers ( $subdomain_user , array(0,1));
	if (!empty($subdomain_user)) {

		$subdomain_user = $subdomain_user[0];

		setcookie("microweber_referrer_user_id", $subdomain_user['id'], time() + 60 * 60 * 24 * 90, '/');
		// 90 days
		setcookie("referrer_id", $subdomain_user['id'], time() + 60 * 60 * 24 * 90, '/');
		// 90 days

		$subdomain_user_test = $this -> session -> userdata('subdomain_user');

		$subdomain_user_test = serialize($subdomain_user_test);

		$subdomain_user_test = md5($subdomain_user_test);

		$subdomain_user_test2 = serialize($subdomain_user);

		$subdomain_user_test2 = md5($subdomain_user_test2);

		if ($subdomain_user_test != $subdomain_user_test2) {

			$this -> session -> set_userdata('subdomain_user', $subdomain_user);

		}

		//set the cannonical URL for duplicated content
		// http://googlewebmastercentral.blogspot.com/2009/02/specify-your-canonical.html

		$url = getCurentURL();

		$url = str_ireplace($subdomain_user['username'] . '.', '', $url);

		$this -> template['meta_cannonical_url'] = $url;

	} else {

		/*	$subdomain_user_test = $this->session->userdata ( 'subdomain_user' );

		 $subdomain_user_test = serialize ( $subdomain_user_test );

		 $subdomain_user_test = md5 ( $subdomain_user_test );

		 $subdomain_user_test2 = serialize ( false );

		 $subdomain_user_test2 = md5 ( $subdomain_user_test2 );

		 if ($subdomain_user_test != $subdomain_user_test2) {

		 $this->session->set_userdata ( 'subdomain_user', false );

		 }

		 $this->template ['meta_cannonical_url'] = false;*/

	}
 
}

/*
 * Make some initializations - constants, libraries, template variables
 */

 
$this -> template['className'] = strtolower(get_class());
 
global $cms_db_tables;
$this -> template['cms_db_tables'] = $cms_db_tables;

$this -> template['__GET'] = $_GET;

$this -> template['__POST'] = $_POST;

$this -> template['__REQUEST'] = $_REQUEST;

// $this->load->vars ( $this->template );

$uid = $this -> core_model -> userId();

if ($uid > 0) {
	$user_session = $this -> session -> userdata('user_session');

	$this -> template['user_id'] = $uid;
	$this -> template['user_session'] = $user_session;
}

$url = $this -> uri -> uri_string();

$url = str_ireplace('\\', '', $url);

$is_json = url_param('json');
if ($is_json) {
	$output_format = 'json';
	$url = url_param_unset('json', $url);
}

$is_debug = url_param('debug');
if ($is_debug) {

	$url = url_param_unset('debug', $url);
}

$slash = substr("$url", 0, 1);
if ($slash == '/') {
	$url = substr("$url", 1, strlen($url));
}

$page = $this -> content_model -> getPageByURLAndCache($url);

set_template_constants($page['id']);

$this -> template['layouts_dir'] = $layouts_dir;

$this -> template['layouts_url'] = $layouts_url;
