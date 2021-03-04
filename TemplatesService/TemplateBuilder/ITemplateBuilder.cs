using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplatesService.TemplateBuilder
{
    public interface ITemplateBuilder<T> where T: new()
    {
        public ITemplateBuilder<T> ForSection(Predicate<T> predicate);
       public ITemplateBuilder<T> MatchStyles(Action<T> action);


    }
}
