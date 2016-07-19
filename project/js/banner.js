
	$(function(){
		var $ul = $("#wp-list");
		var $first = $("#wp-list li:first").clone();
		var $last = $("#wp-list li:last").clone();
		$ul.append($first);
		$ul.prepend($last);
		var imgWidth  =  $first.width();
		var li =  $first.width();
		var len = $ul.children("li").length;
		$dotli = $("#dotnav #pointer li");
		var $index = 0 ;
		var timer =null;
		var nowTime = 0;
		$(window).resize(function(){
			imgWidth  =  $first.width();
			$ul.css({"left":""+-(imgWidth*($index+1))+"px"})
		})
		//自动轮播
		auto();
		function auto(){
			timer = setInterval(function(){
				$index++;
				fn();
			},5000);
		};
		//点击
		$dotli.on("click",function(){
				$(this).addClass("selected").siblings().removeClass("selected");
				$index = $(this).index();
				$ul.animate({"left":""+-(imgWidth*($index+1))+"px"},500)
		});
		$btndiv = $("#warp .btn");
		//左右
		$btndiv.hover(function(){
			$(this).addClass("hover")
		},function(){
			$(this).removeClass("hover")
		}).click(function(){
			if(new Date() - nowTime > 500){
				nowTime = new Date();
				var i =$(this).index();
				if(i==3){//right 3是指其索引；
					$index++;
				}else{
					$index--;
				}
				fn();
			}
		}).mousedown(function(){
			return false
		});
		function fn(){
			var $liindex = $index;;
			if ($liindex >3)//3
			{
				$liindex = 0;
			}else if ($liindex<0)
			{
				$liindex = 3;
			}
			$dotli.eq($liindex).addClass("selected").siblings().removeClass("selected");
			$ul.animate({"left":""+-(imgWidth*($index+1))+"px"},500,function(){
				if ($index==len-2){
					$ul.css({"left":-imgWidth})
					$index = 0;
				}else if ($index<0)
				{
					$ul.css({"left":""+-(imgWidth*(len-2))+"px"})
					$index = len-3;
				}
			});
		}
		$("#warp").hover(function(){
			clearInterval(timer)
		},function(){
			auto();
		})
			
	})
