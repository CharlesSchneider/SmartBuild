namespace SmartBuild.Services
{
    public class PagedResponse<T>
    {
        public int TotalRecords { get; set; }
        public int TotalFilteredRecords { get; set; }
        public T Data { get; set; }

        public PagedResponse(int totalRecords, int totalFilteredRecords, T data)
        {
            TotalRecords = totalRecords;
            TotalFilteredRecords = totalFilteredRecords;
            Data = data;
        }
    }
}
