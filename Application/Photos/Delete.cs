using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string PublicId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IPhotoAccessor photoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                this.photoAccessor = photoAccessor;
                this.userAccessor = userAccessor;
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users
                    .FirstOrDefaultAsync(u => u.UserName == userAccessor.GetCurrentUser());

                var photo = await context.Photos
                    .FirstOrDefaultAsync(p => p.Id == request.PublicId && p.AppUserId == user.Id);

                if (photo == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { photo = "Photo not found" });
                }

                var success = photoAccessor.DeletePhoto(photo.Id);

                if(success == null)
                {
                    throw new Exception("Problem deleting file");
                }

                context.Photos.Remove(photo);

                var result = await context.SaveChangesAsync() > 0;

                if (result) return Unit.Value;

                throw new Exception("Problem adding photo");
            }
        }
    }
}