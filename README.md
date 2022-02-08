## services-simple-com Branch

1. In this branch, each service is connected with each other by rabbitmq based event bus
2. Best for smaller & large projects

### Please keep in mind

1. make sure your rabbitmq server is running either on localhost or online server
2. if your rabbitmq server is running on localhost then your url is amqp://localhost and if it is running on online server ( aws , digitalocean or an another) then its url is amqp or amqps://username:password@domain
3. I am using aws so its url is amqps://username:password@longrandomstringgeneratedbyaws.mq.us-east-2.amazonaws.com:5671 



#### Commands

1. docker compose up --build
2. docker compose down


