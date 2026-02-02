using System.Security.Claims;

namespace Api.Features.Permissions.Extensions;

public static class ClaimsPrincipalExtensions
{
    private const string ObjectIdentifierClaim = "http://schemas.microsoft.com/identity/claims/objectidentifier";

    public static Guid? GetUserObjectId(this ClaimsPrincipal principal)
    {
        if (principal == null)
        {
            throw new ArgumentNullException(nameof(principal));
        }

        if (Guid.TryParse(principal.FindFirstValue(ObjectIdentifierClaim), out Guid result))
        {
            return result;
        }

        return null;
    }
}