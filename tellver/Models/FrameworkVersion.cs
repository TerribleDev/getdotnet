using System.Collections.Generic;

namespace GetDotnet.Models
{
    public class FrameworkVersion
    {
		public string Target {get;set;}
		public List<string> Aliases {get;set;}
		public string Version {get;set;}
		public string PreferVersion {get;set;}
		public string Info {get;set;}
		public string HelpInfo {get;set;}
		public string Download {get;set;}
		public string WebInstaller {get;set;}
		public string OfflineInstaller {get;set;}
    }
}

/*
		{
			"target" : ".NETFramework,Version=v4.6",
			"version" : "4.6",
			"info":"http://blogs.msdn.com/b/dotnet/archive/2015/07/20/announcing-net-framework-4-6.aspx",
			"download" : "http://go.microsoft.com/fwlink/?LinkId=528259",
			"webInstaller" : "http://go.microsoft.com/fwlink/?LinkId=528222",
			"offlineInstaller" : "http://go.microsoft.com/fwlink/?LinkId=528232",
			"targetingPack" : "http://go.microsoft.com/fwlink/?LinkId=528261",
			"languagePack" : "https://support.microsoft.com/en-us/kb/3045556"
		}
*/