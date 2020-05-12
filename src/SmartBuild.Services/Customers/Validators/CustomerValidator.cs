using FluentValidation;
using Microsoft.Extensions.Localization;
using SmartBuild.Entities.Customers;

namespace SmartBuild.Services.Customers.Validators
{
    public class CustomerValidator : AbstractValidator<Customer>
    {
        public CustomerValidator(IStringLocalizer<CustomerValidator> localizer)
        {
            RuleFor(x => x.CPF)
                .NotEmpty().WithMessage(localizer["Informe o CPF."])
                .Length(11).WithMessage(localizer["O CPF deve ter 11 números."]);
        }
    }
}
