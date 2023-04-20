#!/bin/bash

if [ -z "$DOMAIN" ]; then
  echo "set geomk.com.br"
  export DOMAIN='geomk.com.br'
fi

export TEST='texto teste'

function testFunction {
  # echo "Me, ${USER}, While I thought that I was learning ${TEST}." >quote1.txt
  echo 'Me, ${USER}, While I thought that I was learning ${TEST}.' >quote1.txt

  envsubst '$USER $TEST' <quote1.txt >quote2.txt
  # envsubst '$USER' <envs/djn012.sample.env >.env
  # cp envs/djn012.sample.env n.env

  # >data.txt
}

function render {
  envsubst '$USER $DOMAIN $PROJECT' <docker-compose-template.yaml >docker-compose.yaml
}

function dev {
  yarn dev
}

case $1 in

dev)
  dev
  ;;
test)
  testFunction
  ;;
render)
  render
  ;;
up)
  render
  docker-compose up -d --parallel
  ;;
build)
  render
  echo 'parallel build'
  docker-compose build --parallel
  ;;
cypress)
  render
  docker-compose run --rm cypress $2
  ;;
*)
  echo 'command not found'
  ;;
esac
