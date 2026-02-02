using Api.Extensions;
using Api.Features.Permissions.Middleware;
using Common;
using FastEndpoints;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddHttpClient();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendAspire", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

builder.Services.Configure<CookieAuthenticationOptions>(CookieAuthenticationDefaults.AuthenticationScheme, options => options.AccessDeniedPath = "/Error/NotAuthorized");
builder.Services.Configure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme, options => options.Events = new JwtBearerEvents
{
    OnMessageReceived = context =>
    {
        var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
        logger.LogInformation("Token received: {Token}", context.Token);
        return Task.CompletedTask;
    },
    OnTokenValidated = context =>
    {
        var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
        logger.LogInformation(
            "Token validated. User: {UserName}, Claims count: {ClaimsCount}",
            context.Principal?.Identity?.Name,
            context.Principal?.Claims.Count());
        return Task.CompletedTask;
    },
    OnAuthenticationFailed = context =>
    {
        var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
        context.Request.Headers.TryGetValue("Authorization", out var authHeader);
        logger.LogError(context.Exception, "Authentication failed. Token: {Token}", authHeader.ToString());
        return Task.CompletedTask;
    },
});

builder.Services.AddAuthorization();
builder.Services.AddCustomAuthorization();

builder.Services.AddFastEndpoints();

var app = builder.Build();

app.UseAuthentication();

app.UseMiddleware<PermissionsMiddleware>();
app.UseAuthorization();

app.UseCors("AllowFrontendAspire");

app.UseExceptionHandler();

app.MapGet("/", () => "Hello World!");

app.MapDefaultEndpoints();

app.UseFastEndpoints(x =>
{
    x.Errors.UseProblemDetails();
});

app.Run();