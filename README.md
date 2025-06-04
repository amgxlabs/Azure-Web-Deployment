# Azure Multi-Tier Web Deployment
### Overview

This is my personal end-to-end documentation of delpoying a live Website on the Azure infrastructure along with APIs and Database. You can follow along this guide and build you own Website or Web-Server, as this documents includes screenshots of each step and detailed explanation on how things are working. 

**If you are preparing for AZ-104 or DP-900, I highly recommend you to read it because this project was part of my preperation for AZ-104. It covers various concepts of Azure.**

---
### Architecture

<p align="center">
  <img src="./Web-Deployment/screenshots/Phase-2.4-Final-test/Architecture.PNG" width="600">
</p>

---
### Requirements

- Azure Account + Subscription(use $200 free credit)
- Basic Networking concepts: Virtual Networks, Subnets, Private vs Public IPs, Domain-names, TCP, SSH
- Familiarity with Azure concepts: Network Security Groups (NSGs), Application Security Groups (ASGs), Priority, Bastion
- Basic HTML, Javascript and MySql
- IQ over 110 (you also need to put some effort)

---
### Technologies Used

* **Cloud Platform:** Microsoft Azure
* **Infrastructure as Code:** Applied real-world concepts
* **Virtual Machines:** Azure VMs (Ubuntu Server LTS)
* **Networking:** Azure Virtual Network (VNet), Subnets, Network Security Groups (NSGs), Application Security Groups (ASGs)
* **Azure Services:** Azure Bastion, Azure Public IP, Azure DNS
* **Database Tier:** MySQL Server
* **Application Tier:** Node.js, Express.js
* **Web Tier:** Nginx, HTML, CSS, JavaScript, CertBot
* **Version Control:** Git, GitHub
* **AI:** Google Gemini, ChatGPT (For research and learning)
* **Documentation:** Obsidian, Markdown, Draw.io

---
### Application Code

The simple application code developed for this project can be found here:
* **App Tier (Node.js API):** [`./Web-Deployment/Application_code/app.js`](./Web-Deployment/Application_code/app.js)
* **Web Tier (HTML/JS Frontend):** [`./Web-Deployment/Application_code/index_working.html`](index_working.html.md)

---
### Overall Experience

It was a good experience since I got hands-on practice for the deployment of a Web-Server while intergrating it with the use of API which fetches and writes data to the Database Server. I stumbled upon plently of errors and made mistakes while doing this project and I believe that is exactly where the real learning happens. 

**You always learn from mistakes. Perfection is a fool's dream.**

---
*Thanks for checking it out!*

