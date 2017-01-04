window.subcategories = {
	"Technical":[
		"Design Events",
		"ECDC",
		"Robotics",
		"Software Corner",
		"Take off",
		"Mixed bowl",
		"IMP",
		"Techkriti Grand Prix",
	],
	"Entrepreneurial":[
		"Business",
		"Entrepreneurial Events",
	],
	"Social":[
		"Presentation",
	],
	"International":[
		"International",
	]
};
window.events = {
	"Design Events": ['Bridge Design Challenge','Junkyard Wars','Scientoon','Concatenate'],
	"ECDC": ['Electromania', 'Embedded', 'FPGA', 'Electrade'],
	"IMP":['Innovation in Manufacturing Practices'],
	"Robotics": ['IARC','IRGT'],
}

module.exports =['$scope','$http','$sce',function($scope,$http,$sce) {
	$scope.subcategories = {
		"Technical":[
			"Design Events",
			"ECDC",
			"Robotics",
			"Software Corner",
			"Take off",
			"Mixed bowl",
			"IMP",
			"Techkriti Grand Prix",
		],
		"Entrepreneurial":[
			"Business",
			"Entrepreneurial Events",
		],
		"Social":[
			"Presentation",
		],
		"International":[
			"International",
		]
	};
	$scope.events = {
		"Design Events": ['Bridge Design Challenge','Junkyard Wars','Scientoon','Concatenate'],
		"ECDC": ['Electromania', 'Embedded', 'FPGA', 'Electrade'],
		"IMP":['Innovation in Manufacturing Practices'],
		"Robotics": ['IARC','IRGT'],
	}
	$scope.workshops = window.workshops;
	$scope.category = "Technical";
	$scope.selected = {
		category: '',
		subcategory: '',
		subcategories:$scope.subcategories["Technical"],
		events: ['Bridge Design Challenge','Junkyard Wars','Scientoon','Concatenate'],
	};

	$scope.selectCategory = function(c){
		if(c.title==$scope.selected.category){
			$scope.selected.category = '';
			$scope.selected.subcategory = '';
		}else{
			$scope.selected.category = c.title;
			$scope.selected.subcategory = '';
			$scope.selected.subcategories = $scope.subcategories[$scope.selected.category];
		}
	}
	$scope.selectSubcategory = function(sc){
		if(sc == $scope.selected.subcategory){
			$scope.selected.subcategory = '';
		}else{
			$scope.selected.subcategory = sc;
			$scope.selected.events = $scope.events[$scope.selected.subcategory] || $scope.selected.events;
		}
	}

	if(!window.workshops){
		$http({
			method:'GET',
			withCredentials:true,
			url:window.data_api,
		})
		.then(function(res){
			console.log(res);
			window.workshops = res.data;
		});
	}
}];