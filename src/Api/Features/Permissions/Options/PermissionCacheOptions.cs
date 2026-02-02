namespace Api.Features.Permissions.Options;

public class PermissionCacheOptions
{
    /// <summary>
    /// Gets or sets CacheExpirationMinutes.
    /// This determines how long before cached items are
    /// discarded. This should be sufficiently long to reduce
    /// database calls, but short enough to prevent stale data from lingering.
    /// </summary>
    public int CacheExpirationMinutes { get; set; } = 30;
}