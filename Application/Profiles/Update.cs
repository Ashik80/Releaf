using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Update
    {
        public class Command : IRequest<Profile>
        {
            public string UserName { get; set; }
            public string DisplayName { get; set; }
            public string Bio { get; set; }
            public string Address { get; set; }
            public DateTime DateOfBirth { get; set; }
            public string Gender { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Profile>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Profile> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .FirstOrDefaultAsync(u => u.UserName == request.UserName);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { user = "User not found" });
                }

                user.DisplayName = request.DisplayName ?? user.DisplayName;
                user.Bio = request.Bio ?? user.Bio;
                user.Address = request.Address ?? user.Address;
                user.DateOfBirth = request.DateOfBirth.ToLocalTime();
                user.Gender = request.Gender ?? user.Gender;

                var result = await context.SaveChangesAsync() > 0;

                if (result)
                {
                    var profile = mapper.Map<AppUser, Profile>(user);
                    return profile;
                }

                throw new Exception("Problem updating user");
            }
        }
    }
}