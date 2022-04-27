@description('First part of the resource name')
param nameprefix string

@description('Azure region for resources')
param location string = resourceGroup().location

resource functionApp 'Microsoft.Web/sites@2020-06-01' = {
  name: '${nameprefix}graphqlfunc'
  location: location
  kind: 'functionapp,linux'
  properties: {
    httpsOnly: true
    serverFarmId: functionasp.id
    clientAffinityEnabled: true
    siteConfig: {
      linuxFxVersion: 'NODE|14-lts'
      appSettings: [
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${functionstorage.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${listKeys(functionstorage.id, functionstorage.apiVersion).keys[0].value}'
        }
        {
          'name': 'FUNCTIONS_EXTENSION_VERSION'
          'value': '~4'
        }
        {
          'name': 'FUNCTIONS_WORKER_RUNTIME'
          'value': 'node'
        }
        {
          'name': 'CosmosKey'
          'value': listConnectionStrings(resourceId('Microsoft.DocumentDB/databaseAccounts', '${nameprefix}cosmos'), '2021-06-15').connectionStrings[0].connectionString
        }
        {
          name: 'WEBSITE_CONTENTAZUREFILECONNECTIONSTRING'
          value: 'DefaultEndpointsProtocol=https;AccountName=${functionstorage.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${listKeys(functionstorage.id, functionstorage.apiVersion).keys[0].value}'
        }
      ]
    }
  }
}

resource functionasp 'Microsoft.Web/serverfarms@2021-03-01' = {
  name: '${nameprefix}asp'
  location: location
  properties: {
    reserved: true
  }
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
  }
  kind: 'linux'
}

resource functionstorage 'Microsoft.Storage/storageAccounts@2021-08-01' = {
  name: '${nameprefix}funcstor'
  location: location
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  kind: 'Storage'
  properties: {
    allowBlobPublicAccess: true
    supportsHttpsTrafficOnly: true
  }
}

output functionUrl string = '${nameprefix}-graphqlfunc.azurewebsites.net'
output functionName string = functionApp.name
