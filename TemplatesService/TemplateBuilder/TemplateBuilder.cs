using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TemplatesService.TemplateBuilder
{
    public class TemplateBuilder<T> : ITemplateBuilder<T> where T: new()
    {
        T template;

        public TemplateBuilder()
        {
            template = new T();
        }

        public ITemplateBuilder<T> ForSection(Predicate<T> predicate)
        {
            predicate(template);
            return this;
        }

        public ITemplateBuilder<T> MatchStyles(Action<T> action)
        {
            action(template);

            return this;
        }
    }
}
