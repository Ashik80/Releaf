using System.Threading.Tasks;
using Application.Users;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Mediator mediator;
        public UsersController(Mediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(Login.Query query)
        {
            return await mediator.Send(query);
        }
    }
}