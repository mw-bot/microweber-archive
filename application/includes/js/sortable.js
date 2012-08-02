/**
 * Starts the drag and drop functionality
 *
 * @method mw.edit.init_sortables()
 */
mw.edit.init_sortables = function () {

    mw.drag.create();

};


mw.isDrag = false;
mw.resizable_row_width = false;
mw.mouse_over_handle = false;
mw.external_content_dragged = false;


mw.have_new_items = false;

mw.dragCurrent = null;
mw.currentDragMouseOver = null;


mw.dropables = {
  prepare:function(){
    var dropable = document.createElement('div');
    dropable.className = 'mw_dropable';
    dropable.innerHTML = '<span class="mw_dropable_arr"></span>';
    document.body.appendChild(dropable);
    mw.dropable = $(dropable);
    mw.dropable.bind("mouseenter", function(){
      $(this).hide();
    });
  },
  display:function(el){
    var el = $(el);
    var offset = el.offset();
    var width = el.outerWidth();
    var height = el.outerHeight();
    if(mw.drop_regions.global_drop_is_in_region){
        //console.log(1)
    }
    else{
      mw.dropable.css({
          top:offset.top+height,
          left:offset.left,
          width:width
      });
    }

  }
}


mw.drag = {

	create: function () {
         mw.top_half = false;
         $(document.body).mousemove(function(event){
           mw.mouse = {
             x:event.pageX,
             y:event.pageY
           }
           if(mw.isDrag && mw.currentDragMouseOver!=null){

            var el = $(mw.currentDragMouseOver);
            $(".ui-draggable-dragging").show();
            if(el.hasClass("ui-draggable-dragging") || el.parents(".ui-draggable-dragging").length>0){
              // check if mouse is over the dragging element
              return false;
            }

            var body = $(this);

            var offset = el.offset();
            var height = el.outerHeight();
            var width = el.width();


            if(mw.drop_regions.global_drop_is_in_region){

              mw.dropable.addClass("mw_dropable_vertical");
              if(mw.drop_regions.which=='left'){
                mw.dropable.data("position", 'left');

                 mw.dropable.css({
                      top:offset.top,
                      height:height,
                      left:offset.left,
                      width:2
                 });
              }
              else{
                  mw.dropable.data("position", 'right');
                  mw.dropable.css({
                      top:offset.top,
                      left:offset.left+width,
                      height:height,
                      width:2
                 });
              }
            }
            else{
                mw.dropable.removeClass("mw_dropable_vertical");
                if(event.pageY > offset.top+(height/2)){  //is on the bottom part

                  mw.top_half = false;
                  mw.dropable.css({
                    top:offset.top+height+2,
                    left:offset.left,
                    height:2,
                    width:width
                  });
                  mw.dropable.data("position", "bottom");
                  mw.dropable.removeClass("mw_dropable_arr_up");
                }
                else{
                  mw.top_half = true;
                  mw.dropable.css({
                    top:offset.top-2,
                    left:offset.left,
                    height:2,
                    width:width
                  });
                  mw.dropable.data("position", "top");
                  mw.dropable.addClass("mw_dropable_arr_up");
                }
            }






            if(el.hasClass("element") || el.hasClass("row") || el.parents(".row").length>0 || el.parents(".element").length>0){
                if(el.hasClass("empty-element")){
                    mw.dropable.hide();
                }
                else{
                    mw.dropable.show();
                }
            }
            else{
               mw.dropable.hide();
            }
           }
         });


        mw.dropables.prepare();

	    mw.edit.remove_content_editable();

		mw.drag.fix_placeholders(true);
		mw.drag.fixes()

		mw.drag.init(".element, .row");
		mw.drag.init(".module-item");
		mw.drag.sort(".element > *,.edit,.column > *");

        mw.drag.edit(".element > *");
		mw.drag.fix_handles();
        mw.drag.fix_column_sizes_to_percent();
		mw.resizable_columns();

        $(document.body).mouseup(function(event){
        	if(mw.isDrag && mw.dropable.is(":hidden")){
        		$(".ui-draggable-dragging").animate({top:0,left:0});
        	}
            $(this).removeClass("not-allowed");
        });







	},


	init: function (selector, callback) {

        $(selector).not(".ui-draggable").each(function(){
            var el = $(this);
            if( el.hasClass("module-item")){
                helper = function(event, ui) {
                    return mw.dragCurrent = $(this).clone(true).appendTo('body').css({'zIndex':5});
                }
            }
            else {
                helper = 'original'
            }
            el.draggable({
                handle: ".mw-sorthandle-moveit",
            	cursorAt: {
            		top: -30
            	},
            	helper: helper,
            	start: function () {
            		mw.isDrag = true;
            		mw.dragCurrent = this;
            		mw.drag.edit_remove();
            		$(this).addClass("mw_drag_started");
            		mw.drag.fixes();
            	},
            	stop: function (event, ui) {
            		mw.isDrag = false;
            		$(this).removeClass("mw_drag_started");
            		if ($(mw.dragCurrent).hasClass("module-item")) {
                    mw.have_new_items = true;
                       setTimeout(function () {
                        mw.drag.load_new_modules()
                        mw.drag.fix_column_sizes_to_percent()
                      }, 300);
            		}
                    else {
                      setTimeout(function () {
                        mw.drag.edit_remove();
                        mw.drag.fix_placeholders();
                        mw.drag.fix_column_sizes_to_percent()
                      }, 100);
            		}
                 if (typeof callback === 'function') {
            			callback.call(this);
            	 }
                 $(".row").css({marginTop:'0px',marginBottom:'0px'});
            	}
            });
            $(this).mouseover(function(event){
              $(".mw-sorthandle").invisible();
              $(".element-active").removeClass("element-active");
              $(this).not(".module-item").addClass("element-active");
              $(this).find(".mw-sorthandle").eq(0).visible();
              event.stopPropagation();
            });
            $(this).mouseleave(function(event){
              $(".mw-sorthandle").invisible();
               var el = $(this);
               el.removeClass("element-active");
               $(this).removeClass("mw-sorthandle-active");
               $(this).parents(".element").eq(0).addClass("element-active");
              $(this).parents(".element").eq(0).find(".mw-sorthandle").eq(0).visible();
              //event.stopPropagation();
            });
        });

	},

	sort_handles_events: function (selector) {
		if (selector == undefined) {
			selector = '.mw-sorthandle';
		}
		$(selector).unbind('mousedown');
		$(selector).bind("mousedown", function (event) {
			if (!mw.isDrag) {
				mw.drag.sort(".element > *");
				mw.drag.edit_remove();
			}
		});

       $(selector).find(".mw-sorthandle-moveit").hover(function(){
            $(this).parent().parent().addClass("moveit-hover");
       }, function(){
           $(this).parent().parent().removeClass("moveit-hover");
       });

	},
	sort: function (selector) {
         var selector = selector || '.row, .edit';

         $(selector).not(".mw-sorthandle").bind("mouseleave", function(event){
           if (mw.isDrag) {
             mw.currentDragMouseOver = this;
             var el = this;
             var offset = $(el).offset();
             if(offset.top>event.pageY){
                mw.dropable.data("position", "top");
             }
             else{
                mw.dropable.data("position", "bottom");
             }
           }

         });
         $(selector).notmouseenter().bind("mouseenter", function(){
           if(mw.isDrag){
                mw.currentDragMouseOver = null;
           }
         });

		$(selector).notmouseenter().not(".mw-sorthandle").bind("mouseenter", function (event) {
			if (mw.isDrag) {
    			if (this.className.indexOf('ui-draggable-dragging')==-1 && $(this).parents(".ui-draggable-dragging").length==0) {
                   mw.currentDragMouseOver = this;
                   $(".currentDragMouseOver").removeClass("currentDragMouseOver");
                   $(this).addClass("currentDragMouseOver");
                   if(!$(this).hasClass("empty-element")){
                       mw.dropables.display(this);
                       event.stopPropagation();
                   }
    			}
			}
			else {
				var el = $(this);
				if (el.hasClass("mw-sorthandle")) {
					mw.mouse_over_handle = true;

				}
				else {

					setTimeout(function () {
						mw.mouse_over_handle = false;
					}, 200);
				}


			}
			event.stopPropagation();
		});
        $(selector).bind("mouseleave", function(){

          if (mw.isDrag) {
            mw.currentDragMouseOver = null; }
        });

    	mw.drag.the_drop();
		return $(selector);
	},

    the_drop: function () {
		$(document.body).bind("mouseup", function (event) {
			if (mw.isDrag) {
				var el = this;
				setTimeout(function () {
                        var position = mw.dropable.data("position");
                        var hovered = $(mw.currentDragMouseOver);
                        if(hovered.hasClass("empty-element")){
                           hovered.before(mw.dragCurrent);
                           $(mw.dragCurrent).removeClass("mw_drag_float");
                                 $(mw.dragCurrent).removeClass("mw_drag_float_right");
                        }
                        else{

                              if(position=='top'){
                                 $(mw.dragCurrent).removeClass("mw_drag_float");
                                 $(mw.dragCurrent).removeClass("mw_drag_float_right");
                                 hovered.removeClass("mw_drag_float");
                                 if(hovered.hasClass("edit")){
                                    hovered.append(mw.dragCurrent);
                                 }
                                 else{
                                     if(hovered.prev(".mw-sorthandle").length==0){//if is NOT the first child ??
                                        hovered.before(mw.dragCurrent);
                                     }
                                     else{
                                       var parent = hovered.parent();
                                       if(parent.hasClass("edit")){
                                          parent.append(mw.dragCurrent);
                                       }
                                       else{
                                          parent.before(mw.dragCurrent);
                                       }
                                     }
                                 }
                              }
                              else if(position=='bottom'){
                                $(mw.dragCurrent).removeClass("mw_drag_float");
                                $(mw.dragCurrent).removeClass("mw_drag_float_right");
                                 hovered.removeClass("mw_drag_float");
                                 if(hovered.hasClass("edit")){
                                    hovered.prepend(mw.dragCurrent);
                                 }
                                 else{
                                     if(hovered.next().length==0){  //if is last child
                                        var parent = hovered.parent();
                                        if(parent.hasClass("edit")){
                                            parent.prepend(mw.dragCurrent);
                                         }
                                         else{
                                            parent.after(mw.dragCurrent);
                                         }
                                     }
                                     else{
                                        hovered.after(mw.dragCurrent);
                                     }
                                 }
                              }
                              else if(position=='left'){


                                hovered.before(mw.dragCurrent);

                                setTimeout(function(){
                                   $(mw.dragCurrent).addClass("mw_drag_float");
                                   $(mw.dragCurrent).removeClass("mw_drag_float_right");
                                }, 73);

                              }
                              else if(position=='right'){
                                $(mw.dragCurrent).removeClass("mw_drag_float");
                                $(mw.dragCurrent).addClass("mw_drag_float_right");

                                hovered.before(mw.dragCurrent);

                                setTimeout(function(){
                                    hovered.removeClass("mw_drag_float");
                                }, 73);
                              }
                        }
                    if(mw.have_new_items == true){
                        mw.drag.load_new_modules();
                    }
                    $(mw.dragCurrent).show();
                    mw.drag.fixes();
                    setTimeout(function(){mw.drag.fix_placeholders();}, 40)
                    mw.resizable_columns();
                    mw.dropable.hide();



					event.stopPropagation();

                    $(".currentDragMouseOver").removeClass("currentDragMouseOver");
            mw.currentDragMouseOver = null;
				}, 37);
			}


		});
	},
	/**
	 * Various fixes
	 *
	 * @method mw.drag.fixes()
	 */
	fixes: function () {
		$("img[data-module-name]", '.edit').remove();
		$(".column, .element, .row", '.edit').height('auto');
        $(mw.dragCurrent).css({
          top:'',
          left:''
        });
		//$(mw.dragCurrent).removeAttr('style');
		//$(".element", '.edit').removeAttr('style');
		$(".column", '.edit').each(function () {
			var el = $(this);
			if (el.children().length == 0 || (el.children('.empty-element').length > 0) || el.children('.ui-draggable-dragging').length > 0) {
				if (el.height() < el.parent().height()) {
					el.height(el.parent().height());
				}
                else {
					el.height('auto');
				}
			}
			else {
				el.children('.empty-element').height('auto');
				el.height('auto');
				el.parents('.row:first').height('auto')
			}
		});
	},
    /**
	 * fix_placeholders in the layout
	 *
	 * @method mw.drag.fix_placeholders(isHard , selector)
	 */
    fix_placeholders:function(isHard, selector){
      var selector = selector || '.row';
      if(isHard){ //append the empty elements
       $(selector).each(function(){
          var el = $(this);
          el.children("div.column").each(function(){
            var the_empty_child = $(this).children("div.empty-element");
            if(the_empty_child.length==0){
              $(this).append('<div class="empty-element" id="mw-placeholder-'+mw.random()+'"></div>');
              var the_empty_child = $(this).children("div.empty-element");
            }
          });
        });
      }
      //scale the empty elements
      $("div.empty-element").css({position:'absolute'});
      $("div.empty-element").parent().height('auto');
      $("div.empty-element").each(function(){
        var el = $(this);
        var the_row_height = el.parents(".row").eq(0).height();
        var the_column_height = el.parent().height();
        el.css({height:the_row_height-the_column_height, position:'relative'});
      });
    },

    /**
	 * Makes handles for all elements
	 *
	 * @method mw.drag.fix_column_sizes_to_percent()
	 */
	fix_column_sizes_to_percent: function (row_id_or_object) {
	  return false;


		if (mw.isDrag == false) {
		 if(row_id_or_object == undefined){
             row_id_or_object = '.row'

        }

            $(row_id_or_object, '.edit').each(function () {
			var the_row = $(this);
                var the_cols = $(this).children(".column");
                var the_cols_n = $(this).children(".column").length;
            $row_max_w =the_row.width();

            $j = 1;
            $remaining_percent_for_the_last_col = 100;
               the_cols.each(function () {
			        var the_col = $(this);
                    if($j < the_cols_n){
                      	var w = (100 * parseFloat($(this).width()) / parseFloat($row_max_w));
  						var wRight = 100 - w;
                        $remaining_percent_for_the_last_col = $remaining_percent_for_the_last_col - w;
  					    w = (w);
                        w += "%";
  						wRight += "%";
  						$(this).width(w);
                    } else {
                         w = ($remaining_percent_for_the_last_col);
                        $(this).width(w+"%");
                    }
                $j++;
		        });
		});
		}
	},



	/**
	 * Makes handles for all elements
	 *
	 * @method mw.drag.fix_handles()
	 */
	fix_handles: function () {

		if (mw.isDrag == false) {
			$('.row', '.edit').each(function (index) {
				$has = $(this).children("div:first").hasClass("mw-sorthandle-row");
				if ($has == false) {
					$(this).prepend(mw.settings.sorthandle_row);
				}
				$el_id = $(this).attr('id');
				if ($el_id == undefined || $el_id == 'undefined') {
					$el_id = 'mw-row-' + new Date().getTime() + Math.floor(Math.random() * 101);
					$(this).attr('id', $el_id);
				}
				mw.edit.init_row_handles($el_id);
			});

			$('.element:not(.empty-element)', '.edit').each(function (index) {
				$el_id = $(this).attr('id');
				if ($el_id == undefined || $el_id == 'undefined') {
					$el_id = 'mw-element-' + new Date().getTime() + Math.floor(Math.random() * 101);
					$(this).attr('id', $el_id);
				}
				$has = $(this).children(":first").hasClass("mw-sorthandle-col");
				if ($has == false) {
					$has_module = $(this).hasClass("module");
					if ($has_module == false) {
						text = mw.settings.sorthandle_col
					}
					else {
						$m_name = $(this).attr('data-type');

						$m_id = $(this).attr('id');
						text = mw.settings.sorthandle_module
						text = text.replace(/MODULE_NAME/g, "" + '' + $m_name + "");
						text = text.replace(/MODULE_ID/g, "'" + $m_id + "'");
					}
					text = text.replace(/ELEMENT_ID/g, "'" + '' + $el_id + "'");
					$(this).prepend(text);
				}
			})


			$('.mw-sorthandle-main-level', '.edit').removeClass('mw-sorthandle-main-level');
			$('.mw-sorthandle-row-in-column', '.edit').removeClass('mw-sorthandle-row-in-column');
			$('.mw-sorthandle-row-in-element', '.edit').removeClass('mw-sorthandle-row-in-element');
			$('.mw-sorthandle-img-in-element', '.edit').removeClass('mw-sorthandle-img-in-element');
			$('.edit>.row').children('.mw-sorthandle').addClass('.mw-sorthandle-main-level');
			$('.element').find('.row').children('.mw-sorthandle').addClass('mw-sorthandle-row-in-element');
			$('.element').find('img').addClass('mw-sorthandle-img-in-element');
			$('.column').find('.row').children('.mw-sorthandle').addClass('mw-sorthandle-row-in-column');



			mw.drag.sort_handles_events();
			mw.edit.fix_zindex();
		}
	},



	/**
	 * Makes contentEditable events on selector
	 *
	 * @method mw.drag.edit(".element > *");
	 */
	edit: function (selector) {




	  $(selector, '.edit').unbind('mousedown.edit');
		$(selector, '.edit').bind("mousedown.edit", function (e) {
			if (!mw.isDrag) {



				$is_this_module = ($(this).hasClass('module') || $(this).parents(".element:first").hasClass('module'));
				$is_freshereditor = $(this).hasClass('freshereditor');
				$is_this_row = $(this).hasClass('row');
				$is_this_handle = $(this).hasClass('mw-sorthandle');
				$is_mw_delete_element = $(this).hasClass('mw.edit.delete_element');
				$columns_set = $(this).hasClass('columns_set');

				is_image = this.tagName == 'IMG' ? true : false;
				if (window.console != undefined) {
					console.log('mousedown on element : ' + this.tagName);
				}

				if (!$is_freshereditor && !$is_this_module) {
					$(this).closest('.mw-sorthandle').show();

					$el_id = $(this).attr('id');
					if ($el_id == undefined || $el_id == 'undefined') {
						$el_id = 'mw-element-' + mw.random();
						$(this).attr('id', $el_id);
					}
					mw.settings.element_id = $el_id;
					mw.settings.sortables_created = true;
					if (window.console != undefined) {
						console.log('contenteditable started on element id: ' + $el_id);
					}
					mw.settings.text_edit_started = true;

					$is_this_element = $(this).hasClass('.element');
					$(this).addClass('freshereditor');
                    //$(this).parent('.element').freshereditor("edit", true);

                    //$("#mw-text-editor").slideDown();

                   //	$(this).parent('.element').children('.mw-sorthandle').freshereditor("edit", false);
					$(this).parent('.element').children().removeAttr("contenteditable");



                                            		//$(this).parent('.element').children('.module').freshereditor("edit", false);








                     mw.drag.fix_onChange_editable_elements();

                       r = $(this).parents('.row:first');

                       if(r.length > 0 ){
                         $(this).parent('.element').unbind("change");
                            $(this).parent('.element').bind("change", function(event){



                        mw.drag.fix_placeholders(true , r)
                            });
                        }



					if ($.browser.msie) {
						$("img, .element p").each(function () {
							this.oncontrolselect = function () {
								return false
							}
						});
					}





					$('img').attr("contenteditable", false);

					$('.element.mw-module-wrap').attr("contenteditable", false);
					//$(this).parent('.element').children('.mw-sorthandle').freshereditor("edit", false);
					setTimeout("mw.settings.sorthandle_hover=false", 300);
					e.stopPropagation();
				}
				else {
					mw.settings.sorthandle_hover = true;
				}
			}
		});


       

	},

	/**
	 * Removes contentEditable for ALL elements
	 *
	 * @method mw.drag.edit_remove();
	 */
	edit_remove: function () {



		//$('.freshereditor', '.edit').freshereditor("edit", false);
		$('.freshereditor', '.edit').removeClass("freshereditor");
		$('*[contenteditable]', '.edit').removeAttr("contenteditable");

         //$("#mw-text-editor").slideUp();


	},


    /**
     * One call of this function fixes all ContentEditable elements in the page to have onchange event.
	 *
	 * @method mw.drag.fix_onChange_editable_elements();
	 */
    fix_onChange_editable_elements : function()   {
      $('[contenteditable]').live('focus', function() {
    var $this = $(this);
    $this.data('before', $this.html());
    return $this;
}).live('blur keyup paste', function() {
    var $this = $(this);
    if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        $this.trigger('change');
    }
    return $this;
});
    },



	/**
	 * Loads new dropped modules
	 *
	 * @method mw.drag.load_new_modules()
	 */
	load_new_modules: function (callback) {



		$(".edit .module-item img").each(function () {
		   	var clone = $(this).clone(true);


			$(this).parents("li").eq(0).replaceWith(clone);


		});

		
	 
		
		$need_re_init = false;

		$(".module_draggable", '.edit').each(function (c) {
			
			$name = $(this).attr("data-module-name");
		   //	if ($name && $name != 'undefined' && $name != false && $name != '') {
				$el_id_new = 'mw-module-' + mw.random();

                $(this).after("<div class='element mw-module-wrap' id='" + $el_id_new + "'></div>");

				mw.drag.load_module($name, '#' + $el_id_new);

			   $(this).remove();

		   //	}
			$name = $(this).attr("data-element-name");
			if ($name && $name != 'undefined' && $name != false && $name != '') {
				$el_id_new = 'mw-layout-element-' + new Date().getTime() + Math.floor(Math.random() * 101);
				$(this).after("<div class='mw-layout-holder' id='" + $el_id_new + "'></div>");
			//	mw.drag.load_layout_element($name, '#' + $el_id_new);
			

				mw.drag.load_module($name,'#' + $el_id_new);
				$(this).remove();


			}
			$need_re_init = true;
		});
 if(mw.have_new_items == true){
              $need_re_init = true;
          }

		if ($need_re_init == true) {
			if (!mw.isDrag) {


                if (typeof callback === 'function') {
    				callback.call(this);
				}
				setTimeout("mw.drag.create()", 200);
			}
		}

        mw.have_new_items = false;

	},

	/**
	 * Loads new dropped layouts
	 *
	 * @method mw.edit.load_layout_element()
	 */
	load_layout_element: function ($layout_element_name, $update_element) {

		var attributes = {};
		attributes.element = $layout_element_name;

		url1 = mw.settings.site_url + 'api/content/load_layout_element';
		$($update_element).load_modules(url1, attributes, function () {
			window.mw_sortables_created = false;
            mw.image.resize.init($update_element + " img");
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
		$($update_element).load_modules(url1, attributes, function () {
			window.mw_sortables_created = false;
		});

	}


}







jQuery.fn.extend({
	load_modules: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf( " " );
		if ( off >= 0 ) {
			var selector = url.slice( off, url.length );
			url = url.slice( 0, off );
		}


		var type = "GET";


		if ( params ) {

			if ( jQuery.isFunction( params ) ) {

				callback = params;
				params = undefined;


			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;


		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,

			complete: function( jqXHR, status, responseText ) {

				responseText = jqXHR.responseText;

				if ( jqXHR.isResolved() ) {

					jqXHR.done(function( r ) {
						responseText = r;
					});

					self.after( selector ?

						jQuery("<div>")
							.append(responseText.replace(rscript, ""))


							.find(selector) :

						responseText );
				}

				if ( callback ) {
					self.each( callback, [ responseText, status, jqXHR ] );
				}
				

				self.remove();

                mw.drag.fix_handles();
                mw.drag.fixes();
                mw.drag.fix_placeholders();

			}
		});

		return this;
	}});




$.fn.mwUnwrap = function() {
    this.parent(':not(body)').each(function(){
        $(this).replaceWith( this.childNodes );
    });
    return this;
};

/**
 * Makes resizable columns
 *
 * @method mw.resizable_columns()
 */
mw.resizable_columns = function () {



	$('.edit').find('.column').not('.ui-resizable').each(function () {


		$el_id_column = $(this).attr('id');
		if ($el_id_column == undefined || $el_id_column == 'undefined') {
			$el_id_column = 'mw-column-' + new Date().getTime() + Math.floor(Math.random() * 101);
			$(this).attr('id', $el_id_column);
		}
		this_col_id = $el_id_column;
		var parent1 = $(this).parent('.row');
		$(this).css({
			width: $(this).width() / parent1.width() * 100 + "%"
		});
		$is_done = $(this).hasClass('ui-resizable')
		$ds = mw.settings.drag_started;
		$is_done = false;
		if ($is_done == false) {

			$inner_column = $(this).children(".column:first");
			$prow = $(this).parent('.row').attr('id');
			$no_next = false;


			$also = $(this).next(".column");
			$also_check_exist = $also.size();
			if ($also_check_exist == 0) {
				$no_next = true;
				$also = $(this).prev(".column");
			}



			$also_el_id_column = $also.attr('id');
			if ($also_el_id_column == undefined || $also_el_id_column == 'undefined' || $also_el_id_column == '') {
				$also_el_id_column = 'mw-column-' + mw.random();
				$also.attr('id', $also_el_id_column);
			}
			$also_reverse_id = $also_el_id_column;

			$also_inner_items = $inner_column.attr('id');


		  $(this).parent(".column").resizable("destroy")
			$(this).children(".column").resizable("destroy")

			if ($no_next == false) {
				$handles = 'e'
			}
			else {
				$handles = 'none'
			}


			if ($no_next == false ) {

				$last_c_w = $(this).parent('.row').children('.column').last().width();
				$row_max_w = $(this).parent('.row').width();


				$(this).attr("data-also-rezise-item", $also_reverse_id);
                mw.global_resizes = {
                  next:'',
                  sum:0
                }
				$(this).resizable({
					handles: $handles,
					ghost:false,
					containment: "parent",
                    greedy:true,
					cancel: ".mw-sorthandle",
					minWidth: 150,
					//maxWidth: $row_max_w - $last_c_w,
					alsoResize: '#' + $also_inner_items,
					resize: function (event, ui) {
						mw.global_resizes.next.width(Math.floor(mw.global_resizes.sum-ui.size.width-10));
                        if(mw.global_resizes.next.width()<151){
                           $(this).resizable("option", "maxWidth", ui.size.width);
                        }
                        mw.settings.resize_started = true;
					},
					create: function (event, ui) {
						//$(".row", '.edit').equalWidths();
					   	mw.edit.equal_height();


						var el = $(this);

						el.find(".ui-resizable-e:first").append('<span class="resize_arrows"></span>');

						el.mousemove(function (event) {
							el.children(".ui-resizable-e").find(".resize_arrows:first").css({
								"top": (event.pageY - el.offset().top) + "px"
							});

						});


					},
					start: function (event, ui) {
					  $(this).resizable("option", "maxWidth", 9999);
						$(".column", '.edit').each(function () {
							$(this).removeClass('selected');
						});

						mw.global_resizes.next = $(this).next().length>0?$(this).next():$(this).prev();

						mw.global_resizes.sum = ui.size.width + mw.global_resizes.next.width();

						$r = $(this).parent('.row');

						$row_w = $r.width();
						mw.resizable_row_width = $row_w;


						ui.element.addClass('selected');
						mw.settings.resize_started = true;
					},
					stop: function (event, ui) {

                        var parent = ui.element.parent('.row');
                        mw.drag.fix_column_sizes_to_percent(parent);

						mw.edit.fix_zindex();
						mw.settings.resize_started = false;
						mw.drag.fixes()
						mw.drag.fix_placeholders()
					}
				});
			}
		}
	});








}