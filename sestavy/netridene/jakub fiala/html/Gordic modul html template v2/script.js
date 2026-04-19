$(document).ready(function() {
	$(".ediceHeader").click(function(){
      $(this).siblings(".more").stop().slideToggle(400,toggleArrow($(this).children(".buttonSlide")));
    });
    $(".more").css("display","none");
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});
});

$(".showGallery").click(function(){
	$(".fancybox").eq(0).trigger('click');
});

$(".galleryRight img").click(function(){
	$(".fancybox").eq(0).trigger('click');
});

function toggleArrow(x){
    if(x==null)return;
    else{
      var pos = $(x).css("backgroundPosition").split(" ");
      pos[1] = parseInt(pos[1]);
      if(pos[1]< 0) pos[1] = "0px";
      else pos[1] = "-7px";
      $(x).css("backgroundPosition",pos[0]+" "+pos[1]);
    }
}