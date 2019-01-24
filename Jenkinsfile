pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
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
