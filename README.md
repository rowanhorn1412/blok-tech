# registration and login feature dating application
During Block Tech we had the assignment to create a dating-app feature. This dating app feature is about login and registration. To read the entire process of creating this filter feature and creating the functioning dating application, you can go to my wiki.

## Job Story
Wanneer een gebruiker voor het eerst op de applicatie een profiel gaat aanmaken, wilt de gebruiker dat verschillende opties krijgen om zijn profiel zo zelfstandig een eenvoudig mogelijk kunnen invullen, zodat andere gebruikers die zijn profiel vinden precies weten wat voor persoon de gebruiker is.

## Tabel of contents
1. Connect Git and Github
2. Install Node
3. Clone folder
4. Install all the packages
5. Start and run the code!
6. Database connection

## Getting started 🟢
To start, you must have a code editor installed on your computer. For this project (and most of my projects) I used Visual Studio Code. But you can also use Atom, for example.

1. Connect Git and GitHub 🐱
Then you need to Connect Git and GitHub in the terminal. This can be done by opening the terminal and typing the next line of code and pressing enter:

```
git config --global user.name "type here your user name"
```

```
git config --global user.email "type here your user email"
```

This information is the same as you used to sign up for GitHub.

2. Install Node 💻
Then you need to install nvm to install Node. nvm can be installed by typing the following line of code in terminal and pressing enter:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh
```

If nvm has been successfully installed, you can check the version by typing the following line of code in the terminal and pressing enter:

```
nvm --version
```

Then you need to close and re-open the terminal and type the following line of code:

```
nvm install stable
```

Now, both Node and npm (node packaging manager) are installed. You can check it by typing the next line of code in the terminal to get the versions of node and npm:

```
node -v npm -v
```

3. Clone folder 📁
The last step before getting started is to download this project and open it with your code editor. To do this, open your terminal with the correct path in which you want this repository. Example:

```
cd/Desktop/Repos
```

Then type the folling line of code into your terminal:

```
git clone https://github.com/rowanhorn1412/blok-tech.git
```

With this line of code, you've succesfully downloaded the repository to your desired location.

4. Install all the packages 📑
Then type the code below into your terminal:

```
npm install
```

With this line of code, you download all the packages (like express) you need for this feature.

5. Start and run the code! ✅
Go to the repository in the terminal and add the following line of code below:

```
npm run dev
```

Now you can go to http://localhost:38000/ in your browser and view my filter feature! 🙌

6. Database connection ☁️
If you can't connect with my database cause a MongoObjectError, feel free to contact me to ask for the DB host, port and name to make the connection for the database.

Data from the database ⬇️
The structure of the database is shown in the images below. The first image shows the name of the database and the name of the collection. With the filter feature I'm using the 'datingUsers' database.