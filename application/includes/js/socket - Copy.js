window.mw = window.mw ? window.mw : {};

window.multi_edit_last = {}


var Server;

		function socket_log( text ) {
			$log = $('#mw-socket-log');
			//Add text to log
			$log.append(($log.val()?"\n":'')+text);
			//Autoscroll
			$log[0].scrollTop = $log[0].scrollHeight - $log[0].clientHeight;
		}

		function send( text ) {
			//Server.send( 'message', text );
			socket.send(text); 
		}

		$(document).ready(function() {
			
			
			
			var host = "ws://127.0.0.1:9000";   // SET THIS TO YOUR SERVER
	try {
		socket = new WebSocket(host);
		socket_log('WebSocket - status '+socket.readyState);
		socket.onopen    = function(msg) { 
							   socket_log("Welcome - status "+this.readyState); 
							   
							   
							   	connection_interval = setInterval(function() { 
				if(mw.multi_edit.data_element_id){
			//	mw.multi_edit.data_element_id_content = $("*[data-element-id='"+mw.multi_edit.data_element_id+"']", '.element').html();
				el1z = $("*[data-element-id='"+mw.multi_edit.data_element_id+"']", '.edit').get(0);
				mw.multi_edit.data_element_id_content = JsonML.parseDOM(el1z)
				
				}
				
			//	if(window.multi_edit_last != mw.multi_edit){
				window.multi_edit_last = mw.multi_edit;
				aaa = json_to_string(mw.multi_edit );
				
					try
					  {
						send( aaa);
					  }
					catch(err)
					  {
					  //Handle errors here
					  }
			
				//}
				 }, 2000);
							   
							   
							   
							   
						   };
		socket.onmessage = function(msg) { 
							   socket_log("Received: "+msg.data); 
							   
							   
							   
							   
							   payload = msg.data;
							   
							   
							   
			 
			 try
  {
 				var obj = jQuery.parseJSON(payload);
 if(obj.session_id != undefined){
	 $my_ui_id = '#user-session-id-'+obj.session_id;
	 
	 
	 
	 
	 
	 if($($my_ui_id ).size() == 0){
		 $user_color = mw_get_random_color(obj.session_id); 
		 
		  $('.mw-multi-user-sidebar-userlist').append('<div id="'+'user-session-id-'+obj.session_id+'"></div>');
		  $( $my_ui_id).attr('data-color', $user_color);
		  $( $my_ui_id).css('background-color', $user_color);
		  
		  
		  
	 }
	 
	 
	 
	 
	 
	 
	
	 
	 
	 
	 
	 
	 
	 

	 $lsog = $( $my_ui_id).html(obj.session_id);
	 	 
	  if(obj.session_id != undefined && obj.mouse_pos_x != undefined && obj.mouse_pos_y != undefined ){
		  if($('#'+'user-mouse-'+obj.session_id+'' ).size() == 0){
		  $( 'body').append('<div class="mw-multi-user-mouse-pointer" id="'+'user-mouse-'+obj.session_id+'"></div>');
		  }
		    $('#'+'user-mouse-'+obj.session_id+'').css('top', obj.mouse_pos_x);
			 $('#'+'user-mouse-'+obj.session_id+'').css('left', obj.mouse_pos_y);
		  
		  
		   }
		   
		 	  if(obj.session_id != undefined && obj.data_element_id != undefined  ){
		  $('.mw-other-user-edit-element').removeClass('mw-other-user-edit-element');
		$("*[data-element-id='"+obj.data_element_id+"']", '.element').addClass('mw-other-user-edit-element');
		  
		   }  
		   
		   
		   
		     if(obj.session_id != undefined && obj.data_element_id_content != undefined && obj.data_element_id_content != '' ){
		  //$('.mw-other-user-edit-element').removeClass('mw-other-user-edit-element');
		//$("*[data-element-id='"+obj.data_element_id+"']", '.element').addClass('mw-other-user-edit-element');
		  
		  
		   
		   	var myUI = JsonML.parse(obj.data_element_id_content, function (elem) {
				if(elem != undefined){
				remote_elem = $(elem);	
				}
				remote_elem_id = remote_elem.attr('data-element-id');
				remote_elem_last_upd = remote_elem.attr('data-element-last-update');
				local_elem_id = 		$("*[data-element-id='"+remote_elem_id+"']", '.element');
				local_elem_id_last_upd = 		local_elem_id.attr("data-element-last-update");

				 
				//var diffs = compare(remote_elem,local_elem_id);
//if(local_elem_id.html() != remote_elem){
	if(local_elem_id_last_upd < remote_elem_last_upd){
	local_elem_id.replaceWith(remote_elem);
			if (window.console != undefined) {

			console.log(local_elem_id);
			//  console.log(summaries.target.activeElement );
		}
}
				
				
		
				/*if (elem.className.indexOf('Remove-Me') >= 0) {
					// this will remove from resulting DOM tree
					return null;
				}*/
 
				return elem;
			});
		   
		   
		    }   
	 
	 
	 
 }
		
  }
catch(err)
  {
  //Handle errors here
  }
			 
			 
			 
			
				
				
				
				
				
				
				
				socket_log( payload );
							   
							   
							   
						   };
		socket.onclose   = function(msg) { 
							   socket_log("Disconnected - status "+this.readyState); 
						   };
	}
	catch(ex){ 
		socket_log(ex); 
	}
	
	
	
	
			
			 
		});



  

function getUTCTime(date) {
	return ~~ ((+date / 1000) - date.getTimezoneOffset() * 60);
}



var currentDate = new Date();
var day = currentDate.getUTCDate();
var month = currentDate.getUTCMonth();
var year = currentDate.getUTCFullYear();
var hours = currentDate.getUTCHours();
var minutes = currentDate.getUTCMinutes();
var seconds = currentDate.getUTCSeconds();
var milliseconds = currentDate.getUTCMilliseconds();

var expiry = getUTCTime(currentDate);



window.now_utc_date = expiry;

function mw_lastChanged(selector) {
	$('.hl2').removeClass('hl2');
	if (selector == undefined) {
		selector = '*';

	}
	else {
	
		$(selector, '.edit').addClass('hl2');
	}

	$('*[data-element-id]', '.edit').each(function () {
		//	var expiry = Date.UTC(month,day,year,hours,minutes,seconds,milliseconds);

		var currentDate = new Date();
		var expiry = getUTCTime(currentDate);
		window.now_utc_date = expiry.toString()

 
		window.now_utc_date = parseInt(window.now_utc_date) + 1
		
		 mw.multi_edit.utc_date = window.now_utc_date;
		
		$(this).attr('data-element-last-update', window.now_utc_date);

mw.multi_edit.data_element_id = $(this).attr('data-element-id');

		//     $(this)[0].myIndex = $(this).index();
	});
}




function mw_updateIndexes() {
	$('*', '.edit').each(function () {
		$el_at = $(this).attr('data-element-id');
		if ($el_at == undefined) {
			$(this).attr('data-element-id', mw.random());
			/*observer.observe($l, {
				childList: true
			});*/


		}



		//     $(this)[0].myIndex = $(this).index();
	});
}


var mw_updateRemote = function (summaries) {
					summaries1 = (summaries[0] );
					$t = false;
					if(summaries1.target != undefined && summaries1.target.activeElement != undefined){
					
					
					
					$t1 = $(summaries1.target.activeElement)	;
					if($t1.attr('data-element-id')){
						
						$t  = $t1;
					}
					
					
					
	 
				//mw_lastChanged($t);
					}
//mw.multi_edit.mutation_summaries = summaries1;
	//send(summaries1);
	if (window.console != undefined) {

		 
		console.log(summaries1);
		//  console.log(summaries.target.activeElement );
	}
}






$(document).ready(function () {
 
	mw_updateIndexes();
	mw_lastChanged();


	 
	
	
		$(document).bind("mousemove", function (e) {
	 
	 
	 
	 mw.multi_edit.mouse_pos_x =  e.pageX;
	  mw.multi_edit.mouse_pos_y = e.pageY;
	 
	 if (window.console != undefined) {

		//console.log( $mouse_pos );
		//  console.log(summaries.target.activeElement );
	}
	 
	 
	});



	//var el = document.querySelectorAll('*[data-element-id]');
	/*el = $('*', '.element');
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;


	$.each(el, function (a, b) {
		$l = $(this).get(0);
		observer.observe($l, {
			childList: true
		});

	});*/

	var observer = new MutationSummary({
		callback: mw_updateRemote,
		queries: [{
			//element: '[data-element-id]',
			element: '[data-element-id]',
			//element: '*',
			elementAttributes: 'data-element-last-update'


		}]
	});


});











function mw_get_mouse_pos(e) {
 var posx = 0;
 var posy = 0;
 if (!e) var e = window.event;
 if (e.pageX || e.pageY)  {
  posx = e.pageX;
  posy = e.pageY;
 }
 else if (e.clientX || e.clientY)  {
  posx = e.clientX + document.body.scrollLeft
   + document.documentElement.scrollLeft;
  posy = e.clientY + document.body.scrollTop
   + document.documentElement.scrollTop;
 }
 $ret = new Array();
 $ret[0] = posx;
 $ret[1] = posy;
 return $ret;
 
 
 // posx and posy contain the mouse position relative to the document
}



function mw_object_compare(o1, o2){
 var arr = [];
 $(o1).each(function(i1){        
     var match = false;
     $(o2).each(function(i2){            
         if ( $("o1:eq("+i1+")").html() == $("o2:eq("+i2+")").html() )
             match = true;
     });
     if ( !match )
         arr.push($("o1:eq("+i1+")")[0]);        
 });
 return arr;
}


function objectToString(o) {

	var parse = function (_o) {

		var a = [],
			t;

		for (var p in _o) {

			if (_o.hasOwnProperty(p)) {

				t = _o[p];

				if (t && typeof t == "object") {

					a[a.length] = p + ":{ " + arguments.callee(t).join(", ") + "}";

				}
				else {

					if (typeof t == "string") {

						a[a.length] = [p + ": \"" + t.toString() + "\""];
					}
					else {
						a[a.length] = [p + ": " + t.toString()];
					}

				}
			}
		}

		return a;

	}

	return "{" + parse(o).join(", ") + "}";

}




function mw_get_random_color(letters) {
	if(letters == undefined){
	letters = '0123456789ABCDEF'	
	}
    letters.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[i];
    }
    return color;
}

 







json_to_string = function (obj) {
	var t = typeof (obj);
	if (t != "object" || obj === null) {
		// simple data type
		if (t == "string") obj = '"' + obj + '"';
		return String(obj);
	}
	else {
		// recurse array or object
		var n, v, json = [],
			arr = (obj && obj.constructor == Array);
		for (n in obj) {
			v = obj[n];
			t = typeof (v);
			if (t == "string") v = '"' + v + '"';
			else if (t == "object" && v !== null) v = JSON.stringify(v);
			json.push((arr ? "" : '"' + n + '":') + String(v));
		}
		return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	}
};

mw.random = function () {
	return Math.floor(Math.random() * 9999999 + (Math.random() * 9999) - Math.random() * (999 + Math.random()));
}