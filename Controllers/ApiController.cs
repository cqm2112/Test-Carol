using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Test_Carol.Models;

namespace Test_Carol.Controllers
{
    public class ApiController : Controller
    {
        [Route("[controller]/[action]/{dataCode}")]
        public async Task<IActionResult> Covid(DataCodes? dataCode)
        {
            var url = "https://api.covidtracking.com/v1/us/current.json";
            if(dataCode == DataCodes.ALABAMA)
            {
                url = "https://api.covidtracking.com/v1/states/al/current.json";
            }
            if (dataCode == DataCodes.IDAHO)
            {
                url = "https://api.covidtracking.com/v1/states/id/current.json";
            }
            if (dataCode == DataCodes.MINNESOTA)
            {
                url = "https://api.covidtracking.com/v1/states/mn/current.json";
            }

            var client = new HttpClient();
            var json = await client.GetStringAsync(url);

            return Ok(json);
        }
    }
}
