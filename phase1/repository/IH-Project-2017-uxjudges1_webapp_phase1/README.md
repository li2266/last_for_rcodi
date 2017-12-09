# [nodejs-cookbook](https://github.com/redguide/nodejs)

[![CK Version](http://img.shields.io/cookbook/v/nodejs.svg?branch=master)](https://supermarket.chef.io/cookbooks/nodejs) [![Build Status](https://img.shields.io/travis/redguide/nodejs.svg)](https://travis-ci.org/redguide/nodejs) [![Gitter chat](https://badges.gitter.im/redguide/nodejs.svg)](https://gitter.im/redguide/nodejs)

Installs node.js/npm and includes a resource for managing npm packages

## Requirements

### Platforms

- Debian/Ubuntu
- RHEL/CentOS/Scientific/Amazon/Oracle
- openSUSE

Note: Source installs require GCC 4.8+, which is not included on older distro releases

### Chef

- Chef 12.1+

### Cookbooks

- build-essential
- ark
- compat_resource

## Usage

Include the nodejs recipe to install node on your system based on the default installation method:

```chef
include_recipe "nodejs"
```

### Install methods
