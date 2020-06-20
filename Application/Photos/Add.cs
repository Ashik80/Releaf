using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<PhotoDto>
        {
            public IFormFile file { get; set; }
        }

        public class Handler : IRequestHandler<Command, PhotoDto>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly IUserAccessor userAccessor;
            private readonly IPhotoAccessor photoAccessor;
            private readonly DataContext context;
            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                this.context = context;
                this.photoAccessor = photoAccessor;
                this.userAccessor = userAccessor;
                this.userManager = userManager;
            }

            public async Task<PhotoDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByNameAsync(userAccessor.GetCurrentUser());

                var photoUploadResult = photoAccessor.AddPhoto(request.file);

                user.Image = photoUploadResult.Url;

                var result = await context.SaveChangesAsync() > 0;

                if(result)
                {
                    return new PhotoDto{
                        Url = photoUploadResult.Url
                    };
                }

                throw new Exception("Problem adding photo");
            }
        }
    }
}