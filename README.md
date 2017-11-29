# README #

This README documents steps to get the Avon Proof of Concept application up and running.

### What is this repository for? ###

* An HTML/CSS clickable demo of key user journeys. [More details](https://docs.google.com/document/d/1988FfC2Nhji_smnICsYE3qWNB4n_jK80tlvH8Sqdvs8/edit) 
* Repo lives in the [S4DC Bitbucket account](https://bitbucket.org/craftsmanshipstudio/)

### Tech overview ###
* URL: [s4dc.dreamhosters.com](http://s4dc.dreamhosters.com/)
* Web host: [Dreamhost](https://panel.dreamhost.com/) (See LastPass for credentials)
* Versioning is done with **git**
* Files to be edited are in the **src** folder
* Deliverable files are in the **dist** folder
* Templating is done with [Twig](https://www.npmjs.com/package/twig).
* Gulp handles automated tasks (like compiling SASS) and runs the local server.
* Images must be manually copied from **src** to the **dist** folder
* Code highlighting is done with [Prism](http://prismjs.com/) using plugins: Toolbar, Copy to Clipboard Button, and Unescaped Markup. 
* Deploys are triggered manually in [Deploybot](https://studio-for-digital-craftsmanship.deploybot.com/)

### Setup ###

1. Get aded to our [Avon team](https://bitbucket.org/account/user/craftsmanshipstudio/projects/AVON) in Bitbucket.
2. Get aded to the [avon-poc](https://bitbucket.org/craftsmanshipstudio/avon-poc) repo in Bitbucket.
3. Create a local folder for the repo
4. CD to that folder. Example: ```cd /Users/yoursweetusername/Sites/avon-poc```
3. Clone the repo: ```git clone https://studio4digitalcraftsmanship@bitbucket.org/craftsmanshipstudio/avon-poc.git```

### How run local server ###
1. CD to the folder where you cloned the repo. Example: ```cd /Users/yoursweetusername/Sites/avon-poc```
2. ```gulp```
3. Website will be available at http://localhost:3000
You should see something like this:
```
n:~ yoursweetusername$ cd /Users/yoursweetusername/Sites/avon-poc
n:avon-poc yoursweetusername$ gulp 

[16:45:08] Using gulpfile ~/Sites/avon-poc/gulpfile.js
 --------------------------------------
       Local: http://localhost:3000
 --------------------------------------
[Browsersync] Serving files from: ./dist
```

### Development ###
* Templating is done with [Twig](https://www.npmjs.com/package/twig). Files in the **src** folder with the **.twig** extension gets converted into **.html** 
* Gulp watches for changes to Javascript/SASS/twig files then: 
    1. Recompiles SASS files. Puts converted CSS files in the **dist** folder
    2. Copies other static files from **src** to the **dist** folder
   
### Git Workflow ###
- Use [Git flow](https://danielkummer.github.io/git-flow-cheatsheet/)
```git flow init```
- General development: Push to the **develop** branch
- Finished code: Merge **develop** into to the **master** branch

### Deploys ###
[Deploybot](https://studio-for-digital-craftsmanship.deploybot.com/) (See Lastpass for cridentials) tells our Dreamhost server to get (```git-pull```)  the latest changes from our Bitbucket repo.
- Go to [Deploybot](https://studio-for-digital-craftsmanship.deploybot.com/) 
- Click "Deploy"
- On confirmation screen click "Start deployment"

### Who do I talk to? ###

* Nathan Hiemstra nayt@s4dc.org