var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
	$scope.ctrlImages = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
});

app.directive('slideshow', function(){
	return {
		restrict: 'E',
		replace:true,
		scope: {
			images: '@',
			interval: '@',
		},
		link: function(scope, element, attrs) {
			scope.images = scope.$eval(attrs.slides);
			scope.interval = scope.$eval(attrs.interval);
			
			var visibleSlide = 0;
			setTimeout(function(){
				var slides = document.getElementsByClassName("mySlides");
				slides[visibleSlide].style.display = "block";
			}, 0);
			
			setInterval(function(){
				visibleSlide++;
				if (visibleSlide >= scope.images.length)
					visibleSlide = 0;
				var slides = document.getElementsByClassName("mySlides");
				for (var i=0; i<slides.length; i++) {
					slides[i].style.display = "none";
				}
				slides[visibleSlide].style.display = "block";
			}, scope.interval);
		},
		template: '<div class="slideshow-container"><div class="mySlides fade" ng-repeat="image in images" style="display:none"><img ng-src="{{image}}" style="width:100%"/></div></div>'
	};
});