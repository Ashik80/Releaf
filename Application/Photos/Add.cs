using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<PhotoDto>
        {
            public IFormFile File { get; set; }
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

                var photoExists = await context.Photos.FirstOrDefaultAsync(p => p.AppUserId == user.Id);

                if (photoExists != null)
                {
                    photoAccessor.DeletePhoto(photoExists.Id);

                    context.Photos.Remove(photoExists);
                }

                var photoUploadResult = photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Id = photoUploadResult.PublicId,
                    Url = photoUploadResult.Url,
                    AppUser = user
                };

                context.Photos.Add(photo);

                var result = await context.SaveChangesAsync() > 0;

                if (result)
                {
                    return new PhotoDto
                    {
                        Id = photoUploadResult.PublicId,
                        Url = photoUploadResult.Url
                    };
                }

                throw new Exception("Problem adding photo");
            }
        }
    }
}