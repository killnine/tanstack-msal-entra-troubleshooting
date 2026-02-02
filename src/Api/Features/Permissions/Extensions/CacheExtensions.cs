using Microsoft.Extensions.Caching.Memory;

namespace Api.Features.Permissions.Extensions;

public static class CacheExtensions
{
    public static bool IsNotEmpty<TSource>(this IEnumerable<TSource> source)
    {
        return source.Any();
    }

    public static void SetCacheValue<T>(this IMemoryCache cache, string key, T value, int expirationMinutes = 30)
    {
        cache.Set(key, value, TimeSpan.FromMinutes(expirationMinutes));
    }

    public static T? GetCacheValue<T>(this IMemoryCache cache, string key)
    {
        var val = cache.Get<T>(key);
        if (val == null)
        {
            return default;
        }

        return val;
    }
}