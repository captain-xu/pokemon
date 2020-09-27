if [ $1 == "prod"  ]; then
    echo "启动线上环境"
    rm -rf client/dist
    yarn build-prod
    docker-compose -f docker-compose-prod.yml up
else
    echo "启动开发环境"
    docker-compose up
fi