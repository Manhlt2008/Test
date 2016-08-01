using Angularjs.Models;
using Angularjs.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Angularjs.DAL
{
    public class UserBL
    {
        public List<User> GetAllUser()
        {
            using (var context = Angularjs.DAL.DBContext.MainDBContext.MainDB())
            {
                return context.StoredProcedure("User_GetAll")
                    .QueryMany<User>();
            }
        }
        public void BlockUser(int userId,int status)
        {
            using (var context = Angularjs.DAL.DBContext.MainDBContext.MainDB())
            {
                context.StoredProcedure("User_UpdateStatus")
                    .Parameter("UserId", userId)
                    .Parameter("Status", status)
                    .Execute();
            }
        }
        public List<UserGroup> GetAllGroup()
        {
            using (var context = Angularjs.DAL.DBContext.MainDBContext.MainDB())
            {
                return context.StoredProcedure("Group_GetAll").QueryMany<UserGroup>();
            }
        }
        public List<User> GetGroupNameByUserId(int userId)
        {
            using (var context = Angularjs.DAL.DBContext.MainDBContext.MainDB())
            {
                return context.StoredProcedure("Group_GetGroupNameByUserId")
                    .Parameter("UserId", userId)
                    .QueryMany<User>();
            }
        }
        public User GetByUserId(int userId)
        {
            try
            {
                using (var context = Angularjs.DAL.DBContext.MainDBContext.MainDB())
                {
                    return context.StoredProcedure("User_GetByUserId")
                        .Parameter("UserId",userId)
                        .QuerySingle<User>();
                }
            }
            catch (Exception ex)
            {
                
            }
            return new User();
        }
        public int CheckUserName(string userName)
        {
            try
            {
                using (var context = Angularjs.DAL.DBContext.MainDBContext.MainDB())
                {
                    return context.StoredProcedure("User_CheckUserName")
                        .Parameter("Username", userName)
                        .QuerySingle<int>();
                }
            }
            catch (Exception ex)
            {

            }
            return 0;
        }
        public void ChangePassWord(int userId, string pass)
        {
            using (var context = Angularjs.DAL.DBContext.MainDBContext.MainDB())
            {
                context.StoredProcedure("User_UpdatePassWord")
                    .Parameter("UserId", userId)
                    .Parameter("Password", pass)
                    .Execute();
            }
        }
        public void UserInsert(string userName,string fullName,string password,string email,string groupId,
                                int departmentId,int status,int location,DateTime createDate,DateTime updateTime)
        {
            using (var context = Angularjs.DAL.DBContext.MainDBContext.MainDB())
            {
                context.StoredProcedure("User_Insert")
                    .Parameter("Username", userName)
                    .Parameter("Fullname", fullName)
                    .Parameter("Password", password)
                    .Parameter("Email", email)
                    .Parameter("GroupId", groupId)
                    .Parameter("DepartmentId", departmentId)
                    .Parameter("Status", status)
                    .Parameter("Location", location)
                    .Parameter("CreateDate", createDate)
                    .Parameter("UpdateTime", updateTime)
                    .Execute();
            }
        }
        public void UserUpdate(int userId,string userName, string fullName, string email, string groupId,
                                int departmentId, int status, DateTime updateTime)
        {
            using (var context = Angularjs.DAL.DBContext.MainDBContext.MainDB())
            {
                context.StoredProcedure("User_Update")
                    .Parameter("UserId", userId)
                    .Parameter("Username", userName)
                    .Parameter("Fullname", fullName)
                    .Parameter("Email", email)
                    .Parameter("GroupId", groupId)
                    .Parameter("DepartmentId", departmentId)
                    .Parameter("Status", status)
                    .Parameter("UpdateTime", updateTime)
                    .Execute();
            }
        }

        public List<User> Users_GetByCondition(string userName, int departmentId,int status)
        {
            using (var context = Angularjs.DAL.DBContext.MainDBContext.MainDB())
            {
                return context.StoredProcedure("User_GetByCondition")
                    .Parameter("UserName", userName)
                    .Parameter("DepartmentId",departmentId)
                    .Parameter("Status",status)
                    .QueryMany<User>();
            }
        }
    }
}