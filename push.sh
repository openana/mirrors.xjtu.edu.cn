#!/usr/bin/env bash

set -eux

pnpm build
rsync -avz ./dist/* m1.ana.xjtu.edu.cn:/data/storage/docker/service/config/html/mirrors.xjtu.edu.cn
