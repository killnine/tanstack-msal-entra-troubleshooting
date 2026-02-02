using Api.Features.Jackets.DataTransfer;
using Api.Features.Jackets.Extensions;
using Api.Features.Permissions.Extensions;
using Common.Infrastructure.Database;
using FastEndpoints;

namespace Api.Features.Jackets.Endpoints;

public class GetJacket : EndpointWithoutRequest<JacketDto>
{
    public override void Configure()
    {
        Get("/api/jackets/{jacketId}");
        Policies(PermissionsExtensions.GetPermissionPolicy(Database.PermissionJacketRead));
        Summary(s =>
        {
            s.Summary = "Retrieves a Job Jacket from the database.";
            s.Description = "Endpoint will return an existing Job Jacket when Id is greater than 0. Requests with Id of 0 returns an empty Jacket.";
            s.Response<JacketDto>(200, "Successfully retrieved jacket");
            s.Response<JacketDto>(404, "Jacket not found - no jacket with the provided ID exists");
            s.Response<JacketDto>(500, "Internal server error");
        });
    }

    public override async Task HandleAsync(CancellationToken cancellationToken)
    {
        var jacketId = Route<int>("jacketId");

        var jacket = Database.Jackets.FirstOrDefault(j => j.Id == jacketId);
        if (jacket == null)
        {
            await Send.NotFoundAsync(cancellationToken);
            return;
        }

        await Send.OkAsync(jacket.ToDto(), cancellationToken);
    }
}