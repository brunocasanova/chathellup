
ROOT_PATH=OpenShift/brunocasanova/chathellup
node_process_id=$(pidof node)

run:
	@mongod & \
	node-inspector & \
	DEBUG=l nodemon --debug index.js

testing:
	@if pgrep "sublime" > /dev/null; \
	then \
		echo "Running"; \
	else \
		echo "Stopped"; \
	fi





