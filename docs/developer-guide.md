# Developer Guide

## Develop

The dev tools are tested with Node 8.11.3 and yarn 1.7.0.

Set up locally:

```bash
$ git clone https://github.com/uber/react-map-gl.git
$ cd react-map-gl
$ yarn bootstrap
$ npm run start
```

Test:

```bash
$ npm run test
```

Test in Node:

```bash
$ npm run test node
```

Test in browser (can use Chrome dev tools for debugging):

```bash
$ npm run test browser
```

## Pull Requests

Any intended change to the code base must open a [pull request](https://help.github.com/articles/creating-a-pull-request/) and be approved. 

Generally speaking, all PRs are open against the `master` branch, unless the feature being affected no longer exists on master.

### PR Checklist

- [ ] Tests
  + `npm run test` must be successful.
  + New code should be covered by unit tests whenever possible.
- [ ] Documentation
  + If public APIs are added/modified, update component documentation in `docs/api-reference`.
  + Breaking changes and deprecations must be added to `docs/upgrade-guide.md`.
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

- [ ] Push to new `<latest>-release` branch. `<latest>` represents a minor release number, e.g. `3.3`, `4.0`.
- [ ] Run `npm run update-release-branch <latest>` to upate the dependencies of examples to the latest version, and the links in all documentation to point to the new branch
- [ ] Publish new minor release
- [ ] Publish website


## Publish

> NOTE: for authorized team members only

### Production Release

1. Log into an authorized [npmjs.com](https://www.npmjs.com/) account. You can use [npmrc](https://www.npmjs.com/package/npmrc) to manage multiple npm profiles.
2. Make sure both the `master` and the release branch are up to date:

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

    If the commit affects code that is published to npm, add its commit message to CHANGELOG.md:

    ```
    ## 3.3.4 (Aug 4, 2018)

    - fix capture* props for overlay components (#565)
    ```

  Examples of changes that are published:

    - A change anywhere in `src`
    - A change in Babel config
    - A change in `README.md`
    - A change in `package.json`'s user-facing fields, e.g. `file`, `main`, `browser`, `dependencies`, `peerDependencies`

  Examples of changes that are not published:

    - A change in `docs`
    - Improvement of an example
    - Adding a new lint rule
    - Adding a new npm script

5. Include the changelog in the version commit, and publish:

    ```bash
    $ git add .
    # This will bump version to the next patch release, commit, tag and publish:
    $ npm run publish-prod
    ```

6. If the new patch release fixes a bug on the website, republish the website.


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

4. If a commit affects code that is published to npm, add its commit message to CHANGELOG.md.

5. If some beta version has been published for the target release (e.g. `4.0.0-alpha.1`), do not make changes to `package.json`. Otherwise, manually bump the version in `package.json` to the appropriate pre-release version (e.g. `4.1.0-alpha.0`).

6. Include the changelog in the version commit, and publish:

    ```bash
    $ git add .
    # This will bump version to the next pre-release, commit, tag and publish:
    $ npm run publish-beta
    ```

### Website

1. Make sure the `<latest>-release` branch is up to date:

    ```bash
    $ git checkout 3.3-release
    $ git pull
    ```

2. Make sure you have the correct Mapbox token:

    ```bash
    $ echo $MapboxAccessToken
    ```

3. Test the website:

    ```bash
    $ cd website
    $ yarn
    $ yarn start
    ```

4. Build and publish the website:

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
