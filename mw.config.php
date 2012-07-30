<?php

$mw_config = array ();
  
 

$mw_config ['site_url'] = 'http://dev2/Microweber/';   //use slash at the end

 $mw_config ['system_folder'] = 'application/ci';
$mw_config ['application_folder'] = 'application';
 
$mw_config ['db_hostname'] = 'localhost';

$mw_config ['db_username'] = 'root';

$mw_config ['db_password'] = '123456';  

 
$mw_config ['db_database'] = 'mw';

ini_set('display_errors', '1');
 
error_reporting ( E_ALL & ~ E_NOTICE | E_STRICT );
?>