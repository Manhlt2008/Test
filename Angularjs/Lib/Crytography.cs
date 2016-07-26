using System;
using System.Security.Cryptography;
using System.Text;

namespace Angularjs.Lib
{
    public static class Crytography
    {
        public static string ToMD5(this string source)
        {
            MD5 md5Hasher = MD5.Create();

            byte[] data = md5Hasher.ComputeHash(Encoding.Default.GetBytes(source));

            var sBuilder = new StringBuilder();

            for (var i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            return sBuilder.ToString();
        }
        public static string EncriptPassWord(this string input)
        {
            return MD5Hash(input + "fptonline");
        }

        public static string MD5Hash(string text)
        {
            MD5 md5 = new MD5CryptoServiceProvider();

            //compute hash from the bytes of text
            byte[] result = md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));

            //get hash result after compute it
            //byte[] result = md5.Hash;

            //StringBuilder strBuilder = new StringBuilder();
            //for (int i = 0; i < result.Length; i++)
            //{
            //    //change it into 2 hexadecimal digits
            //    //for each byte
            //    strBuilder.Append(result[i].ToString("x2"));
            //}

            return Convert.ToBase64String(result);
        }
    }
}