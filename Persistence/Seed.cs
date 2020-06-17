using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id="a",
                        DisplayName = "Ashik",
                        DateOfBirth = new DateTime(1995, 09, 02),
                        Address = "Bashundhara R/A, Dhaka",
                        Email = "ashikurrahman80forget.ar@gmail.com",
                        UserName = "ashik80"
                    },
                    new AppUser
                    {
                        Id="b",
                        DisplayName = "Sarah",
                        DateOfBirth = new DateTime(1999, 08, 31),
                        Address = "Bashundhara R/A, Dhaka",
                        Email = "sarah@gmail.com",
                        UserName = "sarah31"
                    },
                    new AppUser
                    {
                        Id="c",
                        DisplayName = "Sharvi",
                        DateOfBirth = new DateTime(2004, 02, 28),
                        Address = "Dhubaria, Tangail, Dhaka",
                        Email = "sharvi@gmail.com",
                        UserName = "sharvi28"
                    }
                };
                foreach(var user in users)
                {
                    await userManager.CreateAsync(user, "Passw0rd");
                }
            }

            if(!context.Posts.Any())
            {
                var posts = new List<Post>
                {
                    new Post
                    {
                        Text = "First post",
                        PostTime = DateTime.Now.AddDays(-1).AddHours(-1)
                    },
                    new Post
                    {
                        Text = "Second post",
                        PostTime = DateTime.Now.AddDays(-1)
                    },
                    new Post
                    {
                        Text = "Third post",
                        PostTime = DateTime.Now.AddDays(-1).AddHours(5)
                    }
                };

                await context.Posts.AddRangeAsync(posts);
                await context.SaveChangesAsync();
            }
        }
    }
}