echo @off

call docker-compose -f docker-compose-dev.yml build
call docker-compose -f docker-compose-dev.yml up -d
call exit