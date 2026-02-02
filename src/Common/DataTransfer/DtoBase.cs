namespace Common.DataTransfer;

public abstract record DtoBase(int Id)
{
    public int Id { get; set; } = Id;
}