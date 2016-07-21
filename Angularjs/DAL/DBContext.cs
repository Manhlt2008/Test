using System;
using System.Collections.Generic;
using System.Configuration;
using FluentData;
using System.Web;
using Angular.Models;
using System.Data.Entity;

namespace Angular.DAL
{
    public class DBContext : System.Data.Entity.DbContext
    {
        public class MainDBContext
        {
            public static IDbContext MainDB()
            {
                return new FluentData.DbContext().ConnectionString(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString, new SqlServerProvider());
            }
        }
        
    }
}