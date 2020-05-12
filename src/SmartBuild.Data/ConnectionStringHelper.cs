using System.IO;
using Microsoft.Extensions.Configuration;

namespace SmartBuild.Data
{
    public static class ConnectionStringHelper
    {
        public const string APPSETTINGS_FILE = "appsettings.json";
        public const string CONNECTION_NAME = "SmartBuildConnection";

        public static string GetConnectionString()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(APPSETTINGS_FILE)
                .Build();

            return configuration.GetConnectionString(CONNECTION_NAME);
        }
    }
}
