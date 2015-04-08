while true; do
    read -p "Please enter your mySQL password: " password
    result=$( (mysql -u root -p$password -s -e "use mysql; update user set password=PASSWORD('') where User='root'; flush privileges; \q") 2>&1 > /dev/null )
    
    if [[ $result == *"ERROR"* ]]
	then
  		echo "Wrong password, please try again."
	else
		break;
	fi
done
