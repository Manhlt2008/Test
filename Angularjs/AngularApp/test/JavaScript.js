var app = angular.module('app', ['ui.bootstrap']);
app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

app.factory('ItemService', ['$http', function ($http) {

    return {
        GetAllItem: function () {
            return $http.get('/User/GetListUsers');
        },
    };
}]);

function ItemCtrl($scope, $http, ItemService) {
    var indexId = 1;
    $scope.Countries = [];
    $scope.Countries.push({ Id: indexId++, Name: "Bangladesh" });
    $scope.Countries.push({ Id: indexId++, Name: "India" });
    $scope.Countries.push({ Id: indexId++, Name: "Pakistan" });
    $scope.Countries.push({ Id: indexId++, Name: "Vutan" });
    $scope.Countries.push({ Id: indexId++, Name: "Nepal" });

    $scope.Items = [];
    var i = 0;
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 1 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 1 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 2 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 1 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 1 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 2 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 2 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 1 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 2 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 3 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 3 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 4 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 2 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 1 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 1 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 2 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 3 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 1 });
    $scope.Items.push({ Id: i++, Name: "item name " + i, CountryId: 2 });

    $scope.showId = function () {
        //alert($scope.CountryId)
    }
    //LoadAllItem();
    function LoadAllItem() {
        $scope.Items = [];
        //$http.get('/Item/GetItemList') //if with AJS Service
        ItemService.GetAllItem()
            .success(function (data) {
                $scope.Items = data;
            })
            .error(function (er) {
                alert("Error! items can't be loaded.");
            });
    }

    //for paging, sorting, filtering
    $scope.currentPage = 1; //current page
    $scope.entryLimit = 5; //max no of items to display in a page
    $scope.filteredItems = $scope.Items.length; //Initially for no filter
    $scope.totalItems = $scope.filteredItems;
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function () {
        $timeout(function () {
            $scope.filteredItems = $scope.filtered.length;
        }, 9000);
    };
    $scope.sort_by = function (predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
}