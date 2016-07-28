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
    //load nhóm quyền
    $http.get("/User/GetUserGroup")
   .then(function (lstuserg) {
       $scope.lstUserGroup = lstuserg.data;
   });
    //load phòng ban
    $http.get("/User/GetListDepartment")
   .then(function (lstdpmBl) {
       $scope.lstDeparment = lstdpmBl.data;
       var optiondefault = {
           DepartmentId: -1,
           Description: 'Tất cả'
       }
       $scope.lstDeparment[0] = optiondefault;
   });
    //load trạng thái
    $scope.lstStaus = [
        {
            Id: -1,
            Value: "Tất cả"
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

    $scope.ViewGroupName = function (currentId) {
        $http({
            method: 'POST',
            url: '/User/GetGroupNameByUserId',
            data: { 'userId': currentId },
        })
        .success(function (data) {
            $scope.lstUserGroupName = data;
        })
        .error(function () {
            console.log("Lỗi GetGroupNameByUserId " + userId);
        });
    }
    $scope.setId = function (currentId) {
        $scope.currentId = currentId;
    }
    //Delete User
    $scope.Delete = function () {
        var userId = $scope.currentId;
        $http({
            method: 'POST',
            url: '/User/BlockUser',
            data: { 'userId': userId },
        })
        .success(function (data) {
            console.log("Xóa thành công userId " + userId);
            $(".close").trigger("click");
            window.location.reload();
        })
        .error(function () {
            console.log("Xóa lỗi " + userId);
        });
    };
    //Edit User
    $scope.EditUser_Get = function (currentId) {
        $http({
            method: 'POST',
            url: '/User/GetByUserId',
            data: { 'userId': currentId },
        })
        .success(function (data) {
            data.DepartmentId = data.DepartmentId.toString();
            data.Status = data.Status.toString();
            $scope.UserDetail = data;
        })
        .error(function () {
            console.log("lỗi " + userId);
        });
    }
    $scope.EditUser_Post = function (UserDetail) {
        console.log(UserDetail);
        $http({
            method: 'POST',
            url: '/User/UpdateUser',
            data: UserDetail
        })
        .success(function (data) {
            $scope.alert = data.message;
            $("#divalert").trigger("click");
        })
        .error(function () {
            alert(data.message);
        });
    }
    $scope.ClosePopup = function () {
        $(".close").trigger("click");
        window.location.reload();
    }
    //Reset Password
    $scope.ResetPass_Get = function (currentId) {
        $scope.currentId= currentId;
        $http({
            method: 'POST',
            url: '/User/GetByUserId',
            data: { 'userId': currentId },
        })
        .success(function (data) {
            $scope.UserDetail = data;
            $scope.NewPass = "";
            $scope.confirm_resetNewPass = "";
        })
        .error(function () {
            console.log("Lỗi GetByUserId:" + userId);
        });
    }
    $scope.ResetPass_Post = function () {
        var userId = $scope.currentId;
        var newpass = $scope.NewPass;
        $http({
            method: 'POST',
            url: '/User/ChangePassWord',
            data: { 'userId': userId, 'password': newpass },
        })
        .success(function (data) {
            alert(data.message);
        })
        .error(function () {
            alert(data.message);
        });
    }

    ////Create User
    $scope.Create_Post = function (User) {
        $http({
            method: 'POST',
            url: '/User/InsertUser',
            data:User
        })
        .success(function (data) {
            //alert(data.message);
            //$(".close").trigger("click");
            //window.location.reload();
            $scope.alert = data.message;
            $("#divalert").trigger("click");
        })
        .error(function () {
            alert(data.message);
        });
    }

    //Search
    $scope.SearchUser = function (UserSearch) {
        console.log(userName);
        console.log(departmentId);
        console.log(status);
        $http({
            method: 'POST',
            url: '/User/UserGetByCondition',
            data: UserSearch
        })
        .success(function (data) {
            console.log(data);
        })
        .error(function () {
            console.log("Lỗi UserGetByCondition !!!");
        });
    }

}).controller("ValidateData", function () {

}).controller('Pagination', function ($scope, dataService) {
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



