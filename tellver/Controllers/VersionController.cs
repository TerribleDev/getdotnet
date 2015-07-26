using System.IO;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using GetDotnet.Models;

namespace GetDotnet.Controllers
{
	[Route("api/[controller]")]
	public class VersionController : Controller
	{
		static string s_dotnetVersions = Path.Combine("../","framework-versions.json");
		static List<FrameworkVersion> s_frameworkVersions;
		static List<Dictionary<string,string>> s_help;

		static VersionController()
		{
			using (var stream = new FileStream(s_dotnetVersions,FileMode.Open))
			using (var reader = new StreamReader(stream))
				{
					var json = reader.ReadToEnd();
					var jsonObj = JsonConvert.DeserializeObject<Dictionary<string,JToken>>(json);
					s_frameworkVersions = jsonObj["frameworkVersions"].ToObject<List<FrameworkVersion>>();
					s_help = jsonObj["help"].ToObject<List<Dictionary<string,string>>>();
				}
			
		}
		
		 [HttpDeleteAttribute]
        public IEnumerable<string> GetAll()
        {
			return from version in s_frameworkVersions
					select version.Target;
        }
		
		[HttpGet]
		public FrameworkVersion GetVersionWithPolicy(string inputVersion, string OS = "7")
		{
			
			var version = (from v in s_frameworkVersions
										where v.Target == inputVersion || (v.Aliases!=null &&  v.Aliases.Contains(inputVersion))
										select v).First();
			
			if (OS.ToLowerInvariant() == "xp")
			{
				var stringEmpty = string.IsNullOrEmpty(version.Version);
				var majVersion = 0;
				var minVersion = 0;
				
				if (!stringEmpty && version.Version.Length > 0)
				{
					majVersion = version.Version[0] - '0';	
				}
				
				if (!stringEmpty && version.Version.Length > 2 && version.Version[1] == '.')
				{
					minVersion = version.Version[2] - '0';	
				}
				
				if (majVersion == 4)
				{					
					if (minVersion >= 5)
					{
						version.HelpInfo = (from page in s_help
							where page["name"] == "dotnet-45-xp"
							select page).First()["info"];
					}
					else
					{
						version.HelpInfo = (from page in s_help
							where page["name"] == "dotnet-4-xp"
							select page).First()["info"];
					}
					return version;
				}
				else if (majVersion <0 || majVersion >4)
				{
					version.HelpInfo = (from page in s_help
					where page["name"] == "dotnet-versions"
					select page).First()["info"];
					return version;
				}
			}
			
			if (!string.IsNullOrEmpty(version.PreferVersion))	
			{
				version = (from v in s_frameworkVersions
							where v.Version == version.PreferVersion
							select v).First();
			}
			
			return version;							
		}		
	}
}