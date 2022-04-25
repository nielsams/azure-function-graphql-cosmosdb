@description('First part of the resource name')
param nameprefix string

@description('Azure region for resources')
param location string = resourceGroup().location

resource storageappdata 'Microsoft.Storage/storageAccounts@2021-08-01' = {
  name: '${nameprefix}appstor'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    allowBlobPublicAccess: true
    supportsHttpsTrafficOnly: true
    staticWebsite: {
      indexDocument: 'index.html'
      errorDocument404Path: '404.html'
    }
  }
}

output staticWebsiteUrl string = replace(replace(storageappdata.properties.primaryEndpoints.web, 'https://',''), '/', '')
