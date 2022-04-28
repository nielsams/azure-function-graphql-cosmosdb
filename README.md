## Work in Progress... 

# Introduction
This is a quickstart template. It deploys the following:
- CosmosDB instance with ToDo list sample content
- Azure Function exposing a GraphQL endpoint to retrieve ToDo lists and list items
- Single Page application (VueJS) that shows the contents of the todo lists in the database, running on an Azure storage static website
- Azure Front Door instance exposing endpoints to the outside world

# Getting Started
1. Fork the repo
2. [Create](https://github.com/marketplace/actions/azure-cli-action#configure-azure-credentials-as-github-secret) an AZURE_CREDENTIALS object as a Github repo secret
3. [Assign](https://docs.microsoft.com/azure/role-based-access-control/role-assignments-portal) the service principal **contributor** permissions on the subscription. This is needed because the deployment includes the resource group itself. 
4. Change the value of DEPLOYMENT_NAME in the build-deploy.yaml workflow file
5. Run the workflow

# To Do List Manager website
Once successfully deployed, the application is accessible through the Front Door endpoint URL (ending in azurefd.net). Optionally, a [custom domain](https://docs.microsoft.com/azure/frontdoor/front-door-custom-domain) can be added to Front Door as well. 

![Screenshot of the todolist webpage](/assets/todolistmanager.png)