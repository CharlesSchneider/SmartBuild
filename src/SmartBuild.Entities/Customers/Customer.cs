﻿using System;

namespace SmartBuild.Entities.Customers
{
    public class Customer : IDeletable
    {
        public int CustomerId { get; set; }
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
