using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Posts;
using System;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IMediator mediator;
        public PostsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<PostDto>>> List()
        {
            return await mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> Details(Guid id)
        {
            return await mediator.Send(new Details.Query{PostId = id});
        }
    }
}