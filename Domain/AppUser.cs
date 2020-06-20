using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Bio { get; set; }
        public string Gender { get; set; }
        public string Image { get; set; }
        public ICollection<Post> Posts { get; set; }
        public ICollection<Like> Likes { get; set; }
    }
}