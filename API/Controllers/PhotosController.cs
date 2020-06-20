using System.Threading.Tasks;
using Application.Photos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IMediator mediator;
        public PhotosController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("add")]
        public async Task<ActionResult<PhotoDto>> AddPhoto([FromForm]Add.Command command)
        {
            return await mediator.Send(command);
        }
    }
}