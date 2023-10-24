# ml-depression-detection

A Machine Learning Web Application with BERT to detect Depression in text.

Live link to the Web Application: https://ml-depression-detection.vercel.app

## About the project
Frontend: React.js / Typescript / Tailwind CSS / Vite  
Backend: Spring Boot / Java / PostgreSQL / JPA / Hibernate  
ML Model: Python / Tensorflow / Keras / BERT / Transformer  
Cloud: AWS Lambda / AWS RDS / AWS Beanstalk / AWS Route 53 / AWS Certificate Manager  

## Demo 

![demo](https://user-images.githubusercontent.com/95255319/227807052-e4c91089-f45d-4a0a-b2dc-c823c53a5281.gif)

## Instructions

1. Visit the link above.  
2. Scroll down to the demo section or click on  *Try it out* button.  
3. Enter the text you want to analyse. Your text should be at least 20 characters long and 2000 characters at max.  
4. Verify the captcha and click on *Click to see the result* button.  

## Things to keep in mind
- AWS Lambda is used to host the model. So, the first time you use the application, it might take a while to load the model due to the cold start and limited resources.  
- .env file is not included in the repository. So, you will have to create your own .env file and add the following variables to your .env file in your frontend directory:  
    - VITE_WEB_KEY(Recaptcha web key)  
    - VITE_INPUT_POST_ENDPOINT  
    - VITE_TOKEN_VERIFICATION_ENDPOINT  

- You also need the following env variables in your backend directory/application.properties file:  
    - RECAPTCHA_SECRET (Recaptcha secret key)  
    - AWS_SECRET_ACCESS_KEY  
    - AWS_LAMBDA_FUNCTION_NAME (You need to deploy the model to AWS Lambda and add the function name here)  
    - AWS_LAMBDA_FUNCTION_REGION (The region where you deployed the model)  
    - SPRING_DATASOURCE_URL  
    - SPRING_DATASOURCE_USERNAME  
    - SPRING_DATASOURCE_PASSWORD  









