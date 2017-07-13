var app = angular.module('MainModule', ['ui.bootstrap', 'ui.event', 'ngAnimate']);

app.controller('MainController', function($scope, $http, $interval, $timeout, $window, $q){
  // $window.alert('W: '+$window.innerWidth+' H: '+$window.innerHeight);

  

  $scope.mainDiv = {
    "position": "relative",
    "top":      "0px",
    "left":     "0px",
    "width":    $window.innerWidth+"px",
    "height":   $window.innerHeight+"px",
    "background-color": "black"
  }


  $scope.templates = [];

  // var payload = {
  //   CampaignID: 1,
  //   tempHtml: 'templates/temp5.html',
  //   tempSrc: {
  //               video: "images/guardian.mp4",
  //               side1: "",
  //               side2: "images/fedsix.jpg",
  //               side3: "",
  //               bottom: "images/fed.png",
  //             },
  //   tempJs: 'scripts/temp5.js',
  //   tempInit: 'temp5Controller'
  // }

  // $scope.templates.push(payload);



  //   var payload = {
  //   CampaignID: 2,
  //   tempHtml: 'templates/temp1.html',
  //   tempSrc: {
  //               video: "images/audition.mp4",
  //               side1: "images/side1.jpg",
  //               side2: "images/side1.jpg",
  //               side3: "images/side1.jpg",
  //               bottom: "images/bottom.jpg",
  //             },
  //   tempJs: 'scripts/temp1.js',
  //   tempInit: 'temp1Controller'
  // }

  // $scope.templates.push(payload);

  // var payload = {
  //   CampaignID: 3,
  //   tempHtml: 'templates/temp3.html',
  //   tempSrc: {
  //             },
  //   tempJs: 'scripts/temp3.js',
  //   tempInit: 'temp3Controller'
  // }

  // $scope.templates.push(payload);

  // var payload = {
  //   tempHtml: 'templates/temp2.html',
  //   tempSrc: {
  //               video: "images/guardian.mp4",
  //               // video: "images/Jollibee_VIDEO_201.mp4",
  //             },
  //   tempJs: 'scripts/temp2.js',
  //   tempInit: 'temp2Controller'
  // }

  // $scope.templates.push(payload);

  // var payload = {
  //   tempHtml: 'templates/temp4.html',
  //   tempSrc: {
  //     gif: "images/dolphin.gif"
  //             },
  //   tempJs: 'scripts/temp4.js',
  //   tempInit: 'temp4Controller'
  // }

  // $scope.templates.push(payload);

  // var payload = {
  //   tempHtml: 'templates/temp3.html',
  //   tempSrc: {
  //             },
  //   tempJs: 'scripts/temp3.js',
  //   tempInit: 'temp3Controller'
  // }

  // $scope.templates.push(payload);


  // var payload = {
  //   tempHtml: 'templates/temp2.html',
  //   tempSrc: {
  //               video: "images/JOLLIBEE_VIDEO_176.mp4",
  //               // video: "images/Jollibee_VIDEO_201.mp4",
  //             },
  //   tempJs: 'scripts/temp2.js',
  //   tempInit: 'temp2Controller'
  // }

  // $scope.templates.push(payload);





  




  

  



  // var payload = {
  //   tempHtml: 'templates/temp2.html',
  //   tempSrc: {
  //               // video: "images/Jollibee_VIDEO_201.mp4",
  //               // video: "images/JOLLIBEE_VIDEO_176.mp4",
  //               video: "images/audition.mp4",
  //             },
  //   tempJs: 'scripts/temp2.js',
  //   tempInit: 'temp2Controller'
  // }

  // $scope.templates.push(payload);

  $scope.currentCampaignID = 0;

  
  var isStart = true;
  $scope.templatePosition = 0;
  $scope.templateShuffle = function(){


    if($scope.templates.length == 0){
      var payload = {
        CampaignID: 2,
        tempHtml: 'templates/temp1.html',
        tempSrc: {
                    video: "images/audition.mp4",
                    side1: "images/side1.jpg",
                    side2: "images/side1.jpg",
                    side3: "images/side1.jpg",
                    bottom: "images/bottom.jpg",
                  },
        tempJs: 'scripts/temp1.js',
        tempInit: 'temp1Controller'
      }

      $scope.templates.push(payload);
    }

    var playingTemplate = $scope.templates[0];
    $scope.templates.shift();
    $scope.templates.push(playingTemplate);

    console.log('updating Wallet');

    $http.get('config/default.json').then(function(response){
      var RpiID = response.data.RpiID;

      var data = {
        RpiID: RpiID,
        CampaignID: playingTemplate.CampaignID
      }
      $http.post('http://54.254.248.115/rpiUpdateWallet', data).then(function(response){
        // console.log(response);
        console.log('update wallet success');
      }, function(err){
        console.log('wallet update failed');
        console.log(err);
      });

    }, function(error){
      console.log('get config failed');
    });

    // $scope.tempUrl = playingTemplate.tempHtml;
    $scope.currentTemp = playingTemplate.tempHtml;
    if(!$scope.$$phase) {
      $scope.$apply();
    }

    var tempNameSpace = {
      '$scope': $scope,
      '$window': $window,
      '$timeout': $timeout,
      '$http': $http,
      'source': playingTemplate.tempSrc,
      "callback": $scope.templateShuffle,
      '$q': $q
    };


    var payl2 = [tempNameSpace['$scope'], tempNameSpace['$window'], tempNameSpace['$timeout'], tempNameSpace['$http'], tempNameSpace['source'], tempNameSpace['callback'], tempNameSpace['$q']];
    var payl = [$scope, $window, $timeout, $http, playingTemplate.tempSrc, $scope.templateShuffle];
    // var fffs = "asd"
    // var oNew = Object.create(this.prototype);
    // temp3Controller.apply(null, payl);
    window[playingTemplate.tempInit].apply(null, payl2);

    // requirejs([playingTemplate.tempJs],function(){
    //   // console.log($scope.templatePosition);
    //   var tempNameSpace = {
    //     '$scope': $scope,
    //     '$window': $window,
    //     '$timeout': $timeout,
    //     '$http': $http,
    //     'source': playingTemplate.tempSrc,
    //     "callback": $scope.templateShuffle,
    //     '$q': $q
    //   };
    //   // tempNameSpace['$scope'] = 'asdasd';
    //   var ttt = '$scope';
    //   // console.log(tempNameSpace[ttt]);


    //   var payl2 = [tempNameSpace['$scope'], tempNameSpace['$window'], tempNameSpace['$timeout'], tempNameSpace['$http'], tempNameSpace['source'], tempNameSpace['callback'], tempNameSpace['$q']];
    //   var payl = [$scope, $window, $timeout, $http, playingTemplate.tempSrc, $scope.templateShuffle];
    //   // var fffs = "asd"
    //   // var oNew = Object.create(this.prototype);
    //   // temp3Controller.apply(null, payl);
    //   window[playingTemplate.tempInit].apply(null, payl2);
    // });
  }

  $scope.templateShuffle();


  $scope.getTemplates = function(){
    $http.get('config/default.json').then(function(response){
      // console.log('default');
      // console.log(response.data);
      var RpiID = response.data.RpiID;

      var data = {
        RpiID: RpiID
      }
      $http.post('http://54.254.248.115/rpiGetCampaigns', data).then(function(response){
        var newTemplates = response.data;
        console.log(newTemplates);
        console.log('temp');
        // console.log($scope.templates);
        
        var i=0;
        while(i<$scope.templates.length){
          var wasInside = false;
          for(var j=0; j<newTemplates.length; j++){
            // console.log("NEW: "+newTemplates[j].CampaignID+" OLD: "+$scope.templates[i].CampaignI);
            if(newTemplates[j].CampaignID == $scope.templates[i].CampaignID){
              wasInside = true;
              break;
            }
          }

          if(!wasInside){
            $scope.templates.shift();
          }
          else{
            i++;
          }
          // console.log('i: '+i);
          // console.log($scope.templates);
        }
        // console.log('mid temp');
        // console.log($scope.templates);
        for(var i=0; i<newTemplates.length; i++){
          // console.log(newTemplates[i]);
          var wasInside = false;
          for(var j=0; j<$scope.templates.length; j++){
            if(newTemplates[i].CampaignID == $scope.templates[j].CampaignID){
              wasInside = true;
              break;
            }
          }
          if(!wasInside){
            // console.log('inserted');
            $scope.templates.unshift(newTemplates[i]);
          }
          // else
          //   console.log('not inserted');
        }

        // console.log('end temp');
        // console.log($scope.templates);

        // if(newTemplates.length != 0){
        //   var

        //   if($scope.templates.length!=newTemplates.length){
        //     $scope.templates = newTemplates;
        //   }
        //   else{
        //     for(var i=0; i<$scope.templates.length; i++){
        //       if($scope.templates[i].CampaignID != newTemplates[i].CampaignID){
        //         $scope.templates = newTemplates;
        //         break;
        //       }
        //     }
        //   }
        // }
          
        if(!$scope.$$phase) {
          $scope.$apply();
        }
        // console.log($scope.templates);
        $timeout(function(){$scope.getTemplates();}, 5000);
      }, function(err){
        console.log(err);
        $timeout(function(){$scope.getTemplates();}, 5000);
      });

    }, function(error){
      $timeout(function(){$scope.getTemplates();}, 5000);
    });

      
  }

  $scope.getTemplates();


});