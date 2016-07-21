using Angular.Models;
using Angular.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Angular.DAL
{
    public class UserBL
    {
        public List<User> GetAllUser()
        {
            using (var context = Angular.DAL.DBContext.MainDBContext.MainDB())
            {
                return context.StoredProcedure("User_GetAll")
                    .QueryMany<User>();
            }
        }
        public void BlockUser(int userId,int status)
        {
            using (var context = Angular.DAL.DBContext.MainDBContext.MainDB())
            {
                context.StoredProcedure("User_UpdateStatus")
                    .Parameter("UserId", userId)
                    .Parameter("Status", status)
                    .Execute();
            }
        }
        public List<UserGroup> GetAllGroup()
        {
            using (var context = Angular.DAL.DBContext.MainDBContext.MainDB())
            {
                return context.StoredProcedure("Group_GetAll").QueryMany<UserGroup>();
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