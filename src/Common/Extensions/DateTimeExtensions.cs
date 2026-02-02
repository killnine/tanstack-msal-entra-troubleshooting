namespace Common.Extensions;

public static class DateTimeExtensions
{
    public static string ToApiSafeString(this DateTimeOffset dateTimeOffset)
    {
        return dateTimeOffset.ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
    }
}