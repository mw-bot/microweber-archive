<script type="text/javascript">
 //var serverURL =  'ws://127.0.0.1:9300';
 WEB_SOCKET_DEBUG = true; 
 var serverURL = "ws://127.0.0.1:9000";   // SET THIS TO YOUR SERVER
 
 window.mw = window.mw ? window.mw : {};
 
 
 mw.multi_edit = {
	 user_id : '<? print user_id() ?>',
	 session_id : '<? print sid() ?>',
	 user_name : '<? print user_name() ?>',
	data_element_id: '',
	mutation_summaries: '',
	utc_date: '',
	data_element_id_content: '',
	  mouse_pos_x : '',
	   mouse_pos_y : ''
 }
 
 
 
 </script>
<div class="mw-multi-user-sidebar">

<div class="mw-multi-user-sidebar-userlist">
    
      

</div>
    
     <textarea id="mw-socket-log"></textarea> 

</div><!-- /end .mw -->
