﻿using System.Collections.Generic;
using System.Threading.Tasks;
using SmartBuild.Services.Customers.Models;

namespace SmartBuild.Services.Customers
{
    public interface ICustomersService
    {
        Task<PagedResponse<List<CustomerModel>>> GetPagedCustomersAsync(string searchTerm, int? start, int? length, string order, string orderDir = "asc");
        Task<CustomerModel> GetCustomerByIdAsync(int customerId);
        IAsyncEnumerable<CustomerModel> GetCustomersAsync();
        Task<CustomerModel> AddAsync(CustomerSave customer);
        Task<CustomerModel> UpdateAsync(int customerId, CustomerSave customer);
        Task DeleteAsync(int customerId);
    }
}
