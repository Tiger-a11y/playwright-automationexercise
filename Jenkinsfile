pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    parameters {
        choice(name: 'SUITE', choices: [
            'test:auth-only',
            'test:products-only',
            'test:contact-only',
            'test:all-modules',
            'test:smoke-suite',
            'test:regression-suite',
            'test:auth-contact-folders',
            'test:products-folder',
            'test:ui-all'
        ], description: 'Choose the Playwright test suite to run')
    }

    environment {
        CI = 'true'
        BASE_URL = 'https://automationexercise.com'  // Or inject securely
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/Tiger-a11y/playwright-automationexercise'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh "npm run ${params.SUITE}"
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }
    }
}
