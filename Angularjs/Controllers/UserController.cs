using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Angular.Models;
using Angular.DAL;

namespace Angular.Controllers
{
    public class UserController : Controller
    {
        //
        // GET: /Users/

        public ActionResult Index()
        {
            var userBl = new UserBL();
            var lstUser = userBl.GetAllUser();
            return View();
        }
        public JsonResult GetListUsers(string username)
        {
            var userBl = new UserBL();
            var lstUser = userBl.GetAllUser();
            return Json(lstUser, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetUserGroup()
        {
            var userBl = new UserBL();
            var lstgr = userBl.GetAllGroup();
            return Json(lstgr, JsonRequestBehavior.AllowGet);
        }

        public void BlockUser(int userId)
        {
            //status: 0- bình thường, 1- khóa
            new UserBL().BlockUser(userId,1);
        }
    }
}
