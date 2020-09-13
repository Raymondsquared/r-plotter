# Plotter with TypeScript

UI: http://r-webapp-ui.s3-website-ap-southeast-2.amazonaws.com/?url=https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression

API Docs: https://did9hrg18lno9.cloudfront.net/api-docs

Get Endpoint: https://did9hrg18lno9.cloudfront.net/api/v1/plotter/image?url=https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression

---

A small codebase for emulating appointment.

[![NPM version][shield-npm]](#)
[![Node.js version support][shield-node]](#)
[![Dependencies][shield-dependencies]](#)
[![Code coverage][shield-coverage]](#)

## Table of Contents

- [Requirements](#requirements)
- [Architecture Diagram](#architecture-diagram)
- [Usage](#usage)
- [Design Decision](#design-decision)
- [To Do](#to-do)
- [Assumption Made](#assumptions-made)
- [Task Requirements](#task-requirements)
- [Other Information](#other-information)

## Requirements

Appointment emulator requires the following to run:

- [Node.js][node] 10+
- [npm][npm] (normally comes with Node.js)

## Architecture Diagram

[![Architecture Diagram][architecture-diagram]](https://d2v3ocmqltf3x3.cloudfront.net/R/r-plotter.png)

## Usage

Intalling dependencies:

- We only use lodash to do array manipulations for the mock database.

```sh
npm install
```

Where to start?

- `main.js` is the first points of entry in this application.

### Test

```sh
npm test
```

### Run

```sh
npm run start
```

## Design Decision

- Programming Language: TypeScript (JavaScript), I have been doing TypeScript for the past 2 years, It's what I am used to at the moment.

## To Do

## Assumptions Made

- Only works with proper table structure `table` > `thead` & `tbody` > `tr` > `td`
- Only works if the first row is numeric
- Non numeric value will be ignored
- 1.46 m (4 ft 9 1⁄2 in) is considered numberic: `1.46`
- 20 May 1922 is considered numeric: `20`

## Task Requirements

- [x] Node JS - Wokrer
- [x] Node JS - API
- [ ] React JS - UI
- [x] Package your application in a Docker container.
- [x] Achieve >80% test coverage.
- [x] Healthcheck endpoint.
- [x] OpenAPI 3 Docs (Swagger).
- [x] Infrastructure as Code (CloudFormation).
- [x] Cloudfront CDN.
- [x] HTTPS from the gateway layer.
- [ ] Mobile first UI.
- [x] AWESOME architecture diagram.

## Other Information

Time breakdown:

- backend development: 1.5 hours.
- frontend development: 0 hour.
- documentation: 0.25 hour.
- operation: 0.25 hour.

[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[shield-coverage]: https://img.shields.io/badge/coverage-97%44-brightgreen.svg
[shield-dependencies]: https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg
[shield-node]: https://img.shields.io/badge/node.js%20support-10.16.2-brightgreen.svg
[shield-npm]: https://img.shields.io/badge/npm-v6.9.0-blue.svg
[architecture-diagram]: https://d2v3ocmqltf3x3.cloudfront.net/R/r-appointment.png
