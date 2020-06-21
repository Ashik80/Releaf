using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class List
    {
        public class Query : IRequest<List<PostDto>> { }
        public class Handler : IRequestHandler<Query, List<PostDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, UserManager<AppUser> userManager, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<List<PostDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var posts = await context.Posts
                    // .Include(p => p.AppUser)
                    //     .ThenInclude(a => a.Photo)
                    // .Include(p => p.Likes)
                    //     .ThenInclude(l => l.AppUser)  
                    .ToListAsync();

                var postdto = mapper.Map<List<Post>, List<PostDto>>(posts);

                return postdto;
            }
        }
    }
}