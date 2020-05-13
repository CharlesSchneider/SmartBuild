using System.Collections.Generic;
using System.Threading.Tasks;
using SmartBuild.Services.Customers.Models;

namespace SmartBuild.Services.Customers
{
    public interface ICustomersService
    {
        IAsyncEnumerable<CustomerModel> GetCustomersAsync();
        Task<CustomerModel> AddAsync(CustomerSave customer);
        Task<CustomerModel> UpdateAsync(int customerId, CustomerSave customer);
        Task DeleteAsync(int customerId);
    }
}
