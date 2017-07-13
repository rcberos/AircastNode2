function temp1Controller($scope, $window, $timeout, $http, temp1Src, callback){
	
	var widthMultiplier = 0.75;
	var heightMultiplier = 0.75;
	$scope.temp1VideoStyle = {
	    "position": "absolute",
	    "top":      "0px",
	    "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    "height":   $window.innerHeight*heightMultiplier+"px",
	    "background-color": "black"
	}
	$scope.temp1BottomStyle = {
	    "position": "absolute",
	    "top":      $window.innerHeight*heightMultiplier+"px",
	    "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    "height":   $window.innerHeight*(1-heightMultiplier)+"px",
	    "background-color": "yellow"
	}
	$scope.temp1Side1Style = {
	    "position": "absolute",
	    "top":      "0px",
	    "left":     $window.innerWidth*widthMultiplier+"px",
	    "width":    $window.innerWidth*(1-widthMultiplier)+"px",
	    "height":   $window.innerHeight*0.33+"px",
	    "background-color": "green"
	}
	$scope.temp1Side2Style = {
	    "position": "absolute",
	    "top":      $window.innerHeight*0.33+"px",
	    "left":     $window.innerWidth*widthMultiplier+"px",
	    "width":    $window.innerWidth*(1-widthMultiplier)+"px",
	    "height":   $window.innerHeight*0.33+"px",
	    "background-color": "orange"
	}
	$scope.temp1Side3Style = {
	    "position": "absolute",
	    "top":      $window.innerHeight*0.66+"px",
	    "left":     $window.innerWidth*widthMultiplier+"px",
	    "width":    $window.innerWidth*(1-widthMultiplier)+"px",
	    "height":   $window.innerHeight*0.34+"px",
	    "background-color": "white"
	}

	$scope.temp1Src = {
		// video: temp1Src.video,
		side1: temp1Src.side1,
		side2: temp1Src.side2,
		side3: temp1Src.side3,
		bottom: temp1Src.bottom
	}

 	var vidCtr = 0;

	if(!$scope.$$phase) {
		$scope.$apply();
	}
    
    console.log('hello');
	function temp1VideoPlay(){
		// $scope.temp1Src.video = temp1Src.video;

		// if(!$scope.$$phase) {
		// 	$scope.$apply();
		// }

		vidCtr++;
		// var videoElements = angular.element(document.getElementById('temp1Video'));
		// videoElements[0].play();


		var vidElem = document.getElementById('temp1Video');
		vidElem.src = temp1Src.video;
		console.log('vidElem');
		console.log(vidElem);

		vidElem.play();


		// $timeout(function(){
		// 	// var videoElements = angular.element(document.getElementById('temp1Video'));
	 //  //   		videoElements[0].play();

		// 	$timeout(function(){
		// 		var videoElements = angular.element(document.getElementById('temp1Video'));
	 //    		videoElements[0].play();
		// 	}, 10);
		// }, 10);
		
	}

	  

	$scope.temp1VideoEnd = function(){
		// if(vidCtr<temp1Src.video.length)
		// 	temp1VideoPlay();
		// else
			callback();
	}

	temp1VideoPlay();
}



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



function temp3Controller($scope, $window, $timeout, $http, temp2Src, callback, $q){

	weather = function() {
        var d = $q.defer();
        $http({
          method : 'GET',
          url: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67&q=Manila&cnt=7',
          withCredentials: false,
          headers: { 'Content-Type': 'application/json' }
        }).then(function(data){
          d.resolve(data);
        });

        return d.promise;
    }

    weather_now = function() {
        var d = $q.defer();
        $http({
          method : 'GET',
          url: 'http://api.openweathermap.org/data/2.5/weather?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67',
          withCredentials: false,
          headers: { 'Content-Type': 'application/json' }
        }).then(function(data){
          d.resolve(data);
        });

        return d.promise;
    }

    function getGreetingTime (m) {
      	var g = null; //return g

      	// if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

      	var split_afternoon = 12 //24hr time to split the afternoon
      	var split_evening = 17 //24hr time to split the evening
      	// var currentHour = parseFloat(m.format("HH"));

      	var date = new Date(m);
		// Hours part from the timestamp
		var currentHour = date.getHours();
		console.log('current: '+currentHour);

      	if(currentHour >= split_afternoon && currentHour <= split_evening) {
      		g = "afternoon";
      	} else if(currentHour >= split_evening) {
      		g = "evening";
      	} else {
      		g = "morning";
      	}

      	return g;
      }

    function get_icon (weather,greeting) {
      if(weather == 'Rain') {
        return  'icon-rain'
      }

      else if(greeting == 'evening') {
        if(x["weather"] == 'Clouds') {
          return 'icon-moon-cloud'
        }
        else {
          return 'icon-waning-crescent-moon'
        }
      }
      else {
        if(weather == 'Clouds') {
          return  'icon-sun-cloud'
        }
        else {
          return 'icon-sun'
        }
      }
    }

    weather().then(function(d){

      now = weather_now().then(function(data){
        now_w = {}
        now_w["temp"] =  data.data.main.temp - 273.15
        now_w["description"] = data.data.weather[0].description
        now_w["weather"] = data.data.weather[0].main
        now_w["greeting"] = getGreetingTime(data.data.dt*1000)
        now_w["icon"] = get_icon(data.data.weather[0].main, now_w["greeting"])

        $scope.now_weather = now_w
      })


      conditions = []

      d.data.list.forEach(function(v){
      	x = {}

      	var months = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      	var date = new Date(v.dt*1000);
		// Hours part from the timestamp
		var currentDay = date.getDay();

        x["temp"] = v.temp.day - 273.15
        // x["day"] = moment(v.dt*1000).format('dddd')
        x["day"] = days[currentDay];
        x["weather"] = v.weather[0].main
        x["greeting"] = getGreetingTime(v.dt*1000)
        x["icon"] = get_icon(x["weather"], x["greeting"])


        conditions.push(x)
      })
      // _.each(d.data.list, function(v) {
      //   x = {}

      //   x["temp"] = v.temp.day - 273.15
      //   x["day"] = moment(v.dt*1000).format('dddd')
      //   x["weather"] = v.weather[0].main
      //   x["greeting"] = getGreetingTime(v.dt*1000)
      //   x["icon"] = get_icon(x["weather"], x["greeting"])


      //   conditions.push(x)
      // })

      $scope.conditions = conditions

      // $scope.now = moment().format('MMMM DD ddd');

    });

	
	$timeout(callback, 10000);
}





function temp4Controller($scope, $window, $timeout, $http, tempSrc, callback){

	$scope.temp4DivStyle = {
	    "position": "relative",
	    "top":      "0px",
	    "left":     "0px",
	    "width":    $window.innerWidth+"px",
	    "height":   $window.innerHeight+"px",
	    "background-color": "black",
	    "background-image": "url('"+tempSrc.gif+"')",
	    "background-repeat": "no-repeat",
	    "background-size": "100% 100%"
	}
	$scope.temp4Text = {
	    "position": "absolute",
	    "top":      "200px",
	    "left":     $window.innerWidth*.4+"px",
	    // "width":    $window.innerWidth+"px",
	    // "height":   $window.innerHeight+"px",
	    "font-size": "2em"
	}
	$timeout(function(){
		$timeout(function(){
			
		}, 10);
	}, 10);

	$timeout(callback, 15000);
}



function temp5Controller($scope, $window, $timeout, $http, temp5Src, callback){
// 	$scope.testing = function(){
// 		console.log('asdasdasdasd');
// 		$window.alert($window.innerWidth);
// 	}
	var widthMultiplier = 0.66;
	var heightMultiplier = 0.66;
	$scope.temp5VideoStyle = {
	    "position": "absolute",
	    "top":      "0px",
	    "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    "height":   $window.innerHeight*heightMultiplier+"px",
	    "background-color": "black"
	}
	$scope.temp5BottomStyle = {
	    "position": "absolute",
	    "top":      $window.innerHeight*heightMultiplier+"px",
	    "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    "height":   $window.innerHeight*(1-heightMultiplier)+"px",
	    "background-color": "yellow",
		"background-image": 'url("images/trafficrecording.gif")',
		"background-repeat": "no-repeat",
		"background-size": "100% 100%",
	}



	$scope.temp5Side1Style = {
	    "position": "relative",
	    "top":      "0px",
	    "left":     $window.innerWidth*widthMultiplier+"px",
	    "width":    $window.innerWidth*(1-widthMultiplier)+"px",
	    "height":   $window.innerHeight*0.5+"px",
	    "background-color": "skyblue"
	}
	$scope.temp5Side2Style = {
	    "position": "absolute",
	    "top":      $window.innerHeight*0.5+"px",
	    "left":     $window.innerWidth*widthMultiplier+"px",
	    "width":    $window.innerWidth*(1-widthMultiplier)+"px",
	    "height":   $window.innerHeight*0.5+"px",
	    "background-color": "orange"
	}

	var weatherWidth = $window.innerWidth*(1-widthMultiplier);
	var weatherHeight = $window.innerHeight*0.5;
	$scope.temp5WeatherMainIcon = {
		"position": "absolute",
		"display": "block",
	    "top":      weatherHeight*0.1+"px",
	    "left":     weatherWidth*0.4+"px",
	    "font-size": weatherWidth*0.2+"px",
	    "color": "black"
	}
	$scope.temp5WeatherMainText = {
		"position": "relative",
		"display": "block",
	    "top":      weatherHeight*0.26+"px",
	    // "left":     weatherWidth*0.4+"px",
	    "text-align": "center",
	    "font-size": weatherWidth*0.07+"px",
	    "color": "black"
	}
	$scope.temp5WeatherForcast = {
		"font-size": weatherWidth*0.07+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.45+"px",
	    // "left":     "10px",
	    "width":    weatherWidth+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast1 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.60+"px",
	    // "left":     "10px",
	    "margin-left": weatherWidth*0.07+"px",
	    "width":    weatherWidth*0.43+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast11 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.60+"px",
	    "left":     weatherWidth*0.5+"px",
	    "margin-left": weatherWidth*0.15+"px",
	    "width":    weatherWidth*0.35+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast2 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.73+"px",
	    // "left":     "10px",
	    "margin-left": weatherWidth*0.07+"px",
	    "width":    weatherWidth*0.43+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast22 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.73+"px",
	    "left":     weatherWidth*0.5+"px",
	    "margin-left": weatherWidth*0.15+"px",
	    "width":    weatherWidth*0.35+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast3 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.86+"px",
	    // "left":     "10px",
	    "margin-left": weatherWidth*0.07+"px",
	    "width":    weatherWidth*0.43+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast33 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.86+"px",
	    "left":     weatherWidth*0.5+"px",
	    "margin-left": weatherWidth*0.15+"px",
	    "width":    weatherWidth*0.35+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherSpan = {
		"display": "inline-block",
	    "width":    weatherWidth*0.2+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}


	console.log($scope.temp5WeatherForcast);
	if(!$scope.$$phase) {
		$scope.$apply();
	}






	$scope.temp5Src = {
		// video: temp5Src.video,
		video: "images/guardian.mp4",
		// side1: temp5Src.side1,
		side2: temp5Src.side2,
		// side3: temp5Src.side3,
		// bottom: temp5Src.bottom
	}

	// $timeout(function(){}, 10);

	// var videoElements = angular.element(document.getElementById('temp1Video'));
	// console.log(videoElements);
 //    videoElements[0].play();

 	var vidCtr = 0;
 //    $timeout(function(){
	// 	$timeout(function(){
	// 		temp1VideoPlay();
	// 	}, 10);
	// }, 10);

	// $scope.$apply();
    
    console.log('hello');
	function temp5VideoPlay(){
		$scope.temp5Src.video = temp5Src.video;
		$scope.$apply();
		vidCtr++;
		var videoElements = angular.element(document.getElementById('temp5Video'));
	    		videoElements[0].play();
		// $timeout(function(){
		// 	// var videoElements = angular.element(document.getElementById('temp1Video'));
	 //  //   		videoElements[0].play();

		// 	$timeout(function(){
		// 		var videoElements = angular.element(document.getElementById('temp1Video'));
	 //    		videoElements[0].play();
		// 	}, 10);
		// }, 10);
		
	}

	  

	$scope.temp5VideoEnd = function(){
		// if(vidCtr<temp1Src.video.length)
		// 	temp1VideoPlay();
		// else
			callback();
	}

	temp5VideoPlay();

	$http({
      method : 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast?lat=14.629701&lon=121.027937&APPID=9f534971ae41269da3bdca6da5ad3a67',
      withCredentials: false,
      headers: { 'Content-Type': 'application/json' }
    }).then(function(data){
      // d.resolve(data);
      console.log(data.data);
    	

		$scope.temp5WeatherFuture1 = {
	      	temp: (data.data.list[0].main.temp-273.15).toFixed(2)+"°C"
	      };
	      if(data.data.list[0].weather[0].main == "Clouds"){
	      	$scope.temp5WeatherFuture1.icon = "wi-day-cloudy";
	      }
	      else if(data.data.list[0].weather[0].main == "Rain"){
	      	$scope.temp5WeatherFuture1.icon = "wi-day-rain";
	      }
	      else{
	      	$scope.temp5WeatherFuture1.icon = "wi-day-sunny";
	      }

      	var date = new Date(data.data.list[0].dt*1000);
		var hours = date.getUTCHours();
		if((hours+8)<12){
			console.log((hours+8)+" AM");
			$scope.temp5WeatherFuture1.time = (hours+8)+" AM";
		}
		else if((hours+8)>24){
			console.log((hours+8-24)+" AM");
			$scope.temp5WeatherFuture1.time = (hours+8-24)+" AM";
		}
		else if((hours+8) == 24){
			console.log("12 AM");
			$scope.temp5WeatherFuture1.time = "12 AM";
		}
		else if((hours+8) == 12){
			console.log("12 AM");
			$scope.temp5WeatherFuture1.time = "12 PM";
		}
		else{
			console.log((hours+8-12)+" PM");
			$scope.temp5WeatherFuture1.time = (hours+8-12)+" PM";
		}

		$scope.temp5WeatherFuture2 = {
	      	temp: (data.data.list[1].main.temp-273.15).toFixed(2)+"°C"
	      };
	      if(data.data.list[1].weather[0].main == "Clouds"){
	      	$scope.temp5WeatherFuture2.icon = "wi-day-cloudy";
	      }
	      else if(data.data.list[1].weather[0].main == "Rain"){
	      	$scope.temp5WeatherFuture2.icon = "wi-day-rain";
	      }
	      else{
	      	$scope.temp5WeatherFuture2.icon = "wi-day-sunny";
	      }

      	var date = new Date(data.data.list[1].dt*1000);
		var hours = date.getUTCHours();
		if((hours+8)<12){
			console.log((hours+8)+" AM");
			$scope.temp5WeatherFuture2.time = (hours+8)+" AM";
		}
		else if((hours+8)>24){
			console.log((hours+8-24)+" AM");
			$scope.temp5WeatherFuture2.time = (hours+8-24)+" AM";
		}
		else if((hours+8) == 24){
			console.log("12 AM");
			$scope.temp5WeatherFuture2.time = "12 AM";
		}
		else if((hours+8) == 12){
			console.log("12 AM");
			$scope.temp5WeatherFuture2.time = "12 PM";
		}
		else{
			console.log((hours+8-12)+" PM");
			$scope.temp5WeatherFuture2.time = (hours+8-12)+" PM";
		}

		$scope.temp5WeatherFuture3 = {
	      	temp: (data.data.list[2].main.temp-273.15).toFixed(2)+"°C"
	      };
	      if(data.data.list[2].weather[0].main == "Clouds"){
	      	$scope.temp5WeatherFuture3.icon = "wi-day-cloudy";
	      }
	      else if(data.data.list[2].weather[0].main == "Rain"){
	      	$scope.temp5WeatherFuture3.icon = "wi-day-rain";
	      }
	      else{
	      	$scope.temp5WeatherFuture3.icon = "wi-day-sunny";
	      }

      	var date = new Date(data.data.list[2].dt*1000);
		var hours = date.getUTCHours();
		if((hours+8)<12){
			console.log((hours+8)+" AM");
			$scope.temp5WeatherFuture3.time = (hours+8)+" AM";
		}
		else if((hours+8)>24){
			console.log((hours+8-24)+" AM");
			$scope.temp5WeatherFuture3.time = (hours+8-24)+" AM";
		}
		else if((hours+8) == 24){
			console.log("12 AM");
			$scope.temp5WeatherFuture3.time = "12 AM";
		}
		else if((hours+8) == 12){
			console.log("12 AM");
			$scope.temp5WeatherFuture3.time = "12 PM";
		}
		else{
			console.log((hours+8-12)+" PM");
			$scope.temp5WeatherFuture3.time = (hours+8-12)+" PM";
		}

    });

	if(!$scope.$$phase) {
		$scope.$apply();
	}

    $http({
      method : 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?lat=14.629701&lon=121.027937&APPID=9f534971ae41269da3bdca6da5ad3a67',
      withCredentials: false,
      headers: { 'Content-Type': 'application/json' }
    }).then(function(data){
    	console.log('now');
      console.log(data.data);
      $scope.temp5WeatherNow = {
      	description: data.data.weather[0].description,
      	temp: (data.data.main.temp-273.15).toFixed(2)+"°C"
      };
      if(data.data.weather[0].main == "Clouds"){
      	$scope.temp5WeatherNow.icon = "wi-day-cloudy";
      }
      else if(data.data.weather[0].main == "Rain"){
      	$scope.temp5WeatherNow.icon = "wi-day-rain";
      }
      else{
      	$scope.temp5WeatherNow.icon = "wi-day-sunny";
      }
      // $scope.temp5WeatherNow
    });

}