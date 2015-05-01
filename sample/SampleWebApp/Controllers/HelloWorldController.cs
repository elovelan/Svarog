using System.Web.Http;

namespace SampleWebApp.Controllers
{
    public class HelloWorldController : ApiController
    {
        public IHttpActionResult Get()
        {
            return Ok("Hello World");
        }
    }
}
