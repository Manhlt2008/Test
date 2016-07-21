using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Angular.Models;
using Angular.DAL;

namespace Angular.DAL
{
    public class DepartmentBL
    {
        public List<Department> GetAllDepartment()
        {
            using (var context = Angular.DAL.DBContext.MainDBContext.MainDB())
            {
                return context.StoredProcedure("Department_GetAll").QueryMany<Department>();
            }
        }
    }
}