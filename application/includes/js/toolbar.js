mw.module_selector = {
  prepare:function(){
    var module_item_width = 0;
    $("#modules_bar li").each(function(){
      module_item_width += $(this).outerWidth(true);
    });
   $("#modules_bar ul").width(module_item_width);
  },
  init:function(){
      mw.module_selector.prepare();
  }
}
mw.tools = {
  dropdown:function(){
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

});