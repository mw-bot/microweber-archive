<?php
// Controller Class
class Controller {
	function rendaaaer() {
 
	
		//	$b = Model_Content::applyGlobalTemplateReplaceables('asdas dasd as das d','asdaaaas dasd as das d');

		//	var_dump($a);

		//	var_dump($ab);

		$l = new View('layout');
		//$this -> content = $l;
		//var_dump($l);

		$l -> set($this);
		echo $l;
	}

	function index() {


		//	var_dump($ab);

		$l = new View('layout');
		//$this -> content = $l;
		//var_dump($l);

		$l -> set($this);
		echo $l;
	}

	function show_404() {header("HTTP/1.0 404 Not Found");
		$this -> content = new View('404');
	}

}
