using System;

namespace Domain
{
    public class Like
    {
        public Guid LikeId { get; set; }
        public virtual Post Post { get; set; }
        public virtual AppUser AppUser { get; set; }
    }
}