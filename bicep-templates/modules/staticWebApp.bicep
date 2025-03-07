@description('The name to identify the Azure SWA')
param name string

@description('Environment e.g. production, test, uat')
@allowed(['production', 'test', 'uat'])
param environment string = 'test'

@description('Resource Group location')
param rgLocation string

@description('Common tags')
param commonTags object

var swaName = '${environment}-${name}-swa-${uniqueString(environment, name)}'

var resourceTags = {
  Description: 'Azure static webapp'
}

resource swa 'Microsoft.Web/staticSites@2024-04-01' = {
  name: swaName
  location: rgLocation
  tags: union(commonTags, resourceTags)
  properties: {
    stagingEnvironmentPolicy: 'Disabled'
    allowConfigFileUpdates: true
    provider: 'None'
    enterpriseGradeCdnStatus: 'Disabled'
  }
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
}

output name string = swa.name
