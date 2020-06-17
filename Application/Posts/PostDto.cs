using System;

namespace Application.Posts
{
    public class PostDto
    {
        public Guid PostId { get; set; }
        public string Text { get; set; }
        public DateTime PostTime { get; set; }
        public UserDto AppUser { get; set; }
    }
}