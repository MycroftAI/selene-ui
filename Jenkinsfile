pipeline {
    agent any

    stages {

        // Run the build against the dev branch to check for compile errors
        stage('Build dev branch') {
            when {
                branch 'dev'
            }
            steps {
                echo 'Building code in the "dev" branch...'
                sh 'npm install'
                sh 'ng build --project shared'
                sh 'ng build --project globalnav'
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
                sh 'ng build --project account --configuration test'
                sh 'ng build --project market --configuration test'
                sh 'ng build --project precise --configuration test'
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
                    sh 'scp -r dist/shared root@159.223.106.61:/var/www/'
                    sh 'scp -r dist/globalnav root@159.223.106.61:/var/www/'
                    sh 'scp -r dist/account root@159.223.106.61:/var/www/'

                    // Deploy single sign on application and its associated libraries
                    echo 'Deploying single sign on application...'
                    sh 'scp -r dist/shared root@167.99.7.101:/var/www/'
                    sh 'scp -r dist/globalnav root@167.99.7.101:/var/www/'
                    sh 'scp -r dist/sso root@167.99.7.101:/var/www/'

                    // Deploy marketplace application and its associated libraries
                    echo 'Deploying marketplace application...'
                    sh 'scp -r dist/shared root@159.223.129.231:/var/www/'
                    sh 'scp -r dist/globalnav root@159.223.129.231:/var/www/'
                    sh 'scp -r dist/market root@159.223.129.231:/var/www/'

                    // Deploy precise application and its associated libraries
                    echo 'Deploying precise application...'
                    sh 'scp -r dist/shared root@142.93.196.244:/var/www/'
                    sh 'scp -r dist/globalnav root@142.93.196.244:/var/www/'
                    sh 'scp -r dist/precise root@142.93.196.244:/var/www/'
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
                sh 'ng build --project shared'
                sh 'ng build --project globalnav'
                sh 'ng build --project account --prod'
                sh 'ng build --project market --prod'
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
                    sh 'scp -r dist/shared root@104.248.15.155:/var/www/'
                    sh 'scp -r dist/globalnav root@104.248.15.155:/var/www/'
                    sh 'scp -r dist/account root@104.248.15.155:/var/www/'

                    // Deploy single sign on application and its associated libraries
                    echo 'Deploying single sign on application...'
                    sh 'scp -r dist/shared root@134.209.165.129:/var/www/'
                    sh 'scp -r dist/globalnav root@134.209.165.129:/var/www/'
                    sh 'scp -r dist/sso root@134.209.165.129:/var/www/'

                    // Deploy marketplace application and its associated libraries
                    echo 'Deploying single sign on application...'
                    sh 'scp -r dist/shared root@174.138.48.128:/var/www/'
                    sh 'scp -r dist/globalnav root@174.138.48.128:/var/www/'
                    sh 'scp -r dist/market root@174.138.48.128:/var/www/'
                }
            }
        }

    }
}
