using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Angularjs.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Fullname { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string GroupId { get; set; }
        public string GroupName { get; set; }
        public int DepartmentId { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public int Location { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateTime { get; set; }
    }
    public class UserGroup
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int Status { get; set;}
        public int GroupType { get; set; }
        public string Description { get; set; }
    }

}