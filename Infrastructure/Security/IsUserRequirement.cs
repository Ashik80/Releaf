using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class IsUserRequirement : IAuthorizationRequirement
    {
    }

    public class IsUserRequirementHandler : AuthorizationHandler<IsUserRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor accessor;
        public IsUserRequirementHandler(DataContext context, IHttpContextAccessor accessor)
        {
            this.accessor = accessor;
            _context = context;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsUserRequirement requirement)
        {
            var currentUserName = accessor.HttpContext.User?.Claims?
                .FirstOrDefault(u => u.Type == ClaimTypes.NameIdentifier).Value;

            var requestUserName = accessor.HttpContext.Request.RouteValues
                .FirstOrDefault(u => u.Key == "userName").Value.ToString();

            if (currentUserName == requestUserName)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}