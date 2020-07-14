using AutoMapper;
using SmartBuild.Entities;
using SmartBuild.Entities.Customers;
using SmartBuild.Services.Customers.Models;

namespace SmartBuild.Services
{
    public class Mappings : Profile
    {
        public Mappings()
        {
            CreateMap<Customer, CustomerModel>();
            CreateMap<Address, AddressModel>();
            CreateMap<CustomerSave, Customer>();
        }
    }
}
