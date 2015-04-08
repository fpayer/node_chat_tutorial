if [ -z "$(which node)" ]; then
  curl -sL https://deb.nodesource.com/setup | sudo bash -
  sudo apt-get install -y nodejs npm
fi
npm install
