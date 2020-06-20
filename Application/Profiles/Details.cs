using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Profile>
        {
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Profile>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly IMapper mapper;
            public Handler(UserManager<AppUser> userManager, IMapper mapper)
            {
                this.mapper = mapper;
                this.userManager = userManager;
            }

            public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByNameAsync(request.UserName);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { user = "User Not Found" });
                }

                var profile = mapper.Map<AppUser, Profile>(user);

                return profile;
            }
        }
    }
}