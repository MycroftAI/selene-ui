pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'cd frontend/internet'
                sh 'npm install'
                sh 'ng build --project globalnav'
                sh 'ng build --project page-not-found'
                sh 'ng build --project account'
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
            }
        }
    }
}
