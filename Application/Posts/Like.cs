using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class Like
    {
        public class Command : IRequest<PostDto>
        {
            public Guid PostId { get; set; }
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
                var post = await context.Posts
                    .Include(p => p.AppUser)
                    .Include(p => p.Likes)
                        .ThenInclude(l => l.AppUser)
                    .FirstOrDefaultAsync(p => p.PostId == request.PostId);

                if (post == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { post = "Post not found" });
                }

                var user = await userManager.FindByNameAsync(userAccessor.GetCurrentUser());

                var checkLike = await context.Likes.FirstOrDefaultAsync(l => l.Post == post && l.AppUser == user);

                if (checkLike == null)
                {
                    var like = new Domain.Like
                    {
                        Post = post,
                        AppUser = user
                    };

                    context.Likes.Add(like);
                }
                else
                {
                    context.Likes.Remove(checkLike);
                }

                var result = await context.SaveChangesAsync() > 0;

                var postDto = mapper.Map<Post, PostDto>(post);

                if (result) return postDto;

                throw new Exception("Problem Liking the post");
            }
        }
    }
}