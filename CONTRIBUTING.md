# Contributing to react-map-gl

**Thanks for taking the time to contribute!**

PRs and bug reports are welcome, and we are actively looking for new maintainers.

## Setting Up Dev Environment

The **master** branch is the active development branch.

Building react-map-gl locally from the source requires node.js `>=8`.
We use [yarn](https://yarnpkg.com/en/docs/install) to manage the dependencies.

```bash
git checkout master
yarn bootstrap
yarn test
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


## Release

react-map-gl follows the [Semantic Versioning](https://semver.org/) guidelines. Steps for publishing releases can be found [here](https://www.github.com/visgl/tsc/tree/master/developer-process).


## Community Governance

vis.gl is part of the [Urban Computing Foundation](https://uc.foundation/). See the organization's [Technical Charter](https://github.com/visgl/tsc/blob/master/Technical%20Charter.md).

### Technical Steering Committee

react-map-gl development is governed by the vis.gl Technical Steering Committee (TSC).

### Maintainers

- [Xiaoji Chen](https://github.com/Pessimistress)
- [Xintong Xia](https://github.com/xintongxia)

Maintainers of react-map-gl have commit access to this GitHub repository, and take part in the decision making process.

If you are interested in becoming a maintainer, read the [governance guidelines](https://github.com/visgl/tsc/tree/master/developer-process/governance.md).

The vis.gl TSC meets monthly and publishes meeting notes via a [mailing list](https://lists.uc.foundation/g/visgl).
This mailing list can also be utilized to reach out to the TSC.

## Code of Conduct

Please be mindful of and adhere to the Linux Foundation's [Code of Conduct](https://lfprojects.org/policies/code-of-conduct/) when contributing to react-map-gl.
