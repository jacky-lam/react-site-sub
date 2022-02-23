export PROJECT_NAME := $(notdir $(CURDIR))

# 
# Commands for local
#
.PHONY: local-setup
local-setup: ## install dependencies locally
	npm install

.PHONY: local-run
local-run: ## run next locally
	npm run dev

.PHONY: local-clean
local-clean: ## delete dependencies locally
	rm -f -r node_modules
	rm -f package-lock.json


# 
# Commands for local docker
# 
.PHONY: dev-setup
dev-setup: ## install dependencies locally (for linting)
	npm install

.PHONY: dev-build
dev-build: ## build docker container
	docker-compose build

.PHONY: dev-run
dev-run: ## run docker container
	docker-compose up

.PHONY: dev-stop
dev-stop: ## Shutdown running container and remove any intermediate images. Just incase Ctrl-C doesn't work
	docker-compose down

.PHONY: dev-clean
dev-clean: ## Remove all the docker containers for this project
	docker-compose down --rmi local --volumes --remove-orphans
	rm -f -r node_modules
	rm -f package-lock.json

.PHONY: dev-ssh
dev-ssh: ## Open a shell on the current running docker image of the project
	docker-compose exec $(PROJECT_NAME) bash

.PHONY: dev-shell
dev-shell: ## Creates a shell in the project container, does not connect to a running instance. Use `dev-ssh` for that.
	docker-compose run --rm $(PROJECT_NAME) bash

#
# To-do
# - how to build production mode. I think i just change docker-compose.yml NODE_ENV=production
# - Test with kings to run make command
#
.PHONY: start-w
start-w: ## Run production build for windows (via NextJs)
	cross-env PORT=8000 npm run start

.PHONY: build-package-lock
build-package-lock:
	npm install --package-lock


#
# Misc
#
.PHONY: docker-clear
docker-clear: ## Clear all your docker cache (e.g. volumns, containers and images)
	docker system prune -a --volumes

.PHONEY: docker-clear-sc # delete stopped docker containers
docker-clear-sc:
	docker rm  $$(docker ps -q -a)

.PHONEY: docker-clear-inactive-rmi # delete images with <none> (failed images) that aren't being used
docker-clear-inactive-rmi:
	docker rmi $(docker images --filter "dangling=true" -q --no-trunc)


.PHONY: help
help: ## This message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
