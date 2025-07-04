1) Search for ASGs in the search bar and create a new ASG for each of our VM. So give it a name relative to the VM you are creating it for.

<p align="center">
  <img src="./screenshots/3-ASGs-NGSs/1-search-asg.png" width="600">
</p>

<p align="center">
  <img src="./screenshots/3-ASGs-NGSs/2-asg-webvm-name.png" width="600">
</p>

---

2) This won't take long since you are just providing name and tags for the ASGs. After you are done creating 3 ASGs, it should look like the following screenshot:

<p align="center">
  <img src="./screenshots/3-ASGs-NGSs/3-all-vm-asg.png" width="600">
</p>

---

3) That's just the half job because these ASGs haven't been assigned to Vms. So, now I want you to open Web-VM01 blade and follow the settings shown in the screenshot to reach the point where you can add a NSG to the NIC(Network Interface Card) of the VM.

<p align="center">
  <img src="./screenshots/3-ASGs-NGSs/4-go-to-rg.png" width="600">
</p>

---

4) Make sure to select the correct ASG which we designed for it's respective VM. Do this process for all 3 VM.

<p align="center">
  <img src="./screenshots/3-ASGs-NGSs/5-webasg-webvm.png" width="600">
</p>

---

5) Now, I want you to seach for the Network Security Group and press the create new button and then you will reach the following page where you will select the subscription and the resource group of the project you are working on. Firstly, let's create the NSG for our Web-Tier subnet.  
   **NOTE:** In this step, we just gave the NSG a name and it wasn't applied to the subnet yet. We will do that in the future after we create rules for the NSG.

<p align="center">
  <img src="./screenshots/3-ASGs-NGSs/6-nsg-search.png" width="600">
</p>

<p align="center">
  <img src="./screenshots/3-ASGs-NGSs/7-nsg-web-subnet.png" width="600">
</p>

<p align="center">
  <img src="./screenshots/3-ASGs-NGSs/8-nsg-create.png" width="600">
</p>

---

6) We need 3 NSGs for our 3 VMs as shown in following screenshot.  
   **Note: Remember ASGs are applied to NIC of the VMs, not Subnets!!**  
   **Note: NSGs can be applied to both NIC of the VM or the SUBNET, but in this project we are applying the NSG only to the SUBNET.**

<p align="center">
  <img src="./screenshots/3-ASGs-NGSs/9-all-vm-nsg-list.png" width="600">
</p>

---

7) Let's assign or associate each of the NSG to it's respective Subnet. Select one NSG and go to subnets then click associate. In the next tab, select the Virtual Network and subnet. For Web NSG, we selected the Web-Tier Subnet.

<p align="center">
  <img src="./screenshots/3-ASGs-NGSs/10-assossiate-webvm-nsg.png" width="600">
</p>

---

8) Do the same for the next two NSGs and now we have a well designed foundation before we make inbound/outbound rules in them.

<p align="center">
  <img src="./screenshots/3-ASGs-NGSs/11-assossiate-dbvm-nsg.png" width="600">
</p>

<p align="center">
  <img src="./screenshots/3-ASGs-NGSs/12-assossiate-appvm-nsg.png" width="600">
</p>

If all of this feels confusing to you, don't worry next section is going to get even more confusing and complex, haha.

---

