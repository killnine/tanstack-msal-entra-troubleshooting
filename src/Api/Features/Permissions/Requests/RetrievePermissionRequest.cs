namespace Api.Features.Permissions.Requests;

public class RetrievePermissionRequest
{
    private RetrievePermissionRequest()
    {
    }

    public Guid? UserObjectId { get; private set; }

    public IEnumerable<int>? Ids { get; private set; }

    public static RetrievePermissionRequest ByObjectId(Guid userObjectId) => new RetrievePermissionRequest { UserObjectId = userObjectId };

    public static RetrievePermissionRequest ByIds(IEnumerable<int> ids) => new RetrievePermissionRequest { Ids = ids };
}