@description('First part of the resource name')
param nameprefix string

@description('Azure region for resources')
param location string = resourceGroup().location

resource staticwebapp 'Microsoft.Web/staticSites@2021-03-01' = {
  name: '${nameprefix}web'
  location: location
  sku: {
    tier: 'free'
    name: 'free'
  }
}

output staticWebsiteName string  = staticwebapp.name
