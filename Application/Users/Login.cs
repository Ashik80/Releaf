using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Photos;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly SignInManager<AppUser> signInManager;
            private readonly IJwtGenerator jwtGenerator;
            private readonly IMapper mapper;
            private readonly DataContext context;
            public Handler(IMapper mapper, DataContext context, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
            {
                this.context = context;
                this.mapper = mapper;
                this.jwtGenerator = jwtGenerator;
                this.signInManager = signInManager;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    // .Include(u => u.Photo)
                    .FirstOrDefaultAsync(u => u.Email == request.Email);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { user = "Wrong credentials" });
                }

                var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (result.Succeeded)
                {
                    return new User
                    {
                        UserName = user.UserName,
                        DisplayName = user.DisplayName,
                        Token = jwtGenerator.CreateToken(user),
                        Photo = mapper.Map<Photo, PhotoDto>(user.Photo)
                    };
                }

                throw new RestException(HttpStatusCode.Unauthorized, new { user = "Wrong credentials" });
            }
        }
    }
}