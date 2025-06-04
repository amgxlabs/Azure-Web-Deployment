# Basic Concepts for the Azure 3-Tier Project

This document provides simple explanations for some of the core concepts and technologies used in this project. 
It's meant as a quick reference for the terms used in this project.

---
### 1. What's Cloud Computing & Cloud Providers?
Cloud computing is like renting computers, storage, and services over the internet instead of buying and managing your own physical hardware. You only pay for what you use, and you can scale up or down easily.
* **Key Idea:** On-demand IT resources.
* **Major Providers:**
    * Amazon Web Services (AWS)
    * Microsoft Azure (This is what we used!)
    * Google Cloud Platform (GCP)

---
### 2. Microsoft Azure
Azure is Microsoft's cloud computing platform. It offers a massive range of services, from virtual machines and storage to AI and IoT tools. We built this entire 3-tier project using various Azure services.

---
### 3. Azure Subscription
Think of a subscription as your account with Azure. It's linked to your billing and acts as a container for all the cloud resources you create.
* **Getting Started:** If you're new, Azure often offers a free account with credits (like $200 USD or equivalent) to help you explore and build without initial cost. This project can be built using those initial free credits if managed carefully.

---
### 4. Resource Group
A Resource Group (RG) in Azure is like a folder or a logical container where you put all the related resources for a project (like VMs, virtual networks, IP addresses, etc.). It makes it easier to manage, deploy, and delete everything together.
* **In this project:** We created one main Resource Group (`Multi-Tier_Web_Deployment`) to hold all our infrastructure.

---
### 5. Region
A region is a specific geographic location in the world where Azure has data centers. When you deploy a resource, you choose a region.
* **In this project:** We used **Canada Central**. Choosing a region close to you or your users can reduce latency (lag) and sometimes cost. For a project, keeping all resources in the same region simplifies networking.

---
### 6. Tags
Tags are like labels (key-value pairs) that you can apply to your Azure resources. They are super useful for:
* Organizing resources.
* Tracking costs (you can filter billing reports by tags).
* Automation.
* **In this project:** We applied tags like `Project`, `Environment`, and `Owner` to our resources.

---
### 7. Virtual Network (VNet)
A VNet is your own private network in Azure. It's where your VMs and other resources will live and communicate securely. It's isolated from other Azure customers' networks.

---
### 8. Subnets
Subnets are subdivisions within your VNet. You use them to segment your network, organize resources, and apply specific security rules.
* **In this project, we created:**
    * `Web-Tier-Subnet`: For our web server VM.
    * `App-Tier-Subnet`: For our application/API server VM.
    * `DB-Tier-Subnet`: For our database server VM.
    * `AzureBastionSubnet`: A special dedicated subnet for the Azure Bastion service.

---
### 9. Virtual Machines (VMs)
A VM is basically a computer that runs in the cloud. You can choose its operating system, CPU, RAM, and storage. It's like having a server but without the physical hardware to manage.
* **In this project:** We deployed three Ubuntu Linux VMs, one for each tier (Web, App, DB).

---
### 10. Availability Zones
Availability Zones (AZs) are physically separate locations *within* an Azure region, each with its own power, cooling, and networking. Deploying VMs across multiple AZs helps protect your application from data center-level failures.
* **In this project:** For simplicity and cost-saving in a learning environment, we selected "**No infrastructure redundancy required**" during VM setup, meaning we didn't explicitly use Availability Zones for the VMs. For production, you'd definitely consider AZs.

---
### 11. VM Size
The "size" of a VM determines its processing power (vCPUs), memory (RAM), and sometimes its storage performance and network bandwidth. Azure has a huge variety of VM sizes for different workloads.
* **In this project:** We used `Standard_B1s` (1 vCPU, 1 GiB RAM) for all VMs. It's a cost-effective "burstable" size good for development and testing.

---
### 12. OS Image
An OS Image is a pre-configured template used to create a VM. It includes the operating system and sometimes other pre-installed software.
* **In this project:** We used the **Ubuntu Server LTS (Long Term Support)** image for all our VMs.

---
### 13. Authentication Types (for VMs)
This is how you prove your identity to log into a VM.
* **Password:** Simple, but less secure for servers exposed to networks.
* **SSH Key Pair (Secure Shell):** Much more secure. You have a private key (kept secret on your computer) and a public key (placed on the VM). Only someone with the matching private key can log in.
* **In this project:** We used **SSH key pair authentication** for our Linux VMs. The private key was downloaded/managed locally, and the public key was configured on each VM during creation.

---
### 14. OS Disk
This is the virtual hard drive that contains the VM's operating system, system files, and any software you install.
* **In this project:** We used `Standard SSD` for our OS disks, which offers a good balance of performance and cost.

---
### 15. Public IP vs. Private IP Address
* **Private IP Address:** An IP address used for communication *within* your VNet (e.g., `10.0.1.4`). VMs in the same VNet can talk to each other using their private IPs. These are not reachable from the internet directly.
* **Public IP Address:** An IP address that is reachable from the public internet. You assign these to resources you want to expose externally.
* **In this project:**
    * `WebVM01` has a Public IP so users can access the website.
    * Azure Bastion has its own Public IP so admins can connect to the Bastion service.
    * `AppVM01` and `DBVM01` *only* have Private IPs for security.

---
### 16. Network Interface Card (NIC)
A virtual NIC enables an Azure VM to communicate with the VNet, internet, and on-premises networks. Each VM has at least one NIC.
* A NIC is attached to a specific subnet.
* It gets assigned a private IP address from that subnet's range.
* It can optionally have a public IP address associated with it.
* It can be associated with Network Security Groups (NSGs) and Application Security Groups (ASGs).

---
### 17. Web Server
Software that listens for HTTP/HTTPS requests from web browsers and serves web pages (HTML, CSS, JavaScript files, images, etc.).
* **In this project:** We installed **Nginx** web server on `WebVM01` to serve our front-end application and act as a reverse proxy.

---
### 18. API (Application Programming Interface)
An API defines how different software components should interact. A web API allows applications to exchange data over the internet (or a private network) typically using HTTP/HTTPS.
* **In this project:** We built a simple REST API using **Node.js and Express.js** on `AppVM01`. It handles requests from the web front-end and interacts with the database.

---
### 19. Database
An organized collection of data, typically stored and accessed electronically from a computer system.
* **In this project:** We installed and configured **MySQL Server** on `DBVM01` to store our application's data (the messages submitted via the web form).

---
### 20. SSH vs. RDP
These are protocols for remotely accessing and managing servers.
* **SSH (Secure Shell):**
    * Primarily used for secure command-line access to **Linux/Unix** servers.
    * Uses port 22 by default.
    * Relies on cryptographic security (often SSH keys).
    * Lightweight and efficient for server administration.
    * **Why used here:** Our VMs are Linux (Ubuntu).
* **RDP (Remote Desktop Protocol):**
    * Primarily used for secure graphical desktop access to **Windows** servers/computers.
    * Uses port 3389 by default.
    * Provides a full remote desktop experience.
* **Why SSH is often preferred for Linux server admin:** It's designed for the command line, secure, and efficient for server tasks without the overhead of a GUI.

---
### 21. Azure Bastion
A fully managed PaaS service provided by Azure that allows you to securely connect to your virtual machines (via RDP or SSH) directly through the Azure portal using their private IP addresses.
* **How it works:** You deploy Bastion into a dedicated subnet (`AzureBastionSubnet`) in your VNet. It has a Public IP. You connect to the Bastion service via HTTPS, and then Bastion initiates the RDP/SSH session to your target VM over the private network.
* **Key Benefit:** You don't need to expose RDP/SSH ports on your VMs directly to the public internet, significantly improving security.

---

### 22. Application Security Group (ASG) Purpose

**Application Security Groups (ASGs)** let you group Virtual Machines (VMs) together and define network security policies based on those groups. Think of them as tags for your VMs that you can use in Network Security Group (NSG) rules.

- **In this project:** We used ASGs like `ASG-WebTier`, `ASG-AppTier`, and `ASG-DBTier` to group VMs by their role. This makes NSG rules easier to read and manage (e.g., "Allow traffic from `ASG-WebTier` to `ASG-AppTier`").

---

### 23. Network Security Group (NSG) Purpose

A **Network Security Group (NSG)** acts as a basic stateful firewall for your Azure resources. It contains a list of security rules that allow or deny network traffic to resources connected to Azure Virtual Networks (VNets).1

- **In this project:** We created NSGs for each tier's subnet (`WebTier-NSG`, `AppTier-NSG`, `DBTier-NSG`) to control exactly what traffic can go in and out of each tier.

---

### 24. ASG vs. NSG (Crucial Distinction)

This is a key difference:

- **NSG (Network Security Group):** **Is the firewall itself.** It contains the _rules_ (allow/deny, ports, source/destination IPs or ASGs/Service Tags). An NSG _enforces_ the security policy.
- **ASG (Application Security Group):** **Is a label or tag for VMs.** It doesn't have any rules itself. Its purpose is to _group VMs_ (like all your web servers) so that you can then use this group name as a source or destination in your NSG rules.
 
Using ASGs in NSG rules means your rules are based on application structure rather than just IP addresses, which is cleaner and easier to manage as your application scales or IPs change.

---

### 25. ASG: Assigning them to NIC of each VM

To make a VM part of an Application Security Group (ASG), you associate the **Network Interface Card (NIC)** of that VM with the ASG.

- **In this project:**
    - `WebVM01`'s NIC was associated with `ASG-WebTier`.
    - `AppVM01`'s NIC was associated with `ASG-AppTier`.
    - `DBVM01`'s NIC was associated with `ASG-DBTier`.

---

### 26. NSG: Associating them to each Subnet (or NIC)

An NSG can be associated with:

- **A Subnet:** All VMs within that subnet will then inherit the rules of that NSG. This is the most common and recommended approach for tier-based security.
- **A specific Network Interface Card (NIC):** This applies rules only to that individual VM's NIC. Rules on a NIC NSG are evaluated _in addition_ to subnet NSG rules (the most restrictive set of rules applies).

---

### 27. Inbound / Outbound Rules (NSG Rules)

NSG rules control network traffic.

- **Inbound rules:** Control traffic coming _into_ your VM/subnet from an external source (like the internet, another VM, or another subnet).
- **Outbound rules:** Control traffic going _out from_ your VM/subnet to an external destination.
- **In this project:** We defined specific inbound rules (e.g., allow HTTP/S from Internet to Web Tier) and outbound rules (e.g., allow Web Tier to App Tier on API port).

---

### 28. Allow vs. Deny (NSG Rule Actions)

Each NSG rule has an action:

- **Allow:** Permits traffic that matches the rule's criteria (source, destination, port, protocol).
- **Deny:** Blocks traffic that matches the rule's criteria.
- **In this project:** Most of our custom rules were `Allow` rules for specific, necessary traffic. NSGs also have default `Deny All` rules with high priority numbers that block any traffic not explicitly allowed by a lower-priority (more specific) rule.

---

### 29. Defining Sources/Destinations in NSG Rules 

When creating an NSG rule, you specify where traffic is coming from (Source) and where it's going (Destination). You can use:

- **IP Addresses/CIDR Blocks:** Specific IPs or ranges (e.g., `10.0.1.0/24`, or your Bastion Subnet's CIDR).
- **Service Tags:** Predefined Microsoft groups of IP addresses for Azure services (e.g., `Internet`, `AzureCloud`, `AzureBastion`). This simplifies rules, as Microsoft manages the underlying IPs for these tags.
- **Application Security Groups (ASGs):** As discussed, you can use an ASG name (e.g., `ASG-WebTier`) as a source or destination. This allows rules to be based on application structure.

---

### 30. Port Numbers (in NSG Rules)

Ports are like specific "doors" on a server for different types of applications or services.

- **Examples:**
    - Port `80`: HTTP (web traffic)
    - Port `443`: HTTPS (secure web traffic)
    - Port `22`: SSH (secure shell for Linux admin)
    - Port `3389`: RDP (Remote Desktop for Windows admin)
    - Port `3306`: MySQL (database)
    - Port `5000` (or similar): Used for our custom API in this project.
- NSG rules specify destination (and sometimes source) ports to control which services can be accessed.

---

### 31. Priority (for NSG Rules)

Each NSG rule has a priority number (between 100 and 4096).

- Rules are processed in order of priority, from the **lowest number to the highest.**
- Once traffic matches a rule, processing stops for that rule type (inbound or outbound), and that rule's action (Allow/Deny) is taken.
- **Best Practice:** Leave gaps between your priority numbers (e.g., 100, 110, 120 or 100, 200, 300) so you can insert new rules in between later without having to renumber everything.

---

### 32. Inbound Rules for Bastion (in this project)

Azure Bastion itself doesn't need inbound rules on its own AzureBastionSubnet NSG (you shouldn't even associate an NSG with AzureBastionSubnet).

However, for Bastion to connect to your target VMs (WebVM, AppVM, DBVM), the NSGs associated with your VM subnets (WebTier-NSG, AppTier-NSG, DBTier-NSG) need an inbound rule that allows traffic:

- **Source:** The IP address range of your `AzureBastionSubnet` (e.g., `10.0.4.0/26`).
- **Destination Port:** `22` (for SSH, since our VMs are Linux).
- **Protocol:** `TCP`.
- **Action:** `Allow`.
- **In this project:** We created exactly this rule in each of our tier NSGs to enable secure administrative access via Bastion.

---

### 33. Public IP: Dynamic vs. Static

A **Public IP address** allows your Azure resource (like a VM or Load Balancer) to be reached from the internet.

- **Dynamic IP:** The IP address might change if the resource is stopped (deallocated) and restarted. Cheaper, often fine for development or non-critical services where the IP can change.
- **Static IP:** The IP address is reserved and does **not** change, even after reboots or deallocation. Essential if you need a fixed address, like for DNS records (pointing your domain name) or if other services rely on a constant IP.
---

### 34. URL vs. Domain Name & DNS Server Purpose

- **Domain Name:** A human-friendly name for a website or internet resource (e.g., `thedeath.club`, `google.com`). It's easier to remember than an IP address.
- **URL (Uniform Resource Locator):** The full web address that specifies how to get to a resource. It includes the protocol (like `http` or `https`), the domain name (or IP address), and often a specific path to a page or file (e.g., `https://www.thedeath.club/about.html`).
- **DNS Server (Domain Name System Server):** Think of it as the internet's phonebook. Its purpose is to translate human-friendly domain names (like `www.thedeath.club`) into computer-friendly IP addresses (like `203.0.113.42`) that computers use to connect to each other. When you type a domain name into your browser, your computer asks a DNS server for the corresponding IP address.

---

### 35. Private Domain Name (Custom Domain Name)

This usually refers to a **custom domain name** that you own and register, rather than a generic one provided by a service.

---

### 36. Domain Name Registrar

A company that manages the reservation of internet domain names. You buy and register your domain name through a registrar.

- **In this project:** I got my `thedeath.club`, custom domain-name from **GoDaddy**, which is a popular domain name registrar.

---

### 37. DNS Records

DNS records are instructions stored in DNS servers that provide information about a domain. There are many types of records.

- **Examples:**
    - `A` record: Maps a domain name to an IPv4 address.
    - `AAAA` record: Maps a domain name to an IPv6 address.
    - `CNAME` record: Creates an alias,1 mapping one domain name to another.
    - `MX` record: Specifies mail servers for a domain.
    - `TXT` record: Provides text information, often used for verification purposes.

---

### 38. A Record (and adding the Static IP to GoDaddy)

An **A record** is a fundamental type of DNS record. Its job is to map a domain name (like `www.thedeath.club` or the root `@`) directly to an IPv4 address.

- **In this project:** I created `A` records in my GoDaddy DNS settings to point `thedeath.club` (using `@` as the host) and `www.thedeath.club` (using `www` as the host, or via a CNAME pointing to `@`) to the **Static Public IP address of my `WebVM01`**. This is what allows people to reach my website using my domain name.

---

### 39. Database Server vs. MySQL Server

- **Database Server:** This is the general term for the backend software system that provides database services, allowing you to store, retrieve, and manage data. It listens for requests from client applications (like your API).
- **MySQL Server:** This is a _specific brand_ or _type_ of open-source relational database management system (RDBMS). It's one of the most popular database servers in the world.

---

### 40. Database Name, Queries, and Tables

- **Database Name:** A named container that holds related data tables and other database structures.
- **Tables:** Structures within a database that organize data into rows (records) and columns (fields).
- **Queries:** Commands, typically written in SQL (Structured Query Language), used to request, add, or modify data within database tables.

---

### 41. Port Number for MySQL Server

The specific network "door number" (port) that MySQL database server software typically uses to listen for incoming connections from client applications. The default is **TCP port 3306**.

---

### 42. API (Application Programming Interface) and Its Purpose

An **API** is a set of rules and definitions that allows different software programs to communicate and exchange information with each other.

- **Purpose:** Enables software components to work together without needing to know the internal complexities of each other, promoting modularity and reusability.

---

### 43. REST API

**REST (Representational State Transfer)** is a popular architectural style for designing APIs, especially web services. RESTful APIs typically use standard HTTP methods (like GET, POST, PUT, DELETE) to interact with resources identified by URLs, often exchanging data in formats like JSON. They emphasize simplicity and statelessness.

---

### 44. npm (Node Package Manager)

**npm** is the default package manager for the Node.js JavaScript runtime environment. It's a command-line tool used to discover, install, and manage reusable software libraries (packages) for Node.js projects.

---

### 45. Node.js

**Node.js** is a JavaScript runtime environment that allows developers to run JavaScript code on the server-side (outside of a web browser).1 It's known for its efficiency in handling I/O-intensive operations, making it popular for web servers and APIs.

---

### 46. Express (Express.js)

**Express.js** is a minimal and flexible web application framework for Node.js. It simplifies the process of building web servers and APIs by providing tools for routing, handling requests and responses, and managing middleware.

---

### 47. PM2

**PM2** is a process manager primarily used for Node.js applications in a production environment. It helps keep applications alive by automatically restarting them if they crash, manages application logs, and can assist with scaling and deployment tasks.

---

### 48. Listening Port on API

The specific network port number that an API server "listens" on to receive incoming connection requests from clients. For example, a custom API might listen on port `5000`.

---

### 49. Web Server vs. Website

- **Web Server:** The software (and underlying hardware) that processes HTTP/HTTPS requests from clients (like web browsers) and delivers web content (HTML files, images, etc.) to them.
- **Website:** The collection of web pages, multimedia content, and interactive features that are delivered by a web server and viewed by a user in a browser.

---

### 50. Web Server vs. Nginx

- **Web Server:** The general term for software that serves web content.
- **Nginx (pronounced "engine-X"):** A specific, popular, high-performance open-source web server software. It's also widely used as a reverse proxy, load balancer, and HTTP cache.

---

### 51. HTML, JavaScript, CSS

These are core technologies for building web pages:

- **HTML (HyperText Markup Language):** Defines the _structure and content_ of a web page.
- **CSS (Cascading Style Sheets):** Describes the _presentation and styling_ (look and formatting) of HTML elements.
- **JavaScript (JS):** A programming language that adds _interactivity and dynamic behavior_ to web pages, often running in the user's browser.

---

### 52. `index.html`

The common default filename for the main or home page of a website within a directory. Web servers are typically configured to serve `index.html` automatically when a user requests a directory URL.

---

### 53. Accessing a Website (Static IP vs. Domain Name)

Websites can be accessed by:

- **IP Address:** Directly using the server's numerical public IP address. Not user-friendly.
- **Domain Name:** Using a human-readable name (e.g., `www.example.com`) that DNS (Domain Name System) translates into an IP address. This is the standard, user-friendly method.

---

### 54. HTTP vs. HTTPS

Protocols for transferring web data:

- **HTTP (HyperText Transfer Protocol):** The standard protocol. Data is sent in plain text (unencrypted).
- **HTTPS (HyperText Transfer Protocol Secure):** The secure version. Data is encrypted using SSL/TLS, providing privacy and integrity for the connection.

---

### 55. SSL/TLS Certificates

**SSL/TLS Certificates** are small data files that digitally bind a cryptographic key to an organization's or website's details. When installed on a web server, they enable HTTPS connections, verifying the website's identity to browsers and encrypting traffic.

---

### 56. Certbot

**Certbot** is a free, open-source software tool that automates the process of obtaining, deploying, and renewing SSL/TLS certificates from Let's Encrypt (a free Certificate Authority), making it easier to enable HTTPS on websites.

---
