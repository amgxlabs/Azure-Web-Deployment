**Web Tier Front-End (WebVM01) - Nginx + HTML/JavaScript**

**Objective:** Install the Nginx web server, create a simple HTML page with JavaScript that allows users to submit messages and view messages by calling your App Tier API.

1) **Connect to WebVM01: Use Azure Bastion to SSH into WebVM01.**

<p align="center">
  <img src="./screenshots/Phase-2.3-Web-Server/1-webapp-bastion.png" width="600">
</p>

```
sudo apt update
sudo apt install nginx -y
sudo systemctl status nginx
```

<p align="center">
  <img src="./screenshots/Phase-2.3-Web-Server/2-install-nginx.png" width="600">
</p>

---

2) **Initial Test:**

Open a web browser on your local computer and navigate to the Public IP of you Web-VM01.

<p align="center">
  <img src="./screenshots/Phase-2.3-Web-Server/3-live-site-ip-public.png" width="600">
</p>

---

3) **Creating a custom website:**

```
cd /var/www/html
sudo rm index.nginx-debian.html 
sudo nano index.html
```

<p align="center">
  <img src="./screenshots/Phase-2.3-Web-Server/4-nano-index-html.png" width="600">
</p>

Paste the HTML/JavaScript code you provided above.  
**IMPORTANT:** Replace `'http://10.0.2.4:5000/items'` with the private IP of your App-VM01.

---

4) **Test Your Full Web Application:**

Open your browser and access the public IP of WebVM01.

<p align="center">
  <img src="./screenshots/Phase-2.3-Web-Server/5-what-the-hell.png" width="600">
</p>

Open DevTools → Network tab to debug.

<p align="center">
  <img src="./screenshots/Phase-2.3-Web-Server/6-network-tab.png" width="600">
</p>

---

5) **The Solution: Reverse Proxy with Nginx on Web-VM01:**

SSH into Web-VM01 via Bastion.

<p align="center">
  <img src="./screenshots/Phase-2.3-Web-Server/7-webvm-bastion.png" width="600">
</p>

Edit the Nginx default config:

```
sudo nano /etc/nginx/sites-available/default
```

Add this inside the `server {}` block:

```
location /api/ {
        proxy_pass http://10.0.2.4:5000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
```

<p align="center">
  <img src="./screenshots/Phase-2.3-Web-Server/9-after-changing-code.png" width="600">
</p>

Then test and reload Nginx:

```
sudo nginx -t
sudo systemctl reload nginx
```

<p align="center">
  <img src="./screenshots/Phase-2.3-Web-Server/10-good.png" width="600">
</p>

---

6) **Modify Your JavaScript `apiUrl` in `index.html` on `WebVM01`:**

```
sudo nano /var/www/html/index.html
```

<p align="center">
  <img src="./screenshots/Phase-2.3-Web-Server/11-html-before.png" width="600">
</p>

Update the line:

```
const apiUrl = '/api/items';
```

<p align="center">
  <img src="./screenshots/Phase-2.3-Web-Server/12-html-after.png" width="600">
</p>

This completes the setup for reverse proxy and browser-accessible API connection.

