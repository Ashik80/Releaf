using System.Threading.Tasks;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilesController : ControllerBase
    {
        private readonly IMediator mediator;
        public ProfilesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("{userName}")]
        public async Task<ActionResult<Profile>> GetProfile(string userName)
        {
            return await mediator.Send(new Details.Query { UserName = userName });
        }

        [HttpPut("{userName}")]
        [Authorize(Policy = "IsUserRequirement")]
        public async Task<ActionResult<Profile>> Update(string userName, Update.Command command)
        {
            command.UserName = userName;
            return await mediator.Send(command);
        }
    }
}