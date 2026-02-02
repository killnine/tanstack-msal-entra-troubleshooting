using Common.Infrastructure.Authentication.Abstractions;
using Common.Infrastructure.Authentication.Models;
using Microsoft.AspNetCore.Http;

namespace Common.Infrastructure.Authentication;

public class CurrentUserService(IHttpContextAccessor httpContextAccessor) : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));

    public IUserSession GetCurrentUser()
    {
        if (_httpContextAccessor?.HttpContext == null)
        {
            return new UserSession();
        }

        IUserSession currentUser = new UserSession
        {
            IsAuthenticated = _httpContextAccessor?.HttpContext?.User?.Identity?.IsAuthenticated ?? false,
            LoginName = _httpContextAccessor?.HttpContext?.User?.Identity?.Name ?? "Unknown",
        };

        return currentUser;
    }
}