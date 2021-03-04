using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplatesService.TemplateTypes
{
    public class TemplateBase
    {

        public string SectionName { get; set; }

        public void ViewMessage() {Console.WriteLine("message");}
    }
}
