using System.Collections.Generic;
using System.Threading.Tasks;
using SmartBuild.Entities.Customers;

namespace SmartBuild.Services.Customers
{
    public interface ICustomersService
    {
        Task<List<Customer>> GetCustomers();
        Task<int?> Add(Customer customer);
        Task<int?> Update(int customerId, Customer customer);
    }
}
