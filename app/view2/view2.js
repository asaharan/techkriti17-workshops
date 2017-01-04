module.exports = ['$scope','$routeParams','$http','$timeout', function($scope, $routeParams, $http, $timeout) {

	$scope.events = window.json_data || {};

	/*
	*Puller code starts
	*/

	function sideBarInit(){
		$scope.sidePull=false;
		$scope.track=function(e){
			// console.log('track');
			if(e=='puller'){
				$scope.sidePull=!$scope.sidePull;
				// addCount(26);
			}
		}

		$scope.GetEvents=function(e){
			// console.log('GetEvents');
			// console.log($scope.events,e,$scope.events[e])
			return $scope.events[e];
		}
		$scope.sibbling = {};
		$scope.sibbling.cat = $routeParams.cat;
		$scope.sibbling.sub=$routeParams.sub;
		$scope.selectedSub = $routeParams.event;
		$scope.sibbling.events=$scope.GetEvents($scope.sibbling.sub);
		$scope.sibbling.events=$scope.GetEvents($scope.sibbling.sub);

		$scope.updateThisHeightController=function(s,c){
			$scope.sibbling.sub=$scope.sibbling.sub==s.title?'':s.title;
			$timeout(function(){
				c.state=1+c.state;
			},360);
		}
	}


	/*
	*Puller code ends
	*/


	// console.log($routeParams);
	$scope.dataLoaded = false;
	$scope.selected = {category:$routeParams.cat, subcategory:$routeParams.sub, event:$routeParams.event,tab:'Home'};

	$scope.categories = window.categories;
	$scope.subcategories = window.subcategories;

	$scope.eventDesc = {title:'Home',desc:'Loading...'};
	
	$scope.event = {};
	function init(data){
		// console.log(data);
		var sibblingEvents = data.events[$scope.selected.subcategory];
		var eventFound = false;
		// console.log($scope, sibblingEvents)
		for(var i =0; i < sibblingEvents.length; i++){
			if(sibblingEvents[i].title.trim() == $scope.selected.event.trim()){
				$scope.event = sibblingEvents[i];
				eventFound = true;
				break;
			}
		}
		if(!eventFound){
			window.location.assign('./');
		}else{
			// console.log('data found');
			// console.log($scope.event);
			$scope.dataLoaded = true;
			$scope.selectTab('Home');
		}

		sideBarInit();
	}

	$scope.selectTab = function(tab){
		$scope.selected.tab = tab;
		for(var i=0; i < $scope.event.desc.length; i++){
			if($scope.event.desc[i].title == $scope.selected.tab){
				$scope.eventContent = $scope.event.desc[i].desc;
				break;
			}
		}
	}

	if(window.json_data){
		console.log('Already loaded information');
		$scope.events = json_data.events;
		$scope.subcategories = json_data.subcategories;
		init(window.json_data);
	}else{
		$http({
			method:'GET',
			withCredentials:true,
			url:window.data_api,
			params:{competition:$routeParams.event},
		})
		.then(function(r){
			var res = r.data;
			window.json_data = res;
			$scope.events = res.events;
			$scope.subcategories = res.subcategories;
			init(res);
		});
	}
}];