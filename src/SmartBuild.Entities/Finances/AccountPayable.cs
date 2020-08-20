using System;

namespace SmartBuild.Entities.Finances
{
    public class AccountPayable
    {
        //modelBuilder.Entity<AccountPayable>()
        //    .Property(p => p.Type)
        //    .HasConversion<char>(p => (char) p, p => (MessageType) (int) p);

        public int AccountPayableId { get; set; }
        public string Description { get; set; }
        public decimal Value { get; set; }
        public DateTime Date { get; set; }
        public AccountType Type { get; set; }
        public AccountFrequency Frequency { get; set; }
        public short? Repetition { get; set; }
        public AccountCategory Category { get; set; }
        public Account Account { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public string Observations { get; set; }
    }
}
