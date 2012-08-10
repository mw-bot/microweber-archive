<?php

$table_name = false;
$table_name = TABLE_PREFIX . "forms";
$query = $this -> db -> query("show tables like '$table_name'");
$query = $query -> row_array();
$query = (array_values($query));

if ($query[0] != $table_name) {
	$sql = "CREATE TABLE " . $table_name . " (
		id int(11) NOT NULL auto_increment,
		UNIQUE KEY id (id)
		)    DEFAULT CHARSET=utf8;
  
		";
		var_dump($sql);
	$this -> db -> query($sql);
}

$sql = "show tables like '$table_name'";
$query = $this -> db -> query($sql);
$query = $query -> row_array();
$query = (array_values($query));
if ($query[0] == $table_name) {
	//$columns = $db->fetchAll("show columns from $table_name");

	$fields_to_add = array();
	$fields_to_add[] = array('to_table', 'varchar(1500) default NULL');
	$fields_to_add[] = array('to_table_id', 'int(11) default NULL');
	$fields_to_add[] = array('updated_on', 'datetime default NULL');
	$fields_to_add[] = array('created_on', 'datetime default NULL');
	$fields_to_add[] = array('form_title', 'TEXT default NULL');
	$fields_to_add[] = array('form_values', 'TEXT default NULL');
	$fields_to_add[] = array('original_link', 'TEXT default NULL');
	$fields_to_add[] = array('ip_address', 'varchar(1500) default NULL');

	$fields_to_add[] = array('created_by', 'int(11) default NULL');
	$fields_to_add[] = array('edited_by', 'int(11) default NULL');

	$this -> set_db_tables($table_name, $fields_to_add);

}
