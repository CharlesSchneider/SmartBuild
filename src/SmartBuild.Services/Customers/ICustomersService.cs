using System.Collections.Generic;
using System.Threading.Tasks;
using SmartBuild.Services.Customers.DTOs;

namespace SmartBuild.Services.Customers
{
    public interface ICustomersService
    {
        IAsyncEnumerable<CustomerView> GetCustomersAsync();
        Task<CustomerView> AddAsync(CustomerSave customer);
        Task<CustomerView> UpdateAsync(int customerId, CustomerSave customer);
    }
}
