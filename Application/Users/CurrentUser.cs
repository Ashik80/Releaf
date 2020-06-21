using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Photos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly IUserAccessor userAccessor;
            private readonly IJwtGenerator jwtGenerator;
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(IMapper mapper, IUserAccessor userAccessor, DataContext context, IJwtGenerator jwtGenerator)
            {
                this.mapper = mapper;
                this.context = context;
                this.jwtGenerator = jwtGenerator;
                this.userAccessor = userAccessor;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    // .Include(u => u.Photo)
                    .FirstOrDefaultAsync(u => u.UserName == userAccessor.GetCurrentUser());

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { User = "User not found" });
                }

                return new User
                {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Token = jwtGenerator.CreateToken(user),
                    Photo = mapper.Map<Photo, PhotoDto>(user.Photo)
                };
            }
        }
    }
}