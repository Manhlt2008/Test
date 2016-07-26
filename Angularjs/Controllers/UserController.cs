using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Angularjs.Models;
using Angularjs.DAL;
using Angularjs.Lib;

namespace Angularjs.Controllers
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
        public JsonResult GetListDepartment()
        {
            var dpmBl = new DepartmentBL();
            var lstdpmBl = dpmBl.GetAllDepartment();
            return Json(lstdpmBl, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult UserSearch(string userName,string )
        //{

        //}
        public JsonResult GetUserGroup()
        {
            var userBl = new UserBL();
            var lstgr = userBl.GetAllGroup();
            return Json(lstgr, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetGroupNameByUserId(int userId)
        {
            var userBl = new UserBL();
            var lstgrn = userBl.GetGroupNameByUserId(userId);
            return Json(lstgrn, JsonRequestBehavior.AllowGet);
        }

        public void BlockUser(int userId)
        {
            //status: 0- bình thường, 1- khóa
            new UserBL().BlockUser(userId,1);
        }
        public JsonResult GetByUserId(int userId)
        {
            var userBl = new UserBL();
            var user=userBl.GetByUserId(userId);
            return Json(user, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ChangePassWord(int userId, string password)
        {
            var userBl = new UserBL();
            string message = string.Empty;
            var user = userBl.GetByUserId(userId);
            if (user != null)
            {
                try
                {
                    //var pass = password.ToMD5();
                    userBl.ChangePassWord(userId, Crytography.MD5Hash(password));
                    message = "Thay đổi mật khẩu thành công";
                }
                catch
                {
                    message = "Xin vui lòng thử lại";
                }
                
            }
            else {
                message = "Người dùng này không tồn tại trong hệ thống";
            }
            return Json(new { message }, JsonRequestBehavior.AllowGet);
        }
    }
}
