using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartBuild.Entities.Customers;

namespace SmartBuild.Services.Customers.ExtensionMethods
{
    public static class CustomersExtensions
    {
        public static async Task<Customer> GetyByNameAsync(this DbSet<Customer> customers, string name)
        {
            return await customers.FirstOrDefaultAsync(c => c.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase));
        }
    }
}
