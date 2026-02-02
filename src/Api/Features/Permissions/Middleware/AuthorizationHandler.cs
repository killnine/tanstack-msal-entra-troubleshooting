using Api.Features.Permissions.Extensions;
using Api.Features.Permissions.Models.Requirements.Abstractions;
using Api.Features.Permissions.Services.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Api.Features.Permissions.Middleware;

public class AuthorizationHandler : AuthorizationHandler<IAuthorizationRequirement>
{
    private readonly ILogger<AuthorizationHandler> _logger;
    private readonly IServiceProvider _serviceProvider;

    public AuthorizationHandler(
        ILogger<AuthorizationHandler> logger,
        IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IAuthorizationRequirement requirement)
    {
        var localUserId = context.User.GetUserObjectId();
        if (localUserId == null)
        {
            _logger.LogWarning("User is not authorized");
            return;
        }

        if (requirement is IPermissionRequirement permissionRequirement)
        {
            using var scope = _serviceProvider.CreateScope();
            var permissionService = scope.ServiceProvider.GetRequiredService<IPermissionService>();
            var requiredPermissions = permissionRequirement.GetPermissions().ToList();

            if (permissionRequirement.RequiresAll)
            {
                var hasAllPermissions = permissionService.HasAllPermissions(localUserId.Value, requiredPermissions, CancellationToken.None);
                if (hasAllPermissions)
                {
                    context.Succeed(requirement);
                    return;
                }
            }

            var hasAtLeastOne = permissionService.HasAnyPermission(localUserId.Value, requiredPermissions, CancellationToken.None);
            if (hasAtLeastOne)
            {
                context.Succeed(requirement);
                return;
            }
        }

        if (requirement is DenyAnonymousAuthorizationRequirement)
        {
            return;
        }

        _logger.LogWarning("User is not authorized");
    }
}