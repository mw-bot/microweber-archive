
mw.tools = {
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
      $("#modules_bar").width($(window).width()-260);
      $("#modules_bar_slider").width($(window).width()-220);
    },
    prepare:function(){
      var module_item_width = 0;
      $("#modules_bar li").each(function(){
        module_item_width += $(this).outerWidth(true);
      });
     $("#modules_bar ul").width(module_item_width);
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
    slide_left:function(){
        mw.tools.toolbar_slider.ctrl_show_hide();
        var left = $("#modules_bar").scrollLeft();
        $("#modules_bar").stop().animate({scrollLeft:left-120}, function(){
            mw.tools.toolbar_slider.ctrl_show_hide();
        });
    },
    ctrl_show_hide:function(){
      if($("#modules_bar").scrollLeft()==0){
        $("#modules_bar_slide_left").hide();
      }
      else{
        $("#modules_bar_slide_left").show();
      }
      var max = $("#modules_bar").width() + $("#modules_bar").scrollLeft();
      var scrollWidth = $("#modules_bar")[0].scrollWidth;
      if(max==scrollWidth){
         $("#modules_bar_slide_right").hide();
      }
      else{
         $("#modules_bar_slide_right").show();
      }
    },
    ctrl_states:function(){
       $("#modules_bar_slide_right,#modules_bar_slide_left").mousedown(function(){
         $(this).addClass("active");
       });
       $("#modules_bar_slide_right,#modules_bar_slide_left").bind("mouseup mouseout",function(){
         $(this).removeClass("active");
       });
    },
    slide_right:function(){
       mw.tools.toolbar_slider.ctrl_show_hide();
       var left = $("#modules_bar").scrollLeft();
       $("#modules_bar").stop().animate({scrollLeft:left+120}, function(){
             mw.tools.toolbar_slider.ctrl_show_hide();
       });
    },
    init:function(){
        $("#modules_bar").scrollLeft(0);
        $("#modules_bar_slide_left").hide();
        $("#modules_bar_slide_left").click(function(){
            mw.tools.toolbar_slider.slide_left();
        }).disableSelection();

        $("#modules_bar_slide_right").click(function(){
            mw.tools.toolbar_slider.slide_right();
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
  }
}



$(window).resize(function(){
    mw.tools.module_slider.scale();
    mw.tools.toolbar_slider.ctrl_show_hide();
});