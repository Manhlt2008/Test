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
// toàn bộ nôi dung directive sẽ bị thay thế hết, ==> có thể áp dụng để reload trang  :D
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
        templateUrl: "AngularApp/Templates/login_form.html"
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