# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/trusty64"

  
  config.vm.network "forwarded_port", guest: 8000, host: 8000, host_ip: "127.0.0.1", auto_correct: true
  config.vm.provision :shell, privileged: false, path: "dev_setup/initial.sh"

end
