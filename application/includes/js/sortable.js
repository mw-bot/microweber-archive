





/**
 * Starts the drag and drop functionality
 *
 * @method mw.edit.init_sortables()
 */




mw.edit.init_sortables = function () {
    mw.edit.remove_content_editable();
    $(".mw-sorthandle").show();
     mw.drag.fix_placeholders()
	  mw.drag.fixes()
    // mw.edit.equal_height();

    mw.edit.init_element_handles();



    mw.drag.init(".element,.row");
    mw.drag.init(".module-item");
    mw.drag.sort(".element > *,.edit,.column > *");
};



mw.isDrag = false;

mw.dragCurrent = null;

mw.drag = {
    init:function(selector, callback){
      $(selector).not(".ui-draggable").draggable({
            handle: ".mw-sorthandle",
            cursorAt: {
                top: -20,
                left: -20
            },
            helper:'original',
            start:function(){
               mw.isDrag = true;
               mw.dragCurrent = this;
			   
               $(this).addClass("mw_drag_started");
            },
            stop:function(){
              mw.isDrag = false;
              $(this).removeClass("mw_drag_started");
              if(typeof callback==='function'){
                callback.call(this);
              }

              if($(mw.dragCurrent).hasClass("module-item")){
                setTimeout(function(){
                  mw.drag.load_new_modules();
				//   mw.drag.fix_placeholders()
                }, 50);
              }

            }
      });
    },
    sort:function(selector){
        $(selector).unbind('mouseenter mouseleave');
        $(selector).bind("mouseenter", function(event){
          if(mw.isDrag){
            mw.drag.destroy_dropables();
            mw.drag.display_dropables(this);

            if (window.console != undefined) {
                          console.log('mouseenter while dragging ' );
                      }

            event.stopPropagation();
          }
        });
        $(selector).bind("mouseleave", function(event){
          if(mw.isDrag){
            setTimeout(function(){
              if($(".mw_dropable_hover").length==0){
                 mw.drag.destroy_dropables();
              }
            }, 37); //must have setTimeout cause of the droppable hover


             if (window.console != undefined) {
                          console.log('mouseleave while dragging ' );
                      }

            event.stopPropagation();
          }
        });

        mw.drag.the_drop(selector);
    },
    the_drop:function(selector){
          $(selector).mouseup(function(event){
              if(mw.isDrag){
                var el = this;
                setTimeout(function(){
                    $(mw.dragCurrent).hide();
                    $(".mw_dropable").replaceWith(mw.dragCurrent);
                    $(mw.dragCurrent).fadeIn('slow');
                    mw.drag.fixes();
					  mw.drag.fix_placeholders()
                    event.stopPropagation();
                }, 37);
              }
          });
    },
    create_dropable:function(elem){
        var dropable = document.createElement('div');
        dropable.className = 'mw_dropable';
        dropable.innerHTML = 'Drop your module here';
        $(dropable).hover(function(){$(this).addClass("mw_dropable_hover")}, function(){$(this).removeClass("mw_dropable_hover")});
        var w = $(elem).width();
        $(dropable).width(w);
		 $(dropable).addClass('mw_dropable_hover');
        return dropable;
    },
    destroy_dropables:function(){
      $(".mw_dropable").remove();
    },
    display_dropables:function(selector){
        var drop_bottom = mw.drag.create_dropable(selector);
        drop_bottom.style.display='none';
        $(drop_bottom).addClass("drop_bottom");
        $(selector).after(drop_bottom);
        $(drop_bottom).fadeIn(200);
    },
    fixes:function(){
      $(".column, .element, .row", '.edit').height('auto');
	  $('.row', '.edit').equalWidths();
      $(mw.dragCurrent).removeAttr('style');
      $(".element", '.edit').removeAttr('style');

      $(".column", '.edit').each(function(){
        var el = $(this);
        if(el.children().length==0){
			
			
			
			
            el.height(el.parent().height());
        }
      });

    },


	/**
	 * fix_placeholders in the layout
	 *
	 * @method mw.drag.fix_placeholders()
	 */
	fix_placeholders: function () {

 



$('.column').each(function() {
			 $this = $(this);
			 
            if ($("div.element", this).size() == 0) {
				
				 
				text = mw.settings.empty_column_placeholder.toString();
				
				     
				$some_el_id = 'mw-placeholder-'+mw.random();
				text = text.replace(/_ID_/g,$some_el_id );

				
                $(this).html(text);
				mw.drag.sort('#'+$some_el_id);
				 
            } else {
                $(this).children('.empty-element').remove()
            }
		});


		 
		
		
	 
		
		
	},



















    /**
	 * Loads new dropped modules
	 *
	 * @method mw.drag.load_new_modules()
	 */
	load_new_modules: function () {
	    $(".edit .module-item img").each(function(){
	      var clone = $(this).clone(true);
          $(this).parent().replaceWith(clone);
	    });
		$need_re_init = false;
		$(".module_draggable", '.edit').each(function (c) {
			//$(this).unwrap(".module-item");
			$name = $(this).attr("data-module-name");
			if ($name && $name != 'undefined' && $name != false && $name != '') {
				$el_id_new = 'mw-col-' + mw.random();
				$(this).after("<div class='element mw-module-wrap' id='" + $el_id_new + "'></div>");
                mw.drag.load_module($name, '#' + $el_id_new);

			}
			$name = $(this).attr("data-element-name");
			if ($name && $name != 'undefined' && $name != false && $name != '') {
				$el_id_new = 'mw-layout-element-' + new Date().getTime() + Math.floor(Math.random() * 101);
				$(this).after("<div class='mw-layout-holder' id='" + $el_id_new + "'></div>");
				mw.drag.load_layout_element($name, '#' + $el_id_new);
			}
			$need_re_init = true;
		});

		//

		if ($need_re_init == true) {
			if (!mw.isDrag) {

            setTimeout(function(){
              mw.edit.init_element_handles();
              mw.drag.fixes();
            }, 100);

			setTimeout("mw.edit.init_sortables()", 300);




			}
		}
	}  ,

    	/**
	 * Loads new dropped layouts
	 *
	 * @method mw.edit.load_layout_element()
	 */
	load_layout_element: function ($layout_element_name, $update_element) {

		var attributes = {};
		attributes.element = $layout_element_name;

		url1 = mw.settings.site_url + 'api/content/load_layout_element';
		$($update_element).load(url1, attributes, function () {
			window.mw_sortables_created = false;
		});
		  //	mw.edit.unwrap_layout_holder()
	},





    	/**
	 * Loads module is element id
	 *
	 * @method mw.edit.load_layout_element()
	 */
	load_module: function ($module_name, $update_element) {
		var attributes = {};
		attributes.module = $module_name;

		url1 = mw.settings.site_url + 'api/module';
		$($update_element).load(url1, attributes, function () {
			window.mw_sortables_created = false;
		});

	},









}



















































