using Application.Photos;

namespace Application.Posts
{
    public class UserDto
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public PhotoDto Photo { get; set; }
    }
}