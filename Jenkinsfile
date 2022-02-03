pipeline {

    agent any

    stages {

        stage('Build') {
            steps {
                sh 'docker build -t bsessevmez/workout-ui-app:0.0.1 .'
                sh 'docker rm -f komsum-ui-app'
            }
        }


        stage('Run') {
            steps {
                sh 'docker run -d --net=webproxy -e VIRTUAL_HOST=gym4athletes.com -e LETSENCRYPT_HOST=gym4athletes.com -e LETSENCRYPT_EMAIL=sessevmezbugra@gmail.com -p 9001:80 --name workout-ui-app bsessevmez/workout-ui-app:0.0.1'
            }
        }

    }
}