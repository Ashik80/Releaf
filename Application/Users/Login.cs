using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users
{
    public class Login
    {
        public class Query : IRequest<AppUser>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppUser>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly SignInManager<AppUser> signInManager;
            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
            {
                this.signInManager = signInManager;
                this.userManager = userManager;
            }

            public async Task<AppUser> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByEmailAsync(request.Email);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { user = "Wrong credentials" });
                }

                

                if (result) return user;

                throw new RestException(HttpStatusCode.Unauthorized, new { user = "Wrong credentials" });
            }
        }
    }
}