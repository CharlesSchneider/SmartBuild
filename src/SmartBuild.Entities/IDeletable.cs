namespace SmartBuild.Entities
{
    /// <summary>
    /// Implements logical exclusion
    /// </summary>
    public interface IDeletable
    {
        public bool IsDeleted { get; set; }
    }
}
