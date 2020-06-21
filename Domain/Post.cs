using System;
using System.Collections.Generic;

namespace Domain
{
    public class Post
    {
        public Guid PostId { get; set; }
        public string Text { get; set; }
        public DateTime PostTime { get; set; }
        public virtual AppUser AppUser { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
    }
}