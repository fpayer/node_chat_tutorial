if [ -z "$(which node)" ]; then
	if [ -z "$(which curl)" ]; then
		sudo apt-get install -y curl
	fi
	
	curl -sL https://deb.nodesource.com/setup | sudo bash -
  sudo apt-get install -y nodejs 
	sudo apt-get install -y npm
fi
npm install
mkdir uploads
