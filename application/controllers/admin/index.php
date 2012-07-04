<?php

class Index extends CI_Controller {
	
	function __construct() {
		parent :: __construct();
		
		require_once (APPPATH . 'controllers/default_constructor.php');
		require_once (APPPATH . 'controllers/admin/default_constructor.php');
	}
	
	function index() {
		$is_admin = is_admin ();
		if ($is_admin == false) {
			$go = site_url ( 'login' );
			safe_redirect ( $go );
		}
		
		$action = url_param ( 'action' );
		
		$this->template ['functionName'] = strtolower ( __FUNCTION__ );
		// $this->load->vars ( $this->template );
		$layout =$this->load->view ( 'admin/layout', true, true );
		
		if ($action == false) {
			$primarycontent =$this->load->view ( 'admin/index', true, true );
		} else {
			$primarycontent =$this->load->view ( 'admin/' . $action, true, true );
		
		}
		$this->load->model ( 'Template_model', 'template_model' );

		$layout = str_ireplace ( '{content}', $primarycontent, $layout );
		$layout = $this->template_model->parseMicrwoberTags ( $layout );
		$this->output->set_output ( $layout );
	}
	
	
 
	function toolbar() {
		$is_admin = is_admin ();
		if ($is_admin == false) {
			$go = site_url ( 'login' );
			safe_redirect ( $go );
		}
		
		//$layout =$this->load->view ( 'admin/toolbar', true, true );
		
		$tb = INCLUDES_DIR.DS.'toolbar'.DS.'toolbar.php';
					
		$layout = $this->load->file ( $tb, true );
		
		
		
		//$tb = INCLUDES_DIR.DS.'toolbar'.DS.'toolbar.php';
		//var_dump($tb );
		//$layout = $this->load->file ( INCV . 'affiliate_site_1/default_layout.php', true );
		//$layout =$this->load->view ( 'admin/toolbar', true, true );
		
		//$layout = $this->template_model->parseMicrwoberTags ( $layout );
		$this->output->set_output ( $layout );
	}
	
	 
}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */