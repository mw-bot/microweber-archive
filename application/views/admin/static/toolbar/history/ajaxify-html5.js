
   (function(window,undefined){
	
	// Load Helpers
	var
		intervalScript, intervalJquery,
		loadScript = function(scriptUrl){
			var e = document.createElement('script');
			e.setAttribute('src',scriptUrl);
			window.document.body.appendChild(e);
			return e;
		};
	
	// Load In Basic Dependencies
	if ( typeof window.jQuery === 'undefined' || /^1\.[0-3]/.test(window.jQuery.fn.jquery) ) {
		//loadScript('<?php   print( ADMIN_STATIC_FILES_URL);  ?>jquery-base/js/jquery-1.7.2.min.js');
	}

	// Load In Advanced Dependencies
	intervalJquery = setInterval(function(){
		if ( typeof window.jQuery !== 'undefined' ) {
			clearInterval(intervalJquery);
			loadScript('<?php   print( ADMIN_STATIC_FILES_URL);  ?>freshereditor/history/jquery.history.js');
			//loadScript('https://raw.github.com/balupton/jquery-scrollto/master/scripts/jquery.scrollto.min.js');
		}
	},500);
	
	// Load In Script
	intervalScript = setInterval(function(){
		if ( typeof window.jQuery !== 'undefined' && typeof window.History !== 'undefined' && typeof window.History.initHtml4 !== 'undefined' ) {
			if ( window.console ) {
				//window.console.log('Loading in script');
			}
			$(loadScript('<?php   print( ADMIN_STATIC_FILES_URL);  ?>freshereditor/history/ajaxify-html5.js')).bind('load',function(){
				if ( typeof window.historyjsitNoAlert === 'undefined' ) {
					//alert('History.js It! Is ready for action!');
				}
			});
			clearInterval(intervalScript);
		}
		else if ( window.console ) {
			window.console.log('Loading...');
		}
	},500);
	
})(window);




// https://gist.github.com/854622
(function(window,undefined){
	
	// Prepare our Variables
	var
		History = window.History,
		$ = window.jQuery,
		document = window.document;

	// Check to see if History.js is enabled for our Browser
	if ( !History.enabled ) {
		return false;
	}

	// Wait for Document
	$(function(){
		// Prepare Variables
		var
			/* Application Specific Variables */
			contentSelector = '#content,article:first,.article:first,.post:first',
			$content = $(contentSelector).filter(':first'),
			contentNode = $content.get(0),
			$menu = $('#menu,#nav,nav:first,.nav:first').filter(':first'),
			activeClass = 'active selected current youarehere',
			activeSelector = '.active,.selected,.current,.youarehere',
			menuChildrenSelector = '> li,> ul > li',
			/* Application Generic Variables */
			$body = $(document.body),
			rootUrl = History.getRootUrl(),
			scrollOptions = {
				duration: 800,
				easing:'swing'
			};
		
		// Ensure Content
		if ( $content.length === 0 ) {
			$content = $body;
		}
		
		// Internal Helper
		$.expr[':'].internal = function(obj, index, meta, stack){
			// Prepare
			var
				$this = $(obj),
				url = $this.attr('href')||'',
				isInternalLink;
			
			// Check link
			isInternalLink = url.substring(0,rootUrl.length) === rootUrl || url.indexOf(':') === -1;
			
			// Ignore or Keep
			return isInternalLink;
		};
		
		// HTML Helper
		var documentHtml = function(html){
			// Prepare
			var result = String(html)
				.replace(/<\!DOCTYPE[^>]*>/i, '')
				.replace(/<(html|head|body|title|meta|script)([\s\>])/gi,'<div class="document-$1"$2')
				.replace(/<\/(html|head|body|title|meta|script)\>/gi,'</div>')
			;
			
			// Return
			return result;
		};
		
		// Ajaxify Helper
		$.fn.ajaxify = function(){
			// Prepare
			var $this = $(this);
			
			// Ajaxify
			$this.find('a:internal:not(.no-ajaxy)').click(function(event){
				// Prepare
				var
					$this = $(this),
					url = $this.attr('href'),
					title = $this.attr('title')||null;
				
				// Continue as normal for cmd clicks etc
				if ( event.which == 2 || event.metaKey ) { return true; }
				
				// Ajaxify this link
				History.pushState(null,title,url);
				event.preventDefault();
				return false;
			});
			
			// Chain
			return $this;
		};
		
		// Ajaxify our Internal Links
		$body.ajaxify();
		
		// Hook into State Changes
		$(window).bind('statechange',function(){
			// Prepare Variables
			var
				State = History.getState(),
				url = State.url,
				relativeUrl = url.replace(rootUrl,'');

			// Set Loading
			$body.addClass('loading');

			// Start Fade Out
			// Animating to opacity to 0 still keeps the element's height intact
			// Which prevents that annoying pop bang issue when loading in new content
			$content.animate({opacity:0},800);
			
			// Ajax Request the Traditional Page
			//$("html").load(url, function(data, status, xhr) {
  
			//});
			$.ajax({
				url: url,
				 context: document.body,
				 method: 'post',
				  data: { no_toolbar: "1", location: "Boston" },
				success: function(data, textStatus, jqXHR){
		 $body.fadeOut();

					// Fetch the content
					 
				},
				error: function(jqXHR, textStatus, errorThrown){
					document.location.href = url;
					return false;
				}
			}); // end ajax

		}); // end onStateChange

	}); // end onDomLoad

})(window); // end closure