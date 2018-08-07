# Developer Guide

## Develop

The dev tools are tested with Node 8.11.3 and yarn 1.7.0.

Set up locally:

```bash
$ git clone https://github.com/uber/react-map-gl.git
$ cd react-map-gl
$ yarn
$ npm run start
```

Test:

```bash
$ npm run test
```

Test in browser (includes additional render tests):

```bash
$ npm run test-browser
```

## Pull Requests

Any intended change to the code base must open a [pull request](https://help.github.com/articles/creating-a-pull-request/) and be approved. 

Generally speaking, all PRs are open against the `master` branch, unless the feature being affected no longer exists on master.

### PR Checklist

- [ ] Tests
  + `npm run test` and `npm run test-browser` must both be successful.
  + New code should be covered by unit tests whenever possible.
- [ ] Documentation
  + If public APIs are added/modified, update component documentation in `docs/api-reference`.
  + Breaking changes must be added to `docs/upgrade-guide.md`.
  + Noteworthy new features should be added to `docs/whats-new.md`.
- [ ] Description on GitHub
  + Link to relevant issue.
  + Label with a milestone (latest release or vNext).
  + If public APIs are added/modified, describe the intended behavior.
  + If visual/interaction is affected, consider attaching a screenshot/GIF.


## Branching and Releasing Model

The `master` branch of the repo is the latest dev branch. It is used to publish the latest **beta** release, e.g. `4.0.0-alpha.1`.

Each minor release branches off from master, e.g. `2.0-release`, `3.3-release`. All **production** releases are built and published from respective release branches.

[Website](https://uber.github.io/react-map-gl) is built from the `<latest>-release` branch.

[Documentation](https://uber.github.io/react-map-gl/#/Documentation) is served directly from the `<latest>-release` branch.

Only the `master` branch and the `<latest>-release` branch are actively maintained.

### New Release Branch Checklist

> NOTE: for authorized team members only

- [ ] Push to new `<latest>-release` branch
- [ ] Update the dependencies of examples to the latest minor/major version
- [ ] Update the links in all documentation to point to the new branch
- [ ] Publish new minor release
- [ ] Publish website


## Publish

> NOTE: for authorized team members only

### Production Release

1. Log into an authorized [npmjs.com](https://www.npmjs.com/) account. You can use [npmrc](https://www.npmjs.com/package/npmrc) to manage multiple npm profiles.
2. Make sure both the `master` and the release branch are up to daate:

    ```bash
    $ git checkout master
    $ git pull
    $ git checkout 3.3-release
    $ git pull
    ```

3. Find the last release commit on the `<latest>-release` branch:

    ```bash
    $ git log

    ...

    commit a05d23059444cf29bb4e38ea5e4cd6172a4f463d
    Author: Xiaoji Chen <xiaoji@uber.com>
    Date:   Fri Aug 3 10:11:45 2018 -0700

        3.3.3
    ```

    Find the commits on `master` after this commit:

    ```bash
    $ git log master --since="`git show -s --format=%ci a05d2305`"
    ```

4. Find out which new commits should be cherry-picked into the release branch.

    If a commit is a bug fix for the current production release, or a minor, non-breaking new feature, it can be published as a patch. When in doubt, check the original PR's milestone label on GitHub. For example [#565](https://github.com/uber/react-map-gl/pull/565):

    ```bash
    $ git cherry-pick 1238140a
    ```

    And add its commit message to CHANGELOG.md:

    ```
    ## 3.3.4 (Aug 4, 2018)

    - fix capture* props for overlay components (#565)
    ```

5. Commit the changelog:

    ```bash
    $ git add .
    $ git commit -m "3.3.4 Changelog"
    ```

6. Bump version and publish:

    ```bash
    $ npm version patch
    $ npm run publish-prod
    ```

7. If the new patch release fixes a bug on the website, republish the website.


### Beta Release

1. Log into an authorized [npmjs.com](https://www.npmjs.com/) account. You can use [npmrc](https://www.npmjs.com/package/npmrc) to manage multiple npm profiles.
2. Make sure the `master` branch is up to daate:

    ```bash
    $ git checkout master
    $ git pull
    ```

3. Find the last release commit on the `master` branch:

    ```bash
    $ git log

    ...
    commit a05d23059444cf29bb4e38ea5e4cd6172a4f463d
    Author: Xiaoji Chen <xiaoji@uber.com>
    Date:   Fri Aug 3 10:11:45 2018 -0700

        4.0.0-alpha.1
    ```

    Find the commits on `master` after this commit:

    ```bash
    $ git log --since="`git show -s --format=%ci a05d2305`"
    ```

4. And add new commit messages to CHANGELOG.md.

5. Manually bump the version in `package.json` to the next pre-release version.

6. Commit and publish:

    ```bash
    $ git add .
    $ git commit -m "4.0.0-alpha.2"
    $ npm run publish-beta
    $ git push
    ```

### Website

1. Make sure the `<latest>-release` branch is up to date:

    ```bash
    $ git checkout 3.3-release
    $ git pull
    ```

2. Test the website:

    ```bash
    $ cd website
    $ yarn
    $ yarn start
    ```

3. Build and publish the website:

    ```bash
    $ yarn build
    $ git checkout gh-pages
    ```

    Copy the content from `website/dist` to the root of the project. Commit with the corresponding release version:

    ```bash
    $ git add .
    $ git commit -m "3.3.4"
    $ git push
    ```
