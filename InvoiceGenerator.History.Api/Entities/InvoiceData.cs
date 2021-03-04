using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceGenerator.History.Api.Entities
{
    public class InvoiceData : IEntity
    {
        public string JsonEncodedInvoice { get; set; }
    
        public int Id { get; set; }
    }
}
