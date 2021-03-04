//using InvoiceGenerator.Web.Extensions;
//using InvoiceGenerator.Web.Models.Invoice;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using TemplatesService.TemplateBuilder;
using TemplatesService.TemplateTypes;

namespace InvoiceGenerator.Web.Controllers
{
    [Route("templates")]
    [ApiController]
    public class TemplatesController : Controller
    {
        [HttpGet]
        public async Task<IEnumerable<Template>> Get()
        {
            

            string html = "asdAS";//await this.RenderViewAsync("Classic", invoiceModel);



            //ITemplateBuilder<TemplateBase> builder =
            //    new TemplateBuilder<TemplateBase>()
            //    .MatchStyles(t => t.ViewMessage())
            //    .ForSection(p=>p.SectionName == "asd");
            return null;
        }
        
    }
}