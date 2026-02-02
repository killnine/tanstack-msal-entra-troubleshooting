using System.Security.Claims;
using Api.Features.Permissions.Services.Abstractions;
using Api.Features.Users.Services;

namespace Api.Features.Permissions.Middleware;

public class PermissionsMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<PermissionsMiddleware> _logger;
    private readonly string _roleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    private readonly string _objectIdClaimType = "http://schemas.microsoft.com/identity/claims/objectidentifier";
    private readonly string _accessRoll = "App.Access";

    public PermissionsMiddleware(
        RequestDelegate next,
        ILogger<PermissionsMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, IPermissionService permissionService, IUserService userService)
    {
        if (context.User.Identity is ClaimsIdentity { IsAuthenticated: true } userIdentity)
        {
            if (!userIdentity.HasClaim(_roleClaimType, _accessRoll))
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                return;
            }

            if (userIdentity.Name != null && userService.UserExists(userIdentity.Name))
            {
                await _next(context);
                return;
            }

            var objectIdClaim = userIdentity.Claims.FirstOrDefault(c => c.Type == _objectIdClaimType);
            if (objectIdClaim is null)
            {
                _logger.LogWarning("Cannot insert new user. Unable to retrieve ObjectId from {@UserIdentityName}", userIdentity.Name);
                await _next(context);
                return;
            }

            // NOTE: Here we would normally insert a new user with default permissions of they had "App.Access" claim.
            //      However, this is just a demo with fixed users so we will skip.
        }

        await _next(context);
    }
}