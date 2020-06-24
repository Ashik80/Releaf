using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Users
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).NotEmpty()
                    .MinimumLength(5).WithMessage("Password must be at least 5 characters")
                    .Matches("[A-Z]").WithMessage("Password must contain at least 1 uppercase letter")
                    .Matches("[a-z]").WithMessage("Password must contain at least 1 lowercase letter")
                    .Matches("[0-9]").WithMessage("Password must contain at least 1 number");
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly IJwtGenerator jwtGenerator;
            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                this.jwtGenerator = jwtGenerator;
                this.userManager = userManager;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await userManager.Users.AnyAsync(u => u.UserName == request.UserName))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { user = "This username is taken" });
                }

                if (await userManager.Users.AnyAsync(u => u.Email == request.Email))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { user = "An account with this email already exists" });
                }

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    UserName = request.UserName,
                    Email = request.Email,
                    DateOfBirth = DateTime.Now.Date
                };

                var result = await userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        UserName = user.UserName,
                        Token = jwtGenerator.CreateToken(user),
                        Photo = null
                    };
                }

                throw new Exception("Problem registering user");
            }
        }
    }
}