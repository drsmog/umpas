# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
	config.winrm.username = "Administrator"
	config.winrm.password = "Vagrant123456"

 
	config.vm.network :forwarded_port, guest: 3389, host: 3333, auto_correct: true
	config.vm.network :forwarded_port, guest: 5985, host: 5985, id: "winrm", auto_correct: true
	config.vm.network :forwarded_port, guest: 5432, host: 5432
	config.vm.network :forwarded_port, guest: 27017, host: 27017
	
	config.vm.provision :shell, :path => "startup.bat"

	config.vm.box = "ssawinvag"

end
