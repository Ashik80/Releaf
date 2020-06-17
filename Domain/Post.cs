using System;
using System.Collections.Generic;

namespace Domain
{
    public class Post
    {
        public Guid PostId { get; set; }
        public string Text { get; set; }
        public DateTime PostTime { get; set; }
        public AppUser AppUser { get; set; }
        public ICollection<Like> Likes { get; set; }
    }
}