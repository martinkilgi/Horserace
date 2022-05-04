# Horserace

## Local setup instructions

  * Node.js installed
  * PostgreSQL (Server and preferrably PgAdmin)
  * IntelliJ Idea Ultimate
  * VS Code or your preferred IDE

1. Clone the project from Github with command ```git clone https://github.com/martinkilgi/Horserace.git```
2. Navigate to the 'frontend' folder from the command line and enter ```npm install```.
3. Start PostgreSQL server (if it's not running yet), open PgAdmin and log in with the credentials you set during installation.
     * Windows key + R
     * Type ```services.msc```
     * Find your Postgres service based on your installed version
     * Start it if it's not running
4. Under 'Databases' create a new database named "horserace" and click on it to make it active.
5. Open 'backend' folder in IntelliJ Idea.
6. Click on 'Database' on the ribbon on the right side to connect the backend to the database.
9. Click on '+' sign -> 'Data Source' -> 'PostgreSQL' and insert your database name, user and password. After that, test connection with the button in the left bottom.
10. If needed, open file named 'application.properties' in 'Resources' folder and configure it according to your database.
11. Start backend service by clicking on the green arrow (or Shift+F10) on the top ribbon.
12. Start frontend by being in the 'frontend' folder from command line and type ```npm start```.
