using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class Details
    {
        public class Query : IRequest<PostDto>
        {
            public Guid PostId { get; set; }
        }

        public class Handler : IRequestHandler<Query, PostDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<PostDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var post = await context.Posts
                    // .Include(p => p.AppUser)
                    // .Include(p => p.Likes)
                    //     .ThenInclude(l => l.AppUser)
                    .FirstOrDefaultAsync(p => p.PostId == request.PostId);

                if (post == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Post = "Post not found" });
                }

                var postDto = mapper.Map<Post, PostDto>(post);

                return postDto;
            }
        }
    }
}