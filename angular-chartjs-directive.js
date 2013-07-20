angular.module("chartjs-directive", []).directive('chartjs',['$filter', function ($filter) {
	return {
		restrict: "E",
		replace: true,
		transclude: true,
		scope: {
			data: '=data',
			options: '=options',
			width : "=width",
			height : "=height",
			responsive : "@"
		},
		template: '<canvas></canvas>',
		link: function ($scope, element, attr /*, ctrl */) {
			var ctx = element[0].getContext('2d');
			$scope.references = {
				parent : {
					obj :  $(element[0]).parent()[0],
					width : $(element[0]).parent()[0].clientWidth,
					height : $(element[0]).parent()[0].clientHeight
				},
				self : {
					width : $scope.width,
					height : $scope.height
				}
			};

			//black magic :)
			if($scope.width === "100%") {
				$scope.width = $scope.references.parent.width;
				$scope.references.self.width = $scope.width;
				$scope.$watch("references.parent.obj.clientWidth",function(newValue,old) {
					if(newValue != old)
						$scope.width = (newValue * $scope.references.self.width)/$scope.references.parent.width;
				})
			}
			

			$scope.generate = function() {
				$scope.instance = eval('new Chart(ctx).' +attr.isType+  '($scope.data,$scope.options)');
			}

			$scope.$watch('width',function(newValue, oldValue) {
				element[0].width = newValue;
				$scope.generate()
			});

			$scope.$watch('height',function(newValue, oldValue) {
				element[0].height = newValue;
				$scope.generate();
			});

			$scope.$watch('data',function(newValue,oldValue) {
				$scope.generate();
			},true);
		}
	}
}]);
