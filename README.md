angular-chartjs-directive
=========================

A real simple, powerful and easy to use directive to use All ChartJS graphic types using the angular way to it

# How to use

First of all include the directive into your app

```javascript
angular.module('MyApp',['chartjs-directive']);
```

## html

```html
<chartjs width="MyChart.width" height="MyChart.height" data="MyChart.data" options="MyChart.options" is-type="Doughnut"></chartjs>
```

## javascript

```javascript
//inside your scope
$scope.MyChart = {
      width : 500,
      height : 500,
      options : {},
      data : [
      {
        value: 30,
        color:"#F7464A"
      },
      {
        value : 50,
        color : "#E2EAE9"
      },
      {
        value : 100,
        color : "#D4CCC5"
      },
      {
        value : 40,
        color : "#949FB1"
      },
      {
        value : 120,
        color : "#4D5360"
      }

      ]
    }
```

And that's all, all the rest is using chartjs api itself.

[http://www.chartjs.org/](http://www.chartjs.org/)

Have Fun!!
