# Fake ? News
Welcome to the admin client repo of March 2021 cohort's newsroom challenge. 

We have built a fullstack news platform for conspiracy theories that spans 4 different applications:
1. An admin interface where journalists can write new articles and editors can moderate and view statistics.
2. A client for the users that comprises your daily dose of conspiracies, a forum for localized, user-curated content, as well as general newssite functionality.
3. A backend engine that stores all of our data, controls model associations, and serves API functionality at various endpoints.
4. A mobile client to serve truth-seekers who are on the go with undisturbed access to our news.

[For full description of the applictation, click here to go to our main repo](https://github.com/CraftAcademy/fake_news_client_user)

## The code   
The admin client of Fake ? News adds curation and moderation options to the public client and features an authentication-restricted dashboard for journalists and editors. 

Journalists are able to see an overview of their own articles, edit those, and write new ones. New articles won't be published directly, but will have to be approved by an editor

Editors are able to review, edit, publish, and archive all articles. They can moderate all backyard articles, sign up new journalists, and access the statistics dashboard that holds details such as amount of articles, journalists, etc, as well as taps into the Stripe API to fetch amount of subscribers and their subscription tiers. 
