using System;

namespace Domain
{
    public class Like
    {
        public Guid LikeId { get; set; }
        public Post Post { get; set; }
        public AppUser AppUser { get; set; }
    }
}