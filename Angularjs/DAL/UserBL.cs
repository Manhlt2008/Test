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
        //public int InsertUser(int userId)
        //{
        //    using (var context = Angular.DAL.DBContext.MainDBContext.MainDB())
        //    {
        //        return context.StoredProcedure("Group_GetAll")
        //            .QuerySingle<int>();
                    
        //    }
        //}
    }
}