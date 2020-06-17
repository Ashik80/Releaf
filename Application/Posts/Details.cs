using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Details
    {
        public class Query : IRequest<Post>
        {
            public Guid PostId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Post>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Post> Handle(Query request, CancellationToken cancellationToken)
            {
                var post = await context.Posts.FindAsync(request.PostId);

                if (post == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Post = "Post not found" });
                }

                return post;
            }
        }
    }
}