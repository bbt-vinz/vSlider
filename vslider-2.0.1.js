/*  
 * vSlider 2.0.2 
 * dynamic slideshow / carousel plugin
 * requires : modernizr 2.0.6+ and jquery 1.7+
 * usage : $( element ).vSlider( options );
*/   

(function( $ ) {
  $.fn.vSlider = function( options ) {  

    var settings = $.extend( {      
        itemsperslide    : 1,            // amount of images vslider will slide each time
        spacing          : 0,            // spacing between images
        auto             : 0,            // auto slide - true if more than 0 (in millisecond)
        title            : false,        // show title for each image onclick
        desc             : false,        // show description for each image onclick
        divider          : false,        // add divider to each pagination
        orientation      : "horizontal"  // set orientation
    }, options);

    var self = this.find(".vslider");
    var items = self.find(".item");
    var total = self.find(".item").length;
    var total2 = Math.ceil(total / settings.itemsperslide);
    var slideshow_width =  self.find(".navigation").width();
    var slideshow_height =  self.find(".navigation").height();
    var total_width = total2 * slideshow_width;
    var total_height = total2 * slideshow_height;
    var npos = 0;
    var next,prev,start,end;
 
    function core() {
        // create carousel thumbnails
        if(self.find(".small").length) {
           self.find(".thumb").each(function(i){   
               $(this).css("cssText","background:url("+$(this).find(".small").attr("src").replace(/ /g,"%20").replace(/'/g,"%27").replace("(","%28").replace(")","%29")+") no-repeat 50% 50%");
           });  
        }
    
        // add a wrapper every X items
        if(settings.itemsperslide>1) {
           for(var i = 0; i < total; i+=settings.itemsperslide) {
              items.slice(i, i+settings.itemsperslide).wrapAll("<div class='thumbs'></div>");
           }
        }
        
        // navigation for thumbnails
        self.find(".prev").live("click",function(e) {
          e.preventDefault();
          npos--;
          if(npos < 0) npos = total2-1;
          self.find(".page:eq("+npos+")").click();
          
          resettimer();
        });
        
        self.find(".next").live("click",function(e) {
          e.preventDefault();
          npos++;
          if(npos >= total2) npos = 0;
          self.find(".page:eq("+npos+")").click();
          
          resettimer();
        });
        
        // auto slide
        function autoanimate() {
            (self.find(".next-pane").length)?self.find(".next-pane").click():self.find(".next").click();
        }
      
        // reset timer
        function resettimer() {      
            if(settings.auto>0) {
                clearTimeout(timerhandle);
                timerhandle = setTimeout(autoanimate,settings.auto);
            }
        }
      
        if(settings.auto>0) { var timerhandle = setTimeout(autoanimate,settings.auto); }
        
        // navigation for image pane
        self.find(".next-pane").live("click",function() {
             prev = 0;
             self.find(".thumb.active").parent().next().find(".thumb").click();
             if(next==1) {      
               self.find(".next").click();
               
               if(end==1) {
                  self.find(".thumb:first").click();
                  end=0;
               } else {
                  self.find(".thumb.active").parents(".thumbs").next().find(".thumb:first").click();
               }
               next=0;
             }
          
             (self.find(".thumbs:last .thumb:last").hasClass("active"))?end = 1:end = 0;
                        
             self.find(".thumbs").each(function() {
                if($(".thumb:last",this).hasClass("active"))next=1;
             });
         
             resettimer();
        });
        
        self.find(".prev-pane").live("click",function() {
             next = 0;
             self.find(".thumb.active").parent().prev().find(".thumb").click();
             if(prev==1) {      
               self.find(".prev").click();
               
               if(start==1) {
                  self.find(".thumb:last").click();
                  start=0;
               } else {
                  self.find(".thumb.active").parents(".thumbs").prev().find(".thumb:last").click();
               }
               prev=0;
             }
          
             (self.find(".thumbs:first .thumb:first").hasClass("active"))?start = 1:start = 0;
          
             self.find(".thumbs").each(function() {
                if($(".thumb:first",this).hasClass("active"))prev=1;
             });
             
             resettimer();
        });
        
        // update gallery pane on click
        if(self.find(".img-pane").length) {
            self.find(".thumb").live("click",function(e) {
               e.preventDefault();
        
               $(this).parents(".navigation").parent().prev().find("img").hide().load(function() {
                    $(this).fadeIn();
               }).attr("src",$(this).find("img").attr("url"));
              
               // update title and description
               if(settings.title == true) {
                  self.find(".info-pane h2").html($(this).find("img").attr("title"));
               }
               
               if(settings.desc == true) {
                  self.find(".info-pane span").html($(this).find("img").attr("desc"));
               }
              
               self.find(".thumb").removeClass("active");
               $(this).addClass("active");
              
               resettimer();
            });  
        }
    
        // pagination
        if(self.find(".pagination").length) {
           for( i=0; i < total2; i++) {
              $("<li class='page' rel="+i+">"+(i+1)+"</li>").appendTo(self.find("ul"));  
           };  
           
           self.find(".page").live("click",function(e) {
               e.preventDefault();
               var p = $(this);
               var pos = $(this).attr("rel");         
             
               npos = pos;
               self.find(".page").removeClass("active");
               $(this).addClass("active");
             
               if(settings.orientation=="vertical") {
                  (!Modernizr.csstransitions)?self.find(".screen").stop().animate({top:pos * -(slideshow_height+settings.spacing)}, 350):self.find(".screen").css({"top":pos * -(slideshow_height+settings.spacing)});
               } else {
                  (!Modernizr.csstransitions)?self.find(".screen").stop().animate({left:pos * -(slideshow_width+settings.spacing)}, 350):self.find(".screen").css({"left":pos * -(slideshow_width+settings.spacing)});
               }
             
               var position = p.position();
               if(self.find(".pointer").length) {
                  // animated pointer to center to each pagination
                  if(settings.orientation=="vertical") {
                     ($.browser.msie)?self.find(".pointer").stop().animate({top: ( position.top+(p.height()/2) ) },500):self.find(".pointer").css({"top": ( position.top+(p.height()/2) )  });
                  } else {  
                     ($.browser.msie)?self.find(".pointer").stop().animate({left: ( position.left+(p.width()/2) ) },500):self.find(".pointer").css({"left": ( position.left+(p.width()/2) )  });
                  }
               }
           });
    
           // add divider for pagination
           if(settings.divider==true) {
               self.find(".page + .page").before($('<li class="divider">-</li>'));
           }
                 
           // remove pagination if there's only one page
           self.find(".pagination").each(function() {
               if($(".page",this).length==1) {
                   $(this).hide();
                   self.find(".next,.prev").hide();
               }
           });
        }
      
        // init
        self.find(".thumb:first").click();
    }
    
    this.each(function() {  
        core($(this));  
    });
    
    return this;
    
  };   
})( jQuery );