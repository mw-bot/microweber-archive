


var serverURL = 'ws://192.168.0.3:9300';
 window.socket = socket = new WebSocket(serverURL);

			 
				   var mirrorClient;


$(document).ready(function() { 
		
		window.socket = socket = new WebSocket(serverURL);

  socket.onopen = function() {
    //socketSend({ base: location.href.match(/^(.*\/)[^\/]*$/)[1] });
    
  }

  socket.onclose = function() {
    //mirrorClient.disconnect();
    socket = undefined;
  }
  
  
  
  
  function handleMessage(msg) {
    if (msg.clear){
      //clearPage();
	} else if (msg.base)
      base = msg.base;
    else
      mirror[msg.f].apply(mirror, msg.args);   
  }

  socket.onmessage = function(event) {
    var msg = JSON.parse(event.data);
    if (msg instanceof Array) {
      msg.forEach(function(subMessage) {
        handleMessage(JSON.parse(subMessage));
      }); 
    } else {
      handleMessage(msg);
    }
  }
		
		
		
		});
		
 
function startMirroring() {
  if (socket != false)
    return;
 
  
  
}
function stopMirroring() {
  if (socket)
    socket.close();
  socket = undefined;
}










var Server;

		function log( text ) {
			$log = $('#log');
			//Add text to log
			$log.append(($log.val()?"\n":'')+text);
			//Autoscroll
			$log[0].scrollTop = $log[0].scrollHeight - $log[0].clientHeight;
		}

		function send( text ) {
			Server.send( 'message', text );
		}








function mw_updateIndexes() {
    $('*','.element').each(function() {
		$el_at = $(this).attr('data-element-id');
		if($el_at == undefined){
			 $(this).attr('data-element-id', mw.random());
			  $l = $(this).get(0);
			  observer.observe($l, { childList: true });

			
		}
		
		
		
   //     $(this)[0].myIndex = $(this).index();
    });
}






var observer = new MutationObserver(function(mutations) {
            
			
 
             //  console.log(mutations);
  mutations.forEach(function(mutation) {
	  
	  aaa = json_to_string( mutation );
	   if (window.console != undefined) {
                        
						  console.log(mutation );
						//  console.log(summaries.target.activeElement );
                      }	
			 socketSend(aaa)
	  
	  
	  
            if (mutation.removedNodes.length) {
                //alert("Removed element's index: " + mutation.removedNodes[0].myIndex);
				// console.log("Removed element's index: " + mutation.removedNodes[0].myIndex);
               
            }
        });
 mw_updateIndexes();
 

});
		
		
		
		$(document).ready(function() {	
		
		mw_updateIndexes();
		
		
//var el = document.querySelectorAll('*[data-element-id]');
el = $('*','.element');
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;


 $.each(el, function(a,b){ 
 $l = $(this).get(0);
 observer.observe($l, { childList: true });

  });
		
	 
	});	
		
	 
		
		
		
		
		function socketSend(msg) {
			
			
			if(msg != undefined){
				$s = JSON.stringify(msg).toString();
					 if (window.console != undefined) {
                          console.log('socketSend() :'+$s );
						//  console.log(summaries.target.activeElement );
                      }	
				
  socket.send($s);
			}
}
		
		
		
		
		
		
		
		
		
		
		
		
		
		

		
		
		
		
		
		
		
		
		
		
		
		 


json_to_string = function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};
