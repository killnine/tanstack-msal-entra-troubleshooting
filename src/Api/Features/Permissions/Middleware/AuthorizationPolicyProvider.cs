using Api.Features.Permissions.Models;
using Api.Features.Permissions.Models.Requirements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace Api.Features.Permissions.Middleware;

public class AuthorizationPolicyProvider : IAuthorizationPolicyProvider
{
    public AuthorizationPolicyProvider(IOptions<AuthorizationOptions> options)
    {
        FallbackPolicyProvider = new DefaultAuthorizationPolicyProvider(options);
    }

    private DefaultAuthorizationPolicyProvider FallbackPolicyProvider { get; }

    public Task<AuthorizationPolicy> GetDefaultPolicyAsync()
    {
        return FallbackPolicyProvider.GetDefaultPolicyAsync();
    }

    public Task<AuthorizationPolicy?> GetFallbackPolicyAsync()
    {
        return FallbackPolicyProvider.GetFallbackPolicyAsync();
    }

    public Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
    {
        if (policyName.StartsWith(PolicyConstants.PermissionPolicyPrefix))
        {
            var policy = new AuthorizationPolicyBuilder();
            policy.AddRequirements(new HasPermissionRequirement(policyName.Substring(PolicyConstants.PermissionPolicyPrefix.Length)));
            return Task.FromResult(policy.Build())!;
        }

        if (policyName.StartsWith(PolicyConstants.AnyPermissionPolicyPrefix))
        {
            var policy = new AuthorizationPolicyBuilder();
            policy.AddRequirements(new HasAnyPermissionRequirement(policyName.Substring(PolicyConstants.AnyPermissionPolicyPrefix.Length).Split(',')));
            return Task.FromResult(policy.Build())!;
        }

        return FallbackPolicyProvider.GetPolicyAsync(policyName);
    }
}