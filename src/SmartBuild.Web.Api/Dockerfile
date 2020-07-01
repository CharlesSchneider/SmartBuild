#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["src/SmartBuild.Web.Api/SmartBuild.Web.Api.csproj", "src/SmartBuild.Web.Api/"]
COPY ["src/SmartBuild.Entities/SmartBuild.Entities.csproj", "src/SmartBuild.Entities/"]
COPY ["src/SmartBuild.Data/SmartBuild.Data.csproj", "src/SmartBuild.Data/"]
COPY ["src/SmartBuild.Services/SmartBuild.Services.csproj", "src/SmartBuild.Services/"]
COPY ["src/SmartBuild.Library/SmartBuild.Library.csproj", "src/SmartBuild.Library/"]
RUN dotnet restore "src/SmartBuild.Web.Api/SmartBuild.Web.Api.csproj"
COPY . .
WORKDIR "/src/src/SmartBuild.Web.Api"
RUN dotnet build "SmartBuild.Web.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SmartBuild.Web.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SmartBuild.Web.Api.dll"]