@description('The name to identify the Azure SWA')
param name string

@description('Environment e.g. production, test, uat')
@allowed(['production', 'test', 'uat'])
param environment string

@description('Resource group location e.g. `uksouth`')
param rgLocation string = resourceGroup().location

@description('Common tags applied to all resources')
param commonTags object = {
  deleteMe: 'yes'
}

module staticWebApp 'modules/staticWebApp.bicep' = {
  name: name
  params: {
    commonTags: commonTags
    name: name
    rgLocation: rgLocation
    environment: environment
  }
}

output swaName string = staticWebApp.name
