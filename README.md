# Visits History
Visits history reports generator

## Install
1. Install node 7.10 or higher.

2. Clone master branch:
    ```
    git clone git@github.com:v-gachkovsky/visits-history.git
    ```

3. Go to app directory and run `npm install`

4. Edit `config/config.js` file.

    Use this template in .bash_profile if you want to use env variables for configuration:
      ```
      export VISITS_HISTORY_SECRET="******"
      export VISITS_HISTORY_USER="****@domain.com"
      export VISITS_HISTORY_IMAP_HOST="imap.mail.com"
      export VISITS_HISTORY_IMAP_PORT=993
      export VISITS_HISTORY_IMAP_TLS=true
      export VISITS_HISTORY_SMTP_HOST="smtp.mail.com"
      export VISITS_HISTORY_SMTP_PORT=465
      export VISITS_HISTORY_SMTP_SECURE=true
      export VISITS_HISTORY_RECIPIENT="****@mail.com"
      ```
    !!! For now its works with 993, 465 ports and with TLS.
    
    Then run `source ~/.bash_profile`
    
5. Run app: `node app.js`