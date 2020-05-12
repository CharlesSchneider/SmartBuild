using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartBuild.Entities.Customers;
using SmartBuild.Services.Customers;

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
        public async Task<IEnumerable<Customer>> Get()
        {
            var result = await _customersService.GetCustomers();
            return result;
        }

        [HttpPost]
        public async Task<int> Post(Customer customer)
        {
            var result = await _customersService.Add(customer);
            return result.GetValueOrDefault();
        }

        [HttpPut("{customerId}")]
        public async Task<int> Put(int customerId, [FromBody]Customer customer)
        {
            var result = await _customersService.Update(customerId, customer);
            return result.GetValueOrDefault();
        }
    }
}