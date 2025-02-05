SERVICE=cancerviz

# Comandos para entorno de desarrollo (start:dev)
dev-build:
	docker-compose -f docker-compose.local.yml up --build -d

dev-start:
	docker-compose -f docker-compose.local.yml up -d

dev-stop:
	docker-compose -f docker-compose.local.yml down

dev-logs:
	docker logs -f $(SERVICE)_dev

dev-shell:
	docker-compose -f docker-compose.local.yml exec $(SERVICE) bash

# Comandos para entorno de producción (start:prod)
prod-build:
	docker-compose up --build -d

prod-start:
	docker-compose up -d

prod-stop:
	docker-compose down

prod-logs:
	docker logs -f $(SERVICE)

# Limpiar contenedores y volúmenes
clean:
	docker-compose down -v
	docker system prune -f

# Ver estado de los contenedores
ps:
	docker ps
