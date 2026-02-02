using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Common;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "Exception occurred: {Message}", exception.Message);

        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = "A server error occurred",
            Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
            Detail = "An unexpected error occurred while processing your request.",
            Instance = $"{httpContext.Request.Method} {httpContext.Request.Path}{httpContext.Request.QueryString}",
            Extensions =
            {
                ["traceId"] = httpContext.TraceIdentifier,
                ["timestamp"] = DateTimeOffset.UtcNow,
            },
        };

        if (httpContext.Request.Headers.ContainsKey("X-Request-ID"))
        {
            problemDetails.Extensions["requestId"] = httpContext.Request.Headers["X-Request-ID"].ToString();
        }

        httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

        return true;
    }
}