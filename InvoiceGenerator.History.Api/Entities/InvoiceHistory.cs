using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceGenerator.History.Api.Entities
{
    public class InvoiceHistory : IEntity
    {
        public DateTime CreationDate { get; set; }

        public string InvoiceNumber { get; set; }

        public InvoiceData InvoiceData { get; set; }
        public int Id { get; set; }
    }
}
