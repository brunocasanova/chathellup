run: start-node

start-node:
	@echo "\n\x1b[92m[NODE]:\x1b[0m initializing..."; \
	echo "\x1b[32m[NODEMON]:\x1b[0m initializing..."; \
	nodemon --debug index.js;

kill-mongo:
	@if pgrep "mongo" | "mongod" > /dev/null; \
	then \
		mongo --eval "db.getSiblingDB('admin').shutdownServer()" > /dev/null; \
		echo "[MONGO DB]: process stopped."; \
	else \
		echo "[MONGO DB]: process isn't running."; \
	fi







