namespace SmartBuild.Entities.Finances
{
    public class AccountCategory
    {
        public int AccountCategoryId { get; set; }
        public string Description { get; set; }
        public AccountCategoryType Type { get; set; }
        public AccountCategory ParentAccountCategory { get; set; }
    }
}
