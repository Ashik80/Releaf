using Application.Photos;

namespace Application.Users
{
    public class User
    {
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public PhotoDto Photo { get; set; }
    }
}