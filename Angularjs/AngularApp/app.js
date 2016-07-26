//------------------------myApp---------------------
var myApp = angular.module("myApp", []);
myApp.controller("ShowMessage1", function ($scope, $rootScope) {
    $rootScope.message = "Đây là tiêu đề chung";
    $scope.title = "Đây là tiêu đề.";

    $scope.data = {};
    $scope.data.content = "Nội dung";
});
myApp.controller("ShowMessage2", function ($scope) {
    $scope.title = "Đây là tiêu đề.";
});
//---------------------myApp2------------------------
var myApp2 = angular.module("myApp2", []);
myApp2.controller("MayTinh", function ($scope) {
    $scope.ketqua = "Kết quả là";
    $scope.ThucHien = function () {
        var so1 = parseInt($scope.so1);
        var so2 = parseInt($scope.so2);
        var pheptoan = $scope.pheptoan;
        if (pheptoan == '+') {
            $scope.ketqua = "Kết quả là " + (so1 + so2);
        } else if (pheptoan == '-') {
            $scope.ketqua = "Kết quả là " + (so1 - so2);
        } else if (pheptoan == '*') {
            $scope.ketqua = "Kết quả là " + (so1 * so2);
        } else if (pheptoan == '/') {
            $scope.ketqua = "Kết quả là " + (so1 / so2);
        }
    };
});
//---------------------myApp3------------------------
// toàn bộ nôi dung directive sẽ bị thay thế hết
var myApp3 = angular.module("myApp3", []);
myApp3.directive("ngFormlogin", function () {
    return {
        template: "<b>Mời bạn nhập</b>"
            +"<input type='text' placeholder='Tên...'>"
    };
});
//---------------------myApp4------------------------
// form login
var myApp4 = angular.module("myApp4", []);
myApp4.directive("ngFormlogin", function () {
    return {
        templateUrl: "/AngularApp/Templates/login_form.html"
    };
});
myApp4.controller("LoginController", function ($scope) {
    $scope.CheckLogIn = function () {
        var userName    = $scope.UserName;
        var pass = $scope.PassWord;
        alert(userName + "----" + pass);
    }
});
//----------------------myApp5-----------------------
var myApp5 = angular.module("myApp5", []);
myApp5.directive("ngFormlogin", function () {
    return {
        //restrict: "C",//class
        //restrict: "A",//atributte
        //restrict: "E",//element
        template: "Restrict working!!!"
    };
    //restrict quyết định xem directive có tác dụng trên phạm vi nào, có các phạm vi thường dùng như C,A,E,
});
//----------------------myApp6-----------------------
var myApp6 = angular.module("myApp6", []);
myApp6.controller("MessageController", function ($scope) {
    $scope.showMessage = function () {
        alert("Xin chào !!!");
    };
});
//myApp6.directive("message", function () {
//    return function (scope,elenment,attrs) {
//        elenment.bind("mouseenter", function () {
//            //scope.showMessage();
//            scope.$apply("showMessage()");
//        })
//    }
//});
//----------------------myApp7-----------------------
var myApp7 = angular.module('myApp7', ['ngRoute']);
myApp7.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
          template: "This is home page"
      })
      .when("/List", {
          template: "This is List Page"  
      })
      .when('/Detail/:id/:cate/:city', {
          template: "ID is {{id}} + Category :{{cate}} + city : {{city}}",
          controller:"DetailController"
      })
        //.otherwise({ redirectTo: '/' });
      .otherwise({
          template:"404"
      });
});
myApp7.controller("DetailController", function ($scope, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.cate = $routeParams.cate;
    $scope.city= $routeParams.city;
});


//----------------------myApp8-----------------------
var myApp8 = angular.module('myApp8', ['ngRoute']);
myApp8.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        template: "This is home page myApp8"
    })
    .when('/Detail/:id', {
        redirectTo: function (routeParams, path, query_string) {
            //console.log(routeParams);
            //console.log(path);
            //console.log(query_string);
            //link http://localhost:2181/home/#/Detail/something?id=12
            //Object {id: "something"}
            //Detail/something
            //Object {id: "12"}
            if (routeParams.id == 1) {
                return '/'; //đá về trang chủ nếu Id truyền vào là 1
            } else {
                return '';
            }
        }
    })
    ;
})


//Đối tượng $q trong angularJs giúp chúng ta trong quá trình đồng bộ hóa.
var myApp9 = angular.module("myApp9", []);
myApp9.controller("QController",function($scope,$q){
    var defer=$q.defer();
    console.log(defer);
});