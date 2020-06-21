using System;
using Application.Photos;

namespace Application.Profiles
{
    public class Profile
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public PhotoDto Photo { get; set; }
    }
}