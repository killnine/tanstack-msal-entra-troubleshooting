using Api.Features.Permissions.Middleware;
using Api.Features.Permissions.Services;
using Api.Features.Permissions.Services.Abstractions;
using Api.Features.Users.Services;
using Common.Infrastructure.Authentication;
using Common.Infrastructure.Authentication.Abstractions;
using Common.Infrastructure.Authentication.Models;
using Microsoft.AspNetCore.Authorization;

namespace Api.Extensions;

public static class ApiServiceRegistration
{
    public static IServiceCollection AddCustomAuthorization(this IServiceCollection services)
    {
        services.AddMemoryCache();
        services.AddSingleton<IAuthorizationPolicyProvider, AuthorizationPolicyProvider>();
        services.AddSingleton<IAuthorizationHandler, AuthorizationHandler>();

        services.AddScoped<IUserSession, UserSession>();
        services.AddScoped<ICurrentUserService, CurrentUserService>();
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        services.AddScoped<IPermissionService, PermissionService>();
        services.AddScoped<IUserService, UserService>();

        return services;
    }
}