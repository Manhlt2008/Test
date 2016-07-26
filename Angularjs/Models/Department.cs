using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Angularjs.Models
{
    public class Department
    {
        public int DepartmentId{get;set;}
	    public string Code{get;set;}
	    public string Description{get;set;}
	    public int Report{get;set;}
	    public int Location{get;set;}
	    public int ParentID{get;set;}
	    public string FullParent{get;set;}
	    public int Status{get;set;}
	    public DateTime CreateDate{get;set;}
        public DateTime UpdateTime { get; set; }
    }
}