#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["InvoiceGenerator.Authorization/InvoiceGenerator.Authorization.csproj", "InvoiceGenerator.Authorization/"]
RUN dotnet restore "InvoiceGenerator.Authorization/InvoiceGenerator.Authorization.csproj"
COPY . .
WORKDIR "/src/InvoiceGenerator.Authorization"
RUN dotnet build "InvoiceGenerator.Authorization.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "InvoiceGenerator.Authorization.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "InvoiceGenerator.Authorization.dll"]