angular.module("chartjs-directive", []).directive('chartjs',['$filter', function ($filter) {
	return {
		restrict: "E",
		replace: true,
		transclude: true,
		scope: {
			data: '=data',
			options: '=options',
			width : "=width",
			height : "=height"
		},
		template: '<canvas></canvas>',
		link: function ($scope, element, attr /*, ctrl */) {
			var ctx = element[0].getContext('2d');

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
			},true)
		}
	}
}]);
