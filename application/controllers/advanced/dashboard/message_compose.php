<?php
$no_layout = true;
$to = $this->core_model->getParamFromURL ( 'to' );
$to = CI::model('users')->getUserById ( $to );
$this->template ['message_to_user'] = $to;

$content ['content_filename'] = 'dashboard/messages/message_compose.php';
?>