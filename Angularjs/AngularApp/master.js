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
       //var optiondefault = {
       //    GroupId: -1,
       //    GroupName: 'Tất cả'
       //}
       //$scope.lstUserGroup[0] = optiondefault;
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
            $scope.UserDetail = data;
            console.log($scope.UserDetail);
        })
        .error(function () {
            console.log("lỗi " + userId);
        });
    }
    $scope.EditUser_Post = function () {
        var userId = $scope.UserDetail.UserId;
        var userName = $scope.UserDetail.Username;
        var fullName = $scope.UserDetail.Fullname;
        var email = $scope.UserDetail.Email;
        var groupId = $scope.UserDetail.Group;
        var departmentId = $scope.UserDetail.Department;
        var status = $scope.UserDetail.Status;
        alert("----userId: " + userId + "----Tên truy cập: " + userName + "------email: " + email + "-------Tên đầy đủ: " + fullName + "-------Nhóm quyền: " + groupId + "-----Phòng ban: " + departmentId +"-----Trạng thái: "+status);
        $http({
            method: 'POST',
            url: '/User/UpdateUser',
            data: {
                'userId':userId,
                'userName': userName,
                'fullName': fullName,
                'email': email,
                'groupId': groupId,
                'departmentId': departmentId,
                'status': status
            },
        })
        .success(function (data) {
            alert(data.message);
            $(".close").trigger("click");
            window.location.reload();
        })
        .error(function () {
            alert(data.message);
        });
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
        var userName = User.UserNameCreate;
        var fullName = User.FullNameCreate;
        var email = User.EmailCreate;
        var groupId = User.GroupCreate;
        var departmentId = User.DepartmentCreate;
        
        alert("----userName: " + userName + "------email: " + email + "-------fullName: " + fullName + "-------groupId: " + groupId + "-----department: " + departmentId);

        $http({
            method: 'POST',
            url: '/User/InsertUser',
            data: {
                'userName': userName,
                'fullName': fullName,
                'email': email,
                'groupId': groupId,
                'departmentId': departmentId
            },
        })
        .success(function (data) {
            alert(data.message);
            $(".close").trigger("click");
            window.location.reload();
        })
        .error(function () {
            alert(data.message);
        });
    }

    //Search
    $scope.SearchUser = function (UserSearch) {
        var userName = UserSearch.UserName;
        var departmentId = UserSearch.Department;
        var status = UserSearch.Status;
        console.log(userName);
        console.log(departmentId);
        console.log(status);
        
        $http({
            method: 'POST',
            url: '/User/UserGetByCondition',
            data: { 'userName': userName, 'departmentId': departmentId, 'status': status },
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



