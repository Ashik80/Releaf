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
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Posts
{
    public class Create
    {
        public class Command : IRequest<PostDto>
        {
            public string Text { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Text).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, PostDto>
        {
            private readonly DataContext context;
            private readonly UserManager<AppUser> userManager;
            private readonly IUserAccessor userAccessor;
            private readonly IMapper mapper;
            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor userAccessor, IMapper mapper)
            {
                this.mapper = mapper;
                this.userAccessor = userAccessor;
                this.userManager = userManager;
                this.context = context;
            }

            public async Task<PostDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByNameAsync(userAccessor.GetCurrentUser());

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { user = "No user found" });
                }

                var post = new Post
                {
                    Text = request.Text,
                    PostTime = DateTime.Now,
                    AppUser = user
                };

                context.Posts.Add(post);

                var result = await context.SaveChangesAsync() > 0;

                var postDto = mapper.Map<Post, PostDto>(post);

                return postDto;

                throw new Exception("Problem creating post");
            }
        }
    }
}