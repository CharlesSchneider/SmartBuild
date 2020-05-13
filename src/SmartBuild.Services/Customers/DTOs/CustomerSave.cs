using System;
using SmartBuild.Entities;

namespace SmartBuild.Services.Customers.DTOs
{
    public class CustomerSave
    {
        public string Name { get; set; }
        public DateTime? BirthDate { get; set; }
        public string RG { get; set; }
        public string CPF { get; set; }
        public Address Address { get; set; }
        public string HomePhone { get; set; }
        public string WorkPhone { get; set; }
        public string ReferencePhone { get; set; }
        public string CellPhone { get; set; }
        public string Email { get; set; }
        public bool IsDeleted { get; set; }
    }
}
