var builder = DistributedApplication.CreateBuilder(args);

var clientId = builder.Configuration["Authentication:ClientId"];
var authority = builder.Configuration["Authentication:Authority"];

var api = builder.AddProject<Projects.Api>("api")
    .WithEndpoint("http", endpoint =>
    {
        endpoint.Port = 5001;
    }, createIfNotExists: false);

builder.AddViteApp("react", "../../ui")
    .WithEndpoint("http", endpoint =>
    {
        endpoint.Port = 5173;
    }, createIfNotExists: false)
    .WithEnvironment("VITE_REACT_APP_API_URL", api.GetEndpoint("http"))
    .WithEnvironment("VITE_REACT_APP_MSAL_CLIENT_ID", clientId)
    .WithEnvironment("VITE_REACT_APP_MSAL_AUTHORITY", authority)
    .WithReference(api)
    .WaitFor(api)
    .WithExternalHttpEndpoints();

builder.Build().Run();