
mw.tools = {
  preloader:function(init, element){
    if(init=='stop'){$("#preloader").hide()}
    else{
      var el = $("#element");
      var offset = el.offset();
      var w = el.width();
      var h = el.height();

    }
  },
  modal:{
    source:function(){
      var id = "modal_"+mw.random();
      var html = ''
        + '<div class="mw_modal" id="'+id+'">'
          + '<div class="mw_modal_container">'
          + '</div>'
          + '<span class="mw_modal_close" onclick="$(this).parent().remove();">Close</span>'
        + '</div>';
        return {html:html, id:id}
    },
    init:function(html, width, height, callback){
        var modal = mw.tools.modal.source();
        $(document.body).append(modal.html);
        var modal_object = $(document.getElementById(modal.id));
        modal_object.width(width).height(height).find(".mw_modal_container").append(html);
        modal_object.css({marginTop:-height/2,marginLeft:-width/2});
        modal_object.show();
        var modal_return = {main:modal_object, container:modal_object.find(".mw_modal_container")[0]}
        typeof callback!='undefined'?callback.call(modal_return):'';
        return modal_return;
    }
  },
  dropdown:function(callback){
    $(".mw_dropdown").hover(function(){
        $(this).addClass("hover");
        var dropdown = this;
        setTimeout(function(){
          if($(dropdown).hasClass("hover")){
            $(dropdown).find(".mw_dropdown_fields").show();
          }
        }, 250);
    }, function(){
        $(this).removeClass("hover");
        $(this).find(".mw_dropdown_fields").hide();
    });
    $(".mw_dropdown a").click(function(){
      $(this).parents(".mw_dropdown_fields").hide();
      var html = $(this).html();
      $(this).parents(".mw_dropdown").find(".mw_dropdown_val").html(html);
      return false;
    });
  },
  module_slider:{
    scale:function(){
      var window_width = $(window).width();
      $(".modules_bar").each(function(){
           $(this).width(window_width-260);
           $(this).find(".modules_bar_slider").width(window_width-220);
      });
    },
    prepare:function(){
      $(".modules_bar").each(function(){
          var module_item_width = 0;
          $(this).find("li").each(function(){
            module_item_width += $(this).outerWidth(true);
          });
          $(this).find("ul").width(module_item_width);
      });
    },
    init:function(){
        mw.tools.module_slider.prepare();
        mw.tools.module_slider.scale();
    }
  },
  toolbar_tabs:{
    get_active:function(){
        var hash = window.location.hash;
        if(hash==''){
          return '#tab_modules';
        }
        else{
            return hash.replace(/mw_/g, '');
        }
    },
    change:function(){
       var hash = mw.tools.toolbar_tabs.get_active();
       $("#mw_tabs a").removeClass("active");
       var xdiez =hash.replace("#", "");
       $("#mw_tabs a[href*='"+xdiez+"']").addClass("active");
       $(".mw_tab_active").removeClass("mw_tab_active");
       $(hash).addClass("mw_tab_active");
    },
    init:function(){
        $(window).bind('hashchange', function(){
            mw.tools.toolbar_tabs.change();
        });
        mw.tools.toolbar_tabs.change();
    }
  },
  toolbar_slider:{
    slide_left:function(item){
       var item = $(item);
        mw.tools.toolbar_slider.ctrl_show_hide();
        var left = item.parent().find(".modules_bar").scrollLeft();
       item.parent().find(".modules_bar").stop().animate({scrollLeft:left-120}, function(){
            mw.tools.toolbar_slider.ctrl_show_hide();
        });
    },
    ctrl_show_hide:function(){
      $(".modules_bar").each(function(){
          var el = $(this);
          var parent = el.parent();
          if(el.scrollLeft()==0){
            parent.find(".modules_bar_slide_left").hide();
          }
          else{
            parent.find(".modules_bar_slide_left").show();
          }
          var max = el.width() + el.scrollLeft();
          if(max==this.scrollWidth){
             parent.find(".modules_bar_slide_right").hide();
          }
          else{
             parent.find(".modules_bar_slide_right").show();
          }
      });

    },
    ctrl_states:function(){
       $(".modules_bar_slide_right,.modules_bar_slide_left").mousedown(function(){
         $(this).addClass("active");
       });
       $(".modules_bar_slide_right,.modules_bar_slide_left").bind("mouseup mouseout",function(){
         $(this).removeClass("active");
       });
    },
    slide_right:function(item){
      var item = $(item);
       mw.tools.toolbar_slider.ctrl_show_hide();
       var left = item.parent().find(".modules_bar").scrollLeft();
       item.parent().find(".modules_bar").stop().animate({scrollLeft:left+120}, function(){
             mw.tools.toolbar_slider.ctrl_show_hide();
       });
    },
    init:function(){
        $(".modules_bar").scrollLeft(0);
        mw.tools.toolbar_slider.ctrl_show_hide();
        $(".modules_bar_slide_left").click(function(){
            mw.tools.toolbar_slider.slide_left(this);
        }).disableSelection();
        $(".modules_bar_slide_right").click(function(){
            mw.tools.toolbar_slider.slide_right(this);
        }).disableSelection();
        mw.tools.toolbar_slider.ctrl_states();
    }
  }
}
mw.extras = {
  fullscreen:function(el){
      if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen();
      } else if(el.mozRequestFullScreen){
        el.mozRequestFullScreen();
      }
  },
  get_filename:function(s) {
    var d = s.lastIndexOf('.');
    return s.substring(s.lastIndexOf('/') + 1, d < 0 ? s.length : d);
  }
}

mw.random = function(){return Math.floor(Math.random()*9999999);}


mw.edit.image_settings={
    html:function(){
        var id = 'image_'+mw.random();
        var html = ''
        + '<div onmouseleave="$(this).remove();" class="mw_image_settings" id="'+id+'">'
          +  '<span class="image_close">Close</span>'
          +  '<span class="image_change">Change</span>'
        + '</div>';
        return {html:html,id:id};
    },
    prepare:function(){
       var item = mw.edit.image_settings.html();
       $(document.body).append(item.html);
       return item.id;
    },
    scale:function(el, id){
        var offset = $(el).offset();
        var width = $(el).outerWidth();
        var height = $(el).outerHeight();
        $("#" + id).css({
          left:offset.left,
          top:offset.top,
          width:width,
          height:height,
          display:'block'
        });
    },
    init:function(el){
       var id = mw.edit.image_settings.prepare();
       mw.edit.image_settings.scale(el, id);

       mw.edit.image_settings.del_init(id, el);
       mw.edit.image_settings.change_init(id, el);
    },
    del_init:function(id, el){
       $("#"+id).find(".image_close").click(function(){
         var filename = mw.extras.get_filename(el.src);
         if(confirm("Are you sure you want to delete '"+filename+"'?")){
           $(el).slideUp(function(){$(this).remove();});
         }
       });
    },
    change_init:function(id, el){
      $("#"+id).find(".image_change").click(function(){
        var w = $(window).width()-100;
        var h = $(window).height()-100;
        var save_img_url = '/Microweber/save.php';
        //var frame = "<iframe width='"+(w-30)+"' height='"+(h-30)+"' src='http://pixlr.com/express/?wmode=transparent&locktarget=true&target="+save_img_url+"&image=" + el.src + "' scrolling='no' frameborder='0'></iframe>";
        var frame = ":)";
        mw.modal(frame, w, h);
      });
    },
    image_resize:function(selector){
      //chrome, opera, safari

      if($.browser.safari || $.browser.chrome || $.browser.opera || true){
        $(selector).each(function(){
          if(!$(this).parent().hasClass("image_resizer")){
              var w = $(this).width();
              var h = $(this).height();
              $(this).wrap("<span class='image_resizer' style='width:"+w+"px;height:"+h+"px'></span>");
          }
        });
        $(".image_resizer").resizable({
           resize: function(event, ui){
            var w = $(this).width();
            var h = $(this).height();
            $(this).find("img").attr("width",w).attr("height",h).width(w).height(h);
           }
        });
        $("#typography img").attr("contentEditable", false);
      }
    }
}

//prefixes
mw.modal = mw.tools.modal.init;



mw.modal.prototype.auto = function(){
  alert(1);
}


$(window).load(function(){
        $("#typography img").click(function(){
            mw.edit.image_settings.init(this);
       });



});


$(window).resize(function(){
    mw.tools.module_slider.scale();
    mw.tools.toolbar_slider.ctrl_show_hide();
});