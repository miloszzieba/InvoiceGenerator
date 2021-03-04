using System;
using InvoiceGenerator.Authorization.Areas.Identity.Data;
using InvoiceGenerator.Authorization.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(InvoiceGenerator.Authorization.Areas.Identity.IdentityHostingStartup))]
namespace InvoiceGenerator.Authorization.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<InvoiceGeneratorAuthorizationContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("InvoiceGeneratorAuthorizationContextConnection")));

                services.AddDefaultIdentity<InvoiceGeneratorAuthorizationUser>(options => options.SignIn.RequireConfirmedAccount = true)
                    .AddEntityFrameworkStores<InvoiceGeneratorAuthorizationContext>();
            });
        }
    }
}