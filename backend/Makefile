DB_NAME=btt-db

.PHONY: help
help: ## This help
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

run-db: ## Run database container
	docker run -e POSTGRES_PASSWORD=$${DATABASE_PW} -p 5432:5432 --name ${DB_NAME} postgres

start-db: ## Start database container
	docker start ${DB_NAME}

stop-db: ## Stop database container
	docker stop ${DB_NAME}

login-to-db: ## Start psql in database container
	docker exec -it ${DB_NAME} psql -U postgres postgres