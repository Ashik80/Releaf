using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly IUserAccessor userAccessor;
            private readonly UserManager<AppUser> userManager;
            private readonly IJwtGenerator jwtGenerator;
            public Handler(IUserAccessor userAccessor, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                this.jwtGenerator = jwtGenerator;
                this.userManager = userManager;
                this.userAccessor = userAccessor;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByNameAsync(userAccessor.GetCurrentUser());

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = "User not found" });
                }

                return new User
                {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Token = jwtGenerator.CreateToken(user),
                    Image = null
                };
            }
        }
    }
}