function temp2Controller($scope, $window, $timeout, $http, temp2Src, callback){
	var widthMultiplier = 1;
	var heightMultiplier = 1;
	$scope.temp2VideoStyle = {
	    "position": "absolute",
	    "top":      "0px",
	    "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    "height":   $window.innerHeight*heightMultiplier+"px",
	    "background-color": "black"
	}

	$scope.temp2Src = {
		video: temp2Src.video
	}

	$timeout(function(){
		$timeout(function(){

			// var videoElements = angular.element(document.getElementById('temp2Video'));
			var videoElements = document.getElementById('temp2Video');
			console.log('video');
			console.log(videoElements);

			document.getElementById('temp2Video').src = temp2Src.video;

	    	// videoElements[0].play();
	    	videoElements.play();
		}, 10);
	}, 10);

	$http.get('http://api.openweathermap.org/data/2.5/weather?q=Manila&appid=29e1d90ba906e48e127efbe09126adfe').then(function(response){
		console.log(response.data);
	},
	function(error){
		console.log(error);
	});

	

	  

	$scope.temp2VideoEnd = function(){
		callback();
	}
}