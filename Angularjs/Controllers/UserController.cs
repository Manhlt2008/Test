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
        public JsonResult UserGetByCondition(string userName, int departmentId, int status)
        {
            var userBl = new UserBL();
            var lstUser = userBl.Users_GetByCondition(userName, departmentId, status);
            return Json(lstUser, JsonRequestBehavior.AllowGet);
        }
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
        public JsonResult InsertUser(string userName, string fullName, string password, string email, string groupId,
                                int departmentId)
        {
            var userBl = new UserBL();
            string message = string.Empty;
            try
            {
                userBl.UserInsert(userName, fullName, Crytography.MD5Hash("123456"), email, groupId, departmentId, 0, 0, DateTime.Now, DateTime.Now);
                message = "Thêm mới User thành công!!!";
            }
            catch (Exception)
            {
                message = "Có lỗi xảy ra, xin vui lòng thử lại";
            }
            return Json(new { message }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateUser(int userId,string userName, string fullName, string email, string groupId,
                                int departmentId, int status)
        {
            var userBl = new UserBL();
            string message = string.Empty;
            try
            {
                userBl.UserUpdate(userId, userName, fullName, email, groupId, departmentId, status, DateTime.Now);
                message = "Update User thành công!!!";
            }
            catch (Exception)
            {
                message = "Có lỗi xảy ra, xin vui lòng thử lại";
            }
            return Json(new { message }, JsonRequestBehavior.AllowGet);
        }
    }
}
