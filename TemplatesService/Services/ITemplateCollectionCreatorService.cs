using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TemplatesService.TemplateTypes;

namespace TemplatesService.Services
{
   public interface ITemplateCollectionCreatorService
    {
        public IList<Template> CreateTemplateCollection();
    }
}
