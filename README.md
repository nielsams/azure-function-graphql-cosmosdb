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
3. Change the value of DEPLOYMENT_NAME in the build-deploy.yaml workflow file
4. Run the workflow