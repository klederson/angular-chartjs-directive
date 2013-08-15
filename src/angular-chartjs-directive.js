/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013 Klederson Bueno
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author Klederson Bueno <klederson@klederson.com>
 * @version 1.0
 * @see https://github.com/klederson/angular-chartjs-directive
 * @licence MIT
 */
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