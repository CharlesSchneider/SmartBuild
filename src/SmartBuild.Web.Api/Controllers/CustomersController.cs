using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartBuild.Services.Customers;
using SmartBuild.Services.Customers.DTOs;

namespace SmartBuild.Web.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomersService _customersService;

        public CustomersController(ICustomersService customersService)
        {
            _customersService = customersService;
        }

        [HttpGet]
        public async IAsyncEnumerable<CustomerView> GetAsync()
        {
            var customers = _customersService.GetCustomersAsync();
            await foreach (var customer in customers)
            {
                yield return customer;
            }
        }

        [HttpPost]
        public async Task<CustomerView> PostAsync(CustomerSave customer)
        {
            var result = await _customersService.AddAsync(customer);
            return result;
        }

        [HttpPut("{customerId}")]
        public async Task<CustomerView> PutAsync(int customerId, [FromBody]CustomerSave customer)
        {
            var result = await _customersService.UpdateAsync(customerId, customer);
            return result;
        }
    }
}