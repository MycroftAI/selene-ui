pipeline {
    agent any

    stages {

        // Run the build in the against the dev branch to check for compile errors
        stage('Build PR) {
            when {
                changeRequest target: 'dev'
            }
            steps {
                echo 'Building code in the pull request...'
                sh 'npm install'
                sh 'ng build --project shared'
                sh 'ng build --project globalnav'
                sh 'ng build --project page-not-found'
                sh 'ng build --project account --configuration development'
                sh 'ng build --project market --configuration development'
                sh 'ng build --project sso --configuration development'
            }
        }

        // Deploy to the Test environment
        stage('Build for Test') {
            when {
                branch 'test'
            }
            steps {
                echo 'Building code in the "test" branch...'
                sh 'npm install'
                sh 'ng build --project shared'
                sh 'ng build --project globalnav'
                sh 'ng build --project page-not-found'
                sh 'ng build --project account --configuration test'
                sh 'ng build --project market --configuration test'
                sh 'ng build --project sso --configuration test'
            }
        }

        stage('Deploy to Test') {
            when {
                branch 'test'
            }
            steps {
                echo 'Deploying to test environment web servers...'
                withCredentials([sshUserPrivateKey(credentialsId: '6413826d-79f6-4d03-9902-ee1b73a96efd', keyFileVariable: 'JENKINS_SSH_KEY', passphraseVariable: '', usernameVariable: 'SERVER_USER')]) {
                    // Deploy account application and its associated libraries
                    echo 'Deploying account application...'
                    sh 'scp -r dist/shared root@192.241.152.213:/var/www/'
                    sh 'scp -r dist/globalnav root@192.241.152.213:/var/www/'
                    sh 'scp -r dist/page-not-found root@192.241.152.213:/var/www/'
                    sh 'scp -r dist/account root@192.241.152.213:/var/www/'

                    // Deploy single sign on application and its associated libraries
                    echo 'Deploying single sign on application...'
                    sh 'scp -r dist/shared root@198.199.90.118:/var/www/'
                    sh 'scp -r dist/globalnav root@198.199.90.118:/var/www/'
                    sh 'scp -r dist/page-not-found root@198.199.90.118:/var/www/'
                    sh 'scp -r dist/sso root@198.199.90.118:/var/www/'

                    // Deploy single sign on application and its associated libraries
                    echo 'Deploying single sign on application...'
                    sh 'scp -r dist/shared root@198.211.106.110:/var/www/'
                    sh 'scp -r dist/globalnav root@198.211.106.110:/var/www/'
                    sh 'scp -r dist/page-not-found root@198.211.106.110:/var/www/'
                    sh 'scp -r dist/market root@198.211.106.110:/var/www/'
                }
            }
        }

        // Deploy to the Production environment
        stage('Build for Production') {
            when {
                branch 'master'
            }
            steps {
                echo 'Building code in the "master" branch...'
                sh 'npm install'
                sh 'ng build --project shared --prod'
                sh 'ng build --project globalnav --prod'
                sh 'ng build --project page-not-found'
                sh 'ng build --project account --prod'
                sh 'ng build --project sso --prod'
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'master'
            }
            steps {
                echo 'Deploying to production environment web servers...'
                withCredentials([sshUserPrivateKey(credentialsId: '6413826d-79f6-4d03-9902-ee1b73a96efd', keyFileVariable: 'JENKINS_SSH_KEY', passphraseVariable: '', usernameVariable: 'SERVER_USER')]) {
                    // Deploy account application and its associated libraries
                    echo 'Deploying account application...'
                    sh 'scp -r dist/shared root@???:/var/www/'
                    sh 'scp -r dist/globalnav root@???:/var/www/'
                    sh 'scp -r dist/page-not-found root@???:/var/www/'
                    sh 'scp -r dist/account root@???:/var/www/'

                    // Deploy single sign on application and its associated libraries
                    echo 'Deploying single sign on application...'
                    sh 'scp -r dist/shared root@???:/var/www/'
                    sh 'scp -r dist/globalnav root@???:/var/www/'
                    sh 'scp -r dist/page-not-found root@???:/var/www/'
                    sh 'scp -r dist/sso root@???:/var/www/'
                }
            }
        }

    }
}
