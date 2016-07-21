var ngUsers = angular.module("ngUsers", ['ui.bootstrap']);
ngUsers.factory('dataService', function ($http) {

    return {
        getSessions: function () {
            return $http.post('/User/GetListUsers');
        }
    };
}).controller("ListUser", function ($scope, $http, dataService) {
     $http.get("/User/GetListUsers")
    .then(function (response) {
        $scope.lstUser = response.data;
    });
    //load nhóm
    $http.get("/User/GetUserGroup")
   .then(function (lstuserg) {
       $scope.lstUserGroup = lstuserg.data;
   });
    //load trạng thái
    $scope.lstStaus = [
        {
            Id: -1,
            Value: "--Tất cả--"
        },
        {
            Id: 0,
            Value: "Bình thường"
        },
        {
            Id: 1,
            Value: "Khóa/Tạm dừng"
        }
    ]
    $scope.Delete = function (userId) {
        $http({
            method: 'POST',
            url: '/User/DeleteUser',
            data: { 'userId': userId },
        })
        .success(function (data) {
            console.log("Xóa thành công userId " + userId);
        })
        .error(function () {
            console.log("Xóa lỗi " + userId);
        });
    }

})
    .controller('PaginationDemoCtrl', function ($scope, dataService) {
        //panging
        var handleSuccess = function (data, status) {
            $scope.data = data;
            $scope.viewby = 20;
            $scope.totalItems = $scope.data.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 5; //Number of pager buttons to show

            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function () {
                //console.log('Page changed to: ' + $scope.currentPage);
            };

            $scope.setItemsPerPage = function (num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first paghe
            }
        };
        dataService.getSessions().success(handleSuccess);
});


