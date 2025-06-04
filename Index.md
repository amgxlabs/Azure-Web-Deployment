# Index:
**This project is documented in two main phases, with detailed steps and screenshots.**

### Phase 1: Azure Multi-Tier Infrastructure Setup

The foundational Azure infrastructure was built in this phase. This includes all networking, virtual machines, and core security configurations.

* **1. Resource Group & Virtual Network:** Setting up the initial resource group and configuring the VNet with its subnets, including the AzureBastionSubnet.
    * [View Details](Azure_Multi-Tier_Infrastructure/1-%20Resouce-group%20&%20V-Net.md)
* **2. Setting up Virtual Machines:** Deploying Ubuntu Linux VMs for the Web, App, and DB tiers.
    * [View Details](./Azure_Multi-Tier_Infrastructure/2-%20Setting%20up%20Virtual-Machines.md)
* **3. Creating ASGs and NSGs:** Implementing Application Security Groups for VM grouping and Network Security Groups for defining baseline security.
    * [View Details](./Azure_Multi-Tier_Infrastructure/3-%20Creating%20ASGs%20and%20NSGs.md)
* **4. Inbound & Outbound Rules:** Configuring detailed NSG rules for inter-tier communication, internet access for the web tier, OS updates, and Bastion access, utilizing ASGs.
    * [View Details](./Azure_Multi-Tier_Infrastructure/4-%20Inbound%20&%20Outbound%20Rules.md)
* **5. Bastion and Domain Name:** Setting up Azure Bastion for secure VM access and configuring custom domain DNS records to point to the web server.
    * [View Details](./Azure_Multi-Tier_Infrastructure/5-%20Bastion%20and%20Domain-name.md)

### Phase 2: Web Application Deployment

With the infrastructure in place, a simple 3-tier application was deployed.

* **1. Database (MySQL Setup):** Installing and configuring MySQL on the DB tier VM, creating the application database and user.
    * [View Details](./Web-Deployment/1-%20Database(MySQL%20Setup).md)
* **2. Creating API (Node.js/Express):** Developing and deploying a simple REST API on the App tier VM to interact with the database.
    * [View Details](./Web-Deployment/2-%20Creating%20API.md)
* **3. Web Server (Nginx & Frontend):** Setting up Nginx on the Web tier VM to serve a static HTML/JavaScript frontend and act as a reverse proxy to the App tier API.
    * [View Details](./Web-Deployment/3-%20Web-Server.md)
* **4. Final Testing:** Ensuring the end-to-end application flow works as expected and installing certificates for secure connection.
    * [View Details](./Web-Deployment/4-%20Final%20Test.md)
 
---

### Application Code

The simple application code developed for this project can be found here:
* **App Tier (Node.js API):** [`./Web-Deployment/Application_code/app.js`](./Web-Deployment/Application_code/app.js)
* **Web Tier (HTML/JS Frontend):** [`./Web-Deployment/Application_code/index_working.html`](index_working.html.md)

---
