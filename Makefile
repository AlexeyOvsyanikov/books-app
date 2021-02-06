hosts:
	@echo "\n\033[1;m Adding record in to your local hosts file.\033[0m"
	@echo "\n\033[1;m Please use your local sudo password.\033[0m"
	@echo "127.0.0.1 localhost api.books" | sudo tee -a /etc/hosts

application-up:
	docker-compose up -d

application:
	cd ./frontend && npm i
	cd ./frontend && ng build --prod
	cd ./backend && composer install 

database:
	cd ./backend && php bin/console doctrine:database:create
	cd ./backend && php bin/console make:migration
	cd ./backend && php bin/console doctrine:migrations:migrate
	cd ./backend && php bin/console doctrine:fixtures:load