using Microsoft.VisualStudio.TestTools.UnitTesting;
using TemplatesService.TemplateBuilder;
using TemplatesService.TemplateTypes;

namespace TemplatesService.Tests
{
    [TestClass]
    public class TemplateBuilderTest
    {
        TemplateBuilder<TemplateBase> builder;

        public TemplateBuilderTest()
        {
            builder = new TemplateBuilder<TemplateBase>();
        }

        [TestMethod]
        public void TemplateBuilderBuilds()
        {
            builder.ForSection(t => t.SectionName == "asd");
            Assert.IsTrue(builder == null);
        }
    }
}
