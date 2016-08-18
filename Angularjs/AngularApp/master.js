var ngUsers = angular.module("ngUsers", ['ui.bootstrap']);
ngUsers.factory('dataService', function ($http, broadcastService) {
    return {
        search: function (UserSearch) {
            $http({
                method: 'POST',
                url: '/User/UserGetByCondition',
                data: UserSearch
            })
            .success(function (lstUserSearch) {
                broadcastService.send('search', lstUserSearch);
            })
            .error(function () {
                console.log("Lỗi UserGetByCondition !!!");
            });
        }
    }
});
ngUsers.factory('broadcastService', function ($rootScope) {
    return {
        send: function (msg, data) {
            $rootScope.$broadcast(msg, data);
        }
    }
});
ngUsers.controller("Pagination", function ($scope, dataService) {
    $scope.$on('search', function (event, dataService) {
        $scope.data = dataService;
        $scope.viewby = 20;
        $scope.totalItems = dataService.length;
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
    });
});
ngUsers.controller("ListUser", function ($scope, $http, dataService) {
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
            $scope.onSearchClick();
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
        UserDetail.GroupId = $scope.GroupIdSelected;
        $http({
            method: 'POST',
            url: '/User/UpdateUser',
            data: UserDetail
        })
        .success(function (data) {
            $scope.alert = data.message;
            $scope.flag = 1;
            $(".close").trigger("click");
            $("#divalert").trigger("click");
        })
        .error(function () {
            alert(data.message);
            $scope.flag = 0;
            $(".close").trigger("click");
            $("#divalert").trigger("click");
        });
    }
    $scope.ClosePopup = function () {
        $(".close").trigger("click");
        window.location.reload();
    }
    //Reset Password
    $scope.ResetPass_Get = function (currentId) {
        $scope.currentId = currentId;
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
            $scope.onSearchClick();
        })
        .error(function () {
            alert(data.message);
        });
    }

    var selection = [];
    $scope.toggleSelection = function toggleSelection(GroupId) {
        var idx = selection.indexOf(GroupId);
        if (idx > -1) {
            selection.splice(idx, 1);
        }
        else {
            selection.push(GroupId);
        }
        console.log(selection);
        $scope.GroupIdSelected = selection.toString();
    };
    ////Create User
    $scope.Create_Post = function (User) {
        User.GroupId = $scope.GroupIdSelected;
        $http({
            method: 'POST',
            url: '/User/InsertUser',
            data: User
        })
        .success(function (data) {
            if (data.flag == 1) {
                $scope.User.UserMessage = "UserName này đã tồn tại trong hệ thống.";
                $("#checkUserName").show();
            }
            else {
                $scope.alert = data.message;
                $("#divalert").trigger("click");
            }
        })
        .error(function () {
            alert(data.message);
        });
    }

    //Search
    $scope.SearchUser = function (UserSearch) {
        console.log(UserSearch)
        $http({
            method: 'POST',
            url: '/User/UserGetByCondition',
            data: UserSearch
        })
        .success(function (lstUserSearch) {
            $scope.lstUser = lstUserSearch.data;
        })
        .error(function () {
            console.log("Lỗi UserGetByCondition !!!");
        });
    }
    $scope.onSearchClick = function (UserSearch) {
        dataService.search(UserSearch);
    }
    $scope.onSearchClick();
})




