using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

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
            private readonly IMapper mapper;
            private readonly DataContext context;
            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    // .Include(u => u.Photo)
                    .FirstOrDefaultAsync(u => u.UserName == request.UserName);

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