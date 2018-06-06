#!/usr/bin/env bash
NODE_ENV=test tape --no-override-console -r babel-register ./src/testUtils/setup.js $1 | tap-spec
