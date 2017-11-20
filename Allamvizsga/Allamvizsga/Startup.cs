using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Allamvizsga.Startup))]
namespace Allamvizsga
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
