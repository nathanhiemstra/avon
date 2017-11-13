# README #

This README documents steps to Avon Proof of Concept application up and running.

### What is this repository for? ###

* An HTML/CSS clickable demo of key user journeys. [More details](https://docs.google.com/document/d/1988FfC2Nhji_smnICsYE3qWNB4n_jK80tlvH8Sqdvs8/edit) 
* Repo lives in the [S4DC Bitbucket account](https://bitbucket.org/craftsmanshipstudio/)

### Tech overview ###
* Files to be edited are in the **src** folder
* Deliverable files are in the **dist** folder
* Gulp watches for changes to HTML/Javascript/SASS files then: 1. recompiles SASS 2. copies changes from **src** to the **dist** folder
* Images must be manually copied from **src** to the **dist** folder

### Setup ###

* Get aded to our [Avon team](https://bitbucket.org/account/user/craftsmanshipstudio/projects/AVON) in Bitbucket.
* Get aded to the [avon-poc](https://bitbucket.org/craftsmanshipstudio/avon-poc) repo in Bitbucket.
* Clone the repo: 
```git clone https://studio4digitalcraftsmanship@bitbucket.org/craftsmanshipstudio/avon-poc.git```
### How run local server ###
1. CD to the directory where you cloned the repo. Example: ```cd /Users/yoursweetusername/Sites/avon-poc```
2. ```gulp server```
3. Website will be available at http://localhost:3000
You should see something like this:
```
n:~ yoursweetusername$ cd /Users/yoursweetusername/Sites/avon-poc
n:avon-poc yoursweetusername$ gulp server
[14:43:05] Using gulpfile ~/Sites/avon-poc/gulpfile.js
[14:43:05] Starting 'server'...
[14:43:05] Finished 'server' after 31 ms
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:3000
    External: http://192.168.86.58:3000
 --------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.86.58:3001
 --------------------------------------
[Browsersync] Serving files from: ./dist
```


### Who do I talk to? ###

* Nathan Hiemstra nayt@s4dc.org