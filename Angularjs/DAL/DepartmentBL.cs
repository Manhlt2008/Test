using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Angularjs.Models;
using Angularjs.DAL;

namespace Angularjs.DAL
{
    public class DepartmentBL
    {
        public List<Department> GetAllDepartment()
        {
            using (var context = Angularjs.DAL.DBContext.MainDBContext.MainDB())
            {
                return context.StoredProcedure("Department_GetAll").QueryMany<Department>();
            }
        }
    }
}