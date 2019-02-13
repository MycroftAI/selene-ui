pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm install'
                sh 'ng build --project shared'
                sh 'ng build --project globalnav --configuration test'
                sh 'ng build --project page-not-found --configuration test'
                sh 'ng build --project account --configuration test'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                echo 'No testing included in this pipeline'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                withCredentials([sshUserPrivateKey(credentialsId: '6413826d-79f6-4d03-9902-ee1b73a96efd', keyFileVariable: 'JENKINS_SSH_KEY', passphraseVariable: '', usernameVariable: 'SERVER_USER')]) {
                    sh 'scp -r dist/* root@157.230.91.255:/var/www/'
                }
            }
        }
    }
}
