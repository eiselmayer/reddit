# Reddit

## set up

First you need to authorised an application with your reddit account.

- Go to [https://www.reddit.com/prefs/apps](https://www.reddit.com/prefs/apps).
- Click _create another app_
- Give it a random name, e.g. Test Project.
- Select _script_.
- Random text for _description_.
- Leave _about url_ empty.
- Fill _redirect url_ with `http://localhost:3000/authorize_callback` (doesn't really matter what you put there).
- Create app

Now you need to add the credentials to the local application.

- Go to `/src/config`, copy `reddit.sample.ts` and rename it to `reddit.ts`. This file will not be committed into the repository.
- Get the id and the secret from the [app page](https://www.reddit.com/prefs/apps). You might need to click edit to see the secret.
- Fill in your real username and password (remember that file does not go into the repository.)
- Profit!
