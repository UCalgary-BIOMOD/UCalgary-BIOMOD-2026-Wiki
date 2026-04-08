# UCalgary-BIOMOD-2026-Wiki

Authors:
Allan Vu

How to work on this respository:

For more information, please visit: https://www.gitkraken.com/learn/git/git-flow

View a cheatsheet of the Git Flow commands at: https://danielkummer.github.io/git-flow-cheatsheet/ 

Are you new to this repository?
1. Then, cd into biomod-wiki
2. Then, checkout into develop with: git checkout develop
3. Install the dependencies using: npm install
4. Confirm your project runs locally with: npm run dev

Then, please run "git flow init" to install Git Flow into your clone.
Use all of the default values for the branch names, but turn off automatic tagging.

We are using the Git Flow framework which is a way to protect our releases and make sure our major changes do not ruin our website.

There are five branch types - main, develop, feature, release, and hotfix.

Main:

    The main branch contains all of our production code. All of the changes that have been tested and vetted will be held in main. Releases will be added to main using pull requests - which must be reviewed.
    DO NOT make loose commits to main. 

Develop:

    All of our working/pre-production code will be held in develop, and most of your work will be branched off from develop. These will contain features that are ready to be tested, added to a release. 
    New features will be based off of the develop branch, and then merged when it is ready for testing.

Feature:

    This is likely the type of branch you will be working on. You will create a feature branch whenever you want to add something as a branch off of develop. When you have thoroughly tested your own feature yourself, merge your feature branch back into develop "finish" command as below.

    To start a new feature, use this command while on your local develop branch: git flow feature start {FEATURE_NAME}

    To finish a new feature, use this command while on your feature branch: git flow feature finish {FEATURE_NAME}

    Working on the same feature as someone else? Allow collaboration on your branch by using: git flow feature publish FEATURE_NAME

    Want to work on a feature someone else has made?
    Pull their feature branch by using: git flow feature pull origin FEATURE_NAME

    Have you just finished a new feature on develop?
    ALWAYS push the new changes on your develop branch to the origin develop branch using:
    git push origin develop

    Note: git feature finish DOES NOT push the new feature to the remote. It only merges the finished feature to your local develop.

    Before starting a new release, ALWAYS pull from develop before you start using:
    git checkout develop
    git pull origin develop
    Or if you're on develop, succintly: 
    git pull

Release:

    A release branch is used as staging branch right before a new production release of our website. Typically, this is finishing touches or minor bug fixes. 

    Start a new release branch from develop by using: 
    git flow release start <version>
    The version name MUST follow the chronological order of releases already made on main (don't be silly). We will generally be using what is known as semantic versioning. Read only the Summary at: https://semver.org
    Bump up the PATCH number if making a release!

    Usually, you want to allow other devs to make commits to the release branch, so use:
    git flow release publish <version>

    If you are an other dev and want to work on someone else's published release branch, please use:
    git flow release track <version>

    To end a release after making final commits, please use:
    git flow release finish <version>

    We will be tagging our commits with more detailed information, so please follow the workflow below:
    1. git flow release finish <version> (YOU ARE HERE)
    2. git tag (check the tags on your local)
    Git Flow automatically creates tags, so please delete it by:
    3. git tag -d <version>
    Add a better tag by:
    4. git tag -a v<version> -m "Release <version>: <whatever changes made>" 
    i.e. You might say: git tag -a v1.4.0 -m "Release v1.4.0: We updated the website to have abc, xyz, and fixed foobar"
    Then, push to remote main:
    5. git push origin main
    Then, push your tags:
    6. git push origin --tags

Hotfix:

    Sometimes, an urgent fix is needed on a recent release on main, so it must be acted on immediately. A hotfix will be branched from main, and merging it back will merge it to both main and develop. Usually, only one develop will be completing a hotfix at a time, so no collaboration is available for a hotfix.

    To start a new hotfix, use:
    git flow hotfix start <version>
    The version name MUST follow the chronological order of releases already made on main (don't be silly). We will generally be using what is known as semantic versioning. Read only the Summary at: https://semver.org
    Bump up the FIX number if making a release!

    To finish a hotfix, use:
    git flow hotfix finish <version>

How to make commits on this repository:

    We will NOT be holding a changelog, so there is a high necessity to make PROPER and FREQUENT commits while developing. Additionally, all of your commits will appear in the develop branch, so it is really important to document as much as possible to make it readable!

    Make commits as frequent as possible without going into too much granularity. In case something is broken, it is useful to have more commits to revert to!

    Before committing, only add the files you want to be tracked using:
    git add <filename>
    If you have only files you want to track, succintly use:
    git add *

    Always stage!
    git stage *

    Please use the following format for EVERY commit:
    git commit -m "tag: <caption text>" -m "<description>

    You MUST add a tag to every commit with the following consensus tags:

    feat: The new feature you're adding to a particular application

    fix: A bug fix

    style: Feature and updates related to styling

    refactor: Refactoring a specific section of the codebase

    test: Everything related to testing

    docs: Everything related to documentation

    chore: Regular code maintenance.

    Tags sourced from: https://www.freecodecamp.org/news/writing-good-commit-messages-a-practical-guide/ 

    <caption> should explain your changes briefly without extraneous details. Please use the IMPERATIVE voice while writing all commit captions.

    <description> should explain your changes in depth and be conscious of whom may be reading your commit. Make clear what changes you have made, possibly why you made these changes, and include EVERY change! Use proper grammar and try not make puncutation or whitespace errors! Never think your code is self-explanatory. If you went into the commit with a problem in mind, always state the problem!

!!ORGANIZE THIS LATER!!

Project Framework:

    src/features/:

        Every page will be considered a feature. Each feature will have its own lowercase-name name that is the name of the page. 
        Feature folders will contain three types of files:

            The file for the page, given as:
            PageName.jsx

            The content for the page, given as:
            PageName.json

            Any specialized components of the page, given as:
            FeatureName.jsx

            If there are .css module styling files, please use:
            FeatureName.module.css

    src/Components:

        Components are React's way of implementing reusable and declarative html objects. Please use as many universal components to construct pages as possible!

        All components will usually have two files:

        Hold the main component code in:
        <ComponentName>Components.jsx

        Hold the module css for each component file in:
        <ComponentName>Components.module.css

        For connecting styling to components, always use styles.<stylename>!

        Try to name components as directly to their function as possible.

        Note: All React components must have a capitalized letter in their name!

        Derive as many stylings as possible - especially related to color and font - from index.css.

    src/assets:

        This will contain any pictures or possible source code for embedded apps

    index.css:
    
        This contains most of our page-wide decorative styling. Ideally, use as many styles from here as possible to make changes propagate down to the component level!

    App.css:

        I will investigate what this does later, but it seems to be general styling for the framework, but not decoration of the page.

    App.jsx:

        Contains all of our react-router stuff. To add new page links, copy over a link and give it a name. 

General Project Conventions:

    Please always write imports as derived from root. The root alias is currently set as "@" in vite.config.js

    Please only write all strings and paths with double quotes (") and not single quotes (')




